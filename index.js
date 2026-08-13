// Data & chart utilities loaded from mockData.js & charts.js via global scope/window

// ==========================================================================
// Application State
// ==========================================================================
let currentCategory = 'all';
let currentFilter = 'all'; // 'all', 'popular', 'recent'
let searchQuery = '';
let bookmarkedIds = JSON.parse(localStorage.getItem('silicon_bookmarks') || '[]');

// Active charts tracking for re-rendering on theme change
let mainChart = null;
let sideChart = null;

// ==========================================================================
// DOM Elements
// ==========================================================================
const mainNav = document.getElementById('main-nav');
const newsGrid = document.getElementById('news-grid-container');
const dictionaryView = document.getElementById('dictionary-view');
const chartsDashboard = document.getElementById('charts-dashboard');
const categoryTitle = document.getElementById('category-title');
const categoryDesc = document.getElementById('category-desc');

// Search & Filter
const newsSearch = document.getElementById('news-search');
const filterBtns = document.querySelectorAll('.filter-btn');

// Bookmarks & Theme
const bookmarkCount = document.getElementById('bookmark-count');
const sidebarBookmarks = document.getElementById('sidebar-bookmarks');
const themeToggle = document.getElementById('theme-toggle');

// Article Drawer
const articleDrawer = document.getElementById('article-drawer');
const drawerOverlay = document.getElementById('article-drawer-overlay');
const closeDrawerBtn = document.getElementById('close-drawer');
const drawerBody = document.getElementById('drawer-content-body');
const relatedNewsContainer = document.getElementById('related-news-container');
const drawerBookmarkBtn = document.getElementById('drawer-bookmark-btn');
const drawerShareBtn = document.getElementById('drawer-share-btn');

// Toast
const toast = document.getElementById('toast');

// ==========================================================================
// Initialisation & Mounting
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Render static data widgets
  renderLiveTicker();
  renderSidebarIndices();
  renderSidebarRankings();
  renderBookmarksList();
  
  // Render News Feed / Home
  updateView();
  
  // Render sidebar mini chart (Product category share)
  sideChart = renderMarketShareChart('mini-share-chart', marketShareData);

  // Setup Event Listeners
  setupEventListeners();

  // Initialise Lucide icons
  lucide.createIcons();
}

// ==========================================================================
// Event Listeners Configuration
// ==========================================================================
function setupEventListeners() {
  // Navigation Menu tabs
  mainNav.addEventListener('click', (e) => {
    const tab = e.target.closest('.nav-tab');
    if (!tab) return;

    // Toggle active state in GNB
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Change category & Reset filters
    currentCategory = tab.dataset.category;
    currentFilter = 'all';
    
    // Update active filter button visually
    filterBtns.forEach(btn => {
      if (btn.dataset.filter === 'all') btn.classList.add('active');
      else btn.classList.remove('active');
    });

    updateView();
    closeArticleDrawer();
  });

  // Filter Buttons (All, Popular, Recent)
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderNewsFeed();
    });
  });

  // Search input typing
  newsSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    
    // If user is inside "Tech Dictionary", it will filter the glossary cards.
    if (currentCategory === 'tech-dictionary') {
      renderDictionaryView();
    } else {
      renderNewsFeed();
    }
  });

  // Drawer events
  closeDrawerBtn.addEventListener('click', closeArticleDrawer);
  drawerOverlay.addEventListener('click', closeArticleDrawer);

  // Theme Toggle
  themeToggle.addEventListener('click', toggleTheme);

  // Share Copy Button inside Drawer
  drawerShareBtn.addEventListener('click', () => {
    const text = window.location.href;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Article link copied to clipboard.');
    });
  });

  // Bookmark Toggle in Drawer
  drawerBookmarkBtn.addEventListener('click', () => {
    const articleId = drawerBookmarkBtn.dataset.articleId;
    if (articleId) {
      toggleBookmark(articleId);
      updateDrawerBookmarkButton(articleId);
    }
  });

  // Ticker click actions to focus on news search
  document.getElementById('ticker-track').addEventListener('click', (e) => {
    const item = e.target.closest('.ticker-item');
    if (!item) return;
    const symbol = item.dataset.symbol;
    newsSearch.value = symbol;
    searchQuery = symbol.toLowerCase();
    newsSearch.focus();
    
    // Switch to all home view for search
    if (currentCategory === 'tech-dictionary') {
      document.querySelector('[data-category="all"]').click();
    } else {
      renderNewsFeed();
    }
  });
}

// ==========================================================================
// Ticker & Sidebar Index Rendering
// ==========================================================================
function renderLiveTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;

  // Double the elements to enable infinite marquee effect smoothly
  const tickerItems = [...marketIndices, ...marketIndices];
  
  track.innerHTML = tickerItems.map(item => {
    const changeClass = item.isPositive ? 'positive' : 'negative';
    const arrow = item.isPositive ? '▲' : '▼';
    return `
      <div class="ticker-item" data-symbol="${item.symbol}">
        <span class="ticker-symbol">${item.symbol}</span>
        <span class="ticker-name">${item.name}</span>
        <span class="ticker-price">${item.price}</span>
        <span class="ticker-change ${changeClass}">${arrow} ${item.change}</span>
      </div>
    `;
  }).join('');
}

function renderSidebarIndices() {
  const container = document.getElementById('sidebar-indices');
  if (!container) return;

  container.innerHTML = marketIndices.slice(0, 5).map(item => {
    const changeClass = item.isPositive ? 'positive' : 'negative';
    return `
      <div class="index-card" onclick="document.getElementById('news-search').value='${item.symbol}'; document.getElementById('news-search').dispatchEvent(new Event('input'))">
        <div class="index-info">
          <span class="index-symbol">${item.symbol}</span>
          <span class="index-name">${item.name}</span>
        </div>
        <div class="index-values">
          <span class="index-price">${item.price}</span>
          <span class="index-change ${changeClass}">${item.change}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderSidebarRankings() {
  const container = document.getElementById('sidebar-rankings');
  if (!container) return;

  container.innerHTML = supplierRankings.map(item => {
    const isGrowthNegative = item.growth.startsWith('-');
    const growthClass = isGrowthNegative ? 'negative' : '';
    return `
      <div class="rank-item">
        <div class="rank-num">${item.rank}</div>
        <div class="rank-details">
          <div>
            <span class="rank-name">${item.name}</span>
            <span class="rank-sub">${item.category}</span>
          </div>
          <div class="rank-val">
            <span class="rank-rev">$${item.revenue2025}B</span>
            <span class="rank-growth ${growthClass}">${item.growth}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// Views & Layout Handler (SPA routing-like behavior)
// ==========================================================================
function updateView() {
  // Show / Hide relevant containers based on navigation
  if (currentCategory === 'tech-dictionary') {
    newsGrid.style.display = 'none';
    chartsDashboard.style.display = 'none';
    dictionaryView.style.display = 'block';
    
    categoryTitle.textContent = 'Semiconductor & IT Dictionary';
    categoryDesc.textContent = 'A comprehensive reference glossary of terms commonly utilized across fabless, foundry, memory, and packaging sectors.';
    
    renderDictionaryView();
  } else {
    newsGrid.style.display = 'grid';
    dictionaryView.style.display = 'none';
    
    // Categorized titles and chart displays
    updateCategoryHeaderDetails();
    renderNewsFeed();
    toggleChartsDashboard();
  }
}

function updateCategoryHeaderDetails() {
  const categoryHeaders = {
    'all': {
      title: 'Global News Feed',
      desc: 'Real-time aggregated updates covering advanced hardware engineering, foundry yields, macro economics, and packaging supply chains.'
    },
    'global-semiconductor-sales': {
      title: 'Global Semiconductor Sales',
      desc: 'WSTS and major research agency revenue indicators tracking global chip shipments and billing statistics.'
    },
    'outlook-forecast': {
      title: 'Industry Outlook & Forecast',
      desc: 'Market projections, CAPEX expansion updates, lithography deployments, and future tech node roadmaps.'
    },
    'supplier-ranking': {
      title: 'Top Suppliers & Rankings',
      desc: 'Quarterly and annual revenue standings tracking key foundries, fabless designers, and integrated device manufacturers.'
    },
    'global-product-markets': {
      title: 'Product Segment Market Share',
      desc: 'Market dynamics, ASP tracking, and penetration shares for HBM, CXL, AI accelerators, and high-performance DDR5 modules.'
    },
    'global-economy': {
      title: 'Macro Economy Briefings',
      desc: 'Central bank interest rate decisions, foreign exchange indexes, and raw material pricing impacts on fab operations.'
    },
    'it-tech-news': {
      title: 'IT & Emerging Tech News',
      desc: 'Consumer device announcements, localized AI architectures, mobile SoC benchmarks, and consumer computing cycles.'
    },
    'geopolitics-supply-chain': {
      title: 'Geopolitics & Supply Chain',
      desc: 'Government subsidy packages, export controls, chemical sourcing bottlenecks, and packaging (OSAT) diversification updates.'
    },
    'insights-deep-dives': {
      title: 'Insights & Deep Dives',
      desc: 'Specialist-written reports focusing on materials engineering, thermal controls, custom silicon developments, and packaging mechanics.'
    }
  };

  const header = categoryHeaders[currentCategory] || categoryHeaders['all'];
  categoryTitle.textContent = header.title;
  categoryDesc.textContent = header.desc;
}

function toggleChartsDashboard() {
  // We only show charts on 'all' (Home) or 'global-semiconductor-sales' or 'global-product-markets'
  if (['all', 'global-semiconductor-sales', 'global-product-markets'].includes(currentCategory)) {
    chartsDashboard.style.display = 'block';
    
    // Update chart title details
    const chartTitleElement = document.getElementById('chart-title');
    if (currentCategory === 'global-product-markets') {
      chartTitleElement.textContent = 'Product Segment Market Share';
    } else {
      chartTitleElement.textContent = 'Global Semiconductor Revenue & Forecast';
    }

    // Render interactive chart
    mainChart = renderSalesTrendChart('semiconductor-chart', salesTrends);
  } else {
    chartsDashboard.style.display = 'none';
  }
}

// ==========================================================================
// News Feed Card Rendering
// ==========================================================================
function renderNewsFeed() {
  if (!newsGrid) return;

  // Filter logic
  let filtered = newsData;

  // 1. Filter by category (if not 'all')
  if (currentCategory !== 'all') {
    filtered = filtered.filter(item => item.category === currentCategory);
  }

  // 2. Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(searchQuery) ||
      item.summary.toLowerCase().includes(searchQuery)
    );
  }

  // 3. Filter by action type (All, Popular, Recent)
  if (currentFilter === 'popular') {
    filtered = [...filtered].sort((a, b) => parseInt(b.views) - parseInt(a.views));
  } else if (currentFilter === 'recent') {
    filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (filtered.length === 0) {
    newsGrid.innerHTML = `
      <div class="empty-msg" style="grid-column: 1 / -1;">
        <i data-lucide="info" style="width: 48px; height: 48px; stroke-width: 1.5; color: var(--text-muted); margin-bottom: 0.5rem;"></i>
        <p>No articles found matching your query.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  newsGrid.innerHTML = filtered.map(item => {
    const isBookmarked = bookmarkedIds.includes(item.id);
    const bookmarkClass = isBookmarked ? 'active' : '';
    
    // Convert backend category key to human-readable tag
    const tagText = getCategoryTagText(item.category);

    return `
      <div class="news-card" data-article-id="${item.id}">
        <div class="news-card-image-box">
          <img class="news-card-img" src="${item.image}" alt="${item.title}" loading="lazy">
          <span class="news-card-tag">${tagText}</span>
          <button class="news-card-bookmark-btn ${bookmarkClass}" data-article-id="${item.id}">
            <i data-lucide="bookmark"></i>
          </button>
        </div>
        <div class="news-card-body">
          <div class="news-meta">
            <span class="news-source">${item.source}</span>
            <span class="news-date"><i data-lucide="calendar"></i>${item.date}</span>
          </div>
          <h3 class="news-card-title">${item.title}</h3>
          <p class="news-card-summary">${item.summary}</p>
          <div class="news-card-footer">
            <span class="news-views"><i data-lucide="eye" style="width: 12px; height: 12px; display: inline; vertical-align: middle; margin-right: 2px;"></i>${item.views} views</span>
            <span class="read-more">Read More <i data-lucide="chevron-right"></i></span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-attach listeners inside dynamic grid
  attachNewsCardListeners();
  lucide.createIcons();
}

function attachNewsCardListeners() {
  // Bind click for cards (excluding the bookmark button click)
  document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.news-card-bookmark-btn')) {
        // Prevent opening drawer if clicked on bookmark button
        e.stopPropagation();
        const articleId = e.target.closest('.news-card-bookmark-btn').dataset.articleId;
        toggleBookmark(articleId);
        return;
      }
      const articleId = card.dataset.articleId;
      openArticleDrawer(articleId);
    });
  });
}

function getCategoryTagText(catKey) {
  const mappings = {
    'global-semiconductor-sales': 'Sales',
    'outlook-forecast': 'Outlook',
    'supplier-ranking': 'Rankings',
    'global-product-markets': 'Markets',
    'global-economy': 'Economy',
    'it-tech-news': 'IT/Tech',
    'geopolitics-supply-chain': 'Geopolitics',
    'insights-deep-dives': 'Insights'
  };
  return mappings[catKey] || 'General';
}

// ==========================================================================
// Glossary / Dictionary View Rendering
// ==========================================================================
function renderDictionaryView() {
  if (!dictionaryView) return;

  let filtered = dictionaryData;
  if (searchQuery) {
    filtered = dictionaryData.filter(item => 
      item.term.toLowerCase().includes(searchQuery) ||
      item.definition.toLowerCase().includes(searchQuery)
    );
  }

  const container = document.getElementById('dict-grid-container');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-msg" style="grid-column: 1 / -1;">
        <p>No terms found matching your query.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="dict-card">
      <div class="dict-term">${item.term}</div>
      <p class="dict-desc">${item.definition}</p>
    </div>
  `).join('');
}

// ==========================================================================
// Article Drawer (Detailed view slider) logic
// ==========================================================================
function openArticleDrawer(articleId) {
  const article = newsData.find(item => item.id === articleId);
  if (!article) return;

  // Increment views count mockup
  article.views = String(parseInt(article.views) + 1);

  // Fill in drawer elements
  drawerBookmarkBtn.dataset.articleId = articleId;
  updateDrawerBookmarkButton(articleId);

  drawerBody.innerHTML = `
    <span class="article-category">${getCategoryTagText(article.category)}</span>
    <h1 class="article-title">${article.title}</h1>
    
    <div class="article-metadata-row">
      <span class="article-source-box">
        <i data-lucide="shield-check" style="width:16px; height:16px; color:var(--accent-primary)"></i>
        Source: ${article.source}
      </span>
      <div class="article-stat-box">
        <span class="article-stat"><i data-lucide="calendar" style="width:14px; height:14px"></i>${article.date}</span>
        <span class="article-stat"><i data-lucide="eye" style="width:14px; height:14px"></i>${article.views} views</span>
      </div>
    </div>

    <div class="article-hero-box">
      <img class="article-hero-img" src="${article.image}" alt="${article.title}">
    </div>

    <div class="article-body-text">
      ${article.content}
    </div>
  `;

  // Render related articles
  renderRelatedArticles(article);

  // Trigger animations
  drawerOverlay.classList.add('active');
  articleDrawer.classList.add('active');
  
  // Reset drawer scroll
  drawerBody.scrollTop = 0;

  // Re-trigger icon rendering
  lucide.createIcons();
  
  // Re-render news feed grid to reflect updated view counts
  renderNewsFeed();
}

// Close drawer
function closeArticleDrawer() {
  drawerOverlay.classList.remove('active');
  articleDrawer.classList.remove('active');
}

function renderRelatedArticles(currentArticle) {
  if (!relatedNewsContainer) return;

  // Find other articles from same category or fallback to any
  let related = newsData.filter(item => item.category === currentArticle.category && item.id !== currentArticle.id);
  if (related.length === 0) {
    related = newsData.filter(item => item.id !== currentArticle.id).slice(0, 2);
  } else {
    related = related.slice(0, 2);
  }

  relatedNewsContainer.innerHTML = related.map(item => `
    <div class="related-item-card" data-related-id="${item.id}">
      <span class="related-item-title">${item.title}</span>
      <span class="related-item-meta">${item.source} · ${item.date}</span>
    </div>
  `).join('');

  // Add click to related cards
  document.querySelectorAll('.related-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const articleId = card.dataset.relatedId;
      openArticleDrawer(articleId);
    });
  });
}

function updateDrawerBookmarkButton(articleId) {
  const isBookmarked = bookmarkedIds.includes(articleId);
  if (isBookmarked) {
    drawerBookmarkBtn.classList.add('active');
  } else {
    drawerBookmarkBtn.classList.remove('active');
  }
}

// ==========================================================================
// Bookmarking Core Functions
// ==========================================================================
function toggleBookmark(articleId) {
  const index = bookmarkedIds.indexOf(articleId);
  if (index === -1) {
    bookmarkedIds.push(articleId);
    showToast('Article bookmarked successfully.');
  } else {
    bookmarkedIds.splice(index, 1);
    showToast('Bookmark removed.');
  }
  
  // Sync state
  localStorage.setItem('silicon_bookmarks', JSON.stringify(bookmarkedIds));
  
  // Update UI components
  renderNewsFeed();
  renderBookmarksList();
  
  const article = newsData.find(item => item.id === articleId);
  if (article && articleDrawer.classList.contains('active')) {
    updateDrawerBookmarkButton(articleId);
  }
}

function renderBookmarksList() {
  // Update badge count
  bookmarkCount.textContent = bookmarkedIds.length;

  if (!sidebarBookmarks) return;

  if (bookmarkedIds.length === 0) {
    sidebarBookmarks.innerHTML = `
      <p class="empty-msg">No bookmarked articles. Click the bookmark icon on news cards to save them.</p>
    `;
    return;
  }

  const bookmarkedArticles = newsData.filter(item => bookmarkedIds.includes(item.id));
  
  sidebarBookmarks.innerHTML = bookmarkedArticles.map(item => `
    <div class="bookmark-side-item" data-side-id="${item.id}">
      <span class="bookmark-side-title">${item.title}</span>
      <button class="remove-bookmark-btn" data-remove-id="${item.id}" title="Remove">
        <i data-lucide="trash-2" style="width: 14px; height: 14px"></i>
      </button>
    </div>
  `).join('');

  // Setup click listeners for sidebar bookmarks items
  document.querySelectorAll('.bookmark-side-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.remove-bookmark-btn')) {
        e.stopPropagation();
        const articleId = e.target.closest('.remove-bookmark-btn').dataset.removeId;
        toggleBookmark(articleId);
        return;
      }
      openArticleDrawer(item.dataset.sideId);
    });
  });

  lucide.createIcons();
}

// ==========================================================================
// Theme Toggling Logic (Regenerates charts on execution)
// ==========================================================================
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', targetTheme);
  
  // Save theme preference
  localStorage.setItem('silicon_theme', targetTheme);

  // Redraw charts using the new colors
  if (['all', 'global-semiconductor-sales', 'global-product-markets'].includes(currentCategory)) {
    mainChart = renderSalesTrendChart('semiconductor-chart', salesTrends);
  }
  sideChart = renderMarketShareChart('mini-share-chart', marketShareData);
  
  showToast(`Switched to ${targetTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}.`);
}

// Ensure theme load on cold start
const cachedTheme = localStorage.getItem('silicon_theme');
if (cachedTheme) {
  document.documentElement.setAttribute('data-theme', cachedTheme);
}

// ==========================================================================
// Toast notifications
// ==========================================================================
let toastTimer = null;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('active');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('active');
  }, 2200);
}
