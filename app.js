/**
 * FinTrack Studio - Master Application Logic
 * Full Responsive & Collapsible Sidebar Mechanics Included
 */

// Currency Rates relative to IDR (Rupiah)
const CURRENCY_RATES = {
  IDR: 1,
  USD: 16000,
  EUR: 17500,
  SGD: 11800,
  JPY: 105,
  SAR: 4200
};

// Default Categories Database
const INITIAL_CATEGORIES = {
  expense: [
    { name: 'Hutang & Piutang', icon: 'fa-handshake', color: '#eab308', subcategories: ['Pinjaman Keluar', 'Cicilan Hutang', 'Pinjaman Masuk', 'Pelunasan Piutang'] },
    { name: 'Tabungan & Impian', icon: 'fa-piggy-bank', color: '#10b981', subcategories: ['Setoran Impian', 'Dana Darurat'] },
    { name: 'Makanan & Minuman', icon: 'fa-utensils', color: '#f43f5e', subcategories: ['Restoran & Cafe', 'Groceries / Minimarket', 'Jajan & Kopi', 'Delivery Online'] },
    { name: 'Belanja & Groceries', icon: 'fa-bag-shopping', color: '#ec4899', subcategories: ['Pakaian & Aksesoris', 'Elektronik & Gadget', 'Kebutuhan Rumah', 'Hobi & Hiburan'] },
    { name: 'Transportasi', icon: 'fa-car-side', color: '#3b82f6', subcategories: ['Bensin & Bahan Bakar', 'Servis & Perawatan', 'E-Toll & Parkir', 'Ojek Online / Taksi'] },
    { name: 'Tagihan & Utilitas', icon: 'fa-bolt', color: '#eab308', subcategories: ['Listrik PLN & Air', 'Wi-Fi & Internet', 'Pulsa & Paket Data', 'Langganan Streaming'] },
    { name: 'Kesehatan & Medis', icon: 'fa-kit-medical', color: '#10b981', subcategories: ['Obat & Vitamin', 'Dokter & Rumah Sakit', 'Asuransi Kesehatan'] },
    { name: 'Hiburan & Recreasi', icon: 'fa-gamepad', color: '#8b5cf6', subcategories: ['Tiket Bioskop', 'Liburan & Hotel', 'Game & Konsol'] },
    { name: 'Lain-lain (Pengeluaran)', icon: 'fa-receipt', color: '#64748b', subcategories: ['Umum', 'Tak Terduga'] }
  ],
  income: [
    { name: 'Gaji Bulanan', icon: 'fa-money-bill-wave', color: '#10b981', subcategories: ['Gaji Pokok', 'Tunjangan', 'Uang Lembur'] },
    { name: 'Bonus & Hadiah', icon: 'fa-gift', color: '#f59e0b', subcategories: ['THR', 'Bonus Kinerja', 'Hadiah / Cashback'] },
    { name: 'Investasi & Deviden', icon: 'fa-chart-line', color: '#6366f1', subcategories: ['Dividen Saham', 'Reksadana', 'Kripto & Emas'] },
    { name: 'Proyek Sampingan', icon: 'fa-laptop-code', color: '#8b5cf6', subcategories: ['Web Design / Code', 'Konsultasi', 'Royalti'] },
    { name: 'Lain-lain (Pemasukan)', icon: 'fa-piggy-bank', color: '#ec4899', subcategories: ['Pengembalian Utang', 'Penjualan Barang'] }
  ]
};

const DEFAULT_WALLETS = [
  { id: 'w-1', name: 'Kas / Cash', type: 'Tunai', initialBalance: 500000 },
  { id: 'w-2', name: 'Bank BCA', type: 'Bank', initialBalance: 7500000 },
  { id: 'w-3', name: 'GoPay', type: 'E-Wallet', initialBalance: 350000 },
  { id: 'w-4', name: 'Bank Mandiri', type: 'Bank', initialBalance: 3200000 }
];

const DEFAULT_BUDGETS = [
  { id: 'b-1', name: 'Makanan & Kuliner', categories: ['Makanan & Minuman'], limit: 2500000 },
  { id: 'b-2', name: 'Belanja Bulanan', categories: ['Belanja & Groceries'], limit: 1500000 },
  { id: 'b-3', name: 'Hiburan & Replikasi', categories: ['Hiburan & Recreasi'], limit: 800000 }
];

const DEFAULT_GOALS = [
  {
    id: 'g-1',
    title: 'Beli Laptop MacBook Pro',
    targetAmount: 22000000,
    currentAmount: 8500000,
    targetDate: '2026-12-31',
    deposits: [
      { id: 'dep-demo-1', amount: 5000000, date: '2026-07-01', wallet: 'Bank BCA', note: 'Setoran Awal Tabungan' },
      { id: 'dep-demo-2', amount: 3500000, date: '2026-07-15', wallet: 'Bank BCA', note: 'Bonus Proyek Freelance' }
    ]
  },
  {
    id: 'g-2',
    title: 'Dana Darurat 6 Bulan',
    targetAmount: 30000000,
    currentAmount: 18000000,
    targetDate: '2026-10-30',
    deposits: [
      { id: 'dep-demo-3', amount: 10000000, date: '2026-06-01', wallet: 'Bank BCA', note: 'Alokasi Dana Darurat Awal' },
      { id: 'dep-demo-4', amount: 8000000, date: '2026-07-10', wallet: 'Bank Mandiri', note: 'Setoran Bulanan' }
    ]
  }
];

const DEFAULT_DEBTS = [
  { id: 'd-1', type: 'piutang', person: 'Budi Santoso', totalAmount: 1500000, paidAmount: 500000, dueDate: '2026-08-15', note: 'Pinjam uang bayar servis motor' },
  { id: 'd-2', type: 'hutang', person: 'Bank BCA (Kartu Kredit)', totalAmount: 2400000, paidAmount: 1200000, dueDate: '2026-08-05', note: 'Cicilan HP Bulan ke-3' }
];

const DEFAULT_RECURRING = [
  {
    id: 'r-1',
    title: 'Tagihan Indihome / Wi-Fi',
    type: 'expense',
    amount: 450000,
    category: 'Tagihan & Utilitas',
    wallet: 'Bank BCA',
    frequency: 'Bulanan',
    history: [
      { id: 'rec-demo-1', amount: 450000, wallet: 'Bank BCA', date: '2026-06-16', note: '[Rutin] Tagihan Indihome / Wi-Fi Bulan Juni' },
      { id: 'rec-demo-2', amount: 450000, wallet: 'Bank BCA', date: '2026-07-16', note: '[Rutin] Tagihan Indihome / Wi-Fi Bulan Juli' }
    ]
  },
  {
    id: 'r-2',
    title: 'Gaji Bulanan Utama',
    type: 'income',
    amount: 8500000,
    category: 'Gaji Bulanan',
    wallet: 'Bank BCA',
    frequency: 'Bulanan',
    history: [
      { id: 'rec-demo-3', amount: 8500000, wallet: 'Bank BCA', date: '2026-06-20', note: '[Rutin] Gaji Bulanan Utama Juni' },
      { id: 'rec-demo-4', amount: 8500000, wallet: 'Bank BCA', date: '2026-07-20', note: '[Rutin] Gaji Bulanan Utama Juli' }
    ]
  }
];

// App State Persistence Check
const isAppInitialized = localStorage.getItem('fintrack_initialized') === 'true';

let transactions = JSON.parse(localStorage.getItem('fintrack_transactions'));
let wallets = JSON.parse(localStorage.getItem('fintrack_wallets'));
let budgets = JSON.parse(localStorage.getItem('fintrack_budgets'));
let categories = JSON.parse(localStorage.getItem('fintrack_categories'));
let savingsGoals = JSON.parse(localStorage.getItem('fintrack_goals'));
let debts = JSON.parse(localStorage.getItem('fintrack_debts'));
let recurringTxs = JSON.parse(localStorage.getItem('fintrack_recurring'));

let currentTheme = localStorage.getItem('fintrack_theme') || 'dark';
let isPrivacyHidden = JSON.parse(localStorage.getItem('fintrack_privacy')) || false;
let calendarCurrentDate = new Date();

// Chart Instances
let monthlyChartInstance = null;
let categoryChartInstance = null;

function ensureStateSchemaSafety() {
  if (!transactions || !Array.isArray(transactions)) transactions = [];
  if (!wallets || !Array.isArray(wallets)) {
    wallets = !isAppInitialized ? JSON.parse(JSON.stringify(DEFAULT_WALLETS)) : [];
  }
  if (!budgets || !Array.isArray(budgets)) {
    budgets = !isAppInitialized ? JSON.parse(JSON.stringify(DEFAULT_BUDGETS)) : [];
  }
  if (!categories || typeof categories !== 'object' || !categories.expense || !categories.income) categories = JSON.parse(JSON.stringify(INITIAL_CATEGORIES));
  if (!savingsGoals || !Array.isArray(savingsGoals)) savingsGoals = [];
  if (!debts || !Array.isArray(debts)) debts = [];
  if (!recurringTxs || !Array.isArray(recurringTxs)) recurringTxs = [];

  // Auto-migrate legacy budget objects
  budgets = budgets.map((b, idx) => {
    if (!b) return { id: 'b-' + idx, name: 'Makanan & Kuliner', categories: ['Makanan & Minuman'], limit: 2500000 };
    if (!b.categories && b.category) {
      return { id: b.id || ('b-' + idx), name: b.category, categories: [b.category], limit: b.limit || 1000000 };
    }
    if (!b.categories || !Array.isArray(b.categories)) {
      return { id: b.id || ('b-' + idx), name: b.name || 'Anggaran', categories: ['Makanan & Minuman'], limit: b.limit || 1000000 };
    }
    return b;
  });

  // Ensure savingsGoals deposits safety
  savingsGoals = savingsGoals.map((g, idx) => {
    if (!g) return { id: 'g-' + idx, title: 'Target', targetAmount: 1000000, currentAmount: 0, targetDate: '2026-12-31', deposits: [] };
    if (!g.deposits || !Array.isArray(g.deposits)) g.deposits = [];
    return g;
  });

  // Ensure debts payments safety
  debts = debts.map((d, idx) => {
    if (!d) return { id: 'd-' + idx, type: 'hutang', person: 'Umum', totalAmount: 1000000, paidAmount: 0, dueDate: '2026-12-31', note: '', wallet: 'Bank BCA', payments: [] };
    if (!d.payments || !Array.isArray(d.payments)) d.payments = [];
    return d;
  });

  // Ensure recurringTxs history safety
  recurringTxs = recurringTxs.map((r, idx) => {
    if (!r) return { id: 'r-' + idx, title: 'Rutin', type: 'expense', amount: 100000, category: 'Lain-lain (Pengeluaran)', wallet: 'Bank BCA', frequency: 'Bulanan', history: [] };
    if (!r.history || !Array.isArray(r.history)) r.history = [];
    return r;
  });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  try { initTheme(); } catch(e) { console.warn('initTheme error:', e); }

  // Register PWA Service Worker for Android Installation & Offline Cache
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('PWA ServiceWorker ready:', reg.scope))
      .catch(err => console.warn('PWA ServiceWorker failed:', err));
  }

  try {
    if (!isAppInitialized) {
      window.loadDemoData(false);
      localStorage.setItem('fintrack_initialized', 'true');
    } else {
      ensureStateSchemaSafety();
    }
  } catch(e) { console.warn('state init error:', e); }

  try { checkPinLockStatus(); } catch(e) { console.warn('checkPinLockStatus error:', e); }
  try { updatePinBtnUI(); } catch(e) { console.warn('updatePinBtnUI error:', e); }
  try { updatePrivacyUI(); } catch(e) { console.warn('updatePrivacyUI error:', e); }
  try { setupNavigation(); } catch(e) { console.warn('setupNavigation error:', e); }
  try { setupSidebarToggles(); } catch(e) { console.warn('setupSidebarToggles error:', e); }

  // setupEventListeners HARUS selalu berhasil
  try { setupEventListeners(); } catch(e) { console.error('setupEventListeners error:', e); }

  try { setupCurrencyInputs(); } catch(e) { console.warn('setupCurrencyInputs error:', e); }
  try { populateDropdowns(); } catch(e) { console.warn('populateDropdowns error:', e); }
  try { renderAllViews(); } catch(e) { console.warn('renderAllViews error:', e); }

  window.addEventListener('resize', () => {
    try {
      if (monthlyChartInstance) monthlyChartInstance.resize();
      if (categoryChartInstance) categoryChartInstance.resize();
    } catch(e) {}
  });
});

// PWA Installation Manager
let deferredPwaPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;
  const pwaContainer = document.getElementById('pwaInstallContainer');
  if (pwaContainer) {
    pwaContainer.style.display = 'block';
  }
});

window.installPWAApp = function() {
  if (!deferredPwaPrompt) {
    if (typeof showToast === 'function') {
      showToast('Buka menu Chrome di HP Android lalu pilih "Tambahkan ke Layar Utama" (Add to Home Screen).', 'info');
    } else {
      alert('Buka menu Chrome di HP Android lalu pilih "Tambahkan ke Layar Utama" (Add to Home Screen).');
    }
    return;
  }
  deferredPwaPrompt.prompt();
  deferredPwaPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      if (typeof showToast === 'function') showToast('Aplikasi FinTrack Studio berhasil diinstall di HP Android Anda!', 'success');
      const pwaContainer = document.getElementById('pwaInstallContainer');
      if (pwaContainer) pwaContainer.style.display = 'none';
    }
    deferredPwaPrompt = null;
  });
};

// Thousand Separator Real-time Formatting Helpers
function formatNumberWithDots(val) {
  if (val === null || val === undefined || val === '') return '';
  const clean = val.toString().replace(/\D/g, '');
  if (!clean) return '';
  return new Intl.NumberFormat('id-ID').format(clean);
}

function parseFormattedNumber(val) {
  if (!val) return 0;
  const clean = val.toString().replace(/\D/g, '');
  return parseFloat(clean) || 0;
}

function setupCurrencyInputs() {
  document.querySelectorAll('.currency-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const formatted = formatNumberWithDots(e.target.value);
      e.target.value = formatted;
    });
  });
}

// Collapsible & Mobile Sidebar Setup (Unifikasi Tombol Garis 3 Navbar)
window.toggleMobileSidebar = function(forceClose = false) {
  const sidebar = document.getElementById('appSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!sidebar || !overlay) return;

  if (window.innerWidth >= 1024) {
    sidebar.classList.toggle('collapsed');
  } else {
    if (forceClose) {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    } else {
      const isOpen = sidebar.classList.contains('mobile-open');
      if (isOpen) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
      } else {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
      }
    }
  }
};

function setupSidebarToggles() {
  const overlay = document.getElementById('sidebarOverlay');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');

  if (mobileMenuBtn) {
    mobileMenuBtn.onclick = function(e) {
      if (e) e.stopPropagation();
      window.toggleMobileSidebar();
    };
  }

  if (overlay) {
    overlay.onclick = function() {
      window.toggleMobileSidebar(true);
    };
  }
}

// Global Demo Data Loader
window.loadDemoData = function(notify = true) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const currentDay = today.getDate();

  const getTodayMonthDateStr = (dayNum) => {
    const dayStr = String(Math.min(28, Math.max(1, dayNum))).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  wallets = JSON.parse(JSON.stringify(DEFAULT_WALLETS));
  budgets = JSON.parse(JSON.stringify(DEFAULT_BUDGETS));
  categories = JSON.parse(JSON.stringify(INITIAL_CATEGORIES));
  savingsGoals = JSON.parse(JSON.stringify(DEFAULT_GOALS));
  debts = JSON.parse(JSON.stringify(DEFAULT_DEBTS));
  recurringTxs = JSON.parse(JSON.stringify(DEFAULT_RECURRING));

  transactions = [
    { id: 'tx-1', type: 'income', amount: 8500000, category: 'Gaji Bulanan', subCategory: 'Gaji Pokok', wallet: 'Bank BCA', date: getTodayMonthDateStr(Math.max(1, currentDay - 2)), note: 'Gaji Bulanan Utama', tags: '#Gaji #Utama', currency: 'IDR' },
    { id: 'tx-2', type: 'expense', amount: 150000, category: 'Makanan & Minuman', subCategory: 'Restoran & Cafe', wallet: 'GoPay', date: getTodayMonthDateStr(Math.max(1, currentDay - 1)), note: 'Makan Malam Resto', tags: '#Kuliner', currency: 'IDR' },
    { id: 'tx-3', type: 'expense', amount: 650000, category: 'Belanja & Groceries', subCategory: 'Kebutuhan Rumah', wallet: 'Bank BCA', date: getTodayMonthDateStr(Math.max(1, currentDay - 3)), note: 'Belanja Bulanan Supermarket', tags: '#Groceries', currency: 'IDR' },
    { id: 'tx-4', type: 'expense', amount: 250000, category: 'Transportasi', subCategory: 'E-Toll & Parkir', wallet: 'GoPay', date: getTodayMonthDateStr(Math.max(1, currentDay - 4)), note: 'Isi Saldo E-Toll & Bensin', tags: '#Komuter', currency: 'IDR' },
    { id: 'tx-5', type: 'income', amount: 1200000, category: 'Proyek Sampingan', subCategory: 'Web Design / Code', wallet: 'Bank Mandiri', date: getTodayMonthDateStr(Math.max(1, currentDay - 5)), note: 'DP Project Web Design', tags: '#Freelance #ProjectX', currency: 'IDR' },
    { id: 'tx-6', type: 'expense', amount: 450000, category: 'Tagihan & Utilitas', subCategory: 'Wi-Fi & Internet', wallet: 'Bank BCA', date: getTodayMonthDateStr(Math.max(1, currentDay - 6)), note: 'Tagihan Wi-Fi & Listrik PLN', tags: '#Tagihan', currency: 'IDR' },
    { id: 'tx-7', type: 'expense', amount: 180000, category: 'Hiburan & Recreasi', subCategory: 'Tiket Bioskop', wallet: 'Kas / Cash', date: getTodayMonthDateStr(Math.max(1, currentDay - 7)), note: 'Tiket Bioskop & Snack', tags: '#Weekend', currency: 'IDR' },
    { id: 'tx-8', type: 'expense', amount: 350000, category: 'Makanan & Minuman', subCategory: 'Jajan & Kopi', wallet: 'GoPay', date: getTodayMonthDateStr(Math.max(1, currentDay - 8)), note: 'Jajan Kopi & Utensils', tags: '#Nongkrong', currency: 'IDR' }
  ];

  if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
  if (document.getElementById('typeFilter')) document.getElementById('typeFilter').value = 'all';
  if (document.getElementById('categoryFilter')) document.getElementById('categoryFilter').value = 'all';
  if (document.getElementById('dateRangeFilter')) document.getElementById('dateRangeFilter').value = 'this-month';

  saveState();
  populateDropdowns();
  renderAllViews();

  if (notify) {
    showToast('Data demo & seluruh fitur berhasil dimuat!', 'success');
  }
};

window.clearAllDatabaseData = function() {
  transactions = [];
  wallets = [];
  budgets = [];
  savingsGoals = [];
  debts = [];
  recurringTxs = [];
  categories = JSON.parse(JSON.stringify(INITIAL_CATEGORIES));

  localStorage.setItem('fintrack_transactions', JSON.stringify([]));
  localStorage.setItem('fintrack_wallets', JSON.stringify([]));
  localStorage.setItem('fintrack_budgets', JSON.stringify([]));
  localStorage.setItem('fintrack_categories', JSON.stringify(categories));
  localStorage.setItem('fintrack_goals', JSON.stringify([]));
  localStorage.setItem('fintrack_debts', JSON.stringify([]));
  localStorage.setItem('fintrack_recurring', JSON.stringify([]));
  localStorage.setItem('fintrack_initialized', 'true');

  closeModal('backupModal');
  populateDropdowns();
  renderAllViews();
  showToast('Seluruh database dan saldo berhasil dikosongkan (Rp 0).', 'danger');
};

// State Persistence
function saveState() {
  ensureStateSchemaSafety();
  localStorage.setItem('fintrack_transactions', JSON.stringify(transactions));
  localStorage.setItem('fintrack_wallets', JSON.stringify(wallets));
  localStorage.setItem('fintrack_budgets', JSON.stringify(budgets));
  localStorage.setItem('fintrack_categories', JSON.stringify(categories));
  localStorage.setItem('fintrack_goals', JSON.stringify(savingsGoals));
  localStorage.setItem('fintrack_debts', JSON.stringify(debts));
  localStorage.setItem('fintrack_recurring', JSON.stringify(recurringTxs));
  localStorage.setItem('fintrack_privacy', JSON.stringify(isPrivacyHidden));
  localStorage.setItem('fintrack_theme', currentTheme);
  localStorage.setItem('fintrack_initialized', 'true');
}

// Privacy Mode Manager
window.togglePrivacyMode = function() {
  isPrivacyHidden = !isPrivacyHidden;
  localStorage.setItem('fintrack_privacy', JSON.stringify(isPrivacyHidden));
  window.updatePrivacyUI();
  if (typeof showToast === 'function') {
    showToast(isPrivacyHidden ? 'Saldo disembunyikan (Mode Privasi Aktif)' : 'Saldo ditampilkan', 'info');
  }
};

window.updatePrivacyUI = function() {
  const privacyIcon = document.getElementById('privacyIcon');
  const privacyLabel = document.getElementById('privacyLabel');
  const targets = document.querySelectorAll('.privacy-target');

  if (isPrivacyHidden) {
    if (privacyIcon) privacyIcon.className = 'fa-solid fa-eye-slash';
    if (privacyLabel) privacyLabel.innerText = 'Sembunyi';
    targets.forEach(t => t.classList.add('privacy-hidden'));
  } else {
    if (privacyIcon) privacyIcon.className = 'fa-solid fa-eye';
    if (privacyLabel) privacyLabel.innerText = 'Privasi';
    targets.forEach(t => t.classList.remove('privacy-hidden'));
  }
};

// Theme Manager
function initTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeBtnUI();
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('fintrack_theme', currentTheme);
  updateThemeBtnUI();
  renderCharts();
}

function updateThemeBtnUI() {
  const themeLabel = document.getElementById('themeLabel');
  if (currentTheme === 'dark') {
    themeLabel.innerHTML = '<i class="fa-solid fa-moon"></i> Mode Gelap';
  } else {
    themeLabel.innerHTML = '<i class="fa-solid fa-sun"></i> Mode Terang';
  }
}

// Currency & Date Formatting
function formatRupiah(amount) {
  if (isPrivacyHidden) return 'Rp ••••••••';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDateIndo(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getCategoryMeta(catName) {
  if (!catName) return { name: 'Umum', icon: 'fa-tag', color: '#6366f1', subcategories: [] };
  let found = (categories && categories.expense) ? categories.expense.find(c => c.name === catName) : null;
  if (found) return found;
  found = (categories && categories.income) ? categories.income.find(c => c.name === catName) : null;
  if (found) return found;
  return { name: catName, icon: 'fa-tag', color: '#6366f1', subcategories: [] };
}

// Navigation Tabs Manager
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  const sidebar = document.getElementById('appSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  const pageHeadings = {
    dashboard: { title: 'Dashboard Keuangan', sub: 'Pantau ringkasan saldo, statistik, dan analisis kesehatan keuangan Anda' },
    transactions: { title: 'Daftar Transaksi', sub: 'Kelola, cari, dan filter seluruh rekam pencatatan keuangan' },
    calendar: { title: 'Kalender Keuangan Bulanan', sub: 'Pantau riwayat pemasukan dan pengeluaran harian dalam tampilan kalender' },
    goals: { title: 'Target Tabungan & Impian', sub: 'Rencanakan pencapaian keuangan dan tabungan masa depan' },
    debts: { title: 'Pencatatan Hutang & Piutang', sub: 'Kelola uang pinjaman dan piutang teman/keluarga' },
    recurring: { title: 'Transaksi Rutin & Berulang', sub: 'Otomatiskan pencatatan tagihan bulanan dan gaji' },
    calculators: { title: 'Kalkulator Keuangan', sub: 'Hitung kewajiban Zakat Maal dan estimasi simulasi cicilan KPR / Kredit' },
    budgets: { title: 'Anggaran & Target', sub: 'Kendalikan pengeluaran dengan batas budget bulanan' },
    categories: { title: 'Manajemen Kategori & Sub-Kategori', sub: 'Kelola hierarki kategori pengeluaran dan pemasukan' },
    wallets: { title: 'Dompet & Laporan', sub: 'Atur rekening bank, e-wallet, serta ekspor/impor data' }
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');

      navItems.forEach(n => n.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(tabId).classList.add('active');

      if (pageHeadings[tabId]) {
        document.getElementById('pageTitleHeading').innerText = pageHeadings[tabId].title;
        document.getElementById('pageSubTitle').innerText = pageHeadings[tabId].sub;
      }

      if (window.innerWidth < 1024) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
      }

      setTimeout(() => renderCharts(), 50);
    });
  });

  document.getElementById('viewAllTxBtn')?.addEventListener('click', () => {
    document.querySelector('[data-tab="transactions"]').click();
  });
}

function safeAddEventListener(id, event, handler) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener(event, handler);
  }
}

// Event Listeners Setup
function setupEventListeners() {
  safeAddEventListener('themeToggleBtn', 'click', toggleTheme);
  safeAddEventListener('privacyToggleBtn', 'click', window.togglePrivacyMode);

  // Calendar Navigation
  safeAddEventListener('prevMonthBtn', 'click', () => {
    calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() - 1);
    renderCalendarView();
  });
  safeAddEventListener('nextMonthBtn', 'click', () => {
    calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + 1);
    renderCalendarView();
  });

  // Modals Open/Close
  safeAddEventListener('openAddTransactionBtn', 'click', () => openTxModal());
  safeAddEventListener('closeTxModalBtn', 'click', closeTxModal);
  safeAddEventListener('cancelTxBtn', 'click', closeTxModal);

  safeAddEventListener('openAddGoalBtn', 'click', () => openModal('goalModal'));
  safeAddEventListener('closeGoalModalBtn', 'click', () => closeModal('goalModal'));
  safeAddEventListener('cancelGoalBtn', 'click', () => closeModal('goalModal'));
  safeAddEventListener('closeGoalDepositModalBtn', 'click', () => closeModal('goalDepositModal'));
  safeAddEventListener('cancelGoalDepositBtn', 'click', () => closeModal('goalDepositModal'));
  safeAddEventListener('closeGoalWithdrawModalBtn', 'click', () => closeModal('goalWithdrawModal'));
  safeAddEventListener('cancelGoalWithdrawBtn', 'click', () => closeModal('goalWithdrawModal'));
  safeAddEventListener('closeGoalHistoryModalBtn', 'click', () => closeModal('goalHistoryModal'));
  safeAddEventListener('cancelGoalHistoryBtn', 'click', () => closeModal('goalHistoryModal'));

  safeAddEventListener('openAddDebtBtn', 'click', () => openDebtModal());
  safeAddEventListener('closeDebtModalBtn', 'click', () => closeModal('debtModal'));
  safeAddEventListener('cancelDebtBtn', 'click', () => closeModal('debtModal'));
  safeAddEventListener('closeDebtPayModalBtn', 'click', () => closeModal('debtPayModal'));
  safeAddEventListener('cancelDebtPayBtn', 'click', () => closeModal('debtPayModal'));
  safeAddEventListener('closeDebtHistoryModalBtn', 'click', () => closeModal('debtHistoryModal'));
  safeAddEventListener('cancelDebtHistoryBtn', 'click', () => closeModal('debtHistoryModal'));

  safeAddEventListener('openAddRecurringBtn', 'click', () => openRecurringModal());
  safeAddEventListener('closeRecurringModalBtn', 'click', () => closeModal('recurringModal'));
  safeAddEventListener('cancelRecurringBtn', 'click', () => closeModal('recurringModal'));
  safeAddEventListener('closeRecurringHistoryModalBtn', 'click', () => closeModal('recurringHistoryModal'));
  safeAddEventListener('cancelRecurringHistoryBtn', 'click', () => closeModal('recurringHistoryModal'));

  safeAddEventListener('openAddWalletBtn', 'click', () => openModal('walletModal'));
  safeAddEventListener('closeWalletModalBtn', 'click', () => closeModal('walletModal'));
  safeAddEventListener('cancelWalletBtn', 'click', () => closeModal('walletModal'));

  safeAddEventListener('openAddBudgetBtn', 'click', () => openBudgetModal());
  safeAddEventListener('closeBudgetModalBtn', 'click', () => closeModal('budgetModal'));
  safeAddEventListener('cancelBudgetBtn', 'click', () => closeModal('budgetModal'));
  safeAddEventListener('closeBudgetDetailModalBtn', 'click', () => closeModal('budgetDetailModal'));
  safeAddEventListener('cancelBudgetDetailBtn', 'click', () => closeModal('budgetDetailModal'));
  safeAddEventListener('closeBudgetCategoriesPreviewModalBtn', 'click', () => closeModal('budgetCategoriesPreviewModal'));
  safeAddEventListener('cancelBudgetCategoriesPreviewBtn', 'click', () => closeModal('budgetCategoriesPreviewModal'));

  safeAddEventListener('openAddCategoryModalBtn', 'click', () => openCatModal());
  safeAddEventListener('closeCatModalBtn', 'click', () => closeModal('categoryModal'));
  safeAddEventListener('cancelCatBtn', 'click', () => closeModal('categoryModal'));
  safeAddEventListener('catActionType', 'change', () => updateCategoryModalUI());
  safeAddEventListener('catTargetType', 'change', () => {
    populateParentCategoryDropdown();
    updateCategoryModalUI();
  });

  safeAddEventListener('openBackupModalBtn', 'click', () => openModal('backupModal'));
  safeAddEventListener('closeBackupModalBtn', 'click', () => closeModal('backupModal'));

  // Transaction Modal Cascade
  safeAddEventListener('txCategory', 'change', (e) => {
    const isExpense = document.getElementById('typeExpenseBtn') ? document.getElementById('typeExpenseBtn').classList.contains('active') : true;
    populateSubCategoryDropdown(e.target.value, isExpense ? 'expense' : 'income');
  });

  // Type Toggle Buttons
  const typeExpenseBtn = document.getElementById('typeExpenseBtn');
  const typeIncomeBtn = document.getElementById('typeIncomeBtn');

  if (typeExpenseBtn && typeIncomeBtn) {
    typeExpenseBtn.addEventListener('click', () => {
      typeExpenseBtn.className = 'type-btn active expense';
      typeIncomeBtn.className = 'type-btn income';
      populateCategoryDropdown('expense');
    });

    typeIncomeBtn.addEventListener('click', () => {
      typeIncomeBtn.className = 'type-btn active income';
      typeExpenseBtn.className = 'type-btn expense';
      populateCategoryDropdown('income');
    });
  }

  // Forms Submissions
  safeAddEventListener('transactionForm', 'submit', handleTxSubmit);
  safeAddEventListener('goalForm', 'submit', handleGoalSubmit);
  safeAddEventListener('goalDepositForm', 'submit', handleGoalDepositSubmit);
  safeAddEventListener('goalWithdrawForm', 'submit', handleGoalWithdrawSubmit);
  safeAddEventListener('debtForm', 'submit', handleDebtSubmit);
  safeAddEventListener('debtPayForm', 'submit', handleDebtPaySubmit);
  safeAddEventListener('recurringForm', 'submit', handleRecurringSubmit);
  safeAddEventListener('walletForm', 'submit', handleWalletSubmit);
  safeAddEventListener('budgetForm', 'submit', handleBudgetSubmit);
  safeAddEventListener('categoryForm', 'submit', handleCategorySubmit);

  // Calculators Submissions
  safeAddEventListener('zakatForm', 'submit', handleZakatSubmit);
  safeAddEventListener('kprForm', 'submit', handleKprSubmit);
  safeAddEventListener('pinjolForm', 'submit', handlePinjolSubmit);
  safeAddEventListener('ccForm', 'submit', handleCcSubmit);
  safeAddEventListener('vehicleForm', 'submit', handleVehicleSubmit);

  // Filters & Search
  safeAddEventListener('searchInput', 'input', renderTransactionsList);
  safeAddEventListener('typeFilter', 'change', renderTransactionsList);
  safeAddEventListener('categoryFilter', 'change', renderTransactionsList);
  safeAddEventListener('dateRangeFilter', 'change', renderTransactionsList);
  safeAddEventListener('catTypeFilter', 'change', renderCategoryManagerView);

  safeAddEventListener('resetFiltersBtn', 'click', () => {
    if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
    if (document.getElementById('typeFilter')) document.getElementById('typeFilter').value = 'all';
    if (document.getElementById('categoryFilter')) document.getElementById('categoryFilter').value = 'all';
    if (document.getElementById('dateRangeFilter')) document.getElementById('dateRangeFilter').value = 'this-month';
    renderTransactionsList();
  });

  // Data Demo & Reset (Terpusat di Modal Backup)
  safeAddEventListener('loadDemoDataBtn', 'click', () => {
    window.loadDemoData(true);
    closeModal('backupModal');
  });

  safeAddEventListener('clearAllDataBtn', 'click', () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan SELURUH database keuangan? Tindakan ini tidak dapat dibatalkan.')) {
      transactions = []; wallets = []; budgets = []; savingsGoals = []; debts = []; recurringTxs = [];
      categories = JSON.parse(JSON.stringify(INITIAL_CATEGORIES));
      saveState();
      renderAllViews();
      closeModal('backupModal');
      showToast('Seluruh database berhasil dikosongkan.', 'danger');
    }
  });

  // Export / Import
  safeAddEventListener('exportCsvBtn', 'click', exportToCSV);
  safeAddEventListener('exportJsonBtn', 'click', exportToJSON);
  safeAddEventListener('importJsonInput', 'change', importFromJSON);
}

// Modal Helpers
function openModal(id) { const el = document.getElementById(id); if (el) el.classList.add('active'); }
function closeModal(id) { const el = document.getElementById(id); if (el) el.classList.remove('active'); }
function closeTxModal() { closeModal('transactionModal'); }

function openTxModal(tx = null, defaultDate = null) {
  const form = document.getElementById('transactionForm');
  form.reset();
  const typeExpenseBtn = document.getElementById('typeExpenseBtn');
  const typeIncomeBtn = document.getElementById('typeIncomeBtn');

  if (tx) {
    document.getElementById('modalTxTitle').innerText = 'Edit Transaksi';
    document.getElementById('txId').value = tx.id;
    document.getElementById('txAmount').value = formatNumberWithDots(tx.amount);
    document.getElementById('txCurrency').value = tx.currency || 'IDR';
    document.getElementById('txDate').value = tx.date;
    document.getElementById('txNote').value = tx.note || '';
    document.getElementById('txTags').value = tx.tags || '';

    if (tx.type === 'income') {
      typeIncomeBtn.className = 'type-btn active income';
      typeExpenseBtn.className = 'type-btn expense';
      populateCategoryDropdown('income');
    } else {
      typeExpenseBtn.className = 'type-btn active expense';
      typeIncomeBtn.className = 'type-btn income';
      populateCategoryDropdown('expense');
    }

    document.getElementById('txCategory').value = tx.category;
    populateSubCategoryDropdown(tx.category, tx.type);
    document.getElementById('txSubCategory').value = tx.subCategory || '';
    document.getElementById('txWallet').value = tx.wallet;

    if (tx.receipt) {
      document.getElementById('txReceiptData').value = tx.receipt;
      const imgPreview = document.getElementById('txReceiptPreviewImg');
      const container = document.getElementById('txReceiptPreviewContainer');
      if (imgPreview && container) {
        imgPreview.src = tx.receipt;
        container.style.display = 'block';
      }
    } else {
      window.removeReceiptPhoto();
    }
  } else {
    document.getElementById('modalTxTitle').innerText = 'Tambah Transaksi';
    document.getElementById('txId').value = '';
    document.getElementById('txCurrency').value = 'IDR';
    document.getElementById('txDate').value = defaultDate || new Date().toISOString().split('T')[0];
    typeExpenseBtn.className = 'type-btn active expense';
    typeIncomeBtn.className = 'type-btn income';
    populateCategoryDropdown('expense');
    window.removeReceiptPhoto();
  }

  openModal('transactionModal');
}

function updateCategoryModalUI() {
  const actionType = document.getElementById('catActionType') ? document.getElementById('catActionType').value : 'main';
  const parentGroup = document.getElementById('parentCatGroup');
  const nameLabel = document.getElementById('newCatNameLabel');
  const nameInput = document.getElementById('newCatNameInput');
  const iconGroup = document.getElementById('mainCatIconGroup');

  if (actionType === 'main') {
    if (parentGroup) parentGroup.style.display = 'none';
    if (nameLabel) nameLabel.innerText = 'Nama Kategori Utama Baru';
    if (nameInput) nameInput.placeholder = 'Contoh: Olahraga / Pendidikan';
    if (iconGroup) iconGroup.style.display = 'grid';
  } else {
    if (parentGroup) parentGroup.style.display = 'block';
    if (nameLabel) nameLabel.innerText = 'Nama Sub-Kategori Baru';
    if (nameInput) nameInput.placeholder = 'Contoh: Kopi / Snack';
    if (iconGroup) iconGroup.style.display = 'none';
    populateParentCategoryDropdown();
  }
}

function openCatModal() {
  document.getElementById('categoryForm').reset();
  updateCategoryModalUI();
  populateParentCategoryDropdown();
  openModal('categoryModal');
}

function openRecurringModal() {
  const recCat = document.getElementById('recCategorySelect');
  recCat.innerHTML = '';
  [...categories.expense, ...categories.income].forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = c.name;
    recCat.appendChild(opt);
  });

  const recWallet = document.getElementById('recWalletSelect');
  recWallet.innerHTML = '';
  wallets.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.name;
    opt.textContent = w.name;
    recWallet.appendChild(opt);
  });

  openModal('recurringModal');
}

// Populate Dropdowns
function populateDropdowns() {
  populateCategoryDropdown('expense');

  const catFilter = document.getElementById('categoryFilter');
  if (catFilter) {
    catFilter.innerHTML = '<option value="all">Semua Kategori Utama</option>';
    [...categories.expense, ...categories.income].forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.textContent = c.name;
      catFilter.appendChild(opt);
    });
  }

  const txWallet = document.getElementById('txWallet');
  if (txWallet) {
    txWallet.innerHTML = '';
    (wallets || []).forEach(w => {
      const opt1 = document.createElement('option');
      opt1.value = w.name;
      opt1.textContent = `${w.name} (${w.type})`;
      txWallet.appendChild(opt1);
    });
  }
}

function populateCategoryDropdown(type) {
  const select = document.getElementById('txCategory');
  if (!select) return;
  select.innerHTML = '';
  const list = type === 'income' ? (categories.income || []) : (categories.expense || []);
  list.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = c.name;
    select.appendChild(opt);
  });

  if (list.length > 0) {
    populateSubCategoryDropdown(list[0].name, type);
  }
}

function populateSubCategoryDropdown(categoryName, type) {
  const subSelect = document.getElementById('txSubCategory');
  if (!subSelect) return;
  subSelect.innerHTML = '';

  const list = type === 'income' ? (categories.income || []) : (categories.expense || []);
  const found = list.find(c => c.name === categoryName);

  if (found && found.subcategories && found.subcategories.length > 0) {
    found.subcategories.forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub;
      opt.textContent = sub;
      subSelect.appendChild(opt);
    });
  } else {
    const opt = document.createElement('option');
    opt.value = 'Umum';
    opt.textContent = 'Umum';
    subSelect.appendChild(opt);
  }
}

function populateParentCategoryDropdown() {
  const typeEl = document.getElementById('catTargetType');
  const parentSelect = document.getElementById('parentCatSelect');
  if (!typeEl || !parentSelect) return;
  const type = typeEl.value;
  parentSelect.innerHTML = '';

  const list = type === 'income' ? categories.income : categories.expense;
  list.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = c.name;
    parentSelect.appendChild(opt);
  });
}

// Smart Financial Alerts Analyzer
function renderSmartAlerts() {
  const container = document.getElementById('smartAlertsContainer');
  let alertHtml = '';
  const currentMonthStr = new Date().toISOString().slice(0, 7);

  const today = new Date();
  (debts || []).forEach(d => {
    const sisa = d.totalAmount - d.paidAmount;
    if (sisa > 0 && d.dueDate) {
      const due = new Date(d.dueDate);
      const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

      if (diffDays <= 3) {
        alertHtml += `
          <div class="smart-alert-banner warning">
            <span><i class="fa-solid fa-clock"></i> <b>Pengingat Jatuh Tempo:</b> ${d.type === 'hutang' ? 'Hutang' : 'Piutang'} ${d.person} sebesar ${formatRupiah(sisa)} jatuh tempo ${diffDays < 0 ? 'SUDAH LEWAT!' : `dalam ${diffDays} hari.`}</span>
            <button type="button" class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;" onclick="document.querySelector('[data-tab=\\'debts\\']').click()">Lihat</button>
          </div>
        `;
      }
    }
  });

  (budgets || []).forEach(b => {
    const spent = (transactions || [])
      .filter(t => t.type === 'expense' && t.category === b.category && t.date && t.date.startsWith(currentMonthStr))
      .reduce((sum, t) => sum + t.amount, 0);

    const pct = Math.round((spent / b.limit) * 100);
    if (pct >= 85) {
      alertHtml += `
        <div class="smart-alert-banner danger">
          <span><i class="fa-solid fa-triangle-exclamation"></i> <b>Peringatan Anggaran:</b> Kategori <b>"${b.category}"</b> sudah terpakai ${pct}% (${formatRupiah(spent)} / ${formatRupiah(b.limit)}).</span>
          <button type="button" class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;" onclick="document.querySelector('[data-tab=\\'budgets\\']').click()">Kelola</button>
        </div>
      `;
    }
  });

  container.innerHTML = alertHtml;
}

// Month-over-Month Comparison Card
function renderMonthComparisonCard() {
  const container = document.getElementById('monthComparisonContainer');

  const now = new Date();
  const currentMonthStr = now.toISOString().slice(0, 7);
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = lastMonthDate.toISOString().slice(0, 7);

  let thisExp = 0, lastExp = 0;

  (transactions || []).forEach(t => {
    if (t.date) {
      if (t.date.startsWith(currentMonthStr)) {
        if (t.type === 'expense') thisExp += t.amount;
      } else if (t.date.startsWith(lastMonthStr)) {
        if (t.type === 'expense') lastExp += t.amount;
      }
    }
  });

  const expDiff = thisExp - lastExp;
  const expPct = lastExp > 0 ? Math.round((expDiff / lastExp) * 100) : 0;

  let expStatusHtml = '';
  if (expDiff < 0) {
    expStatusHtml = `<span style="color: var(--income); font-weight: 800;"><i class="fa-solid fa-arrow-down"></i> ${Math.abs(expPct)}% Lebih Hemat</span> dibanding bulan lalu.`;
  } else if (expDiff > 0) {
    expStatusHtml = `<span style="color: var(--expense); font-weight: 800;"><i class="fa-solid fa-arrow-up"></i> ${expPct}% Lebih Boros</span> dibanding bulan lalu.`;
  } else {
    expStatusHtml = `<span style="color: var(--text-muted); font-weight: 800;">Sama</span> dengan bulan lalu.`;
  }

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-glass); border-radius: var(--radius-md); margin-bottom: 12px; gap: 10px; flex-wrap: wrap;">
      <div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">Pengeluaran Bulan Lalu:</div>
        <div style="font-weight: 800; font-size: 1.05rem; color: var(--text-main);">${formatRupiah(lastExp)}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 0.8rem; color: var(--text-muted);">Pengeluaran Bulan Ini:</div>
        <div style="font-weight: 800; font-size: 1.05rem; color: var(--expense);">${formatRupiah(thisExp)}</div>
      </div>
    </div>
    <div style="font-size: 0.85rem; font-weight: 600;">
      <i class="fa-solid fa-chart-line"></i> Summary: ${expStatusHtml}
    </div>
  `;
}

// Financial Calendar Renderer
function renderCalendarView() {
  const container = document.getElementById('calendarGrid');
  const title = document.getElementById('calendarMonthTitle');

  const year = calendarCurrentDate.getFullYear();
  const month = calendarCurrentDate.getMonth();

  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  title.innerText = `${monthNames[month]} ${year}`;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  let html = '';

  for (let i = 0; i < firstDayIndex; i++) {
    html += `<div class="calendar-cell empty"></div>`;
  }

  const todayStr = new Date().toISOString().split('T')[0];

  for (let day = 1; day <= totalDays; day++) {
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = dayStr === todayStr;

    let dayInc = 0, dayExp = 0;
    (transactions || []).filter(t => t.date === dayStr).forEach(t => {
      if (t.type === 'income') dayInc += t.amount;
      else dayExp += t.amount;
    });

    html += `
      <div class="calendar-cell ${isToday ? 'today' : ''}" onclick="filterTxByCalendarDate('${dayStr}')">
        <div class="calendar-date-num">${day}</div>
        <div class="calendar-day-summary">
          ${dayInc > 0 ? `<div class="inc">+ ${formatRupiah(dayInc)}</div>` : ''}
          ${dayExp > 0 ? `<div class="exp">- ${formatRupiah(dayExp)}</div>` : ''}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

// Fixed Calendar Date Filter Navigation
window.filterTxByCalendarDate = function(dateStr) {
  document.getElementById('typeFilter').value = 'all';
  document.getElementById('categoryFilter').value = 'all';
  document.getElementById('dateRangeFilter').value = 'all';
  document.getElementById('searchInput').value = dateStr;

  document.querySelector('[data-tab="transactions"]').click();
  renderTransactionsList();

  showToast(`Menampilkan transaksi tanggal ${formatDateIndo(dateStr)}`, 'info');
};

// Form Handlers
function handleTxSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('txId').value;
  const isExpenseActive = document.getElementById('typeExpenseBtn').classList.contains('active');
  const type = isExpenseActive ? 'expense' : 'income';
  
  const rawAmount = parseFormattedNumber(document.getElementById('txAmount').value);
  const currency = document.getElementById('txCurrency').value || 'IDR';
  const rate = CURRENCY_RATES[currency] || 1;
  const amountInIDR = Math.round(rawAmount * rate);

  const category = document.getElementById('txCategory').value;
  const subCategory = document.getElementById('txSubCategory').value || 'Umum';
  const wallet = document.getElementById('txWallet').value;
  const date = document.getElementById('txDate').value;
  const note = document.getElementById('txNote').value;
  const tags = document.getElementById('txTags').value.trim();
  const receipt = document.getElementById('txReceiptData') ? document.getElementById('txReceiptData').value : null;

  if (id) {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      transactions[index] = { id, type, amount: amountInIDR, currency, category, subCategory, wallet, date, note, tags, receipt };
      showToast('Transaksi berhasil diperbarui.', 'success');
    }
  } else {
    const newTx = { id: 'tx-' + Date.now(), type, amount: amountInIDR, currency, category, subCategory, wallet, date, note, tags, receipt };
    transactions.unshift(newTx);
    showToast('Transaksi baru ditambahkan!', 'success');
  }

  saveState();
  closeTxModal();
  renderAllViews();
}

function handleGoalSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('goalTitleInput').value.trim();
  const targetAmount = parseFormattedNumber(document.getElementById('goalTargetAmountInput').value);
  const currentAmount = parseFormattedNumber(document.getElementById('goalCurrentAmountInput').value) || 0;
  const targetDate = document.getElementById('goalTargetDateInput').value;

  if (!title) return;

  const newGoal = {
    id: 'g-' + Date.now(),
    title,
    targetAmount,
    currentAmount,
    targetDate,
    deposits: []
  };

  if (currentAmount > 0) {
    const defaultWallet = (wallets && wallets.length > 0) ? wallets[0].name : 'Kas / Cash';
    newGoal.deposits.push({
      id: 'dep-' + Date.now(),
      amount: currentAmount,
      date: new Date().toISOString().split('T')[0],
      wallet: defaultWallet,
      note: 'Saldo Awal Terkumpul'
    });
  }

  savingsGoals.push(newGoal);
  saveState();
  closeModal('goalModal');
  renderGoalsView();
  showToast(`Target impian "${title}" dibuat!`, 'success');
  document.getElementById('goalForm').reset();
}

function handleGoalDepositSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('depositGoalId').value;
  const amount = parseFormattedNumber(document.getElementById('depositAmountInput').value);
  const walletName = document.getElementById('depositWalletSelect').value;
  const dateStr = document.getElementById('depositDateInput').value || new Date().toISOString().split('T')[0];
  const noteStr = document.getElementById('depositNoteInput').value.trim();

  if (amount <= 0) {
    showToast('Masukkan nominal tabungan yang valid.', 'warning');
    return;
  }

  const goal = (savingsGoals || []).find(g => g.id === id);
  if (goal) {
    goal.currentAmount += amount;
    if (!goal.deposits) goal.deposits = [];

    const depId = 'dep-' + Date.now();
    goal.deposits.unshift({
      id: depId,
      amount: amount,
      wallet: walletName,
      date: dateStr,
      note: noteStr
    });

    // Otomatis catat Pengeluaran dari Dompet Sumber yang dipilih
    const newTx = {
      id: 'tx-goal-' + depId,
      type: 'expense',
      amount: amount,
      currency: 'IDR',
      category: 'Tabungan & Impian',
      subCategory: 'Setoran Impian',
      wallet: walletName,
      date: dateStr,
      note: `[Tabungan Impian] ${goal.title}${noteStr ? ' - ' + noteStr : ''}`,
      tags: '#Tabungan'
    };
    transactions.unshift(newTx);

    saveState();
    closeModal('goalDepositModal');
    renderAllViews();
    showToast(`Berhasil menabung ${formatRupiah(amount)} dari dompet ${walletName} untuk ${goal.title}!`, 'success');
  }
}

function handleGoalWithdrawSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('withdrawGoalId').value;
  const amount = parseFormattedNumber(document.getElementById('withdrawAmountInput').value);
  const walletName = document.getElementById('withdrawWalletSelect').value;
  const dateStr = document.getElementById('withdrawDateInput').value || new Date().toISOString().split('T')[0];
  const noteStr = document.getElementById('withdrawNoteInput').value.trim();

  if (amount <= 0) {
    showToast('Masukkan nominal penarikan yang valid.', 'warning');
    return;
  }

  const goal = (savingsGoals || []).find(g => g.id === id);
  if (goal) {
    if (amount > goal.currentAmount) {
      showToast(`Nominal penarikan (${formatRupiah(amount)}) melebihi saldo tabungan saat ini (${formatRupiah(goal.currentAmount)}).`, 'warning');
      return;
    }

    goal.currentAmount -= amount;
    if (!goal.deposits) goal.deposits = [];

    const wdrId = 'wdr-' + Date.now();
    goal.deposits.unshift({
      id: wdrId,
      isWithdrawal: true,
      amount: amount,
      wallet: walletName,
      date: dateStr,
      note: noteStr || 'Penarikan Tabungan Impian'
    });

    // Otomatis catat Pemasukan ke Dompet Tujuan yang dipilih
    const newTx = {
      id: 'tx-wdr-' + wdrId,
      type: 'income',
      amount: amount,
      currency: 'IDR',
      category: 'Tabungan & Impian',
      subCategory: 'Pencairan Impian',
      wallet: walletName,
      date: dateStr,
      note: `[Pencairan Impian] ${goal.title}${noteStr ? ' - ' + noteStr : ''}`,
      tags: '#PencairanTabungan'
    };
    transactions.unshift(newTx);

    saveState();
    closeModal('goalWithdrawModal');
    renderAllViews();
    showToast(`Berhasil menarik ${formatRupiah(amount)} dari ${goal.title} ke ${walletName}!`, 'success');
  }
}

function handleDebtSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('debtTypeSelect').value;
  const person = document.getElementById('debtPersonInput').value.trim();
  const totalAmount = parseFormattedNumber(document.getElementById('debtAmountInput').value);
  const walletName = document.getElementById('debtWalletSelect').value;
  const dueDate = document.getElementById('debtDueDateInput').value;
  const note = document.getElementById('debtNoteInput').value.trim();

  if (totalAmount <= 0 || !person) {
    showToast('Masukkan data pinjaman yang valid.', 'warning');
    return;
  }

  const debtId = 'd-' + Date.now();
  const isHutang = type === 'hutang';

  debts.push({
    id: debtId,
    type,
    person,
    totalAmount,
    paidAmount: 0,
    dueDate,
    note,
    wallet: walletName,
    payments: []
  });

  // Otomatis catat transaksi keuangan terhubung dompet
  // Jika Hutang: Saya meminjam -> Uang masuk ke dompet (Income)
  // Jika Piutang: Saya meminjamkan -> Uang keluar dari dompet (Expense)
  const newTx = {
    id: 'tx-debt-' + debtId,
    type: isHutang ? 'income' : 'expense',
    amount: totalAmount,
    currency: 'IDR',
    category: 'Hutang & Piutang',
    subCategory: isHutang ? 'Pinjaman Masuk' : 'Pinjaman Keluar',
    wallet: walletName,
    date: new Date().toISOString().split('T')[0],
    note: `[${isHutang ? 'Hutang Baru' : 'Piutang Baru'}] ${person}${note ? ' - ' + note : ''}`,
    tags: isHutang ? '#Hutang' : '#Piutang'
  };
  transactions.unshift(newTx);

  saveState();
  closeModal('debtModal');
  renderAllViews();
  showToast(`Catatan ${type} untuk ${person} berhasil dibuat & dompet ${walletName} diperbarui!`, 'success');
  document.getElementById('debtForm').reset();
}

function handleDebtPaySubmit(e) {
  e.preventDefault();
  const id = document.getElementById('payDebtId').value;
  const amount = parseFormattedNumber(document.getElementById('payAmountInput').value);
  const walletName = document.getElementById('payWalletSelect').value;
  const dateStr = document.getElementById('payDateInput').value || new Date().toISOString().split('T')[0];

  if (amount <= 0) {
    showToast('Masukkan nominal pembayaran yang valid.', 'warning');
    return;
  }

  const debt = (debts || []).find(d => d.id === id);
  if (debt) {
    const isHutang = debt.type === 'hutang';
    debt.paidAmount = Math.min(debt.totalAmount, debt.paidAmount + amount);
    if (!debt.payments) debt.payments = [];

    const payId = 'pay-' + Date.now();
    debt.payments.unshift({
      id: payId,
      amount: amount,
      wallet: walletName,
      date: dateStr
    });

    // Otomatis catat transaksi pelunasan/cicilan
    // Jika Bayar Hutang: Uang keluar dari dompet (Expense)
    // Jika Terima Pelunasan Piutang: Uang masuk ke dompet (Income)
    const newTx = {
      id: 'tx-pay-' + payId,
      type: isHutang ? 'expense' : 'income',
      amount: amount,
      currency: 'IDR',
      category: 'Hutang & Piutang',
      subCategory: isHutang ? 'Cicilan Hutang' : 'Pelunasan Piutang',
      wallet: walletName,
      date: dateStr,
      note: `[${isHutang ? 'Cicilan Hutang' : 'Pelunasan Piutang'}] ${debt.person}`,
      tags: '#Pelunasan'
    };
    transactions.unshift(newTx);

    saveState();
    closeModal('debtPayModal');
    renderAllViews();
    showToast(`Pembayaran ${formatRupiah(amount)} via ${walletName} berhasil dicatat!`, 'success');
  }
}

function handleRecurringSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('recTypeSelect').value;
  const title = document.getElementById('recTitleInput').value.trim();
  const amount = parseFormattedNumber(document.getElementById('recAmountInput').value);
  const category = document.getElementById('recCategorySelect').value;
  const wallet = document.getElementById('recWalletSelect').value;
  const frequency = document.getElementById('recFrequencySelect').value;

  recurringTxs.push({ id: 'r-' + Date.now(), type, title, amount, category, wallet, frequency });
  saveState();
  closeModal('recurringModal');
  renderRecurringView();
  showToast(`Transaksi rutin "${title}" dibuat!`, 'success');
  document.getElementById('recurringForm').reset();
}

function handleWalletSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('walletNameInput').value.trim();
  const type = document.getElementById('walletTypeInput').value;
  const initialBalance = parseFormattedNumber(document.getElementById('walletBalanceInput').value) || 0;

  wallets.push({ id: 'w-' + Date.now(), name, type, initialBalance });
  saveState();
  closeModal('walletModal');
  populateDropdowns();
  renderAllViews();
  showToast(`Dompet ${name} ditambahkan!`, 'success');
  document.getElementById('walletForm').reset();
}

window.openBudgetModal = function(id = null) {
  const form = document.getElementById('budgetForm');
  form.reset();
  document.getElementById('budgetId').value = id || '';

  const checkboxContainer = document.getElementById('budgetCategoryCheckboxes');
  checkboxContainer.innerHTML = '';

  const expCats = (categories && categories.expense) ? categories.expense : [];
  let selectedCats = [];
  let budgetItem = null;

  if (id) {
    budgetItem = (budgets || []).find(b => b.id === id);
    if (budgetItem) {
      document.getElementById('budgetModalTitle').innerText = 'Edit Anggaran Bulanan';
      document.getElementById('budgetNameInput').value = budgetItem.name || (budgetItem.categories ? budgetItem.categories.join(' & ') : budgetItem.category);
      document.getElementById('budgetLimitInput').value = formatRupiah(budgetItem.limit);
      selectedCats = budgetItem.categories || (budgetItem.category ? [budgetItem.category] : []);
    }
  } else {
    document.getElementById('budgetModalTitle').innerText = 'Set Anggaran Baru';
  }

  expCats.forEach(c => {
    const isChecked = selectedCats.includes(c.name);
    const div = document.createElement('label');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.gap = '10px';
    div.style.cursor = 'pointer';
    div.style.fontSize = '0.9rem';
    div.style.padding = '4px 0';

    div.innerHTML = `
      <input type="checkbox" class="budget-cat-checkbox" value="${c.name}" ${isChecked ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--primary);">
      <span style="display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid ${c.icon}" style="color: ${c.color}; min-width: 18px;"></i>
        <span>${c.name}</span>
      </span>
    `;
    checkboxContainer.appendChild(div);
  });

  openModal('budgetModal');
};

function handleBudgetSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('budgetId').value;
  const customName = document.getElementById('budgetNameInput').value.trim();
  const limit = parseFormattedNumber(document.getElementById('budgetLimitInput').value);

  const checkedEls = document.querySelectorAll('.budget-cat-checkbox:checked');
  const selectedCategories = Array.from(checkedEls).map(el => el.value);

  if (selectedCategories.length === 0) {
    showToast('Pilih setidaknya 1 kategori pengeluaran untuk anggaran ini.', 'warning');
    return;
  }
  if (limit <= 0) {
    showToast('Masukkan batas anggaran yang valid.', 'warning');
    return;
  }

  const name = customName || selectedCategories.join(' & ');

  if (id) {
    const budgetIndex = (budgets || []).findIndex(b => b.id === id);
    if (budgetIndex !== -1) {
      budgets[budgetIndex].name = name;
      budgets[budgetIndex].categories = selectedCategories;
      budgets[budgetIndex].limit = limit;
      delete budgets[budgetIndex].category;
    }
  } else {
    budgets.push({
      id: 'b-' + Date.now(),
      name: name,
      categories: selectedCategories,
      limit: limit
    });
  }

  saveState();
  closeModal('budgetModal');
  renderAllViews();
  showToast(`Anggaran "${name}" berhasil disimpan!`, 'success');
}

function handleCategorySubmit(e) {
  e.preventDefault();
  const targetType = document.getElementById('catTargetType').value;
  const actionType = document.getElementById('catActionType').value;
  const name = document.getElementById('newCatNameInput').value.trim();

  if (!name) {
    showToast('Masukkan nama kategori.', 'warning');
    return;
  }

  const list = targetType === 'income' ? categories.income : categories.expense;

  if (actionType === 'main') {
    const exists = list.some(c => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      showToast(`Kategori utama "${name}" sudah ada!`, 'warning');
      return;
    }

    const icon = document.getElementById('newCatIconSelect') ? document.getElementById('newCatIconSelect').value : 'fa-folder';
    const color = document.getElementById('newCatColorInput') ? document.getElementById('newCatColorInput').value : '#6366f1';

    list.push({ name, icon, color, subcategories: ['Umum'] });
    showToast(`Kategori utama "${name}" berhasil ditambahkan!`, 'success');
  } else {
    const parentName = document.getElementById('parentCatSelect').value;
    const parent = list.find(c => c.name === parentName);
    if (parent) {
      if (!parent.subcategories) parent.subcategories = [];
      if (!parent.subcategories.includes(name)) {
        parent.subcategories.push(name);
        showToast(`Sub-kategori "${name}" berhasil ditambahkan ke ${parentName}!`, 'success');
      } else {
        showToast(`Sub-kategori "${name}" sudah ada di ${parentName}.`, 'warning');
        return;
      }
    }
  }

  saveState();
  closeModal('categoryModal');
  populateDropdowns();
  renderAllViews();
  document.getElementById('categoryForm').reset();
}

function deleteTransaction(id) {
  if (confirm('Hapus transaksi ini?')) {
    transactions = transactions.filter(t => t.id !== id);
    saveState();
    renderAllViews();
    showToast('Transaksi telah dihapus.', 'danger');
  }
}

// Master Render Function
function renderAllViews() {
  const safeRender = (fn, name) => { try { fn(); } catch(e) { console.warn(`render error [${name}]:`, e); } };
  safeRender(renderSummaryCards, 'SummaryCards');
  safeRender(renderSmartAlerts, 'SmartAlerts');
  safeRender(renderSmartInsights, 'SmartInsights');
  safeRender(renderYoYTable, 'YoYTable');
  safeRender(renderHashtagAnalytics, 'HashtagAnalytics');
  safeRender(renderMonthComparisonCard, 'MonthComparison');
  safeRender(renderFinancialHealth, 'FinancialHealth');
  safeRender(renderCashflowStatement, 'CashflowStatement');
  safeRender(renderNotifications, 'Notifications');
  safeRender(renderDashboardTxList, 'DashboardTxList');
  safeRender(renderTransactionsList, 'TransactionsList');
  safeRender(renderCalendarView, 'CalendarView');
  safeRender(renderGoalsView, 'GoalsView');
  safeRender(renderDebtsView, 'DebtsView');
  safeRender(renderRecurringView, 'RecurringView');
  safeRender(renderBudgetsView, 'BudgetsView');
  safeRender(renderCategoryManagerView, 'CategoryManagerView');
  safeRender(renderWalletsView, 'WalletsView');
  safeRender(renderCharts, 'Charts');
  safeRender(updatePrivacyUI, 'PrivacyUI');
}

// Summary Cards Render
function renderSummaryCards() {
  const currentMonthStr = new Date().toISOString().slice(0, 7);

  // Saldo = initialBalance semua wallet + semua income - semua expense (transfer tidak berpengaruh ke saldo total karena in=out)
  let totalBalance = 0;
  (wallets || []).forEach(w => { totalBalance += (w.initialBalance || 0); });

  let totalIncomeMonth = 0;
  let totalExpenseMonth = 0;

  (transactions || []).forEach(t => {
    // Hitung saldo total (hanya income/expense reguler, transfer antar dompet netral)
    if (t.type === 'income') totalBalance += t.amount;
    else if (t.type === 'expense') totalBalance -= t.amount;

    // Ringkasan bulan ini (hanya transaksi reguler, bukan transfer)
    if (t.date && t.date.startsWith(currentMonthStr)) {
      if (t.type === 'income') totalIncomeMonth += t.amount;
      else if (t.type === 'expense') totalExpenseMonth += t.amount;
    }
  });

  const netFlowMonth = totalIncomeMonth - totalExpenseMonth;

  const balEl = document.getElementById('totalBalanceDisplay');
  const incEl = document.getElementById('totalIncomeDisplay');
  const expEl = document.getElementById('totalExpenseDisplay');
  const netEl = document.getElementById('netFlowDisplay');

  if (balEl) balEl.innerText = formatRupiah(totalBalance);
  if (incEl) incEl.innerText = formatRupiah(totalIncomeMonth);
  if (expEl) expEl.innerText = formatRupiah(totalExpenseMonth);
  if (netEl) netEl.innerText = formatRupiah(netFlowMonth);

  const netStatus = document.getElementById('netFlowStatus');
  if (netStatus) {
    netStatus.className = 'card-subtext';
    if (netFlowMonth >= 0) {
      netStatus.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--income);"></i> Surplus Keuangan Bulan Ini`;
    } else {
      netStatus.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: var(--expense);"></i> Defisit Pengeluaran Bulan Ini`;
    }
  }
}

// Financial Health 50/30/20 Calculator
function renderFinancialHealth() {
  const currentMonthStr = new Date().toISOString().slice(0, 7);

  let income = (transactions || [])
    .filter(t => t.type === 'income' && t.date && t.date.startsWith(currentMonthStr))
    .reduce((sum, t) => sum + t.amount, 0);

  let expenses = (transactions || [])
    .filter(t => t.type === 'expense' && t.date && t.date.startsWith(currentMonthStr));

  let totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  if (income === 0) income = totalExpense > 0 ? totalExpense : 1;

  let needsAmount = 0;
  let wantsAmount = 0;

  const needsCategories = ['Makanan & Minuman', 'Transportasi', 'Tagihan & Utilitas', 'Kesehatan & Medis'];

  expenses.forEach(t => {
    if (needsCategories.includes(t.category)) {
      needsAmount += t.amount;
    } else {
      wantsAmount += t.amount;
    }
  });

  const savingsAmount = Math.max(0, income - totalExpense);

  const needsPercent = Math.round((needsAmount / income) * 100);
  const wantsPercent = Math.round((wantsAmount / income) * 100);
  const savingsPercent = Math.round((savingsAmount / income) * 100);

  document.getElementById('needsPercentText').innerText = `${needsPercent}% (${formatRupiah(needsAmount)})`;
  document.getElementById('wantsPercentText').innerText = `${wantsPercent}% (${formatRupiah(wantsAmount)})`;
  document.getElementById('savingsPercentText').innerText = `${savingsPercent}% (${formatRupiah(savingsAmount)})`;

  document.getElementById('needsProgressBar').style.width = `${Math.min(needsPercent, 100)}%`;
  document.getElementById('wantsProgressBar').style.width = `${Math.min(wantsPercent, 100)}%`;
  document.getElementById('savingsProgressBar').style.width = `${Math.min(savingsPercent, 100)}%`;

  let score = 100;
  if (needsPercent > 50) score -= (needsPercent - 50) * 1.2;
  if (wantsPercent > 30) score -= (wantsPercent - 30) * 1.5;
  if (savingsPercent < 20) score -= (20 - savingsPercent) * 2;
  score = Math.max(10, Math.min(100, Math.round(score)));

  let label = 'Sangat Sehat';
  if (score < 50) label = 'Perlu Perbaikan';
  else if (score < 75) label = 'Cukup Sehat';

  document.getElementById('healthScoreBadge').innerText = `Skor: ${score}/100 (${label})`;
}

// Render Goals View
function renderGoalsView() {
  const container = document.getElementById('goalGrid');

  if (!savingsGoals || savingsGoals.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-piggy-bank"></i>
        <h3>Belum Ada Target Impian</h3>
        <p>Buat target tabungan seperti beli laptop, dana darurat, atau rumah impian Anda.</p>
        <button type="button" class="btn-secondary" style="margin: 12px auto 0 auto;" onclick="window.loadDemoData(true)"><i class="fa-solid fa-database"></i> Muat Data Contoh (Demo)</button>
      </div>
    `;
    return;
  }

  container.innerHTML = savingsGoals.map(g => {
    const percent = Math.min(Math.round((g.currentAmount / g.targetAmount) * 100), 100);
    return `
      <div class="goal-card">
        <div class="goal-card-top">
          <div class="goal-icon-title">
            <div class="icon-badge balance"><i class="fa-solid fa-piggy-bank"></i></div>
            <div>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">${g.title}</h4>
              <span class="card-subtext"><i class="fa-solid fa-calendar-day"></i> Target: ${formatDateIndo(g.targetDate)}</span>
            </div>
          </div>
          <button type="button" class="btn-icon danger" onclick="deleteGoal('${g.id}')" title="Hapus Target"><i class="fa-solid fa-trash"></i></button>
        </div>

        <div class="goal-card-progress">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Terkumpul: <b style="color: var(--text-main); font-size: 0.98rem;" class="privacy-target">${formatRupiah(g.currentAmount)}</b></span>
            <span style="font-weight: 800; font-size: 0.95rem; color: var(--income);">${percent}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${percent}%; background: linear-gradient(90deg, #10b981, #34d399);"></div>
          </div>
        </div>

        <div class="goal-card-bottom">
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Target Total: <b class="privacy-target" style="color: var(--text-main); font-weight: 700;">${formatRupiah(g.targetAmount)}</b>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="btn-secondary" style="padding: 6px 10px; font-size: 0.78rem;" onclick="openGoalHistoryModal('${g.id}')" title="Lihat Riwayat Nabung & Penarikan">
              <i class="fa-solid fa-clock-rotate-left"></i> Riwayat
            </button>
            <button type="button" class="btn-secondary" style="padding: 6px 10px; font-size: 0.78rem; border-color: var(--expense-border); color: var(--expense);" onclick="openGoalWithdrawModal('${g.id}')" title="Tarik Tabungan Ke Dompet">
              <i class="fa-solid fa-hand-holding-dollar"></i> Tarik
            </button>
            <button type="button" class="btn-primary" style="padding: 6px 10px; font-size: 0.78rem;" onclick="openGoalDepositModal('${g.id}')" title="Tambah Setoran Tabungan">
              <i class="fa-solid fa-plus"></i> Nabung
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.openGoalDepositModal = function(id) {
  const goal = (savingsGoals || []).find(g => g.id === id);
  if (!goal) return;

  document.getElementById('depositGoalId').value = id;
  document.getElementById('depositAmountInput').value = '';
  document.getElementById('depositNoteInput').value = '';
  document.getElementById('depositDateInput').value = new Date().toISOString().split('T')[0];

  const walletSelect = document.getElementById('depositWalletSelect');
  walletSelect.innerHTML = '';
  (wallets || []).forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.name;
    opt.textContent = `${w.name} (${w.type})`;
    walletSelect.appendChild(opt);
  });

  openModal('goalDepositModal');
};

window.openGoalWithdrawModal = function(id) {
  const goal = (savingsGoals || []).find(g => g.id === id);
  if (!goal) return;

  document.getElementById('withdrawGoalId').value = id;
  document.getElementById('withdrawAmountInput').value = '';
  document.getElementById('withdrawNoteInput').value = '';
  document.getElementById('withdrawDateInput').value = new Date().toISOString().split('T')[0];

  const walletSelect = document.getElementById('withdrawWalletSelect');
  walletSelect.innerHTML = '';
  (wallets || []).forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.name;
    opt.textContent = `${w.name} (${w.type})`;
    walletSelect.appendChild(opt);
  });

  openModal('goalWithdrawModal');
};

window.openGoalHistoryModal = function(id) {
  const goal = (savingsGoals || []).find(g => g.id === id);
  if (!goal) return;

  // Auto-fallback: Jika target sudah memiliki saldo awal (currentAmount > 0) tetapi belum ada histori setoran
  if (goal.currentAmount > 0 && (!goal.deposits || goal.deposits.length === 0)) {
    const defaultWallet = (wallets && wallets.length > 0) ? wallets[0].name : 'Kas / Cash';
    goal.deposits = [{
      id: 'dep-init-' + goal.id,
      amount: goal.currentAmount,
      date: new Date().toISOString().split('T')[0],
      wallet: defaultWallet,
      note: 'Saldo Awal Terkumpul'
    }];
    saveState();
  }

  document.getElementById('historyGoalTitle').innerText = `Riwayat Nabung: ${goal.title}`;
  document.getElementById('historyGoalSub').innerText = `Terkumpul ${formatRupiah(goal.currentAmount)} dari target ${formatRupiah(goal.targetAmount)}`;

  const container = document.getElementById('goalHistoryList');
  const deposits = goal.deposits || [];

  if (deposits.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-receipt"></i>
        <h3>Belum Ada Riwayat Transaksi</h3>
        <p>Setoran atau penarikan tabungan impian akan tercatat rapi di sini.</p>
      </div>
    `;
  } else {
    container.innerHTML = deposits.map(dep => {
      const isWdr = dep.isWithdrawal;
      const color = isWdr ? 'var(--expense)' : 'var(--income)';
      const bg = isWdr ? 'var(--expense-bg)' : 'rgba(16, 185, 129, 0.15)';
      const icon = isWdr ? 'fa-hand-holding-dollar' : 'fa-piggy-bank';
      const prefix = isWdr ? '- ' : '+ ';

      return `
        <div class="transaction-item">
          <div class="tx-left">
            <div class="tx-icon" style="background: ${bg}; color: ${color};">
              <i class="fa-solid ${icon}"></i>
            </div>
            <div class="tx-info">
              <h4>${dep.note || (isWdr ? 'Penarikan Tabungan' : 'Setoran Tabungan')} ${isWdr ? '<span class="tag-chip" style="background: var(--expense-bg); color: var(--expense); border-color: var(--expense-border);">Penarikan</span>' : ''}</h4>
              <p>
                <span><i class="fa-solid fa-calendar-day"></i> ${formatDateIndo(dep.date)}</span>
                <span class="tx-badge">${dep.wallet}</span>
              </p>
            </div>
          </div>
          <div class="tx-right">
            <div class="tx-amount privacy-target" style="color: ${color}; font-weight: 800;">${prefix}${formatRupiah(dep.amount)}</div>
          </div>
          <div class="tx-actions">
            <button type="button" class="btn-icon danger" onclick="deleteGoalDeposit('${goal.id}', '${dep.id}')" title="Hapus Catatan Ini"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `;
    }).join('');
  }

  openModal('goalHistoryModal');
};

window.deleteGoalDeposit = function(goalId, depId) {
  const goal = (savingsGoals || []).find(g => g.id === goalId);
  if (!goal || !goal.deposits) return;

  const dep = goal.deposits.find(d => d.id === depId);
  if (!dep) return;

  const actionText = dep.isWithdrawal ? 'penarikan' : 'setoran';
  if (confirm(`Hapus catatan ${actionText} sebesar ${formatRupiah(dep.amount)}? Saldo impian dan dompet akan disesuaikan kembali.`)) {
    if (dep.isWithdrawal) {
      goal.currentAmount += dep.amount;
      transactions = (transactions || []).filter(t => t.id !== 'tx-wdr-' + depId);
    } else {
      goal.currentAmount = Math.max(0, goal.currentAmount - dep.amount);
      transactions = (transactions || []).filter(t => t.id !== 'tx-goal-' + depId);
    }

    goal.deposits = goal.deposits.filter(d => d.id !== depId);

    saveState();
    openGoalHistoryModal(goalId);
    renderAllViews();
    showToast(`Catatan ${actionText} berhasil dihapus dan saldo disesuaikan.`, 'info');
  }
};

window.deleteGoal = function(id) {
  if (confirm('Hapus target tabungan ini?')) {
    savingsGoals = savingsGoals.filter(g => g.id !== id);
    saveState();
    renderGoalsView();
    showToast('Target impian dihapus.', 'danger');
  }
};

window.openDebtModal = function() {
  document.getElementById('debtForm').reset();
  const walletSelect = document.getElementById('debtWalletSelect');
  walletSelect.innerHTML = '';
  (wallets || []).forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.name;
    opt.textContent = `${w.name} (${w.type})`;
    walletSelect.appendChild(opt);
  });
  openModal('debtModal');
};

// Render Debts View
function renderDebtsView() {
  const container = document.getElementById('debtGrid');

  if (!debts || debts.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-handshake"></i>
        <h3>Belum Ada Catatan Hutang / Piutang</h3>
        <p>Catat pinjaman atau piutang agar keuangan Anda terkontrol dengan rapi.</p>
        <button type="button" class="btn-secondary" style="margin: 12px auto 0 auto;" onclick="window.loadDemoData(true)"><i class="fa-solid fa-database"></i> Muat Data Contoh (Demo)</button>
      </div>
    `;
    return;
  }

  container.innerHTML = debts.map(d => {
    const isHutang = d.type === 'hutang';
    const sisa = d.totalAmount - d.paidAmount;
    const isLunas = sisa <= 0;

    return `
      <div class="debt-card">
        <div class="goal-card-top">
          <div class="goal-icon-title">
            <div class="icon-badge ${isHutang ? 'expense' : 'income'}">
              <i class="fa-solid ${isHutang ? 'fa-arrow-down-left' : 'fa-arrow-up-right'}"></i>
            </div>
            <div>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">${d.person}</h4>
              <span class="card-subtext"><i class="fa-solid fa-calendar-day"></i> Tempo: ${formatDateIndo(d.dueDate)} • (${isHutang ? 'Hutang' : 'Piutang'})</span>
            </div>
          </div>
          <button type="button" class="btn-icon danger" onclick="deleteDebt('${d.id}')" title="Hapus Catatan"><i class="fa-solid fa-trash"></i></button>
        </div>

        <div style="font-size: 0.85rem; color: var(--text-muted);">
          <span>Keterangan: ${d.note || 'Tidak ada catatan'}</span>
        </div>

        <div class="goal-card-bottom">
          <div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Sisa Tagihan:</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: ${isHutang ? 'var(--expense)' : 'var(--income)'};" class="privacy-target">${formatRupiah(sisa)}</div>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="btn-secondary" style="padding: 6px 10px; font-size: 0.78rem;" onclick="openDebtHistoryModal('${d.id}')" title="Lihat Riwayat Pembayaran">
              <i class="fa-solid fa-clock-rotate-left"></i> Riwayat
            </button>
            ${!isLunas ? `
              <button type="button" class="btn-primary" style="padding: 6px 10px; font-size: 0.78rem;" onclick="openDebtPayModal('${d.id}')">
                <i class="fa-solid fa-money-bill-transfer"></i> Cicil / Pelunasan
              </button>
            ` : '<span style="color: var(--income); font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-circle-check"></i> LUNAS</span>'}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.openDebtPayModal = function(id) {
  const debt = (debts || []).find(d => d.id === id);
  if (!debt) return;

  document.getElementById('payDebtId').value = id;
  document.getElementById('payAmountInput').value = '';
  document.getElementById('payDateInput').value = new Date().toISOString().split('T')[0];

  const walletSelect = document.getElementById('payWalletSelect');
  walletSelect.innerHTML = '';
  (wallets || []).forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.name;
    opt.textContent = `${w.name} (${w.type})`;
    walletSelect.appendChild(opt);
  });

  openModal('debtPayModal');
};

window.openDebtHistoryModal = function(id) {
  const debt = (debts || []).find(d => d.id === id);
  if (!debt) return;

  const isHutang = debt.type === 'hutang';
  document.getElementById('historyDebtTitle').innerText = `Riwayat Pembayaran: ${debt.person}`;
  document.getElementById('historyDebtSub').innerText = `Total ${isHutang ? 'Hutang' : 'Piutang'} ${formatRupiah(debt.totalAmount)} • Sisa ${formatRupiah(debt.totalAmount - debt.paidAmount)}`;

  const container = document.getElementById('debtHistoryList');
  const payments = debt.payments || [];

  if (payments.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-receipt"></i>
        <h3>Belum Ada Riwayat Cicilan</h3>
        <p>Pembayaran atau cicilan pelunasan yang dilakukan akan tercatat rapi di sini.</p>
      </div>
    `;
  } else {
    container.innerHTML = payments.map(pay => `
      <div class="transaction-item">
        <div class="tx-left">
          <div class="tx-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--income);">
            <i class="fa-solid fa-money-bill-transfer"></i>
          </div>
          <div class="tx-info">
            <h4>Cicilan / Pelunasan</h4>
            <p>
              <span><i class="fa-solid fa-calendar-day"></i> ${formatDateIndo(pay.date)}</span>
              <span class="tx-badge">${pay.wallet}</span>
            </p>
          </div>
        </div>
        <div class="tx-right">
          <div class="tx-amount income privacy-target">+ ${formatRupiah(pay.amount)}</div>
        </div>
        <div class="tx-actions">
          <button type="button" class="btn-icon danger" onclick="deleteDebtPayment('${debt.id}', '${pay.id}')" title="Hapus Pembayaran Ini"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `).join('');
  }

  openModal('debtHistoryModal');
};

window.deleteDebtPayment = function(debtId, payId) {
  const debt = (debts || []).find(d => d.id === debtId);
  if (!debt || !debt.payments) return;

  const pay = debt.payments.find(p => p.id === payId);
  if (!pay) return;

  if (confirm(`Hapus catatan pembayaran sebesar ${formatRupiah(pay.amount)}? Saldo sisa tagihan dan dompet akan disesuaikan kembali.`)) {
    debt.paidAmount = Math.max(0, debt.paidAmount - pay.amount);
    debt.payments = debt.payments.filter(p => p.id !== payId);

    // Hapus transaksi pelunasan terhubung
    transactions = (transactions || []).filter(t => t.id !== 'tx-pay-' + payId);

    saveState();
    openDebtHistoryModal(debtId);
    renderAllViews();
    showToast('Pembayaran berhasil dihapus dan saldo disesuaikan.', 'info');
  }
};

window.deleteDebt = function(id) {
  if (confirm('Hapus catatan hutang/piutang ini?')) {
    debts = debts.filter(d => d.id !== id);
    saveState();
    renderDebtsView();
    renderSmartAlerts();
    showToast('Catatan dihapus.', 'danger');
  }
};

// Render Recurring View
function renderRecurringView() {
  const container = document.getElementById('recurringGrid');

  if (!recurringTxs || recurringTxs.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-rotate"></i>
        <h3>Belum Ada Transaksi Rutin</h3>
        <p>Otomatiskan pencatatan tagihan atau gaji bulanan Anda.</p>
        <button type="button" class="btn-secondary" style="margin: 12px auto 0 auto;" onclick="window.loadDemoData(true)"><i class="fa-solid fa-database"></i> Muat Data Contoh (Demo)</button>
      </div>
    `;
    return;
  }

  container.innerHTML = recurringTxs.map(r => {
    const isIncome = r.type === 'income';
    return `
      <div class="recurring-card">
        <div class="goal-card-top">
          <div class="goal-icon-title">
            <div class="icon-badge ${isIncome ? 'income' : 'expense'}">
              <i class="fa-solid ${isIncome ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
            </div>
            <div>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">${r.title}</h4>
              <span class="card-subtext"><i class="fa-solid fa-tag"></i> ${r.category} • ${r.frequency}</span>
            </div>
          </div>
          <button type="button" class="btn-icon danger" onclick="deleteRecurring('${r.id}')" title="Hapus Rutin"><i class="fa-solid fa-trash"></i></button>
        </div>

        <div class="goal-card-bottom">
          <div style="font-size: 1.15rem; font-weight: 800; color: ${isIncome ? 'var(--income)' : 'var(--expense)'};" class="privacy-target">
            ${isIncome ? '+' : '-'} ${formatRupiah(r.amount)}
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="btn-secondary" style="padding: 6px 10px; font-size: 0.78rem;" onclick="openRecurringHistoryModal('${r.id}')" title="Lihat Riwayat Eksekusi">
              <i class="fa-solid fa-clock-rotate-left"></i> Riwayat
            </button>
            <button type="button" class="btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="executeRecurringNow('${r.id}')" title="Eksekusi Transaksi Ini Sekarang">
              <i class="fa-solid fa-play"></i> Catat Now
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.executeRecurringNow = function(id) {
  const rec = (recurringTxs || []).find(r => r.id === id);
  if (rec) {
    if (!rec.history) rec.history = [];

    const execId = 'rec-exec-' + Date.now();
    const todayStr = new Date().toISOString().split('T')[0];

    rec.history.unshift({
      id: execId,
      amount: rec.amount,
      wallet: rec.wallet,
      date: todayStr,
      note: `[Rutin] ${rec.title}`
    });

    const newTx = {
      id: 'tx-rec-' + execId,
      type: rec.type,
      amount: rec.amount,
      currency: 'IDR',
      category: rec.category,
      subCategory: 'Rutin',
      wallet: rec.wallet,
      date: todayStr,
      note: `[Rutin] ${rec.title}`,
      tags: '#Rutin'
    };
    transactions.unshift(newTx);

    saveState();
    renderAllViews();
    showToast(`Transaksi rutin "${rec.title}" berhasil dicatat & masuk ke dompet ${rec.wallet}!`, 'success');
  }
};

window.openRecurringHistoryModal = function(id) {
  const rec = (recurringTxs || []).find(r => r.id === id);
  if (!rec) return;

  document.getElementById('historyRecurringTitle').innerText = `Riwayat Eksekusi: ${rec.title}`;
  document.getElementById('historyRecurringSub').innerText = `Kategori: ${rec.category} • Dompet: ${rec.wallet} • Frekuensi: ${rec.frequency}`;

  const container = document.getElementById('recurringHistoryList');
  const history = rec.history || [];

  if (history.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-receipt"></i>
        <h3>Belum Ada Riwayat Eksekusi</h3>
        <p>Setiap kali Anda menekan tombol "Catat Now", riwayatnya akan tercatat rapi di sini.</p>
      </div>
    `;
  } else {
    container.innerHTML = history.map(item => {
      const isInc = rec.type === 'income';
      const color = isInc ? 'var(--income)' : 'var(--expense)';
      const bg = isInc ? 'rgba(16, 185, 129, 0.15)' : 'var(--expense-bg)';

      return `
        <div class="transaction-item">
          <div class="tx-left">
            <div class="tx-icon" style="background: ${bg}; color: ${color};">
              <i class="fa-solid ${isInc ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
            </div>
            <div class="tx-info">
              <h4>${item.note || rec.title}</h4>
              <p>
                <span><i class="fa-solid fa-calendar-day"></i> ${formatDateIndo(item.date)}</span>
                <span class="tx-badge">${item.wallet}</span>
              </p>
            </div>
          </div>
          <div class="tx-right">
            <div class="tx-amount privacy-target" style="color: ${color}; font-weight: 800;">${isInc ? '+' : '-'} ${formatRupiah(item.amount)}</div>
          </div>
          <div class="tx-actions">
            <button type="button" class="btn-icon danger" onclick="deleteRecurringExecution('${rec.id}', '${item.id}')" title="Hapus Catatan Ini"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `;
    }).join('');
  }

  openModal('recurringHistoryModal');
};

window.deleteRecurringExecution = function(recId, execId) {
  const rec = (recurringTxs || []).find(r => r.id === recId);
  if (!rec || !rec.history) return;

  const item = rec.history.find(h => h.id === execId);
  if (!item) return;

  if (confirm(`Hapus pencatatan transaksi rutin sebesar ${formatRupiah(item.amount)}? Transaksi di dompet akan dihapus.`)) {
    rec.history = rec.history.filter(h => h.id !== execId);
    transactions = (transactions || []).filter(t => t.id !== 'tx-rec-' + execId);

    saveState();
    openRecurringHistoryModal(recId);
    renderAllViews();
    showToast('Catatan eksekusi rutin berhasil dihapus.', 'info');
  }
};

window.deleteRecurring = function(id) {
  if (confirm('Hapus transaksi rutin ini?')) {
    recurringTxs = recurringTxs.filter(r => r.id !== id);
    saveState();
    renderRecurringView();
    showToast('Transaksi rutin dihapus.', 'danger');
  }
};

// Render Dashboard Recent List
function createTxItemHTML(tx) {
  const isTransferIn = tx.type === 'transfer_in';
  const isTransferOut = tx.type === 'transfer_out';
  const isTransfer = isTransferIn || isTransferOut;
  const isIncome = tx.type === 'income' || isTransferIn;

  const meta = isTransfer
    ? { icon: 'fa-right-left', color: '#6366f1' }
    : getCategoryMeta(tx.category);

  const amountPrefix = isIncome ? '+ ' : '- ';
  const amountFormatted = amountPrefix + formatRupiah(tx.amount);

  const subCatDisplay = tx.subCategory ? `<i class="fa-solid fa-chevron-right text-xs" style="font-size: 0.65rem;"></i> <span class="tx-badge sub">${tx.subCategory}</span>` : '';
  const tagsDisplay = tx.tags ? tx.tags.split(/\s+/).map(t => `<span class="tag-chip">${t}</span>`).join(' ') : '';
  const currencyDisplay = tx.currency && tx.currency !== 'IDR' ? `<span class="tx-badge" style="background: rgba(245, 158, 11, 0.15); color: var(--warning); border-color: rgba(245, 158, 11, 0.3);">${tx.currency}</span>` : '';

  const transferBadge = isTransfer
    ? `<span class="tx-badge" style="background: rgba(99,102,241,0.15); color: #6366f1; border-color: rgba(99,102,241,0.3); font-weight: 700;">${isTransferIn ? '↓ Masuk' : '↑ Keluar'}</span>`
    : '';

  const receiptBtn = tx.receipt
    ? `<button type="button" class="btn-icon" onclick="window.viewReceiptPhoto('${tx.id}')" title="Lihat Foto Struk/Nota" style="color: #4285F4;"><i class="fa-solid fa-receipt"></i></button>`
    : '';

  return `
    <div class="transaction-item">
      <div class="tx-left">
        <div class="tx-icon" style="background: ${meta.color}20; color: ${meta.color};">
          <i class="fa-solid ${meta.icon}"></i>
        </div>
        <div class="tx-info">
          <h4>${tx.note || tx.category} ${tagsDisplay}</h4>
          <p>
            <span><i class="fa-solid fa-tag"></i> ${tx.category}</span>
            ${subCatDisplay}
            <span class="tx-badge">${tx.wallet}</span>
            ${transferBadge}
            ${currencyDisplay}
          </p>
        </div>
      </div>
      <div class="tx-right">
        <div class="tx-amount ${isIncome ? 'income' : 'expense'} privacy-target">${amountFormatted}</div>
        <div class="tx-date">${formatDateIndo(tx.date)}</div>
      </div>
      <div class="tx-actions">
        ${receiptBtn}
        ${editBtn}
        <button type="button" class="btn-icon danger" onclick="deleteTransaction('${tx.id}')" title="Hapus"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `;
}

window.openTxModalById = function(id) {
  const tx = (transactions || []).find(t => t.id === id);
  if (tx) openTxModal(tx);
};

function renderDashboardTxList() {
  const container = document.getElementById('dashboardTxList');
  const recent = (transactions || []).slice(0, 5);

  if (recent.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-receipt"></i>
        <h3>Belum Ada Transaksi</h3>
        <p>Klik "+ Tambah Transaksi" atau muat data contoh untuk mulai.</p>
        <button type="button" class="btn-primary" style="margin: 12px auto 0 auto;" onclick="window.loadDemoData(true)"><i class="fa-solid fa-database"></i> Muat Data Contoh (Demo)</button>
      </div>
    `;
    return;
  }

  container.innerHTML = recent.map(createTxItemHTML).join('');
}

// Enhanced Search & Date Filter in Transactions List
function renderTransactionsList() {
  const container = document.getElementById('allTransactionsList');
  const searchInput = document.getElementById('searchInput');
  const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const type = document.getElementById('typeFilter') ? document.getElementById('typeFilter').value : 'all';
  const category = document.getElementById('categoryFilter') ? document.getElementById('categoryFilter').value : 'all';
  const range = document.getElementById('dateRangeFilter') ? document.getElementById('dateRangeFilter').value : 'all';

  const now = new Date();
  const currentMonthStr = now.toISOString().slice(0, 7);
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = lastMonthDate.toISOString().slice(0, 7);

  const filtered = (transactions || []).filter(t => {
    if (type !== 'all' && t.type !== type) return false;
    if (category !== 'all' && t.category !== category) return false;

    if (range === 'this-month' && (!t.date || !t.date.startsWith(currentMonthStr))) return false;
    if (range === 'last-month' && (!t.date || !t.date.startsWith(lastMonthStr))) return false;
    if (range === 'this-year' && (!t.date || !t.date.startsWith(now.getFullYear().toString()))) return false;

    if (search) {
      const matchDate = (t.date && t.date.includes(search)) || (t.date && formatDateIndo(t.date).toLowerCase().includes(search));
      const matchNote = t.note && t.note.toLowerCase().includes(search);
      const matchCat = t.category && t.category.toLowerCase().includes(search);
      const matchSub = t.subCategory && t.subCategory.toLowerCase().includes(search);
      const matchWallet = t.wallet && t.wallet.toLowerCase().includes(search);
      const matchTag = t.tags && t.tags.toLowerCase().includes(search);
      if (!matchDate && !matchNote && !matchCat && !matchSub && !matchWallet && !matchTag) return false;
    }

    return true;
  });

  let totalFilteredIncome = 0;
  let totalFilteredExpense = 0;

  filtered.forEach(t => {
    if (t.type === 'income') totalFilteredIncome += t.amount;
    else totalFilteredExpense += t.amount;
  });

  const badge = document.getElementById('txCountBadge');
  if (badge) badge.innerText = `${filtered.length} Transaksi Ditemukan`;

  const incEl = document.getElementById('filteredIncomeTotal');
  if (incEl) incEl.innerText = formatRupiah(totalFilteredIncome);

  const expEl = document.getElementById('filteredExpenseTotal');
  if (expEl) expEl.innerText = formatRupiah(totalFilteredExpense);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-filter-circle-xmark"></i>
        <h3>Tidak Ada Transaksi</h3>
        <p>Tidak ada catatan keuangan yang sesuai dengan filter atau database kosong.</p>
        <button type="button" class="btn-primary" style="margin: 14px auto 0 auto;" onclick="window.loadDemoData(true)"><i class="fa-solid fa-database"></i> Muat Data Contoh (Demo)</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(createTxItemHTML).join('');
}

function renderBudgetsView() {
  const container = document.getElementById('budgetGrid');
  const summaryPanel = document.getElementById('budgetSummaryPanel');
  const currentMonthStr = new Date().toISOString().slice(0, 7);

  if (!budgets || budgets.length === 0) {
    if (summaryPanel) summaryPanel.style.display = 'none';
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-bullseye"></i>
        <h3>Belum Ada Batas Anggaran</h3>
        <p>Buat target batas pengeluaran bulanan per kategori untuk mengontrol pengeluaran Anda.</p>
        <button type="button" class="btn-secondary" style="margin: 12px auto 0 auto;" onclick="window.loadDemoData(true)"><i class="fa-solid fa-database"></i> Muat Data Contoh (Demo)</button>
      </div>
    `;
    return;
  }

  let totalBudgetLimit = 0;
  let totalBudgetSpent = 0;

  budgets.forEach(b => {
    const cats = b.categories || (b.category ? [b.category] : []);
    totalBudgetLimit += b.limit;

    const spent = (transactions || [])
      .filter(t => t.type === 'expense' && cats.includes(t.category) && t.date && t.date.startsWith(currentMonthStr))
      .reduce((sum, t) => sum + t.amount, 0);

    totalBudgetSpent += spent;
  });

  const totalBudgetRemaining = Math.max(0, totalBudgetLimit - totalBudgetSpent);
  const overallPercent = Math.min(Math.round((totalBudgetSpent / totalBudgetLimit) * 100), 100);

  if (summaryPanel) {
    summaryPanel.style.display = 'block';
    summaryPanel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div>
          <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;"><i class="fa-solid fa-scale-balanced" style="color: var(--primary);"></i> Ringkasan Total Anggaran Bulanan</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted);">Batas gabungan dari seluruh kategori pengeluaran Anda</p>
        </div>
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Total Batas:</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);" class="privacy-target">${formatRupiah(totalBudgetLimit)}</div>
          </div>
          <div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Total Terpakai:</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--expense);" class="privacy-target">${formatRupiah(totalBudgetSpent)}</div>
          </div>
          <div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Sisa Total:</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--income);" class="privacy-target">${formatRupiah(totalBudgetRemaining)}</div>
          </div>
        </div>
      </div>
      <div style="margin-top: 14px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px; font-weight: 700;">
          <span style="color: var(--text-muted);">Penggunaan Gabungan Bulan Ini</span>
          <span style="color: var(--primary);">${overallPercent}%</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${overallPercent}%; background: linear-gradient(90deg, #6366f1, #a855f7);"></div>
        </div>
      </div>
    `;
  }

  container.innerHTML = budgets.map(b => {
    const cats = b.categories || (b.category ? [b.category] : []);
    const firstCat = cats.length > 0 ? cats[0] : 'Umum';
    const meta = getCategoryMeta(firstCat);
    const titleDisplay = b.name || cats.join(' & ') || 'Anggaran';

    const spent = (transactions || [])
      .filter(t => t.type === 'expense' && cats.includes(t.category) && t.date && t.date.startsWith(currentMonthStr))
      .reduce((sum, t) => sum + t.amount, 0);

    const percentage = Math.min(Math.round((spent / b.limit) * 100), 100);
    let barStatusClass = '';
    if (percentage >= 90) barStatusClass = 'danger';
    else if (percentage >= 70) barStatusClass = 'warning';

    return `
      <div class="budget-card">
        <div class="goal-card-top">
          <div class="goal-icon-title">
            <div class="tx-icon" style="background: ${meta.color}20; color: ${meta.color};">
              <i class="fa-solid ${cats.length > 1 ? 'fa-layer-group' : meta.icon}"></i>
            </div>
            <div>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">${titleDisplay}</h4>
              <span class="card-subtext"><i class="fa-solid fa-folder"></i> ${cats.length} Kategori Terhubung</span>
            </div>
          </div>
          <div style="display: flex; gap: 4px;">
            <button type="button" class="btn-icon" onclick="openEditBudgetModal('${b.id}')" title="Edit Anggaran Ini"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" class="btn-icon danger" onclick="deleteBudget('${b.id}')" title="Hapus Anggaran"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>

        <div class="goal-card-progress" style="margin-top: 14px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-weight: 700; font-size: 0.88rem;">
            <span>Terpakai: <b class="privacy-target">${formatRupiah(spent)}</b></span>
            <span style="font-weight: 800; color: ${percentage >= 90 ? 'var(--expense)' : 'var(--text-main)'};">${percentage}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill ${barStatusClass}" style="width: ${percentage}%;"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted); padding-top: 12px; border-top: 1px solid var(--border-color); flex-wrap: wrap; gap: 8px;">
          <div>
            <span>Maks: <b class="privacy-target" style="color: var(--text-main);">${formatRupiah(b.limit)}</b></span> • 
            <span>Sisa: <b class="privacy-target" style="color: var(--income);">${formatRupiah(Math.max(0, b.limit - spent))}</b></span>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="btn-secondary" style="padding: 5px 9px; font-size: 0.76rem;" onclick="openBudgetCategoriesPreviewModal('${b.id}')" title="Preview Kategori Terhubung">
              <i class="fa-solid fa-list-check"></i> Kategori (${cats.length})
            </button>
            <button type="button" class="btn-secondary" style="padding: 5px 9px; font-size: 0.76rem;" onclick="openBudgetDetailModal('${b.id}')" title="Lihat Transaksi Bulan Ini">
              <i class="fa-solid fa-receipt"></i> Transaksi
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.openEditBudgetModal = function(id) {
  openBudgetModal(id);
};

window.openBudgetCategoriesPreviewModal = function(id) {
  const budget = (budgets || []).find(b => b.id === id);
  if (!budget) return;

  const cats = budget.categories || (budget.category ? [budget.category] : []);
  const titleDisplay = budget.name || cats.join(' & ') || 'Anggaran';

  document.getElementById('previewBudgetNameTitle').innerText = titleDisplay;
  document.getElementById('previewBudgetNameSub').innerText = `${cats.length} Kategori pengeluaran terhubung ke anggaran ini (Batas Maks ${formatRupiah(budget.limit)})`;

  const container = document.getElementById('previewBudgetCategoriesList');
  container.innerHTML = cats.map(catName => {
    const meta = getCategoryMeta(catName);
    const subChips = (meta.subcategories || []).map(s => `<span class="tag-chip" style="font-size: 0.75rem;">${s}</span>`).join(' ');

    return `
      <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: var(--bg-glass); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
        <div class="tx-icon" style="background: ${meta.color}20; color: ${meta.color}; flex-shrink: 0;">
          <i class="fa-solid ${meta.icon}"></i>
        </div>
        <div style="flex-grow: 1;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">${catName}</h4>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            ${subChips || '<span style="font-size: 0.75rem; color: var(--text-muted);">Semua pengeluaran kategori ini</span>'}
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('editBudgetFromPreviewBtn').onclick = function() {
    closeModal('budgetCategoriesPreviewModal');
    openBudgetModal(id);
  };

  openModal('budgetCategoriesPreviewModal');
};

window.openBudgetDetailModal = function(budgetId) {
  const budget = (budgets || []).find(b => b.id === budgetId);
  if (!budget) return;

  const cats = budget.categories || (budget.category ? [budget.category] : []);
  const currentMonthStr = new Date().toISOString().slice(0, 7);

  const catTxs = (transactions || []).filter(t => t.type === 'expense' && cats.includes(t.category) && t.date && t.date.startsWith(currentMonthStr));
  const totalSpent = catTxs.reduce((sum, t) => sum + t.amount, 0);

  const titleDisplay = budget.name || cats.join(' & ') || 'Anggaran';

  document.getElementById('detailBudgetCategoryTitle').innerText = `Anggaran: ${titleDisplay}`;
  document.getElementById('detailBudgetCategorySub').innerText = `Total Pengeluaran Bulan Ini: ${formatRupiah(totalSpent)} (${catTxs.length} Transaksi)`;

  const container = document.getElementById('budgetDetailList');

  if (catTxs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-receipt"></i>
        <h3>Belum Ada Transaksi Bulan Ini</h3>
        <p>Setiap kali Anda mencatat pengeluaran untuk kategori (${cats.join(', ')}) dari dompet manapun, pengeluarannya akan otomatis terhitung di sini.</p>
      </div>
    `;
  } else {
    container.innerHTML = catTxs.map(t => {
      const meta = getCategoryMeta(t.category);
      return `
        <div class="transaction-item">
          <div class="tx-left">
            <div class="tx-icon" style="background: ${meta.color}20; color: ${meta.color};">
              <i class="fa-solid ${meta.icon}"></i>
            </div>
            <div class="tx-info">
              <h4>${t.note || t.category}</h4>
              <p>
                <span><i class="fa-solid fa-calendar-day"></i> ${formatDateIndo(t.date)}</span>
                <span class="tx-badge">${t.wallet}</span>
                ${t.subCategory ? `<span class="tx-badge sub">${t.subCategory}</span>` : ''}
              </p>
            </div>
          </div>
          <div class="tx-right">
            <div class="tx-amount expense privacy-target">- ${formatRupiah(t.amount)}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  openModal('budgetDetailModal');
};

window.deleteBudget = function(id) {
  if (confirm('Hapus batas anggaran ini?')) {
    budgets = budgets.filter(b => b.id !== id);
    saveState();
    renderBudgetsView();
    renderSmartAlerts();
    showToast('Anggaran telah dihapus.', 'danger');
  }
};

function renderCategoryManagerView() {
  const container = document.getElementById('categoryManagerGrid');
  const filterType = document.getElementById('catTypeFilter') ? document.getElementById('catTypeFilter').value : 'all';

  let allCats = [
    ...(categories.expense || []).map(c => ({ ...c, type: 'expense' })),
    ...(categories.income || []).map(c => ({ ...c, type: 'income' }))
  ];

  if (filterType === 'expense') {
    allCats = allCats.filter(c => c.type === 'expense');
  } else if (filterType === 'income') {
    allCats = allCats.filter(c => c.type === 'income');
  }

  if (allCats.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-folder-open"></i>
        <h3>Tidak Ada Kategori Tipe Ini</h3>
        <p>Gunakan tombol di atas untuk menambah kategori baru.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = allCats.map(c => {
    const subChips = (c.subcategories || []).map(s => `
      <div class="subcat-chip">
        <span>${s}</span>
        <button type="button" onclick="deleteSubCategory('${c.name}', '${s}', '${c.type}')" title="Hapus sub-kategori ${s}">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');

    return `
      <div class="cat-manager-card">
        <div class="goal-card-top">
          <div class="goal-icon-title">
            <div class="tx-icon" style="background: ${c.color}20; color: ${c.color};">
              <i class="fa-solid ${c.icon}"></i>
            </div>
            <div>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">${c.name}</h4>
              <span class="card-subtext" style="color: ${c.type === 'income' ? 'var(--income)' : 'var(--expense)'}; font-weight: 700;">
                ${c.type === 'income' ? 'Pemasukan (+)' : 'Pengeluaran (-)'}
              </span>
            </div>
          </div>
          <button type="button" class="btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" onclick="quickAddSubCategory('${c.name}', '${c.type}')" title="Tambah Sub-Kategori ke ${c.name}">
            <i class="fa-solid fa-plus"></i> Sub
          </button>
        </div>
        <div style="margin-top: 10px;">
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">Sub-Kategori Terhubung:</span>
          <div class="subcat-chips">
            ${subChips || '<span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 6px;">Belum ada sub-kategori</span>'}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.quickAddSubCategory = function(catName, type) {
  document.getElementById('catTargetType').value = type;
  populateParentCategoryDropdown();
  document.getElementById('parentCatSelect').value = catName;
  openModal('categoryModal');
};

window.deleteSubCategory = function(catName, subName, type) {
  if (confirm(`Hapus sub-kategori "${subName}" dari ${catName}?`)) {
    const list = type === 'income' ? categories.income : categories.expense;
    const cat = list.find(c => c.name === catName);
    if (cat && cat.subcategories) {
      cat.subcategories = cat.subcategories.filter(s => s !== subName);
      saveState();
      populateDropdowns();
      renderAllViews();
      showToast(`Sub-kategori "${subName}" dihapus.`, 'danger');
    }
  }
};

function renderWalletsView() {
  const container = document.getElementById('walletGrid');
  if (!container) return;

  if (!wallets || wallets.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-building-columns"></i>
        <h3>Belum Ada Dompet</h3>
        <p>Tambahkan rekening bank atau e-wallet Anda.</p>
        <button type="button" class="btn-secondary" style="margin: 12px auto 0 auto;" onclick="window.loadDemoData(true)"><i class="fa-solid fa-database"></i> Muat Data Contoh (Demo)</button>
      </div>
    `;
    return;
  }

  container.innerHTML = wallets.map(w => {
    let balance = w.initialBalance || 0;
    let totalIn = 0, totalOut = 0;
    (transactions || []).forEach(t => {
      if (t.wallet === w.name) {
        if (t.type === 'income') { balance += t.amount; totalIn += t.amount; }
        else { balance -= t.amount; totalOut += t.amount; }
      }
      // Hitung transfer masuk (wallet tujuan)
      if (t.type === 'transfer_in' && t.wallet === w.name) { balance += t.amount; totalIn += t.amount; }
      if (t.type === 'transfer_out' && t.wallet === w.name) { balance -= t.amount; totalOut += t.amount; }
    });

    const walletTxCount = (transactions || []).filter(t => t.wallet === w.name).length;
    const iconMap = { 'Bank': 'fa-building-columns', 'E-Wallet': 'fa-mobile-screen-button', 'Tunai': 'fa-money-bill-wave', 'Investasi': 'fa-chart-line' };
    const colorMap = { 'Bank': '#6366f1', 'E-Wallet': '#10b981', 'Tunai': '#f59e0b', 'Investasi': '#ec4899' };
    const wIcon = iconMap[w.type] || 'fa-credit-card';
    const wColor = colorMap[w.type] || '#6366f1';
    const isNegative = balance < 0;

    return `
      <div class="wallet-card" style="cursor: default;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: ${wColor}22; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i class="fa-solid ${wIcon}" style="color: ${wColor}; font-size: 1.2rem;"></i>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px;">${w.type.toUpperCase()}</div>
              <div style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-top: 1px;">${w.name}</div>
            </div>
          </div>
          <button type="button" class="btn-icon danger" onclick="window.deleteWallet('${w.id}')" title="Hapus Dompet" style="flex-shrink: 0;"><i class="fa-solid fa-trash"></i></button>
        </div>

        <div style="margin: 14px 0 10px 0;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; margin-bottom: 3px;">Saldo Saat Ini</div>
          <div style="font-size: 1.5rem; font-weight: 900; color: ${isNegative ? 'var(--expense)' : 'var(--primary)'};" class="privacy-target">${formatRupiah(balance)}</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; padding: 10px; background: var(--bg-main); border-radius: var(--radius-sm);">
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Total Masuk</div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--income);" class="privacy-target">+${formatRupiah(totalIn)}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Total Keluar</div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--expense);" class="privacy-target">-${formatRupiah(totalOut)}</div>
          </div>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button type="button" class="btn-secondary" style="flex: 1; font-size: 0.8rem; padding: 8px 10px;" onclick="window.openWalletHistoryModal('${w.id}')">
            <i class="fa-solid fa-clock-rotate-left"></i> Riwayat (${walletTxCount})
          </button>
          <button type="button" class="btn-secondary" style="flex: 1; font-size: 0.8rem; padding: 8px 10px;" onclick="openTransferModal('${w.name}')">
            <i class="fa-solid fa-right-left"></i> Transfer
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.openWalletHistoryModal = function(walletId) {
  const wallet = (wallets || []).find(w => w.id === walletId);
  if (!wallet) return;

  const titleEl = document.getElementById('walletHistoryTitle');
  const summaryEl = document.getElementById('walletHistorySummaryBar');
  const listEl = document.getElementById('walletHistoryList');
  if (!titleEl || !summaryEl || !listEl) return;

  titleEl.innerHTML = `<i class="fa-solid fa-clock-rotate-left" style="color: var(--primary);"></i> Riwayat: ${wallet.name}`;

  const walletTxs = (transactions || [])
    .filter(t => t.wallet === wallet.name)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  let totalIn = 0, totalOut = 0;
  walletTxs.forEach(t => {
    if (t.type === 'income' || t.type === 'transfer_in') totalIn += t.amount;
    else totalOut += t.amount;
  });

  const currentBalance = (wallet.initialBalance || 0) + totalIn - totalOut;

  summaryEl.innerHTML = `
    <div style="flex: 1; min-width: 120px;">
      <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700;">Saldo Saat Ini</div>
      <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary);" class="privacy-target">${formatRupiah(currentBalance)}</div>
    </div>
    <div style="flex: 1; min-width: 100px;">
      <div style="font-size: 0.72rem; color: var(--text-muted);">Total Masuk</div>
      <div style="font-size: 0.95rem; font-weight: 700; color: var(--income);" class="privacy-target">+${formatRupiah(totalIn)}</div>
    </div>
    <div style="flex: 1; min-width: 100px;">
      <div style="font-size: 0.72rem; color: var(--text-muted);">Total Keluar</div>
      <div style="font-size: 0.95rem; font-weight: 700; color: var(--expense);" class="privacy-target">-${formatRupiah(totalOut)}</div>
    </div>
    <div style="flex: 1; min-width: 80px;">
      <div style="font-size: 0.72rem; color: var(--text-muted);">Transaksi</div>
      <div style="font-size: 0.95rem; font-weight: 700;">${walletTxs.length} transaksi</div>
    </div>
  `;

  if (walletTxs.length === 0) {
    listEl.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-muted);"><i class="fa-solid fa-inbox" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i><p>Belum ada transaksi di dompet ini.</p></div>`;
  } else {
    listEl.innerHTML = walletTxs.map(t => {
      const isIncome = t.type === 'income' || t.type === 'transfer_in';
      const isTransfer = t.type === 'transfer_in' || t.type === 'transfer_out';
      const typeIcon = isTransfer ? 'fa-right-left' : (isIncome ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down');
      const typeColor = isIncome ? 'var(--income)' : 'var(--expense)';
      const typeLabel = isTransfer ? (t.type === 'transfer_in' ? 'Transfer Masuk' : 'Transfer Keluar') : (isIncome ? t.category : t.category);

      return `
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="width: 38px; height: 38px; border-radius: 10px; background: ${typeColor}22; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i class="fa-solid ${typeIcon}" style="color: ${typeColor}; font-size: 0.9rem;"></i>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t.note || typeLabel}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">${typeLabel} &bull; ${formatDateIndo(t.date)}</div>
          </div>
          <div style="font-size: 0.95rem; font-weight: 800; color: ${typeColor}; flex-shrink: 0;" class="privacy-target">
            ${isIncome ? '+' : '-'}${formatRupiah(t.amount)}
          </div>
        </div>
      `;
    }).join('');
  }

  openModal('walletHistoryModal');
};

function openTransferModal(preselectedWalletName = null) {
  const form = document.getElementById('transferForm');
  if (form) form.reset();

  const fromSelect = document.getElementById('transferFromWallet');
  const toSelect = document.getElementById('transferToWallet');
  if (!fromSelect || !toSelect) return;

  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';

  (wallets || []).forEach(w => {
    const opt1 = document.createElement('option');
    opt1.value = w.name;
    opt1.textContent = w.name;
    fromSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = w.name;
    opt2.textContent = w.name;
    toSelect.appendChild(opt2);
  });

  if (preselectedWalletName) {
    fromSelect.value = preselectedWalletName;
    const others = (wallets || []).filter(w => w.name !== preselectedWalletName);
    if (others.length > 0) toSelect.value = others[0].name;
  } else if (wallets && wallets.length >= 2) {
    fromSelect.value = wallets[0].name;
    toSelect.value = wallets[1].name;
  }

  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('transferDateInput');
  if (dateInput) dateInput.value = today;

  // Live preview saldo
  const updatePreview = () => {
    const fromName = fromSelect.value;
    const fromWallet = (wallets || []).find(w => w.name === fromName);
    if (!fromWallet) return;
    let fromBalance = fromWallet.initialBalance || 0;
    (transactions || []).forEach(t => {
      if (t.wallet === fromName) {
        if (t.type === 'income' || t.type === 'transfer_in') fromBalance += t.amount;
        else fromBalance -= t.amount;
      }
    });
    const preview = document.getElementById('transferBalancePreview');
    if (preview) {
      preview.style.display = 'block';
      preview.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--primary);"></i> Saldo <b>${fromName}</b> saat ini: <b style="color: ${fromBalance < 0 ? 'var(--expense)' : 'var(--income)'}">${formatRupiah(fromBalance)}</b>`;
    }
  };

  fromSelect.onchange = updatePreview;
  updatePreview();

  openModal('transferModal');
}

function handleTransferSubmit(e) {
  e.preventDefault();
  const fromName = document.getElementById('transferFromWallet').value;
  const toName = document.getElementById('transferToWallet').value;
  const amount = parseFormattedNumber(document.getElementById('transferAmountInput').value);
  const dateStr = document.getElementById('transferDateInput').value || new Date().toISOString().split('T')[0];
  const noteStr = document.getElementById('transferNoteInput').value.trim();

  if (!fromName || !toName) { showToast('Pilih dompet asal dan tujuan.', 'warning'); return; }
  if (fromName === toName) { showToast('Dompet asal dan tujuan tidak boleh sama.', 'warning'); return; }
  if (amount <= 0) { showToast('Masukkan jumlah transfer yang valid.', 'warning'); return; }

  const fromWallet = (wallets || []).find(w => w.name === fromName);
  if (fromWallet) {
    let fromBalance = fromWallet.initialBalance || 0;
    (transactions || []).forEach(t => {
      if (t.wallet === fromName) {
        if (t.type === 'income' || t.type === 'transfer_in') fromBalance += t.amount;
        else fromBalance -= t.amount;
      }
    });
    if (amount > fromBalance) {
      showToast(`Saldo ${fromName} tidak cukup (${formatRupiah(fromBalance)}).`, 'warning');
      return;
    }
  }

  const transferId = 'tr-' + Date.now();
  const note = noteStr || `Transfer dari ${fromName} ke ${toName}`;

  // Catat sebagai 2 transaksi linked: Keluar dari sumber + Masuk ke tujuan
  const txOut = {
    id: 'tx-trf-out-' + transferId,
    type: 'transfer_out',
    amount,
    currency: 'IDR',
    category: 'Transfer Antar Dompet',
    subCategory: `→ ${toName}`,
    wallet: fromName,
    date: dateStr,
    note: `[Transfer ke ${toName}] ${note}`,
    tags: '#Transfer',
    linkedTransferId: transferId
  };

  const txIn = {
    id: 'tx-trf-in-' + transferId,
    type: 'transfer_in',
    amount,
    currency: 'IDR',
    category: 'Transfer Antar Dompet',
    subCategory: `← ${fromName}`,
    wallet: toName,
    date: dateStr,
    note: `[Transfer dari ${fromName}] ${note}`,
    tags: '#Transfer',
    linkedTransferId: transferId
  };

  transactions.unshift(txIn);
  transactions.unshift(txOut);

  saveState();
  closeModal('transferModal');
  renderAllViews();
  showToast(`Transfer ${formatRupiah(amount)} dari ${fromName} → ${toName} berhasil!`, 'success');
}

window.deleteWallet = function(id) {
  if (confirm('Hapus dompet ini?')) {
    wallets = wallets.filter(w => w.id !== id);
    saveState();
    populateDropdowns();
    renderAllViews();
    showToast('Dompet telah dihapus.', 'danger');
  }
};

function renderCharts() {
  const textColor = currentTheme === 'dark' ? '#9ca3af' : '#4b5563';
  const gridColor = currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

  const monthsMap = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = d.toISOString().slice(0, 7);
    const label = d.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' });
    monthsMap[key] = { label, income: 0, expense: 0 };
  }

  (transactions || []).forEach(t => {
    if (t.date) {
      const key = t.date.slice(0, 7);
      if (monthsMap[key]) {
        if (t.type === 'income') monthsMap[key].income += t.amount;
        else monthsMap[key].expense += t.amount;
      }
    }
  });

  const labels = Object.values(monthsMap).map(m => m.label);
  const incomeData = Object.values(monthsMap).map(m => m.income);
  const expenseData = Object.values(monthsMap).map(m => m.expense);

  const ctxMonthly = document.getElementById('monthlyTrendChart').getContext('2d');
  if (monthlyChartInstance) monthlyChartInstance.destroy();

  monthlyChartInstance = new Chart(ctxMonthly, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Pemasukan', data: incomeData, backgroundColor: '#10b981', borderRadius: 6 },
        { label: 'Pengeluaran', data: expenseData, backgroundColor: '#f43f5e', borderRadius: 6 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: '600', size: 11 }, boxWidth: 12 }
        }
      },
      scales: {
        x: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: gridColor } },
        y: {
          ticks: {
            color: textColor,
            font: { size: 10 },
            callback: function(value) {
              if (value >= 1000000) return (value / 1000000) + ' Jt';
              if (value >= 1000) return (value / 1000) + ' rb';
              return value;
            }
          },
          grid: { color: gridColor }
        }
      }
    }
  });

  const categoryTotals = {};
  const currentMonthStr = new Date().toISOString().slice(0, 7);

  (transactions || [])
    .filter(t => t.type === 'expense' && t.date && t.date.startsWith(currentMonthStr))
    .forEach(t => { categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount; });

  const pieLabels = Object.keys(categoryTotals);
  const pieData = Object.values(categoryTotals);
  const pieColors = pieLabels.map(l => getCategoryMeta(l).color);

  const ctxPie = document.getElementById('categoryPieChart').getContext('2d');
  if (categoryChartInstance) categoryChartInstance.destroy();

  if (pieLabels.length === 0) {
    categoryChartInstance = new Chart(ctxPie, {
      type: 'doughnut',
      data: {
        labels: ['Belum ada pengeluaran'],
        datasets: [{ data: [1], backgroundColor: ['#374151'] }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: textColor } } }
      }
    });
  } else {
    categoryChartInstance = new Chart(ctxPie, {
      type: 'doughnut',
      data: {
        labels: pieLabels,
        datasets: [{
          data: pieData,
          backgroundColor: pieColors,
          borderWidth: 2,
          borderColor: currentTheme === 'dark' ? '#111827' : '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 10 }, boxWidth: 10 } } }
      }
    });
  }
}

// Calculators Logic
function handleZakatSubmit(e) {
  e.preventDefault();
  const assets = parseFormattedNumber(document.getElementById('zakatAssetInput').value);
  const goldPrice = parseFormattedNumber(document.getElementById('zakatGoldPriceInput').value);

  const nishab = 85 * goldPrice;
  const card = document.getElementById('zakatResultCard');
  card.style.display = 'block';

  if (assets >= nishab) {
    const zakatAmount = assets * 0.025;
    card.innerHTML = `
      <div style="font-weight: 800; color: var(--income); font-size: 1.1rem; margin-bottom: 6px;">
        <i class="fa-solid fa-circle-check"></i> Wajib Menunaikan Zakat
      </div>
      <p style="font-size: 0.88rem; color: var(--text-muted);">
        Total harta Anda (${formatRupiah(assets)}) telah mencapai Nishab minimum (${formatRupiah(nishab)}).
      </p>
      <div style="font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin-top: 10px;">
        Zakat Wajib: ${formatRupiah(zakatAmount)} / Tahun
      </div>
    `;
  } else {
    card.innerHTML = `
      <div style="font-weight: 800; color: var(--warning); font-size: 1.1rem; margin-bottom: 6px;">
        <i class="fa-solid fa-circle-info"></i> Belum Wajib Zakat Maal
      </div>
      <p style="font-size: 0.88rem; color: var(--text-muted);">
        Total harta Anda (${formatRupiah(assets)}) belum mencapai nisab minimum 85 gram emas (${formatRupiah(nishab)}).
      </p>
    `;
  }
}

function handleKprSubmit(e) {
  e.preventDefault();
  const principal = parseFormattedNumber(document.getElementById('kprPrincipalInput').value);
  const annualRate = parseFloat(document.getElementById('kprRateInput').value) / 100;
  const tenureYears = parseInt(document.getElementById('kprTenureInput').value);

  const monthlyRate = annualRate / 12;
  const totalMonths = tenureYears * 12;

  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - principal;

  const card = document.getElementById('kprResultCard');
  card.style.display = 'block';
  card.innerHTML = `
    <div style="font-size: 0.82rem; color: var(--text-muted);">Estimasi Angsuran Per Bulan:</div>
    <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary); margin: 4px 0 12px 0;">
      ${formatRupiah(Math.round(monthlyPayment))} / Bulan
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted);">
      <span>Total Pokok: ${formatRupiah(principal)}</span>
      <span>Total Bunga: ${formatRupiah(Math.round(totalInterest))}</span>
    </div>
    <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-top: 6px;">
      Total Bayar (+ Bunga): ${formatRupiah(Math.round(totalPayment))} (${totalMonths} bulan)
    </div>
  `;
}

function handlePinjolSubmit(e) {
  e.preventDefault();
  const principal = parseFormattedNumber(document.getElementById('pinjolPrincipalInput').value);
  const tenure = parseInt(document.getElementById('pinjolTenureInput').value) || 1;
  const tenureUnit = document.getElementById('pinjolTenureUnit').value;
  const ratePercent = parseFloat(document.getElementById('pinjolRateInput').value) || 0;
  const adminFeePercent = parseFloat(document.getElementById('pinjolAdminFeeInput').value) || 0;

  if (principal <= 0 || tenure <= 0) return;

  const adminFeeAmount = Math.round(principal * (adminFeePercent / 100));
  const netReceived = Math.max(0, principal - adminFeeAmount);

  let totalInterest = 0;
  if (tenureUnit === 'hari') {
    totalInterest = Math.round(principal * (ratePercent / 100) * tenure);
  } else {
    totalInterest = Math.round(principal * (ratePercent / 100) * tenure);
  }

  const totalRepayment = principal + totalInterest;
  const installmentPerPeriod = Math.round(totalRepayment / tenure);

  const card = document.getElementById('pinjolResultCard');
  card.style.display = 'block';

  let ojkNotice = '';
  if (tenureUnit === 'hari' && ratePercent > 0.1) {
    ojkNotice = `
      <div style="margin-top: 10px; padding: 10px; background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: var(--radius-sm); font-size: 0.78rem; color: var(--expense);">
        <i class="fa-solid fa-triangle-exclamation"></i> <b>Peringatan Bunga Tinggi:</b> Batas maksimum bunga pinjol konsumtif per hari adalah 0.1%. Bunga ${ratePercent}% per hari tergolong sangat tinggi!
      </div>
    `;
  }

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
      <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted);">Dana Bersih Diterima:</span>
      <span style="font-size: 1.15rem; font-weight: 800; color: var(--income);" class="privacy-target">${formatRupiah(netReceived)}</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.82rem; margin-bottom: 10px;">
      <div>
        <span style="color: var(--text-muted);">Potongan Admin (${adminFeePercent}%):</span>
        <div style="font-weight: 700; color: var(--expense);" class="privacy-target">${formatRupiah(adminFeeAmount)}</div>
      </div>
      <div>
        <span style="color: var(--text-muted);">Total Bunga Pinjol:</span>
        <div style="font-weight: 700; color: var(--expense);" class="privacy-target">${formatRupiah(totalInterest)}</div>
      </div>
    </div>

    <div style="padding: 10px; background: var(--bg-card); border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-top: 6px;">
      <div style="font-size: 0.8rem; color: var(--text-muted);">Total Yang Harus Dilunasi:</div>
      <div style="font-size: 1.35rem; font-weight: 800; color: #f43f5e; margin: 2px 0 4px 0;" class="privacy-target">${formatRupiah(totalRepayment)}</div>
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">
        Angsuran: <b class="privacy-target">${formatRupiah(installmentPerPeriod)}</b> / ${tenureUnit} (${tenure}x bayar)
      </div>
    </div>

    ${ojkNotice}
  `;
}

function handleCcSubmit(e) {
  e.preventDefault();
  const balance = parseFormattedNumber(document.getElementById('ccBalanceInput').value);
  const monthlyRatePercent = parseFloat(document.getElementById('ccRateInput').value) || 1.75;
  const minPayPercent = parseFloat(document.getElementById('ccMinPayPercentInput').value) || 5;

  if (balance <= 0) return;

  const minPayAmount = Math.max(50000, Math.round(balance * (minPayPercent / 100)));
  const monthlyInterestAmount = Math.round(balance * (monthlyRatePercent / 100));

  let simBalance = balance;
  let monthsCount = 0;
  let totalInterestPaid = 0;

  while (simBalance > 10000 && monthsCount < 360) {
    monthsCount++;
    const currentInterest = simBalance * (monthlyRatePercent / 100);
    totalInterestPaid += currentInterest;
    let payment = Math.max(50000, simBalance * (minPayPercent / 100));
    if (payment > simBalance + currentInterest) payment = simBalance + currentInterest;
    simBalance = simBalance + currentInterest - payment;
  }

  const card = document.getElementById('ccResultCard');
  card.style.display = 'block';

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
      <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted);">Minimum Payment Bulan Ini:</span>
      <span style="font-size: 1.2rem; font-weight: 800; color: #a855f7;" class="privacy-target">${formatRupiah(minPayAmount)}</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.82rem; margin-bottom: 10px;">
      <div>
        <span style="color: var(--text-muted);">Bunga Bulan Ini (${monthlyRatePercent}%):</span>
        <div style="font-weight: 700; color: var(--expense);" class="privacy-target">${formatRupiah(monthlyInterestAmount)}</div>
      </div>
      <div>
        <span style="color: var(--text-muted);">Pokok Terbayar Bulan Ini:</span>
        <div style="font-weight: 700; color: var(--income);" class="privacy-target">${formatRupiah(Math.max(0, minPayAmount - monthlyInterestAmount))}</div>
      </div>
    </div>

    <div style="padding: 10px; background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: var(--radius-sm); font-size: 0.8rem;">
      <div style="font-weight: 800; color: #a855f7; margin-bottom: 4px;"><i class="fa-solid fa-triangle-exclamation"></i> Analisis Bahaya Minimum Payment!</div>
      <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0 0 6px 0;">
        Jika Anda HANYA membayar pembayaran minimum (${minPayPercent}%) setiap bulan tanpa belanja baru:
      </p>
      <div style="display: flex; justify-content: space-between; font-weight: 700;">
        <span>Lama Waktu Lunas: <b>~${monthsCount} Bulan (${(monthsCount / 12).toFixed(1)} Tahun)</b></span>
        <span>Total Bunga: <b style="color: var(--expense);">${formatRupiah(Math.round(totalInterestPaid))}</b></span>
      </div>
    </div>
  `;
}

function handleVehicleSubmit(e) {
  e.preventDefault();
  const otrPrice = parseFormattedNumber(document.getElementById('vehiclePriceInput').value);
  const dpPercent = parseFloat(document.getElementById('vehicleDpPercentInput').value) || 20;
  const tenureYears = parseInt(document.getElementById('vehicleTenureInput').value) || 3;
  const annualInterestRate = parseFloat(document.getElementById('vehicleInterestInput').value) || 8;

  if (otrPrice <= 0) return;

  const dpAmount = Math.round(otrPrice * (dpPercent / 100));
  const principalDebt = Math.max(0, otrPrice - dpAmount);

  const totalInterest = Math.round(principalDebt * (annualInterestRate / 100) * tenureYears);
  const totalDebtWithInterest = principalDebt + totalInterest;
  const totalMonths = tenureYears * 12;
  const monthlyInstallment = Math.round(totalDebtWithInterest / totalMonths);

  const estAdminFee = 500000;
  const estTotalFirstPayment = dpAmount + estAdminFee + monthlyInstallment;

  const card = document.getElementById('vehicleResultCard');
  card.style.display = 'block';

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
      <div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">Estimasi Cicilan Bulanan:</div>
        <div style="font-size: 1.35rem; font-weight: 800; color: #3b82f6;" class="privacy-target">${formatRupiah(monthlyInstallment)} / Bulan</div>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 0.78rem; color: var(--text-muted);">Tenor:</span>
        <div style="font-weight: 800; font-size: 0.95rem;">${totalMonths} Bulan (${tenureYears} Thn)</div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.82rem; margin-bottom: 10px;">
      <div>
        <span style="color: var(--text-muted);">Uang Muka / DP (${dpPercent}%):</span>
        <div style="font-weight: 700; color: var(--text-main);" class="privacy-target">${formatRupiah(dpAmount)}</div>
      </div>
      <div>
        <span style="color: var(--text-muted);">Sisa Pokok Hutang OTR:</span>
        <div style="font-weight: 700; color: var(--text-main);" class="privacy-target">${formatRupiah(principalDebt)}</div>
      </div>
      <div>
        <span style="color: var(--text-muted);">Total Bunga (${annualInterestRate}%/Thn):</span>
        <div style="font-weight: 700; color: var(--expense);" class="privacy-target">${formatRupiah(totalInterest)}</div>
      </div>
      <div>
        <span style="color: var(--text-muted);">Total Pokok + Bunga:</span>
        <div style="font-weight: 700; color: var(--text-main);" class="privacy-target">${formatRupiah(totalDebtWithInterest)}</div>
      </div>
    </div>

    <div style="padding: 10px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: var(--radius-sm); font-size: 0.8rem;">
      <div style="font-weight: 700; color: #3b82f6; margin-bottom: 2px;"><i class="fa-solid fa-receipt"></i> Estimasi Total Bayar Pertama (TDP):</div>
      <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-main);" class="privacy-target">${formatRupiah(estTotalFirstPayment)}</div>
      <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">(Termasuk DP + Biaya Admin ~500rb + Angsuran Pertama)</div>
    </div>
  `;
}

// CSV & JSON Backup Export
function exportToCSV() {
  if (!transactions || transactions.length === 0) {
    showToast('Tidak ada transaksi untuk diekspor.', 'warning');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,ID,Tipe,Jumlah,MataUang,Kategori_Utama,Sub_Kategori,Dompet,Tanggal,Catatan,Tags\n';
  transactions.forEach(t => {
    const row = [
      t.id, t.type, t.amount, t.currency || 'IDR', `"${t.category}"`, `"${t.subCategory || 'Umum'}"`, `"${t.wallet}"`, t.date, `"${(t.note || '').replace(/"/g, '""')}"`, `"${t.tags || ''}"`
    ].join(',');
    csvContent += row + '\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `fintrack_catatan_keuangan_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('File CSV berhasil diunduh.', 'success');
}

function exportToJSON() {
  const data = { transactions, wallets, budgets, categories, savingsGoals, debts, recurringTxs, exportDate: new Date().toISOString() };
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `fintrack_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);

  showToast('Backup JSON berhasil diunduh.', 'success');
}

// Robust & Resilient JSON Importer
window.importFromJSON = function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const data = JSON.parse(evt.target.result);
      let importedTxCount = 0;

      if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
        if (Array.isArray(data.wallets) && data.wallets.length > 0) wallets = data.wallets;
        if (Array.isArray(data.budgets)) budgets = data.budgets;
        if (data.categories && typeof data.categories === 'object') categories = data.categories;
        if (Array.isArray(data.savingsGoals)) savingsGoals = data.savingsGoals;
        if (Array.isArray(data.debts)) debts = data.debts;
        if (Array.isArray(data.recurringTxs)) recurringTxs = data.recurringTxs;
      }

      let rawList = null;
      if (Array.isArray(data)) {
        rawList = data;
      } else if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data.transactions)) rawList = data.transactions;
        else if (Array.isArray(data.transaksi)) rawList = data.transaksi;
        else if (Array.isArray(data.items)) rawList = data.items;
        else if (Array.isArray(data.records)) rawList = data.records;
        else if (Array.isArray(data.data)) rawList = data.data;
        else if (Array.isArray(data.rows)) rawList = data.rows;
        else if (Array.isArray(data.laporan)) rawList = data.laporan;
      }

      ensureStateSchemaSafety();

      const defaultWalletName = (wallets && wallets.length > 0 && wallets[0].name) ? wallets[0].name : 'Kas / Cash';

      if (rawList !== null) {
        transactions = rawList.map((item, idx) => {
          const typeRaw = (item.type || item.tipe || item.jenis || '').toString().toLowerCase();
          const isIncome = typeRaw.includes('inc') || typeRaw.includes('masuk') || typeRaw.includes('pemasukan') || (parseFormattedNumber(item.amount || item.nominal || item.jumlah || 0) > 0 && !typeRaw.includes('exp') && !typeRaw.includes('keluar'));

          const amountVal = Math.abs(parseFormattedNumber(item.amount || item.nominal || item.jumlah || item.total || item.harga || item.value || 0)) || 0;
          const categoryVal = item.category || item.kategori || item.kategori_utama || 'Lain-lain (Pengeluaran)';
          const subCatVal = item.subCategory || item.sub_kategori || item.subkategori || 'Umum';
          const walletVal = item.wallet || item.dompet || item.akun || item.metode || defaultWalletName;
          
          let dateVal = item.date || item.tanggal || item.created_at || item.waktu || new Date().toISOString().split('T')[0];
          if (typeof dateVal === 'string' && dateVal.includes('T')) dateVal = dateVal.split('T')[0];

          const noteVal = item.note || item.catatan || item.keterangan || item.deskripsi || item.title || item.nama || `Transaksi ${idx + 1}`;
          const tagsVal = item.tags || item.tag || '';
          const currVal = item.currency || 'IDR';

          return {
            id: item.id || 'tx-imp-' + idx + '-' + Date.now(),
            type: isIncome ? 'income' : 'expense',
            amount: amountVal,
            currency: currVal,
            category: categoryVal,
            subCategory: subCatVal,
            wallet: walletVal,
            date: dateVal,
            note: noteVal,
            tags: tagsVal
          };
        });
        importedTxCount = transactions.length;
      }

      saveState();
      populateDropdowns();
      renderAllViews();
      closeModal('backupModal');
      showToast(`Berhasil memulihkan database & ${importedTxCount} transaksi dari berkas JSON!`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Gagal membaca berkas JSON. Pastikan berkas valid.', 'danger');
    }
    
    e.target.value = '';
  };
  reader.readAsText(file);
};

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'danger') icon = 'fa-circle-xmark';
  if (type === 'warning') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --------------------------------------------------------------------------
// GOOGLE DRIVE CLOUD BACKUP & RESTORE INTEGRATION
// --------------------------------------------------------------------------
let gdriveAccessToken = localStorage.getItem('fintrack_gdrive_token') || null;
let tokenClient = null;

const DEFAULT_GDRIVE_CLIENT_ID = "839401726481-sample.apps.googleusercontent.com"; 

window.initGoogleAuth = function(callback = null) {
  if (typeof google === 'undefined' || !google.accounts || !google.accounts.oauth2) {
    showToast('Library Google Identity Services sedang dimuat, coba 2 detik lagi.', 'warning');
    return;
  }

  const savedId = localStorage.getItem('fintrack_gdrive_client_id');
  let clientId = savedId;
  if (!clientId) {
    clientId = prompt('Masukkan Google OAuth Client ID Anda (atau tekan OK untuk memakai Client ID bawaan):', DEFAULT_GDRIVE_CLIENT_ID);
    if (clientId) localStorage.setItem('fintrack_gdrive_client_id', clientId.trim());
  }

  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId || DEFAULT_GDRIVE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/drive.file',
    callback: (tokenResponse) => {
      if (tokenResponse && tokenResponse.access_token) {
        gdriveAccessToken = tokenResponse.access_token;
        localStorage.setItem('fintrack_gdrive_token', gdriveAccessToken);
        updateGoogleDriveUI(true);
        showToast('Akun Google Drive berhasil terhubung!', 'success');
        if (callback && typeof callback === 'function') callback();
      } else {
        showToast('Gagal menghubungkan akun Google.', 'danger');
      }
    },
  });

  tokenClient.requestAccessToken({ prompt: 'consent' });
};

function updateGoogleDriveUI(isConnected) {
  const statusBox = document.getElementById('gdriveStatusText');
  if (statusBox) {
    if (isConnected || gdriveAccessToken) {
      statusBox.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--income);"></i> Terhubung ke Google Drive`;
    } else {
      statusBox.innerHTML = `<i class="fa-solid fa-circle-minus" style="color: var(--text-muted);"></i> Akun Google belum terhubung`;
    }
  }
}

window.uploadToGoogleDrive = function() {
  if (!gdriveAccessToken) {
    window.initGoogleAuth(() => window.uploadToGoogleDrive());
    return;
  }

  showToast('Mengunggah backup ke Google Drive...', 'info');

  const data = { transactions, wallets, budgets, categories, savingsGoals, debts, recurringTxs, exportDate: new Date().toISOString() };
  const jsonStr = JSON.stringify(data, null, 2);
  const fileName = `fintrack_backup_${new Date().toISOString().slice(0, 10)}.json`;

  const metadata = {
    name: fileName,
    mimeType: 'application/json'
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([jsonStr], { type: 'application/json' }));

  fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + gdriveAccessToken
    },
    body: form
  })
  .then(res => {
    if (res.status === 401) {
      gdriveAccessToken = null;
      localStorage.removeItem('fintrack_gdrive_token');
      window.initGoogleAuth(() => window.uploadToGoogleDrive());
      throw new Error('Token expired');
    }
    return res.json();
  })
  .then(file => {
    if (file && file.id) {
      showToast(`Backup ${fileName} berhasil diunggah ke Google Drive!`, 'success');
      updateGoogleDriveUI(true);
    } else {
      showToast('Gagal mengunggah ke Google Drive.', 'danger');
    }
  })
  .catch(err => {
    console.error(err);
  });
};

window.listGoogleDriveBackups = function() {
  if (!gdriveAccessToken) {
    window.initGoogleAuth(() => window.listGoogleDriveBackups());
    return;
  }

  showToast('Memuat daftar backup dari Google Drive...', 'info');

  const query = encodeURIComponent("name contains 'fintrack_backup_' and trashed = false");
  fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,createdTime,size)&orderBy=createdTime desc`, {
    headers: { 'Authorization': 'Bearer ' + gdriveAccessToken }
  })
  .then(res => {
    if (res.status === 401) {
      gdriveAccessToken = null;
      localStorage.removeItem('fintrack_gdrive_token');
      window.initGoogleAuth(() => window.listGoogleDriveBackups());
      throw new Error('Token expired');
    }
    return res.json();
  })
  .then(data => {
    const listEl = document.getElementById('gdriveBackupFileList');
    if (!listEl) return;

    if (!data.files || data.files.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted);">
          <i class="fa-brands fa-google-drive" style="font-size: 2rem; margin-bottom: 8px; display: block; color: #4285F4;"></i>
          <p>Belum ada berkas backup <i>fintrack_backup_*.json</i> di Google Drive Anda.</p>
        </div>
      `;
    } else {
      listEl.innerHTML = data.files.map(f => {
        const createdDate = f.createdTime ? new Date(f.createdTime).toLocaleString('id-ID') : '-';
        const sizeKB = f.size ? Math.round(f.size / 1024) + ' KB' : '-';
        return `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 14px; background: var(--bg-card); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <div>
              <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);"><i class="fa-solid fa-file-code" style="color: #4285F4;"></i> ${f.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Dibuat: ${createdDate} &bull; Ukuran: ${sizeKB}</div>
            </div>
            <button type="button" class="btn-primary" style="padding: 6px 12px; font-size: 0.78rem;" onclick="window.restoreFromGoogleDriveFile('${f.id}', '${f.name}')">
              <i class="fa-solid fa-cloud-arrow-down"></i> Restore
            </button>
          </div>
        `;
      }).join('');
    }

    openModal('gdriveRestoreModal');
  })
  .catch(err => {
    console.error(err);
  });
};

window.restoreFromGoogleDriveFile = function(fileId, fileName) {
  if (!confirm(`Apakah Anda yakin ingin memulihkan database dari berkas "${fileName}" di Google Drive?`)) return;

  fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { 'Authorization': 'Bearer ' + gdriveAccessToken }
  })
  .then(res => res.json())
  .then(data => {
    let importedTxCount = 0;
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      if (Array.isArray(data.wallets) && data.wallets.length > 0) wallets = data.wallets;
      if (Array.isArray(data.budgets)) budgets = data.budgets;
      if (data.categories && typeof data.categories === 'object') categories = data.categories;
      if (Array.isArray(data.savingsGoals)) savingsGoals = data.savingsGoals;
      if (Array.isArray(data.debts)) debts = data.debts;
      if (Array.isArray(data.recurringTxs)) recurringTxs = data.recurringTxs;
      if (Array.isArray(data.transactions)) transactions = data.transactions;
      importedTxCount = transactions.length;
    }

    ensureStateSchemaSafety();
    saveState();
    populateDropdowns();
    renderAllViews();
    closeModal('gdriveRestoreModal');
    closeModal('backupModal');
    showToast(`Berhasil me-restore database dari Google Drive! (${importedTxCount} transaksi)`, 'success');
  })
  .catch(err => {
    console.error(err);
    showToast('Gagal me-restore berkas dari Google Drive.', 'danger');
  });
};

// --------------------------------------------------------------------------
// PDF FINANCIAL REPORT GENERATOR & PRINT SUITE
// --------------------------------------------------------------------------
window.generatePdfReport = function(e) {
  if (e) e.preventDefault();

  const range = document.getElementById('pdfPeriodSelect') ? document.getElementById('pdfPeriodSelect').value : 'this-month';
  const includeSummary = document.getElementById('pdfIncludeSummary') ? document.getElementById('pdfIncludeSummary').checked : true;
  const includeCategories = document.getElementById('pdfIncludeCategories') ? document.getElementById('pdfIncludeCategories').checked : true;
  const includeWallets = document.getElementById('pdfIncludeWallets') ? document.getElementById('pdfIncludeWallets').checked : true;
  const includeTx = document.getElementById('pdfIncludeTransactions') ? document.getElementById('pdfIncludeTransactions').checked : true;

  const now = new Date();
  const currentMonthStr = now.toISOString().slice(0, 7);
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = lastMonthDate.toISOString().slice(0, 7);

  let periodLabel = 'Seluruh Histori Transaksi';
  if (range === 'this-month') periodLabel = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  if (range === 'last-month') periodLabel = lastMonthDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  if (range === 'this-year') periodLabel = 'Tahun ' + now.getFullYear();

  const filtered = (transactions || []).filter(t => {
    if (range === 'this-month' && (!t.date || !t.date.startsWith(currentMonthStr))) return false;
    if (range === 'last-month' && (!t.date || !t.date.startsWith(lastMonthStr))) return false;
    if (range === 'this-year' && (!t.date || !t.date.startsWith(now.getFullYear().toString()))) return false;
    return true;
  });

  let totalIncome = 0;
  let totalExpense = 0;
  const categoryTotals = {};

  filtered.forEach(t => {
    if (t.type === 'income' || t.type === 'transfer_in') {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  let totalBalance = 0;
  (wallets || []).forEach(w => { totalBalance += (w.initialBalance || 0); });
  (transactions || []).forEach(t => {
    if (t.type === 'income') totalBalance += t.amount;
    else if (t.type === 'expense') totalBalance -= t.amount;
  });

  const netFlow = totalIncome - totalExpense;

  const printWin = window.open('', '_blank');
  if (!printWin) {
    showToast('Izinkan pop-up browser untuk mencetak PDF laporan.', 'warning');
    return;
  }

  const printDoc = printWin.document;
  printDoc.open();
  printDoc.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Keuangan - FinTrack Studio (${periodLabel})</title>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { padding: 32px; color: #1e293b; background: #fff; line-height: 1.5; font-size: 13px; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #6366f1; padding-bottom: 16px; margin-bottom: 24px; }
        .brand { display: flex; align-items: center; gap: 10px; }
        .brand-icon { width: 38px; height: 38px; background: #6366f1; color: #fff; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; }
        .brand-title { font-size: 20px; font-weight: 800; color: #0f172a; }
        .brand-sub { font-size: 11px; color: #64748b; font-weight: 600; }
        .report-meta { text-align: right; font-size: 12px; color: #475569; }
        .report-meta h2 { font-size: 16px; font-weight: 800; color: #6366f1; margin-bottom: 2px; }
        
        .section-title { font-size: 13px; font-weight: 800; color: #0f172a; margin: 24px 0 10px 0; border-left: 4px solid #6366f1; padding-left: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
        .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; }
        .summary-card .label { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; }
        .summary-card .val { font-size: 15px; font-weight: 800; margin-top: 4px; color: #0f172a; }
        .summary-card.inc .val { color: #10b981; }
        .summary-card.exp .val { color: #f43f5e; }
        .summary-card.net .val { color: #6366f1; }

        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
        th { background: #f1f5f9; text-align: left; padding: 8px 10px; font-weight: 700; color: #334155; border-bottom: 2px solid #cbd5e1; }
        td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; color: #334155; }
        tr:nth-child(even) td { background: #fafafa; }
        
        .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
        .badge.income { background: #dcfce7; color: #15803d; }
        .badge.expense { background: #ffe4e6; color: #be123c; }

        .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; }
        @media print {
          body { padding: 0; }
          @page { margin: 1.5cm; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="brand">
          <div class="brand-icon">F</div>
          <div>
            <div class="brand-title">FinTrack Studio</div>
            <div class="brand-sub">Laporan Keuangan Pribadi Eksekutif</div>
          </div>
        </div>
        <div class="report-meta">
          <h2>LAPORAN KEUANGAN</h2>
          <div>Periode: <strong>${periodLabel}</strong></div>
          <div>Tanggal Cetak: ${now.toLocaleString('id-ID')}</div>
        </div>
      </div>

      ${includeSummary ? `
        <div class="summary-grid">
          <div class="summary-card">
            <div class="label">Total Saldo Bersih</div>
            <div class="val">${formatRupiah(totalBalance)}</div>
          </div>
          <div class="summary-card inc">
            <div class="label">Total Pemasukan</div>
            <div class="val">+${formatRupiah(totalIncome)}</div>
          </div>
          <div class="summary-card exp">
            <div class="label">Total Pengeluaran</div>
            <div class="val">-${formatRupiah(totalExpense)}</div>
          </div>
          <div class="summary-card net">
            <div class="label">Net Cashflow</div>
            <div class="val" style="color: ${netFlow >= 0 ? '#10b981' : '#f43f5e'}">${formatRupiah(netFlow)}</div>
          </div>
        </div>
      ` : ''}

      ${includeWallets ? `
        <div class="section-title">Rincian Saldo Dompet & Rekening Bank</div>
        <table>
          <thead>
            <tr><th>Nama Dompet</th><th>Tipe Akun</th><th style="text-align: right;">Saldo Saat Ini</th></tr>
          </thead>
          <tbody>
            ${(wallets || []).map(w => {
              let bal = w.initialBalance || 0;
              (transactions || []).forEach(t => {
                if (t.wallet === w.name) {
                  if (t.type === 'income' || t.type === 'transfer_in') bal += t.amount;
                  else bal -= t.amount;
                }
              });
              return `<tr><td><strong>${w.name}</strong></td><td>${w.type}</td><td style="text-align: right; font-weight: 700;">${formatRupiah(bal)}</td></tr>`;
            }).join('')}
          </tbody>
        </table>
      ` : ''}

      ${includeCategories && Object.keys(categoryTotals).length > 0 ? `
        <div class="section-title">Rincian Pengeluaran per Kategori Utama</div>
        <table>
          <thead>
            <tr><th>Kategori Pengeluaran</th><th style="text-align: right;">Total Pengeluaran</th><th style="text-align: right;">Porsi (%)</th></tr>
          </thead>
          <tbody>
            ${Object.entries(categoryTotals).sort((a,b) => b[1] - a[1]).map(([cat, amt]) => {
              const pct = totalExpense > 0 ? Math.round((amt / totalExpense) * 100) : 0;
              return `<tr><td><strong>${cat}</strong></td><td style="text-align: right; color: #f43f5e; font-weight: 700;">${formatRupiah(amt)}</td><td style="text-align: right;">${pct}%</td></tr>`;
            }).join('')}
          </tbody>
        </table>
      ` : ''}

      ${includeTx ? `
        <div class="section-title">Daftar Rincian Transaksi (${filtered.length} Transaksi)</div>
        <table>
          <thead>
            <tr><th>Tanggal</th><th>Tipe</th><th>Kategori / Sub</th><th>Dompet</th><th>Catatan</th><th style="text-align: right;">Nominal</th></tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `<tr><td colspan="6" style="text-align: center; color: #94a3b8; padding: 20px;">Tidak ada catatan transaksi pada periode ini.</td></tr>` : ''}
            ${filtered.map(t => {
              const isInc = t.type === 'income' || t.type === 'transfer_in';
              const badgeClass = isInc ? 'income' : 'expense';
              const typeLabel = t.type === 'transfer_in' ? 'Transfer Masuk' : (t.type === 'transfer_out' ? 'Transfer Keluar' : (isInc ? 'Pemasukan' : 'Pengeluaran'));
              return `
                <tr>
                  <td>${t.date || '-'}</td>
                  <td><span class="badge ${badgeClass}">${typeLabel}</span></td>
                  <td><strong>${t.category}</strong> ${t.subCategory ? `<br><small style="color:#64748b;">${t.subCategory}</small>` : ''}</td>
                  <td>${t.wallet}</td>
                  <td>${t.note || '-'} ${t.tags ? `<small style="color:#6366f1;">${t.tags}</small>` : ''}</td>
                  <td style="text-align: right; font-weight: 800; color: ${isInc ? '#10b981' : '#f43f5e'};">${isInc ? '+' : '-'}${formatRupiah(t.amount)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      ` : ''}

      <div class="footer">
        <div>Disusun & Dicetak Otomatis oleh FinTrack Studio App</div>
        <div>Dokumen Laporan Keuangan Pribadi</div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `);
  printDoc.close();

  closeModal('pdfReportModal');
  showToast('Jendela cetak Laporan PDF telah dibuka!', 'success');
};

// --------------------------------------------------------------------------
// RECEIPT PHOTO ATTACHMENT SUITE
// --------------------------------------------------------------------------
window.handleReceiptUpload = function(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    showToast('Ukuran gambar struk maksimal 2MB.', 'warning');
    e.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    const base64Data = evt.target.result;
    document.getElementById('txReceiptData').value = base64Data;
    const imgPreview = document.getElementById('txReceiptPreviewImg');
    const container = document.getElementById('txReceiptPreviewContainer');
    if (imgPreview && container) {
      imgPreview.src = base64Data;
      container.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
};

window.removeReceiptPhoto = function() {
  const input = document.getElementById('txReceiptInput');
  const dataInput = document.getElementById('txReceiptData');
  if (input) input.value = '';
  if (dataInput) dataInput.value = '';
  const container = document.getElementById('txReceiptPreviewContainer');
  if (container) container.style.display = 'none';
};

window.viewReceiptPhoto = function(txId) {
  const tx = (transactions || []).find(t => t.id === txId);
  if (!tx || !tx.receipt) return;

  const fullImg = document.getElementById('fullReceiptImg');
  if (fullImg) fullImg.src = tx.receipt;
  openModal('viewReceiptModal');
};

// --------------------------------------------------------------------------
// HEADER NOTIFICATIONS & DUE REMINDERS SYSTEM
// --------------------------------------------------------------------------
window.toggleNotificationDropdown = function() {
  const dropdown = document.getElementById('notificationDropdown');
  if (!dropdown) return;
  if (dropdown.style.display === 'none' || !dropdown.style.display) {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
};

function renderNotifications() {
  const notifListEl = document.getElementById('notificationList');
  const badgeEl = document.getElementById('notificationBadge');
  const countTextEl = document.getElementById('notifCountText');

  if (!notifListEl) return;

  const items = [];
  const today = new Date();

  // 1. Check Recurring Txs due soon
  (recurringTxs || []).forEach(r => {
    items.push({
      type: 'recurring',
      icon: 'fa-rotate',
      color: 'var(--primary)',
      title: `Tagihan Rutin: ${r.title}`,
      sub: `Nominal ${formatRupiah(r.amount)} &bull; ${r.frequency || 'Bulanan'}`,
      actionText: 'Eksekusi',
      actionFn: `window.executeRecurringNow('${r.id}')`
    });
  });

  // 2. Check Debts due soon / overdue
  (debts || []).forEach(d => {
    const isLunas = (d.payments || []).reduce((acc, p) => acc + p.amount, 0) >= d.amount;
    if (!isLunas) {
      const isHutang = d.type === 'hutang';
      const label = isHutang ? `Hutang ke ${d.person}` : `Piutang pada ${d.person}`;
      const rem = d.amount - (d.payments || []).reduce((acc, p) => acc + p.amount, 0);
      items.push({
        type: 'debt',
        icon: 'fa-handshake',
        color: isHutang ? 'var(--warning)' : 'var(--income)',
        title: label,
        sub: `Sisa ${formatRupiah(rem)} &bull; Jatuh Tempo: ${d.dueDate || 'Segera'}`,
        actionText: 'Bayar',
        actionFn: `window.openDebtPayModal('${d.id}')`
      });
    }
  });

  // 3. Check Budget Alerts
  (budgets || []).forEach(b => {
    const currentMonthStr = today.toISOString().slice(0, 7);
    let spent = 0;
    const catList = Array.isArray(b.categories) ? b.categories : [b.category];
    (transactions || []).forEach(t => {
      if (t.type === 'expense' && t.date && t.date.startsWith(currentMonthStr) && catList.includes(t.category)) {
        spent += t.amount;
      }
    });

    const pct = b.limit > 0 ? Math.round((spent / b.limit) * 100) : 0;
    if (pct >= 80) {
      items.push({
        type: 'budget',
        icon: 'fa-triangle-exclamation',
        color: pct >= 100 ? 'var(--expense)' : 'var(--warning)',
        title: `Anggaran "${b.name || catList.join(', ')}" ${pct}%`,
        sub: `Terpakai ${formatRupiah(spent)} dari batas ${formatRupiah(b.limit)}`,
        actionText: 'Detail',
        actionFn: `window.openBudgetDetailModal('${b.id}')`
      });
    }
  });

  if (badgeEl) {
    if (items.length > 0) {
      badgeEl.innerText = items.length;
      badgeEl.style.display = 'flex';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  if (countTextEl) countTextEl.innerText = `${items.length} Pengingat`;

  if (items.length === 0) {
    notifListEl.innerHTML = `
      <div style="text-align: center; padding: 18px 10px; color: var(--text-muted); font-size: 0.82rem;">
        <i class="fa-solid fa-circle-check" style="color: var(--income); font-size: 1.5rem; margin-bottom: 6px; display: block;"></i>
        Semua tagihan, hutang & anggaran dalam kondisi aman!
      </div>
    `;
  } else {
    notifListEl.innerHTML = items.map(it => `
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; padding: 8px 10px; background: var(--bg-main); border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 0.8rem;">
        <div style="display: flex; gap: 8px; align-items: flex-start;">
          <i class="fa-solid ${it.icon}" style="color: ${it.color}; font-size: 0.9rem; margin-top: 2px;"></i>
          <div>
            <div style="font-weight: 700; color: var(--text-main); line-height: 1.2;">${it.title}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">${it.sub}</div>
          </div>
        </div>
        <button type="button" class="btn-primary" style="padding: 3px 8px; font-size: 0.7rem; white-space: nowrap;" onclick="${it.actionFn}">${it.actionText}</button>
      </div>
    `).join('');
  }
}

// --------------------------------------------------------------------------
// CASH FLOW & INCOME STATEMENT WIDGET
// --------------------------------------------------------------------------
function renderCashflowStatement() {
  const container = document.getElementById('cashflowStatementContainer');
  if (!container) return;

  const now = new Date();
  const currentMonthStr = now.toISOString().slice(0, 7);
  const currentYearStr = now.getFullYear().toString();

  let monthIncome = 0;
  let monthExpense = 0;
  let yearIncome = 0;
  let yearExpense = 0;

  (transactions || []).forEach(t => {
    if (!t.date) return;
    if (t.date.startsWith(currentMonthStr)) {
      if (t.type === 'income') monthIncome += t.amount;
      else if (t.type === 'expense') monthExpense += t.amount;
    }

    if (t.date.startsWith(currentYearStr)) {
      if (t.type === 'income') yearIncome += t.amount;
      else if (t.type === 'expense') yearExpense += t.amount;
    }
  });

  const monthNet = monthIncome - monthExpense;
  const yearNet = yearIncome - yearExpense;
  const savingsRate = monthIncome > 0 ? Math.round(((monthIncome - monthExpense) / monthIncome) * 100) : 0;

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
      <div style="padding: 12px; background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Laba / Rugi Bulan Ini</div>
        <div style="font-size: 1.2rem; font-weight: 800; color: ${monthNet >= 0 ? 'var(--income)' : 'var(--expense)'}; margin-top: 4px;">
          ${monthNet >= 0 ? '+' : ''}${formatRupiah(monthNet)}
        </div>
        <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Rasio Tabungan: <strong style="color: var(--text-main);">${savingsRate}%</strong></div>
      </div>

      <div style="padding: 12px; background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Surplus YTD (Tahun ${now.getFullYear()})</div>
        <div style="font-size: 1.2rem; font-weight: 800; color: ${yearNet >= 0 ? 'var(--primary)' : 'var(--expense)'}; margin-top: 4px;">
          ${yearNet >= 0 ? '+' : ''}${formatRupiah(yearNet)}
        </div>
        <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Total Income: ${formatRupiah(yearIncome)}</div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// EMERGENCY FUND & PENSION CALCULATORS SUITE
// --------------------------------------------------------------------------
window.handleEmergencyFundSubmit = function(e) {
  if (e) e.preventDefault();
  const expense = parseFormattedNumber(document.getElementById('efExpenseInput').value);
  const status = document.getElementById('efStatusSelect').value;

  let multiplier = 3;
  let statusLabel = "Single / Lazim";
  if (status === 'single-dependents') { multiplier = 6; statusLabel = "Single + Tanggungan"; }
  if (status === 'married') { multiplier = 6; statusLabel = "Menikah Tanpa Anak"; }
  if (status === 'married-1child') { multiplier = 9; statusLabel = "Menikah + 1 Anak"; }
  if (status === 'married-2child') { multiplier = 12; statusLabel = "Menikah + 2+ Anak / Freelancer"; }

  const idealFund = expense * multiplier;
  const card = document.getElementById('efResultCard');
  if (card) {
    card.style.display = 'block';
    card.innerHTML = `
      <div style="font-size: 0.82rem; color: var(--text-muted);">Target Dana Darurat Ideal (${multiplier} Bulan Pengeluaran):</div>
      <div style="font-size: 1.45rem; font-weight: 800; color: var(--income); margin: 4px 0 10px 0;">
        ${formatRupiah(idealFund)}
      </div>
      <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">
        Berdasarkan profil status <strong>${statusLabel}</strong> dan pengeluaran bulanan ${formatRupiah(expense)}, Anda direkomendasikan memiliki cadangan kas sebesar ${formatRupiah(idealFund)}.
      </p>
    `;
  }
};

window.handlePensionSubmit = function(e) {
  if (e) e.preventDefault();
  const initial = parseFormattedNumber(document.getElementById('pensionInitialInput').value) || 0;
  const monthly = parseFormattedNumber(document.getElementById('pensionMonthlyInput').value);
  const annualReturn = parseFloat(document.getElementById('pensionReturnInput').value) / 100;
  const years = parseInt(document.getElementById('pensionYearsInput').value);

  const months = years * 12;
  const r = annualReturn / 12;

  const fvInitial = initial * Math.pow(1 + r, months);
  const fvMonthly = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  const totalAccumulated = Math.round(fvInitial + fvMonthly);

  const totalInvested = initial + (monthly * months);
  const totalInterest = totalAccumulated - totalInvested;

  const card = document.getElementById('pensionResultCard');
  if (card) {
    card.style.display = 'block';
    card.innerHTML = `
      <div style="font-size: 0.82rem; color: var(--text-muted);">Estimasi Akumulasi Saldo Pensiun (${years} Tahun):</div>
      <div style="font-size: 1.45rem; font-weight: 800; color: #f59e0b; margin: 4px 0 10px 0;">
        ${formatRupiah(totalAccumulated)}
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8rem; margin-top: 10px;">
        <div style="padding: 8px; background: var(--bg-main); border-radius: var(--radius-sm);">
          <span style="color: var(--text-muted);">Total Modal Disetor:</span><br>
          <strong>${formatRupiah(totalInvested)}</strong>
        </div>
        <div style="padding: 8px; background: var(--bg-main); border-radius: var(--radius-sm);">
          <span style="color: var(--income);">Hasil Return Investasi:</span><br>
          <strong style="color: var(--income);">+${formatRupiah(totalInterest)}</strong>
        </div>
      </div>
    `;
  }
};

// --------------------------------------------------------------------------
// 1. SMART AI FINANCIAL INSIGHTS WIDGET
// --------------------------------------------------------------------------
function renderSmartInsights() {
  const container = document.getElementById('smartInsightsContainer');
  if (!container) return;

  const now = new Date();
  const currentMonthStr = now.toISOString().slice(0, 7);
  
  const lastMonthObj = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = lastMonthObj.toISOString().slice(0, 7);

  let curIncome = 0, curExpense = 0;
  let lastExpense = 0;
  const categoryExpenses = {};

  (transactions || []).forEach(t => {
    if (t.date && t.date.startsWith(currentMonthStr)) {
      if (t.type === 'income') curIncome += t.amount;
      if (t.type === 'expense') {
        curExpense += t.amount;
        const cat = t.category || 'Lain-lain';
        categoryExpenses[cat] = (categoryExpenses[cat] || 0) + t.amount;
      }
    } else if (t.date && t.date.startsWith(lastMonthStr)) {
      if (t.type === 'expense') lastExpense += t.amount;
    }
  });

  const insights = [];

  // Insight 1: Savings Rate / Net Surplus
  const netSurplus = curIncome - curExpense;
  const savingsRate = curIncome > 0 ? Math.round((netSurplus / curIncome) * 100) : 0;
  if (curIncome > 0 && savingsRate >= 20) {
    insights.push({
      icon: 'fa-trophy',
      color: 'var(--income)',
      bg: 'var(--income-bg)',
      border: 'var(--income-border)',
      title: 'Kinerja Tabungan Sangat Baik!',
      desc: `Rasio tabungan Anda bulan ini mencapai <strong>${savingsRate}%</strong> (${formatRupiah(netSurplus)}). Ini sudah melampaui target ideal (20%). Pertahankan!`
    });
  } else if (curIncome > 0 && savingsRate < 0) {
    insights.push({
      icon: 'fa-triangle-exclamation',
      color: 'var(--expense)',
      bg: 'var(--expense-bg)',
      border: 'var(--expense-border)',
      title: 'Peringatan Defisit Keuangan!',
      desc: `Pengeluaran bulan ini melebihi pemasukan sebesar <strong>${formatRupiah(Math.abs(netSurplus))}</strong>. Evaluasi pengeluaran non-pokok Anda.`
    });
  }

  // Insight 2: Category Top Spending
  let topCat = null, topCatAmount = 0;
  Object.keys(categoryExpenses).forEach(cat => {
    if (categoryExpenses[cat] > topCatAmount) {
      topCatAmount = categoryExpenses[cat];
      topCat = cat;
    }
  });
  if (topCat && curExpense > 0) {
    const percent = Math.round((topCatAmount / curExpense) * 100);
    insights.push({
      icon: 'fa-chart-pie',
      color: 'var(--primary)',
      bg: 'rgba(99, 102, 241, 0.1)',
      border: 'rgba(99, 102, 241, 0.25)',
      title: `Pengeluaran Terbesar: ${topCat}`,
      desc: `Kategori <strong>${topCat}</strong> memakan <strong>${percent}%</strong> (${formatRupiah(topCatAmount)}) dari total pengeluaran Anda bulan ini.`
    });
  }

  // Insight 3: Low Wallet Balances Warning
  const lowWallets = (wallets || []).filter(w => {
    let bal = w.initialBalance || 0;
    (transactions || []).forEach(t => {
      if (t.wallet === w.name) {
        if (t.type === 'income') bal += t.amount;
        if (t.type === 'expense') bal -= t.amount;
      }
    });
    return bal < 100000 && bal > 0;
  });

  if (lowWallets.length > 0) {
    const walletNames = lowWallets.map(w => w.name).join(', ');
    insights.push({
      icon: 'fa-wallet',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.25)',
      title: 'Peringatan Saldo Dompet Rendah',
      desc: `Saldo pada dompet <strong>${walletNames}</strong> di bawah Rp 100.000. Pertimbangkan untuk melakukan top-up.`
    });
  }

  if (insights.length === 0) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <div style="padding: 16px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
      <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--primary);"></i>
        <span>AI Smart Financial Insights</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">
  `;

  insights.forEach(item => {
    html += `
      <div style="padding: 12px 14px; background: ${item.bg}; border: 1px solid ${item.border}; border-radius: var(--radius-md); display: flex; gap: 12px; align-items: flex-start;">
        <div style="width: 36px; height: 36px; border-radius: 10px; background: ${item.color}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <div>
          <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-main); margin-bottom: 3px;">${item.title}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">${item.desc}</div>
        </div>
      </div>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
}

// --------------------------------------------------------------------------
// 2. YEAR-OVER-YEAR (YoY) 12 MONTHS RECAPITULATION MATRIX
// --------------------------------------------------------------------------
function renderYoYTable() {
  const container = document.getElementById('yoyTableContainer');
  if (!container) return;

  const currentYear = calendarCurrentDate ? calendarCurrentDate.getFullYear() : new Date().getFullYear();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  
  const monthlyData = Array.from({ length: 12 }, () => ({ income: 0, expense: 0 }));

  (transactions || []).forEach(t => {
    if (t.date && t.date.length >= 7) {
      const year = parseInt(t.date.slice(0, 4));
      const monthIdx = parseInt(t.date.slice(5, 7)) - 1;
      if (year === currentYear && monthIdx >= 0 && monthIdx < 12) {
        if (t.type === 'income') monthlyData[monthIdx].income += t.amount;
        if (t.type === 'expense') monthlyData[monthIdx].expense += t.amount;
      }
    }
  });

  let totalYrIncome = 0, totalYrExpense = 0;
  monthlyData.forEach(m => {
    totalYrIncome += m.income;
    totalYrExpense += m.expense;
  });

  let html = `
    <table class="table-custom" style="width: 100%; min-width: 650px; font-size: 0.82rem;">
      <thead>
        <tr>
          <th>Bulan</th>
          <th style="text-align: right;">Pemasukan (+)</th>
          <th style="text-align: right;">Pengeluaran (-)</th>
          <th style="text-align: right;">Net Surplus</th>
          <th style="text-align: center;">Savings Rate</th>
        </tr>
      </thead>
      <tbody>
  `;

  monthlyData.forEach((m, idx) => {
    const net = m.income - m.expense;
    const sRate = m.income > 0 ? Math.round((net / m.income) * 100) : 0;
    const netColor = net >= 0 ? 'var(--income)' : 'var(--expense)';

    html += `
      <tr>
        <td><strong>${monthNames[idx]} ${currentYear}</strong></td>
        <td style="text-align: right; color: var(--income);" class="privacy-target">${formatRupiah(m.income)}</td>
        <td style="text-align: right; color: var(--expense);" class="privacy-target">${formatRupiah(m.expense)}</td>
        <td style="text-align: right; color: ${netColor}; font-weight: 700;" class="privacy-target">${formatRupiah(net)}</td>
        <td style="text-align: center;">
          <span style="padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 700; background: ${sRate >= 20 ? 'var(--income-bg)' : 'var(--bg-main)'}; color: ${sRate >= 20 ? 'var(--income)' : 'var(--text-muted)'}; border: 1px solid ${sRate >= 20 ? 'var(--income-border)' : 'var(--border-color)'};">
            ${sRate}%
          </span>
        </td>
      </tr>
    `;
  });

  const totalNet = totalYrIncome - totalYrExpense;
  const avgIncome = Math.round(totalYrIncome / 12);
  const avgExpense = Math.round(totalYrExpense / 12);

  html += `
      <tr style="background: var(--bg-glass); font-weight: 800; border-top: 2px solid var(--border-color);">
        <td>TOTAL TAHUNAN</td>
        <td style="text-align: right; color: var(--income);" class="privacy-target">${formatRupiah(totalYrIncome)}</td>
        <td style="text-align: right; color: var(--expense);" class="privacy-target">${formatRupiah(totalYrExpense)}</td>
        <td style="text-align: right; color: ${totalNet >= 0 ? 'var(--income)' : 'var(--expense)'};" class="privacy-target">${formatRupiah(totalNet)}</td>
        <td style="text-align: center;">-</td>
      </tr>
      <tr style="background: var(--bg-main); font-size: 0.78rem; color: var(--text-muted);">
        <td>RATA-RATA BULANAN</td>
        <td style="text-align: right;" class="privacy-target">${formatRupiah(avgIncome)}</td>
        <td style="text-align: right;" class="privacy-target">${formatRupiah(avgExpense)}</td>
        <td style="text-align: right;" class="privacy-target">${formatRupiah(Math.round(totalNet / 12))}</td>
        <td style="text-align: center;">-</td>
      </tr>
      </tbody>
    </table>
  `;

  container.innerHTML = html;
  const labelEl = document.getElementById('yoyYearLabel');
  if (labelEl) labelEl.innerText = `Tahun ${currentYear}`;
}

// --------------------------------------------------------------------------
// 3. HASHTAG ANALYTICS TRACKER (#Hashtag)
// --------------------------------------------------------------------------
function renderHashtagAnalytics() {
  const container = document.getElementById('hashtagAnalyticsContainer');
  if (!container) return;

  const hashtagMap = {};

  (transactions || []).forEach(t => {
    if (t.tags) {
      const matches = t.tags.match(/#[a-zA-Z0-9_]+/g);
      if (matches) {
        matches.forEach(tag => {
          const cleanTag = tag.toLowerCase();
          if (!hashtagMap[cleanTag]) {
            hashtagMap[cleanTag] = { income: 0, expense: 0, count: 0 };
          }
          hashtagMap[cleanTag].count += 1;
          if (t.type === 'income') hashtagMap[cleanTag].income += t.amount;
          if (t.type === 'expense') hashtagMap[cleanTag].expense += t.amount;
        });
      }
    }
  });

  const tags = Object.keys(hashtagMap);
  if (tags.length === 0) {
    container.innerHTML = `
      <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.82rem;">
        Belum ada hashtag ditemukan. Tambahkan #hashtag (contoh: <em>#Kuliner, #Liburan</em>) pada catatan transaksi Anda.
      </div>
    `;
    return;
  }

  let html = `<div style="display: flex; gap: 10px; flex-wrap: wrap;">`;

  tags.forEach(tag => {
    const data = hashtagMap[tag];
    html += `
      <div style="padding: 10px 14px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.82rem; display: flex; flex-direction: column; gap: 4px; min-width: 150px; flex: 1;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <strong style="color: var(--primary); font-size: 0.88rem;">${tag}</strong>
          <span style="font-size: 0.72rem; color: var(--text-muted); background: var(--bg-main); padding: 2px 6px; border-radius: 8px;">${data.count}x</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.78rem;">
          <span style="color: var(--expense);" class="privacy-target">-${formatRupiah(data.expense)}</span>
          ${data.income > 0 ? `<span style="color: var(--income);" class="privacy-target">+${formatRupiah(data.income)}</span>` : ''}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// --------------------------------------------------------------------------
// 4. PIN 4-DIGIT SECURITY LOCK MANAGER
// --------------------------------------------------------------------------
let enteredPinBuffer = '';

window.checkPinLockStatus = function() {
  const savedPin = localStorage.getItem('fintrack_pin');
  const pinOverlay = document.getElementById('pinLockOverlay');
  if (savedPin && pinOverlay) {
    pinOverlay.style.display = 'flex';
  } else if (pinOverlay) {
    pinOverlay.style.display = 'none';
  }
};

window.enterPinDigit = function(digit) {
  if (enteredPinBuffer.length < 4) {
    enteredPinBuffer += digit;
    updatePinDotsUI();
    if (enteredPinBuffer.length === 4) {
      setTimeout(() => verifyPinInput(), 150);
    }
  }
};

window.deletePinDigit = function() {
  if (enteredPinBuffer.length > 0) {
    enteredPinBuffer = enteredPinBuffer.slice(0, -1);
    updatePinDotsUI();
  }
};

window.clearPinInput = function() {
  enteredPinBuffer = '';
  updatePinDotsUI();
};

function updatePinDotsUI() {
  const dots = document.querySelectorAll('.pin-dot');
  const errEl = document.getElementById('pinErrorMsg');
  if (errEl) errEl.innerText = '';
  dots.forEach((dot, idx) => {
    if (idx < enteredPinBuffer.length) {
      dot.style.background = 'var(--primary)';
      dot.style.borderColor = 'var(--primary)';
    } else {
      dot.style.background = 'transparent';
      dot.style.borderColor = 'var(--border-color)';
    }
  });
}

function verifyPinInput() {
  const savedPin = localStorage.getItem('fintrack_pin');
  if (enteredPinBuffer === savedPin) {
    const pinOverlay = document.getElementById('pinLockOverlay');
    if (pinOverlay) pinOverlay.style.display = 'none';
    enteredPinBuffer = '';
    updatePinDotsUI();
    showToast('Aplikasi FinTrack Studio berhasil dibuka!', 'success');
  } else {
    const errEl = document.getElementById('pinErrorMsg');
    if (errEl) errEl.innerText = 'PIN Salah. Silahkan coba lagi.';
    enteredPinBuffer = '';
    updatePinDotsUI();
  }
}

window.setupPinSecurity = function() {
  const currentPin = localStorage.getItem('fintrack_pin');
  if (currentPin) {
    if (confirm('Aplikasi saat ini dilindungi PIN. Apakah Anda ingin MENGHAPUS kunci PIN ini?')) {
      localStorage.removeItem('fintrack_pin');
      showToast('Kunci PIN berhasil dihapus.', 'info');
      updatePinBtnUI();
    }
  } else {
    const newPin = prompt('Masukkan 4-digit PIN baru untuk mengunci aplikasi FinTrack:');
    if (newPin && newPin.length === 4 && !isNaN(newPin)) {
      localStorage.setItem('fintrack_pin', newPin);
      showToast('Kunci PIN 4-digit berhasil diaktifkan!', 'success');
      updatePinBtnUI();
    } else if (newPin) {
      alert('PIN harus berupa 4 angka numerik!');
    }
  }
};

function updatePinBtnUI() {
  const btnText = document.getElementById('pinBtnText');
  if (btnText) {
    const hasPin = !!localStorage.getItem('fintrack_pin');
    btnText.innerText = hasPin ? 'Hapus Kunci PIN (Aktif)' : 'Atur Kunci PIN (4-Digit)';
  }
}

// --------------------------------------------------------------------------
// 5. LIVE EXCHANGE RATES API (Real-time FX Rates)
// --------------------------------------------------------------------------
window.updateLiveExchangeRates = async function(notify = true) {
  try {
    if (notify) showToast('Menghubungkan ke API Kurs Mata Uang Real-time...', 'info');
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    if (data && data.rates && data.rates.IDR) {
      const usdIdr = data.rates.IDR;
      const eurIdr = usdIdr / (data.rates.EUR || 0.92);
      const sgdIdr = usdIdr / (data.rates.SGD || 1.34);
      const jpyIdr = usdIdr / (data.rates.JPY || 155);
      const sarIdr = usdIdr / (data.rates.SAR || 3.75);

      CURRENCY_RATES['USD'] = Math.round(usdIdr);
      CURRENCY_RATES['EUR'] = Math.round(eurIdr);
      CURRENCY_RATES['SGD'] = Math.round(sgdIdr);
      CURRENCY_RATES['JPY'] = Math.round(jpyIdr);
      CURRENCY_RATES['SAR'] = Math.round(sarIdr);

      localStorage.setItem('fintrack_fx_rates', JSON.stringify(CURRENCY_RATES));
      renderAllViews();
      if (notify) showToast(`Kurs Real-Time Berhasil Diperbarui! (1 USD = ${formatRupiah(usdIdr)})`, 'success');
    }
  } catch(e) {
    console.warn('FX Rate Fetch error:', e);
    if (notify) showToast('Menggunakan Kurs Statis Terakhir.', 'warning');
  }
};

// --------------------------------------------------------------------------
// 6. WEB PUSH NOTIFICATION & LOCAL ALARM MANAGER
// --------------------------------------------------------------------------
window.requestNotificationPermission = function() {
  if (!('Notification' in window)) {
    showToast('Browser Anda tidak mendukung Web Push Notifications.', 'warning');
    return;
  }
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      showToast('Notifikasi Push berhasil diaktifkan di HP/Browser Anda!', 'success');
      sendDeviceNotification('FinTrack Studio Connected', 'Notifikasi pengingat tagihan & hutang aktif.');
    } else {
      showToast('Izin notifikasi ditolak oleh pengguna.', 'warning');
    }
  });
};

function sendDeviceNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body: body,
      icon: 'https://cdn-icons-png.flaticon.com/512/2845/2845894.png'
    });
  }
}
