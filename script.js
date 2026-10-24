const state = {
  language: localStorage.getItem('sawa-language') || 'en',
  theme: localStorage.getItem('sawa-theme') || 'dark',
  range: '1h',
  rates: {
    usdEgp: 50.8,
    usdSar: 3.75,
    sarEgp: 13.55,
  },
  history: {
    '1h': [],
    '1d': [],
    '1w': [],
    '1m': [],
  },
  liveFeedActive: false,
  subscriptions: JSON.parse(localStorage.getItem('sawa-subscriptions') || '[]'),
  alertSnapshot: JSON.parse(localStorage.getItem('sawa-alert-snapshot') || '{}'),
  news: [
    {
      tag: 'Market',
      title: 'Egyptian pound stabilizes after broad currency demand pressure',
      summary: 'The market remains under pressure but liquidity is improving as demand shifts.',
      source: 'Reuters',
      time: '4 min ago',
      locale: { en: true, ar: true },
    },
    {
      tag: 'Saudi',
      title: 'Riyal strength supports import costs and regional trade flow',
      summary: 'Saudi demand remains steady while cross-border transfer costs stay moderate.',
      source: 'Bloomberg',
      time: '12 min ago',
      locale: { en: true, ar: true },
    },
    {
      tag: 'Economy',
      title: 'Large transfers from Saudi to Egypt remain active during the month',
      summary: 'Remittances continue to contribute to local liquidity and exchange market activity.',
      source: 'Al Arabiya',
      time: '26 min ago',
      locale: { en: true, ar: true },
    },
    {
      tag: 'FX',
      title: 'US dollar volatility remains limited as traders watch the mid-week trend',
      summary: 'Volatility is contained as the market responds to selective demand.',
      source: 'CNBC',
      time: '35 min ago',
      locale: { en: true, ar: true },
    },
    {
      tag: 'Data',
      title: 'Cross-border transfers maintain steady momentum after the latest update',
      summary: 'The exchange spread remains stable, with traders focusing on near-term sentiment.',
      source: 'MarketWire',
      time: '58 min ago',
      locale: { en: true, ar: true },
    },
    {
      tag: 'Update',
      title: 'Regional liquidity remains healthy with low volatility around key windows',
      summary: 'The market still reacts to import timing and family transfers across the region.',
      source: 'Financial Post',
      time: '1 hr ago',
      locale: { en: true, ar: true },
    },
  ],
};

const translations = {
  en: {
    brand: 'Sawa FX',
    tagline: 'Saudi–Egypt exchange monitor',
    eyebrow: 'Live market snapshot',
    heroTitle: 'USD, SAR and EGP in one smart dashboard',
    heroText:
      'Track real-time exchange movements, compare the Saudi Riyal and US Dollar, and convert currencies quickly and clearly.',
    live: 'Live',
    updatedAt: 'Updated',
    usdToEgp: 'USD → EGP',
    usdToSar: 'USD → SAR',
    sarToEgp: 'SAR → EGP',
    exchangeTableTitle: 'Exchange rates',
    reference: 'Reference',
    pair: 'Pair',
    rate: 'Rate',
    change: 'Change',
    chartTitle: 'Price timeline',
    daily: 'Daily',
    comparisonTitle: 'Rate comparison',
    bankFaisal: 'Faisal Bank',
    marketUsdSar: 'USD / SAR',
    marketSarEgp: 'SAR / EGP',
    bankRatesTitle: 'Faisal Bank rates',
    bank: 'Bank',
    buy: 'Buy',
    sell: 'Sell',
    converterTitle: 'Currency converter',
    quick: 'Quick',
    amount: 'Amount',
    from: 'From',
    to: 'To',
    result: 'Result',
    newsTitle: 'Market news',
    monitoring: 'Monitoring',
    market: 'Market',
    saudi: 'Saudi',
    economy: 'Economy',
    fx: 'FX',
    data: 'Data',
    update: 'Update',
    subscriptionTitle: 'Price alerts',
    alerts: 'Alerts',
    emailLabel: 'Email',
    alertChannel: 'Delivery channel',
    alertDestination: 'Destination',
    alertPair: 'Alert pair',
    alertThreshold: 'Threshold',
    subscribe: 'Subscribe',
  },
  ar: {
    brand: 'سوا FX',
    tagline: 'مؤشر صرف السعودية ومصر',
    eyebrow: 'نظرة فورية للسوق',
    heroTitle: 'الدولار والريال السعودي والجنيه في لوحة واحدة',
    heroText:
      'تابع تحركات الصرف اللحظية، قارن بين الريال السعودي والدولار، وقم بتحويل العملات بسرعة ووضوح.',
    live: 'مباشر',
    updatedAt: 'آخر تحديث',
    usdToEgp: 'الدولار → الجنيه',
    usdToSar: 'الدولار → الريال',
    sarToEgp: 'الريال → الجنيه',
    exchangeTableTitle: 'أسعار الصرف',
    reference: 'مرجعي',
    pair: 'الزوج',
    rate: 'السعر',
    change: 'التغير',
    chartTitle: 'مخطط السعر',
    daily: 'يومي',
    comparisonTitle: 'مقارنة الأسعار',
    bankFaisal: 'بنك فيصل',
    marketUsdSar: 'الدولار / الريال',
    marketSarEgp: 'الريال / الجنيه',
    bankRatesTitle: 'أسعار بنك فيصل',
    bank: 'بنك',
    buy: 'شراء',
    sell: 'بيع',
    converterTitle: 'آلة التحويل',
    quick: 'سريع',
    amount: 'المبلغ',
    from: 'من',
    to: 'إلى',
    result: 'النتيجة',
    newsTitle: 'أخبار السوق',
    monitoring: 'متابعة',
    market: 'السوق',
    saudi: 'السعودية',
    economy: 'الاقتصاد',
    fx: 'الصرف',
    data: 'بيانات',
    update: 'تحديث',
    subscriptionTitle: 'تنبيهات السعر',
    alerts: 'تنبيهات',
    emailLabel: 'البريد الإلكتروني',
    alertChannel: 'قناة الاستلام',
    alertDestination: 'الوجهة',
    alertPair: 'زوج التنبيه',
    alertThreshold: 'الحد',
    subscribe: 'اشتراك',
  },
};

const currencyMap = {
  USD: { USD: 1, EGP: 'usdEgp', SAR: 'usdSar' },
  EGP: { USD: 'reverseUsdEgp', EGP: 1, SAR: 'egpSar' },
  SAR: { USD: 'reverseUsdSar', EGP: 'sarEgp', SAR: 1 },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatMoney(value, digits = 2) {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function updateClock() {
  const now = new Date();
  const timeText = now.toLocaleTimeString(state.language === 'ar' ? 'ar-EG' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  document.getElementById('clockDisplay').textContent = timeText;
}

function applyLanguage(lang) {
  state.language = lang;
  localStorage.setItem('sawa-language', lang);
  document.documentElement.lang = lang;
  document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => {
    const key = element.dataset.i18n;
    const value = translations[lang][key];
    if (value) {
      element.textContent = value;
    }
  });

  document.querySelectorAll('.lang-button').forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle('active', isActive);
  });

  if (lang === 'ar') {
    document.querySelector('select#fromCurrency').closest('.field').querySelector('label').textContent = translations.ar.from;
    document.querySelector('select#toCurrency').closest('.field').querySelector('label').textContent = translations.ar.to;
  }

  renderNews();
  updateCalculator();
}

function setTheme(theme) {
  state.theme = theme;
  localStorage.setItem('sawa-theme', theme);
  document.body.classList.toggle('light-mode', theme === 'light');
  const button = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  icon.textContent = theme === 'light' ? '🌙' : '☀️';
  button.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
}

function generateHistory() {
  const now = Date.now();
  const base = state.rates.usdEgp;

  const ranges = {
    '1h': { points: 12, step: 5 * 60 * 1000 },
    '1d': { points: 24, step: 60 * 60 * 1000 },
    '1w': { points: 14, step: 12 * 60 * 60 * 1000 },
    '1m': { points: 20, step: 24 * 60 * 60 * 1000 },
  };

  Object.entries(ranges).forEach(([rangeKey, config]) => {
    const history = [];
    for (let index = config.points - 1; index >= 0; index -= 1) {
      const time = new Date(now - index * config.step);
      const wave = Math.sin(index / (rangeKey === '1h' ? 2.2 : rangeKey === '1d' ? 3.1 : rangeKey === '1w' ? 2.8 : 3.5)) * 0.7;
      const noise = (Math.random() - 0.5) * 0.28;
      const value = Number((base + wave + noise).toFixed(2));
      history.push({ time, value });
    }
    state.history[rangeKey] = history;
  });
}

function renderTrendChart() {
  const svg = document.getElementById('trendChart');
  const width = 520;
  const height = 220;
  const padding = { top: 18, right: 18, bottom: 22, left: 22 };
  const selectedHistory = state.history[state.range] || state.history['1h'];

  if (!selectedHistory.length) {
    return;
  }

  const minValue = Math.min(...selectedHistory.map((point) => point.value)) - 0.6;
  const maxValue = Math.max(...selectedHistory.map((point) => point.value)) + 0.6;

  const xForIndex = (index) => {
    const xRange = width - padding.left - padding.right;
    return padding.left + (index / (selectedHistory.length - 1)) * xRange;
  };

  const yForValue = (value) => {
    const yRange = height - padding.top - padding.bottom;
    const percent = (value - minValue) / (maxValue - minValue || 1);
    return height - padding.bottom - percent * yRange;
  };

  const points = selectedHistory
    .map((point, index) => `${xForIndex(index)},${yForValue(point.value)}`)
    .join(' ');

  const areaPoints = `
      ${xForIndex(0)},${height - padding.bottom}
      ${points}
      ${xForIndex(selectedHistory.length - 1)},${height - padding.bottom}
  `;

  const gridLines = Array.from({ length: 5 }, (_, index) => {
    const y = padding.top + (index * (height - padding.top - padding.bottom)) / 4;
    return `<line class="grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" />`;
  }).join('');

  const labels = selectedHistory
    .filter((_, index) => index % Math.max(1, Math.floor(selectedHistory.length / 4)) === 0 || index === selectedHistory.length - 1)
    .map((point) => {
      const x = xForIndex(selectedHistory.findIndex((item) => item.time.getTime() === point.time.getTime()));
      const label = point.time.toLocaleTimeString(state.language === 'ar' ? 'ar-EG' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return `<text class="axis-label" x="${x}" y="${height - 4}" text-anchor="middle">${label}</text>`;
    })
    .join('');

  svg.innerHTML = `
    <defs>
      <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.36"></stop>
        <stop offset="100%" stop-color="var(--primary)" stop-opacity="0.02"></stop>
      </linearGradient>
    </defs>
    ${gridLines}
    <polygon class="chart-area" points="${areaPoints}"></polygon>
    <polyline class="chart-line" points="${points}"></polyline>
    ${selectedHistory
      .filter((point, index) => index === selectedHistory.length - 1)
      .map((point) => {
        const x = xForIndex(selectedHistory.length - 1);
        const y = yForValue(point.value);
        return `<circle class="chart-dot" cx="${x}" cy="${y}" r="5"></circle>`;
      })
      .join('')}
    ${labels}
  `;
}

function renderStats() {
  const usdEgp = state.rates.usdEgp;
  const usdSar = state.rates.usdSar;
  const sarEgp = state.rates.sarEgp;

  document.getElementById('usdEgpRate').textContent = formatMoney(usdEgp, 2);
  document.getElementById('usdSarRate').textContent = formatMoney(usdSar, 2);
  document.getElementById('sarEgpRate').textContent = formatMoney(sarEgp, 2);
  document.getElementById('faisalBankUsdEgp').textContent = formatMoney(usdEgp + 0.15, 2);
  document.getElementById('marketUsdSar').textContent = formatMoney(usdSar, 2);
  document.getElementById('marketSarEgp').textContent = formatMoney(sarEgp, 2);
  document.getElementById('bankBuyUsdEgp').textContent = formatMoney(usdEgp - 0.15, 2);
  document.getElementById('bankSellUsdEgp').textContent = formatMoney(usdEgp + 0.4, 2);
  document.getElementById('bankBuyUsdSar').textContent = formatMoney(usdSar - 0.04, 2);
  document.getElementById('bankSellUsdSar').textContent = formatMoney(usdSar + 0.04, 2);

  document.getElementById('tableUsdEgp').textContent = formatMoney(usdEgp, 2);
  document.getElementById('tableUsdSar').textContent = formatMoney(usdSar, 2);
  document.getElementById('tableSarEgp').textContent = formatMoney(sarEgp, 2);

  const changeData = [
    { el: 'usdEgpTrend', value: (usdEgp - 50.55) / 50.55, sign: 'positive' },
    { el: 'usdSarTrend', value: (usdSar - 3.72) / 3.72, sign: 'positive' },
    { el: 'sarEgpTrend', value: (sarEgp - 13.45) / 13.45, sign: 'positive' },
    { el: 'changeUsdEgp', value: (usdEgp - 50.55) / 50.55 },
    { el: 'changeUsdSar', value: (usdSar - 3.72) / 3.72 },
    { el: 'changeSarEgp', value: (sarEgp - 13.45) / 13.45 },
  ];

  changeData.forEach(({ el, value, sign }) => {
    const node = document.getElementById(el);
    const percent = value * 100;
    const formatted = `${percent >= 0 ? '+' : ''}${formatMoney(percent, 2)}%`;
    node.textContent = formatted;

    if (sign) {
      node.classList.toggle('positive', percent >= 0);
      node.classList.toggle('negative', percent < 0);
    } else {
      node.classList.toggle('positive', percent >= 0);
      node.classList.toggle('negative', percent < 0);
    }
  });
}

async function fetchLiveRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!response.ok) {
      throw new Error('Live rate fetch failed');
    }

    const payload = await response.json();
    const usdEgp = Number(payload?.rates?.EGP || state.rates.usdEgp);
    const usdSar = Number(payload?.rates?.SAR || state.rates.usdSar);

    state.rates.usdEgp = Number(usdEgp.toFixed(2));
    state.rates.usdSar = Number(usdSar.toFixed(2));
    state.rates.sarEgp = Number((usdEgp / usdSar).toFixed(2));
    state.liveFeedActive = true;
  } catch (error) {
    const driftUsd = (Math.random() - 0.5) * 0.22;
    const driftSar = (Math.random() - 0.5) * 0.07;

    state.rates.usdEgp = Number(clamp(state.rates.usdEgp + driftUsd, 49.4, 52.5).toFixed(2));
    state.rates.usdSar = Number(clamp(state.rates.usdSar + driftSar, 3.58, 3.95).toFixed(2));
    state.rates.sarEgp = Number(clamp(state.rates.sarEgp + driftUsd * 0.3, 13.05, 14.2).toFixed(2));
    state.liveFeedActive = false;
  }

  Object.keys(state.history).forEach((rangeKey) => {
    const latest = { time: new Date(), value: state.rates.usdEgp };
    const range = state.history[rangeKey];
    range.push(latest);
    if (range.length > 24) {
      range.shift();
    }
  });

  renderStats();
  renderTrendChart();
  updateCalculator();
}

function getRate(from, to) {
  const base = state.rates;

  if (from === to) return 1;
  if (from === 'USD' && to === 'EGP') return base.usdEgp;
  if (from === 'USD' && to === 'SAR') return base.usdSar;
  if (from === 'SAR' && to === 'EGP') return base.sarEgp;
  if (from === 'EGP' && to === 'USD') return 1 / base.usdEgp;
  if (from === 'EGP' && to === 'SAR') return (1 / base.usdEgp) * base.usdSar;
  if (from === 'SAR' && to === 'USD') return 1 / base.usdSar;
  return 1;
}

function updateCalculator() {
  const amountInput = document.getElementById('amountInput');
  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');
  const convertedValue = document.getElementById('convertedValue');

  const amount = Number(amountInput.value || 0);
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const raw = amount * getRate(from, to);

  convertedValue.textContent = formatMoney(raw, 2);
}

function persistSubscriptions() {
  localStorage.setItem('sawa-subscriptions', JSON.stringify(state.subscriptions));
}

function updateSubscriptionStatus() {
  const status = document.getElementById('subscriptionStatus');
  if (!state.subscriptions.length) {
    status.textContent = state.language === 'ar' ? 'لا توجد تنبيهات مسجلة.' : 'No alerts subscribed yet.';
    return;
  }

  const summary = state.subscriptions
    .map((item) => `${item.email} (${item.pair}, ±${item.threshold})`)
    .join(' • ');

  status.textContent = state.language === 'ar' ? `تنبية نشط: ${summary}` : `Active alerts: ${summary}`;
}

function subscribeEmail() {
  const emailInput = document.getElementById('emailInput');
  const alertChannel = document.getElementById('alertChannel');
  const alertDestination = document.getElementById('alertDestination');
  const alertPair = document.getElementById('alertPair');
  const alertThreshold = document.getElementById('alertThreshold');

  const channel = alertChannel.value;
  const destination = alertDestination.value.trim();
  const email = emailInput.value.trim();
  const pair = alertPair.value;
  const threshold = Number(alertThreshold.value);

  if (channel === 'email') {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      const status = document.getElementById('subscriptionStatus');
      status.textContent = state.language === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.';
      return;
    }
  } else if (!destination) {
    const status = document.getElementById('subscriptionStatus');
    status.textContent = state.language === 'ar'
      ? 'يرجى إدخال اسم المستخدم أو رقم الهاتف.'
      : 'Please enter a username or phone number.';
    return;
  }

  const item = {
    email: channel === 'email' ? email : destination,
    pair,
    threshold,
    channel,
    destination,
  };

  const existingIndex = state.subscriptions.findIndex(
    (entry) => entry.email === item.email && entry.pair === item.pair && entry.channel === item.channel
  );

  if (existingIndex >= 0) {
    state.subscriptions[existingIndex] = item;
  } else {
    state.subscriptions.push(item);
  }

  persistSubscriptions();
  updateSubscriptionStatus();
  emailInput.value = '';
  alertDestination.value = '';
}

function buildAlertMessage(pair, currentRate, previousRate) {
  return state.language === 'ar'
    ? `تنبيه سعر: ${pair} تغير من ${previousRate} إلى ${currentRate}.\nتمت الإشارة من Sawa FX.`
    : `Price alert: ${pair} changed from ${previousRate} to ${currentRate}.\nTriggered by Sawa FX.`;
}

function openNotificationLink(subscription, pair, currentRate, previousRate) {
  const message = buildAlertMessage(pair, currentRate, previousRate);

  if (subscription.channel === 'email') {
    const subject = encodeURIComponent(`Sawa FX Alert: ${pair} changed`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${subscription.email}?subject=${subject}&body=${body}`;
    return;
  }

  if (subscription.channel === 'telegram') {
    const text = encodeURIComponent(message);
    const currentPage = encodeURIComponent(window.location.href || 'https://example.com');
    const telegramLink = `https://t.me/share/url?url=${currentPage}&text=${text}`;
    window.open(telegramLink, '_blank', 'noopener');
    return;
  }

  const text = encodeURIComponent(message);
  const whatsappTarget = subscription.destination.replace(/\D/g, '');
  const whatsappLink = whatsappTarget
    ? `https://wa.me/${whatsappTarget}?text=${text}`
    : `https://api.whatsapp.com/send?text=${text}`;
  window.open(whatsappLink, '_blank', 'noopener');
}

function checkPriceAlerts() {
  if (!state.subscriptions.length) {
    return;
  }

  const pairMap = {
    'USD/EGP': state.rates.usdEgp,
    'USD/SAR': state.rates.usdSar,
    'SAR/EGP': state.rates.sarEgp,
  };

  state.subscriptions.forEach((subscription) => {
    const currentValue = Number(pairMap[subscription.pair]);
    const previousValue = Number(state.alertSnapshot[subscription.pair] ?? currentValue);
    const difference = Math.abs(currentValue - previousValue);

    if (difference >= subscription.threshold) {
      const direction = currentValue >= previousValue ? 'up' : 'down';
      const status = document.getElementById('subscriptionStatus');
      status.textContent = state.language === 'ar'
        ? `تنبيه: ${subscription.pair} ${direction === 'up' ? 'صعد' : 'انخفض'} من ${previousValue} إلى ${currentValue}.`
        : `Alert: ${subscription.pair} moved ${direction} from ${previousValue} to ${currentValue}.`;

      openNotificationLink(subscription, subscription.pair, currentValue, previousValue);
    }
  });

  state.alertSnapshot = { ...pairMap };
  localStorage.setItem('sawa-alert-snapshot', JSON.stringify(state.alertSnapshot));
}

function renderNews() {
  const newsList = document.getElementById('newsList');
  const localized = state.news.filter((item) => item.locale?.[state.language] !== false);

  newsList.innerHTML = localized
    .map((item) => {
      const tagKey = item.tag.toLowerCase();
      const tagLabel = translations[state.language][tagKey] || item.tag;
      return `
        <article class="news-item">
          <span class="news-tag">${tagLabel}</span>
          <h4>${item.title}</h4>
          <p>${item.summary}</p>
          <div class="news-meta">
            <span>${item.source}</span>
            <span>${item.time}</span>
          </div>
        </article>
      `;
    })
    .join('');
}

function initEvents() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  document.querySelectorAll('.lang-button').forEach((button) => {
    button.addEventListener('click', () => {
      applyLanguage(button.dataset.lang);
    });
  });

  ['amountInput', 'fromCurrency', 'toCurrency'].forEach((elementId) => {
    const element = document.getElementById(elementId);
    element.addEventListener('input', updateCalculator);
    element.addEventListener('change', updateCalculator);
  });

  document.querySelectorAll('.timeframe-btn').forEach((button) => {
    button.addEventListener('click', () => {
      state.range = button.dataset.range;
      document.querySelectorAll('.timeframe-btn').forEach((btn) => {
        btn.classList.toggle('active', btn === button);
      });
      renderTrendChart();
    });
  });

  document.getElementById('subscribeBtn').addEventListener('click', subscribeEmail);
  document.getElementById('alertChannel').addEventListener('change', () => {
    const channel = document.getElementById('alertChannel').value;
    const destinationInput = document.getElementById('alertDestination');
    const emailInput = document.getElementById('emailInput');

    if (channel === 'email') {
      destinationInput.placeholder = state.language === 'ar' ? 'example@domain.com' : 'name@example.com';
      emailInput.disabled = false;
      destinationInput.disabled = true;
      return;
    }

    destinationInput.placeholder = channel === 'telegram' ? '@username' : '+966...';
    destinationInput.disabled = false;
    emailInput.disabled = true;
  });

  document.getElementById('alertChannel').dispatchEvent(new Event('change'));
}

function initialize() {
  setTheme(state.theme);
  applyLanguage(state.language);
  generateHistory();
  renderStats();
  renderTrendChart();
  renderNews();
  updateSubscriptionStatus();
  updateCalculator();
  initEvents();
  updateClock();
  fetchLiveRates();
  setInterval(updateClock, 1000);
  setInterval(() => {
    fetchLiveRates();
    checkPriceAlerts();
  }, 15000);
}

initialize();
