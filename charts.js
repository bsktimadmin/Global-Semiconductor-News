// Interactive Chart Helpers using Chart.js

let salesChartInstance = null;
let shareChartInstance = null;

// Helper to get active theme color settings
function getThemeColors() {
  const isDark = document.documentElement.getAttribute("data-theme") !== "light";
  return {
    text: isDark ? "#94a3b8" : "#475569",
    grid: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
    accent: isDark ? "#00f2fe" : "#0284c7",
    accentSecondary: isDark ? "#4facfe" : "#2563eb",
    background: isDark ? "rgba(20, 30, 58, 0.4)" : "rgba(255, 255, 255, 0.8)",
    fontFamily: "'Outfit', 'Noto Sans KR', sans-serif"
  };
}

/**
 * Creates or updates the interactive semiconductor sales trend line chart.
 */
function renderSalesTrendChart(canvasId, salesTrends) {
  const colors = getThemeColors();
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  if (salesChartInstance) {
    salesChartInstance.destroy();
  }

  // Create gradient for background fill
  const gradientCtx = ctx.getContext('2d');
  const gradient = gradientCtx.createLinearGradient(0, 0, 0, 240);
  gradient.addColorStop(0, colors.accent + '33'); // 20% opacity
  gradient.addColorStop(1, colors.accent + '00'); // 0% opacity

  salesChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: salesTrends.years,
      datasets: [{
        label: 'Global Semiconductor Revenue (Billion USD)',
        data: salesTrends.sales,
        borderColor: colors.accent,
        borderWidth: 3,
        pointBackgroundColor: colors.accent,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        backgroundColor: gradient,
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: colors.text,
            font: { family: colors.fontFamily, size: 12, weight: '600' }
          }
        },
        tooltip: {
          backgroundColor: colors.background === 'rgba(20, 30, 58, 0.4)' ? '#0c1224' : '#ffffff',
          titleColor: colors.text,
          bodyColor: colors.text,
          borderColor: colors.accent,
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `매출: $${context.raw} B (십억 달러)`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: colors.grid },
          ticks: {
            color: colors.text,
            font: { family: colors.fontFamily }
          }
        },
        y: {
          grid: { color: colors.grid },
          ticks: {
            color: colors.text,
            font: { family: colors.fontFamily },
            callback: function(value) {
              return '$' + value + 'B';
            }
          }
        }
      }
    }
  });

  return salesChartInstance;
}

/**
 * Creates or updates the interactive market share doughnut chart in the right sidebar.
 */
function renderMarketShareChart(canvasId, marketShareData) {
  const colors = getThemeColors();
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  if (shareChartInstance) {
    shareChartInstance.destroy();
  }

  const sliceColors = [
    colors.accent,
    colors.accentSecondary,
    '#10b981', // emerald
    '#f59e0b', // amber
    '#8b5cf6'  // violet
  ];

  shareChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: marketShareData.categories,
      datasets: [{
        data: marketShareData.percentages,
        backgroundColor: sliceColors,
        borderWidth: 2,
        borderColor: document.documentElement.getAttribute("data-theme") === "light" ? "#fff" : "#0c1224"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false // We will rely on tooltip and interactive hover
        },
        tooltip: {
          backgroundColor: colors.background === 'rgba(20, 30, 58, 0.4)' ? '#0c1224' : '#ffffff',
          titleColor: colors.text,
          bodyColor: colors.text,
          borderColor: colors.accent,
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: function(context) {
              return ` 점유율: ${context.raw}%`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });

  return shareChartInstance;
}

/**
 * Destroy all existing charts
 */
function destroyCharts() {
  if (salesChartInstance) {
    salesChartInstance.destroy();
    salesChartInstance = null;
  }
  if (shareChartInstance) {
    shareChartInstance.destroy();
    shareChartInstance = null;
  }
}

if (typeof window !== 'undefined') {
  window.renderSalesTrendChart = renderSalesTrendChart;
  window.renderMarketShareChart = renderMarketShareChart;
  window.destroyCharts = destroyCharts;
}

