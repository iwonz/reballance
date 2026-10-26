const ru = {
  skip: 'Перейти к содержимому', playOriginal: 'Играть в Ballance', playRemaster: 'Играть в Reballance',
  heroEyebrow: 'Немного смелости. Немного равновесия.', heroTitle: 'Небо по-прежнему\nждёт вас.',
  heroLead: 'Деревянный шар, узкая тропа и мир над облаками. Вернитесь к ощущению, которое помните.',
  discover: 'Заново открыть Ballance ↓', heroCredit: 'Reballance 1.0.0-dev.11 · игровой кадр', heroIndex: 'ЗНАКОМЫЙ МИР. НОВЫЙ ВЗГЛЯД.',
  heroAlt: 'Деревянный шар на каменной трассе, парящей над облаками', originalAlt: 'Игровой кадр Ballance',
  storyEyebrow: 'Начало', storyTitle: 'Некоторые игры\nостаются с нами.',
  storyA: 'Ballance, созданная Cyparade, построила целый мир на равновесии, инерции и высоте. Каменные тропы, деревянные мосты и стальные рельсы требуют не только точности, но и терпения.',
  storyB: 'Дерево, камень и бумага — больше, чем внешний вид. У каждого шара свой вес и своя роль. Найти нужный материал — часть поиска пути.',
  storyC: 'Reballance создана на основе iwonz/ballance — поддерживаемого форка с русским языком и поддержкой нескольких платформ. Его основа — открытая Unity-реконструкция Happy Dreamfish (imengyu), вдохновлённая оригинальной игрой Cyparade.',
  originalEyebrow: 'Знакомые ощущения', originalText: 'Классическая реконструкция на Unity: привычные трассы, меню, обучение и механика. Версия 1.0.11 сохранена как постоянная исходная точка, с независимой поддержкой в репозитории iwonz/ballance.',
  originalNote: 'Это классическая реконструкция на Unity, а не оригинальный коммерческий исполняемый файл Cyparade.',
  sourceTag: 'Открыть сохранённые исходники ↗', originalCaption: 'Архивный игровой кадр. Классические трассы с независимой поддержкой.',
  remasterEyebrow: 'Reballance', remasterTitle: 'То же чувство удивления.\nБольше деталей вокруг.',
  remasterIntro: 'Reballance создаётся с выразительными материалами, понятными меню и продуманной погодой на воздушных трассах. Классическая редакция остаётся самостоятельной.',
  materialCaption: 'Фактуры материалов Reballance · работа в процессе',
  development: 'Reballance в разработке', wood: 'Дерево', stone: 'Камень', paper: 'Бумага',
  woodText: 'Тёплая фактура, читаемые стыки и знакомый универсальный шар.', stoneText: 'Минеральная фактура, потёртые края и ощутимый вес.', paperText: 'Мягкие волокна и складки. Лёгкость, открывающая другой путь.',
  weatherEyebrow: 'Семь взглядов на небо', weatherTitle: 'Выберите свою атмосферу.',
  weatherIntro: 'По умолчанию — Стандартный. Погода выбирается отдельно от качества графики. Географические названия обозначают художественную тему: трассы по-прежнему парят в небе.',
  conceptAlt: 'Концепты ясной погоды, дождя, тумана, снега, песка и джунглей',
  conceptCaption: 'КОНЦЕПТ ХУДОЖЕСТВЕННОГО НАПРАВЛЕНИЯ · Предоставленный референс, а не кадр текущей Reballance.',
  downloadsEyebrow: 'Расположитесь поудобнее', downloadsTitle: 'Играйте в браузере.\nИли скачайте игру.',
  downloadsText: 'Reballance предназначен для Web, Windows, Linux, macOS и Android. Загрузки сопровождают каждый проверенный релиз.',
  downloadOriginal: 'Скачать Reballance ↗', project: 'Исходный код и разработка ↗', separateSaves: 'У каждой редакции свои настройки и прогресс. Сохранения не переносятся автоматически.',
  credits: 'Оригинальная игра: Cyparade. Реконструкция на Unity: Happy Dreamfish / imengyu. Этот форк и Reballance: iwonz. Независимый проект сообщества.', license: 'Лицензия и авторство ↗'
};
const presets = [
  ['Standard', 'Стандартный', 'Improved materials, each level’s original atmosphere and dry physics.', 'Улучшенные материалы, исходная атмосфера каждого уровня и базовая сухая физика.'],
  ['Standard + Weather', 'Стандартный + Погода', 'Authored conditions for each level, changing gradually as you move between sectors.', 'Подготовленная для каждого уровня погода с плавными переходами между секторами.'],
  ['Moscow', 'Москва', 'Winter light, snow and visible local patches of ice throughout the game.', 'Зимний свет, снег и различимые локальные участки льда на всех уровнях.'],
  ['London', 'Лондон', 'Rain, wet surfaces and a restrained layer of fog throughout the game.', 'Дождь, мокрые поверхности и умеренный туман на всех уровнях.'],
  ['Sahara', 'Сахара', 'Warm skies, dusty haze and local sand drifts throughout the game.', 'Тёплое небо, пыльная дымка и локальные наносы песка на всех уровнях.'],
  ['Hong Kong', 'Гонконг', 'Humid materials, foliage and green tropical surroundings throughout the game.', 'Влажные материалы, листва и зелёная тропическая атмосфера на всех уровнях.'],
  ['California', 'Калифорния', 'Bright sunlight and gentle cloud layers throughout the game.', 'Светлая солнечная атмосфера и мягкая облачность на всех уровнях.']
];
const translatable = [...document.querySelectorAll('[data-i18n]')];
const english = new Map(translatable.map(node => [node.dataset.i18n, [...node.childNodes].map(child => child.nodeName === 'BR' ? '\n' : child.textContent).join('')]));
const englishAlt = new Map([...document.querySelectorAll('[data-alt]')].map(node => [node.dataset.alt, node.alt]));
let language = navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
try { const saved = localStorage.getItem('reballance.site.language'); if (['ru','en'].includes(saved)) language = saved; } catch {}
let selected = 0;
let release = null;
const buttons = presets.map((preset, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.addEventListener('click', () => { selected = index; renderPresets(); });
  document.querySelector('#presets').append(button);
  return button;
});
function renderPresets() {
  buttons.forEach((button, index) => {
    button.textContent = presets[index][language === 'ru' ? 1 : 0];
    button.setAttribute('aria-pressed', String(selected === index));
  });
  document.querySelector('#preset-description').textContent = presets[selected][language === 'ru' ? 3 : 2];
  document.querySelector('#presets').setAttribute('aria-label', language === 'ru' ? 'Пресеты окружения' : 'Environment presets');
}
function renderLanguage() {
  document.documentElement.lang = language;
  translatable.forEach(node => {
    const value = language === 'ru' ? ru[node.dataset.i18n] : english.get(node.dataset.i18n);
    if (value) node.textContent = value;
  });
  document.querySelectorAll('[data-alt]').forEach(node => { node.alt = language === 'ru' ? ru[node.dataset.alt] : englishAlt.get(node.dataset.alt); });
  const button = document.querySelector('#language');
  button.textContent = language === 'ru' ? 'EN' : 'RU';
  button.setAttribute('aria-label', language === 'ru' ? 'Switch to English' : 'Переключить на русский');
  document.title = language === 'ru' ? 'Reballance — Над облаками' : 'Reballance — Above the clouds';
  renderPresets();
  renderRelease();
}
function renderRelease() {
  if (!release) return;
  const link = document.querySelector('[data-i18n="downloadOriginal"]');
  link.textContent = (language === 'ru' ? 'Скачать Reballance ' : 'Download Reballance ') + release.version + ' ↗';
  link.href = 'https://github.com/iwonz/reballance/releases/tag/' + encodeURIComponent(release.tag);
  document.querySelector('[data-i18n="development"]').textContent = `Reballance ${release.version}`;
}
document.querySelector('#language').addEventListener('click', () => {
  language = language === 'ru' ? 'en' : 'ru';
  try { localStorage.setItem('reballance.site.language', language); } catch {}
  renderLanguage();
});
renderLanguage();
fetch('release.json').then(response => {
  if (!response.ok) throw new Error('Release identity unavailable');
  return response.json();
}).then(value => {
  if (value.edition === 'remaster' && /^v\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(value.tag)
      && value.version === value.tag.slice(1)) {
    release = value;
    renderRelease();
  }
}).catch(() => {});
