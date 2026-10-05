const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
process.env.TZ = 'Asia/Jakarta';
const source = fs.readFileSync(require('node:path').join(__dirname, '../app.js'), 'utf8');
function app() {
  const context = vm.createContext({
    document: { addEventListener() {} }, window: { addEventListener() {} },
    localStorage: { getItem() { return null; } }, console: { error() {} },
    confirm: () => true,
    FileReader: class { readAsText(file) { this.onload({ target: { result: file } }); } }
  });
  vm.runInContext(source, context);
  vm.runInContext(`saveState = () => {}; renderAllViews = () => {}; populateDropdowns = () => {}; closeModal = () => {}; showToast = () => {};`, context);
  return context;
}
function read(ctx, expr) { return JSON.parse(vm.runInContext(`JSON.stringify(${expr})`, ctx)); }
function restore(ctx, data) { ctx.window.importFromJSON({ target: { files: [JSON.stringify(data)], value: 'backup.json' } }); }
test('transaction rows render and expose edit for ordinary transactions', () => {
  const ctx = app();
  const html = vm.runInContext(`createTxItemHTML({ id: 'tx1', type: 'expense', amount: 25000, category: 'Makanan & Minuman', wallet: 'Kas', date: '2026-10-01' })`, ctx);
  assert.match(html, /openTxModalById/);
  assert.match(html, /25\.000/);
});
test('transfer rows render without an ordinary transaction editor', () => {
  const ctx = app();
  const html = vm.runInContext(`createTxItemHTML({ id: 'out', type: 'transfer_out', amount: 100, date: '2026-10-01' })`, ctx);
  assert.doesNotMatch(html, /openTxModalById/);
  assert.match(html, /Keluar/);
  vm.runInContext(`openTxModal({ type: 'transfer_in' })`, ctx); // exits before accessing form
});
test('deleting either transfer leg removes its pair, leaving other records', () => {
  for (const id of ['in', 'out']) {
    const ctx = app();
    vm.runInContext(`transactions = [{ id: 'in', linkedTransferId: 'pair' }, { id: 'out', linkedTransferId: 'pair' }, { id: 'other' }]; deleteTransaction('${id}');`, ctx);
    assert.deepEqual(read(ctx, 'transactions'), [{ id: 'other' }]);
  }
});
test('canceling deletion and deleting ordinary records preserve other transactions', () => {
  const ctx = app();
  vm.runInContext(`transactions = [{ id: 'a' }, { id: 'b' }]; confirm = () => false; deleteTransaction('a')`, ctx);
  assert.equal(read(ctx, 'transactions').length, 2);
  vm.runInContext(`confirm = () => true; deleteTransaction('a')`, ctx);
  assert.deepEqual(read(ctx, 'transactions'), [{ id: 'b' }]);
});
test('native backup round trip preserves transfers, receipts and linked metadata', () => {
  const ctx = app();
  const transactions = [
    { id: 'out', type: 'transfer_out', amount: 1000, linkedTransferId: 'pair', wallet: 'A', date: '2026-10-01', note: '' },
    { id: 'in', type: 'transfer_in', amount: 1000, linkedTransferId: 'pair', wallet: 'B', date: '2026-10-01' },
    { id: 'receipt', type: 'expense', amount: 12.5, receipt: 'data:image/png;base64,abc', linkedGoalId: 'g', date: '2026-10-01' }
  ];
  restore(ctx, { transactions, wallets: [] });
  assert.deepEqual(read(ctx, 'transactions'), transactions);
  assert.deepEqual(read(ctx, 'wallets'), []);
});
test('unrecognized backup and invalid rows do not modify existing state', () => {
  const ctx = app();
  vm.runInContext(`transactions = [{id:'keep'}]; wallets = [{name:'keep'}]`, ctx);
  for (const data of [{ wallets: [] }, { transactions: [null], wallets: [] }]) {
    restore(ctx, data);
    assert.deepEqual(read(ctx, 'transactions'), [{ id: 'keep' }]);
    assert.deepEqual(read(ctx, 'wallets'), [{ name: 'keep' }]);
  }
});
test('legacy import aliases remain supported', () => {
  const ctx = app();
  restore(ctx, { transaksi: [{ tipe: 'pengeluaran', nominal: '25.000', tanggal: '2026-10-01', catatan: 'Makan' }] });
  const tx = read(ctx, 'transactions[0]');
  assert.equal(tx.type, 'expense');
  assert.equal(tx.amount, 25000);
  assert.equal(tx.note, 'Makan');
});
test('calendar date and previous month match Jakarta at midnight and year rollover', () => {
  const ctx = app();
  assert.equal(vm.runInContext(`localDateString(new Date('2026-09-30T17:30:00Z'))`, ctx), '2026-10-01');
  assert.equal(vm.runInContext(`localDateString(new Date(2026, 0, 1)).slice(0, 7)`, ctx), '2026-01');
  assert.equal(vm.runInContext(`localDateString(new Date(2026, -1, 1)).slice(0, 7)`, ctx), '2025-12');
});
test('all core workflows retain their forms, data containers and unique element IDs', () => {
  const html = fs.readFileSync(require('node:path').join(__dirname, '../index.html'), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'duplicate IDs break DOM bindings');
  for (const id of ['transactionForm', 'transferForm', 'walletForm', 'debtForm', 'goalForm', 'budgetForm', 'recurringForm', 'categoryForm', 'allTransactionsList', 'walletGrid', 'budgetGrid', 'totalBalanceDisplay', 'totalIncomeDisplay', 'totalExpenseDisplay', 'toastContainer', 'monthlyTrendChart', 'categoryPieChart']) {
    assert.ok(ids.includes(id), `missing workflow element: ${id}`);
  }
  for (const id of ['prevMonthBtn', 'nextMonthBtn']) {
    const tag = html.match(new RegExp(`<button[^>]*id="${id}"[^>]*>`))[0];
    assert.doesNotMatch(tag, /onclick=/, 'calendar navigation must execute once per click');
  }
});
