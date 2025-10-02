/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Type } from "@google/genai";

// FIX: Moved `declare global` to the top of the file. Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. Adding `export {}` at the end of the file makes it a module. This resolves errors related to `window.Telegram`.
declare global {
  interface Window {
    Telegram: any;
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// --- I18N (Internationalization) ---
type Language = 'en' | 'sr' | 'ru';

const translations = {
  en: {
    shopTitle: "Bela Zora Sapun",
    navHome: "Home",
    navNews: "News",
    navCatalog: "Catalog",
    navPromotions: "Promotions",
    navProfile: "Profile",
    navAdmin: "Admin",
    addToCart: "Add to Cart",
    cartTitle: "Your Shopping Cart",
    emptyCartHeader: "Your Cart is Empty",
    emptyCartMessage: "Looks like you haven't added any soap yet.",
    continueShopping: "Continue Shopping",
    checkout: "Checkout",
    processing: "Processing...",
    total: "Total",
    newsTitle: "News & Updates",
    promotionsTitle: "Special Offers",
    profileTitle: "My Profile",
    personalInfo: "Personal Information",
    name: "Name",
    email: "Email",
    orderHistory: "Order History",
    order: "Order",
    date: "Date",
    viewingCart: (count: number) => `View shopping cart, ${count} items`,
    adminTitle: "Admin Panel",
    adminWelcome: "Welcome, Administrator!",
    popularProducts: "Popular Products",
    latestNews: "Latest News",
    ourOffer: "Our Offer",
    salesStatistics: "Sales Statistics",
    startDate: "Start Date",
    endDate: "End Date",
    generateReport: "Generate Report",
    totalSold: "Total Sold",
    manageNews: "Manage News",
    addNews: "Add News Item",
    updateNews: "Update News Item",
    newsDate: "Date",
    titleLabel: "Title",
    contentLabel: "Content",
    managePromotions: "Manage Promotions",
    addPromotion: "Add Promotion",
    updatePromotion: "Update Promotion",
    delete: "Delete",
    manageProducts: "Manage Products",
    addProduct: "Add Product",
    nameLabel: "Product Name",
    descriptionLabel: "Description",
    priceLabel: "Price (RSD)",
    imageLabel: "Product Image",
    chooseFile: "Choose a file...",
    categoryLabel: "Category",
    pieces: "pcs.",
    edit: "Edit",
    updateProduct: "Update Product",
    cancel: "Cancel",
    voiceListening: "Listening...",
    voiceHeard: (command: string) => `Heard: "${command}"`,
    voiceCommandSuccess: (command: string) => `Executed: ${command}`,
    voiceCommandUnknown: "Unknown command.",
    translate: "Translate from English",
    reviews: "Reviews",
    noReviews: "No reviews yet.",
    averageRating: "Average Rating",
    submitReview: "Submit Your Review",
    yourRating: "Your Rating",
    reviewTitleLabel: "Review Title",
    yourCommentLabel: "Your Comment",
    submit: "Submit",
    reviewSubmitted: "Thank you! Your review has been submitted for moderation.",
    close: "Close",
    manageReviews: "Manage Reviews",
    pendingReviews: "Pending Reviews",
    approve: "Approve",
    reject: "Reject",
    generalSettings: "General Settings",
    uploadLogo: "Upload Logo",
    currentLogo: "Current Logo",
    uploadBanner: "Upload Home Banner",
    currentBanner: "Current Banner",
    manageNotifications: "Manage Notifications",
    orderStatusNotifications: "Order Status Notifications",
    enableNotificationsFor: "Enable notifications for the following order statuses:",
    statusProcessing: "Processing",
    statusShipped: "Shipped",
    statusDelivered: "Delivered",
    notificationTemplate: "Notification Template",
    templatePlaceholderInfo: "Use {order_id} and {customer_name} as placeholders.",
    saveSettings: "Save Settings",
    promotionalNotifications: "Promotional Notifications",
    composeAndSend: "Compose and Send",
    messageTitle: "Message Title",
    messageContent: "Message Content",
    sendNotification: "Send Notification",
    sentNotificationsHistory: "Sent Notifications History",
    noNotificationsSent: "No promotional notifications have been sent yet.",
    confirmSend: "Are you sure you want to send this notification to all users?",
    notificationSentSuccess: "Notification sent successfully!",
  },
  sr: {
    shopTitle: "Бела Зора Сапун",
    navHome: "Почетна",
    navNews: "Вести",
    navCatalog: "Каталог",
    navPromotions: "Промоције",
    navProfile: "Профил",
    navAdmin: "Админ",
    addToCart: "Додај у корпу",
    cartTitle: "Ваша корпа",
    emptyCartHeader: "Ваша корпа је празна",
    emptyCartMessage: "Изгледа да још нисте додали ниједан сапун.",
    continueShopping: "Наставите куповину",
    checkout: "Плаћање",
    processing: "Обрада...",
    total: "Укупно",
    newsTitle: "Вести и новости",
    promotionsTitle: "Посебне понуде",
    profileTitle: "Мој профил",
    personalInfo: "Лични подаци",
    name: "Име",
    email: "Е-пошта",
    orderHistory: "Историја наруџбина",
    order: "Наруџбина",
    date: "Датум",
    viewingCart: (count: number) => `Погледајте корпу, ${count} артикала`,
    adminTitle: "Админ панел",
    adminWelcome: "Добродошли, администраторе!",
    popularProducts: "Популарни производи",
    latestNews: "Најновије вести",
    ourOffer: "Наша понуда",
    salesStatistics: "Статистика продаје",
    startDate: "Почетни датум",
    endDate: "Крајњи датум",
    generateReport: "Генериши извештај",
    totalSold: "Укупно продато",
    manageNews: "Управљање вестима",
    addNews: "Додај вест",
    updateNews: "Ажурирај вест",
    newsDate: "Датум",
    titleLabel: "Наслов",
    contentLabel: "Садржај",
    managePromotions: "Управљање промоцијама",
    addPromotion: "Додај промоцију",
    updatePromotion: "Ажурирај промоцију",
    delete: "Обриши",
    manageProducts: "Управљање производима",
    addProduct: "Додај производ",
    nameLabel: "Назив производа",
    descriptionLabel: "Опис",
    priceLabel: "Цена (RSD)",
    imageLabel: "Слика производа",
    chooseFile: "Изаберите датотеку...",
    categoryLabel: "Категорија",
    pieces: "ком.",
    edit: "Измени",
    updateProduct: "Ажурирај производ",
    cancel: "Одустани",
    voiceListening: "Слушам...",
    voiceHeard: (command: string) => `Чуо сам: "${command}"`,
    voiceCommandSuccess: (command: string) => `Извршено: ${command}`,
    voiceCommandUnknown: "Непозната команда.",
    translate: "Преведи са енглеског",
    reviews: "Рецензије",
    noReviews: "Још нема рецензија.",
    averageRating: "Просечна оцена",
    submitReview: "Пошаљите своју рецензију",
    yourRating: "Ваша оцена",
    reviewTitleLabel: "Наслов рецензије",
    yourCommentLabel: "Ваш коментар",
    submit: "Пошаљи",
    reviewSubmitted: "Хвала! Ваша рецензија је послата на модерацију.",
    close: "Затвори",
    manageReviews: "Управљање рецензијама",
    pendingReviews: "Рецензије на чекању",
    approve: "Одобри",
    reject: "Одбиј",
    generalSettings: "Општа подешавања",
    uploadLogo: "Отпреми лого",
    currentLogo: "Тренутни лого",
    uploadBanner: "Отпреми банер",
    currentBanner: "Тренутни банер",
    manageNotifications: "Управљање обавештењима",
    orderStatusNotifications: "Обавештења о статусу поруџбине",
    enableNotificationsFor: "Омогући обавештења за следеће статусе поруџбине:",
    statusProcessing: "Обрада",
    statusShipped: "Послато",
    statusDelivered: "Испоручено",
    notificationTemplate: "Шаблон обавештења",
    templatePlaceholderInfo: "Користите {order_id} и {customer_name} као чуваре места.",
    saveSettings: "Сачувај подешавања",
    promotionalNotifications: "Промотивна обавештења",
    composeAndSend: "Састави и пошаљи",
    messageTitle: "Наслов поруке",
    messageContent: "Садржај поруке",
    sendNotification: "Пошаљи обавештење",
    sentNotificationsHistory: "Историја послатих обавештења",
    noNotificationsSent: "Још увек нису послата промотивна обавештења.",
    confirmSend: "Да ли сте сигурни да желите да пошаљете ово обавештење свим корисницима?",
    notificationSentSuccess: "Обавештење је успешно послато!",
  },
  ru: {
    shopTitle: "Бела Зора Сапун",
    navHome: "Главная",
    navNews: "Новости",
    navCatalog: "Каталог",
    navPromotions: "Акции",
    navProfile: "Профиль",
    navAdmin: "Админ",
    addToCart: "В корзину",
    cartTitle: "Ваша корзина",
    emptyCartHeader: "Ваша корзина пуста",
    emptyCartMessage: "Похоже, вы еще не добавили мыло.",
    continueShopping: "Продолжить покупки",
    checkout: "Оформить заказ",
    processing: "Обработка...",
    total: "Итого",
    newsTitle: "Новости и обновления",
    promotionsTitle: "Специальные предложения",
    profileTitle: "Мой профиль",
    personalInfo: "Личная информация",
    name: "Имя",
    email: "Эл. почта",
    orderHistory: "История заказов",
    order: "Заказ",
    date: "Дата",
    viewingCart: (count: number) => `Посмотреть корзину, ${count} товаров`,
    adminTitle: "Панель администратора",
    adminWelcome: "Добро пожаловать, администратор!",
    popularProducts: "Популярные товары",
    latestNews: "Последние новости",
    ourOffer: "Наше предложение",
    salesStatistics: "Статистика продаж",
    startDate: "Дата начала",
    endDate: "Дата окончания",
    generateReport: "Создать отчет",
    totalSold: "Всего продано",
    manageNews: "Управление новостями",
    addNews: "Добавить новость",
    updateNews: "Обновить новость",
    newsDate: "Дата",
    titleLabel: "Заголовок",
    contentLabel: "Содержание",
    managePromotions: "Управление акциями",
    addPromotion: "Добавить акцию",
    updatePromotion: "Обновить акцию",
    delete: "Удалить",
    manageProducts: "Управление товарами",
    addProduct: "Добавить товар",
    nameLabel: "Название товара",
    descriptionLabel: "Описание",
    priceLabel: "Цена (RSD)",
    imageLabel: "Изображение товара",
    chooseFile: "Выберите файл...",
    categoryLabel: "Категория",
    pieces: "шт.",
    edit: "Изменить",
    updateProduct: "Обновить товар",
    cancel: "Отмена",
    voiceListening: "Слушаю...",
    voiceHeard: (command: string) => `Распознано: "${command}"`,
    voiceCommandSuccess: (command: string) => `Выполнено: ${command}`,
    voiceCommandUnknown: "Неизвестная команда.",
    translate: "Перевести с английского",
    reviews: "Отзывы",
    noReviews: "Отзывов пока нет.",
    averageRating: "Средний рейтинг",
    submitReview: "Оставить свой отзыв",
    yourRating: "Ваша оценка",
    reviewTitleLabel: "Заголовок отзыва",
    yourCommentLabel: "Ваш комментарий",
    submit: "Отправить",
    reviewSubmitted: "Спасибо! Ваш отзыв отправлен на модерацию.",
    close: "Закрыть",
    manageReviews: "Управление отзывами",
    pendingReviews: "Ожидающие отзывы",
    approve: "Одобрить",
    reject: "Отклонить",
    generalSettings: "Общие настройки",
    uploadLogo: "Загрузить логотип",
    currentLogo: "Текущий логотип",
    uploadBanner: "Загрузить баннер",
    currentBanner: "Текущий баннер",
    manageNotifications: "Управление уведомлениями",
    orderStatusNotifications: "Уведомления о статусе заказа",
    enableNotificationsFor: "Включить уведомления для следующих статусов заказа:",
    statusProcessing: "В обработке",
    statusShipped: "Отправлено",
    statusDelivered: "Доставлено",
    notificationTemplate: "Шаблон уведомления",
    templatePlaceholderInfo: "Используйте {order_id} и {customer_name} в качестве плейсхолдеров.",
    saveSettings: "Сохранить настройки",
    promotionalNotifications: "Рекламные уведомления",
    composeAndSend: "Создать и отправить",
    messageTitle: "Заголовок сообщения",
    messageContent: "Содержание сообщения",
    sendNotification: "Отправить уведомление",
    sentNotificationsHistory: "История отправленных уведомлений",
    noNotificationsSent: "Рекламные уведомления еще не отправлялись.",
    confirmSend: "Вы уверены, что хотите отправить это уведомление всем пользователям?",
    notificationSentSuccess: "Уведомление успешно отправлено!",
  }
};


// --- DATA ---
interface Product {
  id: number;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
  price: number;
  image: string;
  category: { [key in Language]: string };
}
interface NewsItem {
    id: number;
    date: string;
    title: { [key in Language]: string };
    content: { [key in Language]: string };
}
interface Promotion {
    id: number;
    title: { [key in Language]: string };
    content: { [key in Language]: string };
}
interface Review {
    id: number;
    productId: number;
    author: string;
    rating: number;
    title: { [key in Language]: string };
    content: { [key in Language]: string };
    status: 'pending' | 'approved' | 'rejected';
}
interface OrderStatusNotificationSettings {
    [key: string]: {
        enabled: boolean;
        templates: { [key in Language]: string };
    };
}
interface PromotionalNotification {
    id: number;
    date: string;
    title: { [key in Language]: string };
    content: { [key in Language]: string };
}

const categories: { key: string; name: { [key in Language]: string } }[] = [
    { key: 'All', name: { en: 'All', sr: 'Све', ru: 'Все' } },
    { key: 'Classic', name: { en: 'Classic', sr: 'Класични', ru: 'Классика' } },
    { key: 'Herbal', name: { en: 'Herbal', sr: 'Биљни', ru: 'Травы' } },
    { key: 'Exfoliating', name: { en: 'Exfoliating', sr: 'Пилинг', ru: 'Пилинг' } },
    { key: 'Detox', name: { en: 'Detox', sr: 'Детокс', ru: 'Детокс' } },
];

const initialProducts: Product[] = [
  {
    id: 1,
    name: { en: "Classic Goat's Milk", sr: "Класично козје млеко", ru: "Классическое козье молоко" },
    description: { 
      en: "Pure and simple. The original recipe for sensitive skin, incredibly moisturizing and gentle.",
      sr: "Чисто и једноставно. Оригинални рецепт за осетљиву кожу, невероватно хидратантан и нежан.",
      ru: "Чистота и простота. Оригинальный рецепт для чувствительной кожи, невероятно увлажняющий и нежный."
    },
    price: 900,
    image: "https://placehold.co/300x300/f5f5dc/333333?text=Classic",
    category: { en: "Classic", sr: "Класични", ru: "Классика" }
  },
  {
    id: 2,
    name: { en: "Oatmeal & Honey", sr: "Овсена каша и мед", ru: "Овсянка и мед" },
    description: { 
      en: "A soothing blend with colloidal oatmeal to gently exfoliate and raw honey to nourish the skin.",
      sr: "Умирујућа мешавина са колоидном овсеном кашом за нежан пилинг и сировим медом за исхрану коже.",
      ru: "Успокаивающая смесь с коллоидной овсянкой для нежного отшелушивания и сырым медом для питания кожи."
    },
    price: 1000,
    image: "https://placehold.co/300x300/deb887/333333?text=Oatmeal",
    category: { en: "Exfoliating", sr: "Пилинг", ru: "Пилинг" }
  },
  {
    id: 3,
    name: { en: "Lavender Calm", sr: "Умирујућа лаванда", ru: "Лавандовое спокойствие" },
    description: { 
      en: "Infused with pure lavender essential oil for a calming aroma that relaxes the mind and body.",
      sr: "Обогаћено чистим есенцијалним уљем лаванде за умирујућу арому која опушта ум и тело.",
      ru: "Насыщено чистым эфирным маслом лаванды для успокаивающего аромата, расслабляющего ум и тело."
    },
    price: 1050,
    image: "https://placehold.co/300x300/e6e6fa/333333?text=Lavender",
    category: { en: "Herbal", sr: "Биљни", ru: "Травы" }
  },
   {
    id: 4,
    name: { en: "Charcoal Detox", sr: "Детокс са угљем", ru: "Угольный детокс" },
    description: { 
      en: "Activated charcoal helps draw out impurities, leaving your skin feeling fresh and deeply cleansed.",
      sr: "Активни угаљ помаже у извлачењу нечистоћа, остављајући вашу кожу свежом и дубински очишћеном.",
      ru: "Активированный уголь помогает выводить загрязнения, оставляя кожу свежей и глубоко очищенной."
    },
    price: 1050,
    image: "https://placehold.co/300x300/696969/ffffff?text=Charcoal",
    category: { en: "Detox", sr: "Детокс", ru: "Детокс" }
  },
];

const initialNewsItems: NewsItem[] = [
    { 
        id: 1,
        date: "2024-07-10",
        title: {en: "New Summer Collection!", sr: "Нова летња колекција!", ru: "Новая летняя коллекция!"},
        content: {en: "We're excited to launch our new summer-inspired soap line.", sr: "Узбуђени смо што представљамо нашу нову линију сапуна инспирисану летом.", ru: "Мы рады представить нашу новую линию мыла, вдохновленную летом."}
    },
];

const initialPromotions: Promotion[] = [
    {
        id: 1,
        title: {en: "Free Shipping on orders over 5500 RSD", sr: "Бесплатна достава за наруџбине преко 5500 дин", ru: "Бесплатная доставка при заказе свыше 5500 RSD"},
        content: {en: "Get your favorite soaps delivered to your door at no cost.", sr: "Набавите своје омиљене сапуне на кућну адресу без трошкова доставе.", ru: "Получите свои любимые мыла с доставкой на дом бесплатно."}
    }
];

const initialReviews: Review[] = [
    { id: 1, productId: 1, author: "Marko M.", rating: 5, title: { en: "The Best!", sr: "Најбоље!", ru: "Лучшее!" }, content: { en: "My skin has never felt better. So gentle and moisturizing.", sr: "Моја кожа се никад није осећала боље. Тако нежно и хидратантно.", ru: "Моя кожа никогда не чувствовала себя лучше. Такое нежное и увлажняющее." }, status: 'approved' },
    { id: 2, productId: 3, author: "Jelena P.", rating: 5, title: { en: "So relaxing", sr: "Тако опуштајуће", ru: "Так расслабляет" }, content: { en: "The lavender scent is perfect for an evening shower. I love it.", sr: "Мирис лаванде је савршен за вечерње туширање. Обожавам га.", ru: "Аромат лаванды идеален для вечернего душа. Я в восторге." }, status: 'approved' },
    { id: 3, productId: 2, author: "Ivan K.", rating: 4, title: { en: "Great for sensitive skin", sr: "Одлично за осетљиву кожу", ru: "Отлично для чувствительной кожи" }, content: { en: "Gently exfoliates without irritation. Will buy again.", sr: "Нежно врши пилинг без иритације. Купићу поново.", ru: "Нежно отшелушивает без раздражения. Куплю еще." }, status: 'approved' },
    { id: 4, productId: 1, author: "Anonymous", rating: 5, title: { en: "Wonderful Soap", sr: "Диван сапун", ru: "Замечательное мыло" }, content: { en: "I want to try all of them now!", sr: "Сада желим да их све испробам!", ru: "Теперь хочу попробовать все!" }, status: 'pending' },
];

const salesHistory = [
    // May
    { productId: 2, date: '2024-05-02', quantity: 3 },
    { productId: 3, date: '2024-05-05', quantity: 2 },
    { productId: 1, date: '2024-05-08', quantity: 5 },
    { productId: 4, date: '2024-05-12', quantity: 1 },
    { productId: 2, date: '2024-05-20', quantity: 2 },
    { productId: 3, date: '2024-05-28', quantity: 4 },
    // June
    { productId: 3, date: '2024-06-01', quantity: 5 },
    { productId: 1, date: '2024-06-04', quantity: 3 },
    { productId: 4, date: '2024-06-10', quantity: 2 },
    { productId: 2, date: '2024-06-15', quantity: 4 },
    { productId: 3, date: '2024-06-22', quantity: 3 },
    { productId: 1, date: '2024-06-29', quantity: 2 },
    // July
    { productId: 1, date: '2024-07-03', quantity: 4 },
    { productId: 2, date: '2024-07-05', quantity: 1 },
    { productId: 4, date: '2024-07-08', quantity: 3 },
    { productId: 3, date: '2024-07-11', quantity: 6 },
    { productId: 2, date: '2024-07-15', quantity: 3 },
    { productId: 1, date: '2024-07-21', quantity: 1 },
];


const userProfile = {
    name: "Ana Petrović",
    email: "ana.petrovic@email.com",
    orderHistory: [
        { id: "1024", date: "2024-06-20", total: 1950 },
        { id: "1011", date: "2024-05-15", total: 2800 }
    ]
};


// --- STATE MANAGEMENT ---
function createSignal<T>(value: T): [() => T, (newValue: T) => void] {
  let internalValue = value;
  const subscribers = new Set<() => void>();
  const getter = () => internalValue;
  const setter = (newValue: T) => {
    // A simple JSON.stringify check is used to prevent re-renders on identical data.
    // However, this check incorrectly processes Map objects (always returning '{}'),
    // which was preventing cart updates. This revised logic bypasses the check
    // entirely if either the old or new value is a Map, ensuring the state update
    // and subsequent re-render always occur for the cart.
    if (internalValue instanceof Map || newValue instanceof Map) {
        // Always update if dealing with a Map, as stringify comparison is unreliable.
    } else if (JSON.stringify(internalValue) === JSON.stringify(newValue)) {
        return; // For other types, if they're identical, do nothing.
    }
    
    internalValue = newValue;
    subscribers.forEach(cb => cb());
  };
  (setter as any).subscribe = (cb: () => void) => {
    subscribers.add(cb);
    return () => subscribers.delete(cb);
  };
  return [getter, setter];
}

type View = 'home' | 'catalog' | 'cart' | 'news' | 'promotions' | 'profile' | 'admin';
type UserRole = 'user' | 'admin';
type SalesReportItem = { productId: number; name: { [key in Language]: string }; totalQuantity: number; };

// Helper to convert file to base64 for image previews
const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};


const App = () => {
  const [getCart, setCart] = createSignal<Map<number, number>>(new Map());
  const [getLanguage, setLanguage] = createSignal<Language>('en');
  const [getRole, setRole] = createSignal<UserRole>('user');
  const [getView, setView] = createSignal<View>('home');
  const [getSelectedCategory, setSelectedCategory] = createSignal<string>('All');
  
  // Dynamic Data State
  const [getProducts, setProducts] = createSignal<Product[]>(initialProducts);
  const [getNewsItems, setNewsItems] = createSignal<NewsItem[]>(initialNewsItems);
  const [getPromotions, setPromotions] = createSignal<Promotion[]>(initialPromotions);
  const [getReviews, setReviews] = createSignal<Review[]>(initialReviews);
  const [getLogoUrl, setLogoUrl] = createSignal<string>("https://placehold.co/200x50/3d3d3d/fdfcf9?text=Bela+Zora");
  const [getBannerUrl, setBannerUrl] = createSignal<string>("https://placehold.co/800x400/a3b18a/fdfcf9?text=Bela+Zora+Sapun");

  // UI State
  const [getActiveProductReviews, setActiveProductReviews] = createSignal<Product | null>(null);

  // Admin State
  const [getStartDate, setStartDate] = createSignal('2024-05-01');
  const [getEndDate, setEndDate] = createSignal('2024-07-31');
  const [getSalesReport, setSalesReport] = createSignal<SalesReportItem[] | null>(null);
  const [getEditingProduct, setEditingProduct] = createSignal<Product | null>(null);
  const [getNewProductImage, setNewProductImage] = createSignal<string | null>(null);
  const [getEditingNewsItem, setEditingNewsItem] = createSignal<NewsItem | null>(null);
  const [getEditingPromotion, setEditingPromotion] = createSignal<Promotion | null>(null);
  const [getIsListening, setIsListening] = createSignal(false);
  const [getVoiceFeedback, setVoiceFeedback] = createSignal<string | null>(null);
  const [getIsTranslatingName, setIsTranslatingName] = createSignal(false);
  const [getIsTranslatingDesc, setIsTranslatingDesc] = createSignal(false);
  const [getOrderStatusNotifSettings, setOrderStatusNotifSettings] = createSignal<OrderStatusNotificationSettings>({
    processing: {
        enabled: true,
        templates: {
            en: "Hi {customer_name}, your order #{order_id} is now being processed.",
            sr: "Здраво {customer_name}, ваша поруџбина #{order_id} се сада обрађује.",
            ru: "Здравствуйте, {customer_name}, ваш заказ #{order_id} сейчас обрабатывается.",
        }
    },
    shipped: {
        enabled: true,
        templates: {
            en: "Good news, {customer_name}! Your order #{order_id} has been shipped.",
            sr: "Добре вести, {customer_name}! Ваша поруџбина #{order_id} је послата.",
            ru: "Хорошие новости, {customer_name}! Ваш заказ #{order_id} отправлен.",
        }
    },
    delivered: {
        enabled: false,
        templates: {
            en: "Your order #{order_id} has been delivered. We hope you enjoy your products!",
            sr: "Ваша поруџбина #{order_id} је испоручена. Надамо се да ћете уживати у нашим производима!",
            ru: "Ваш заказ #{order_id} доставлен. Надеемся, вам понравятся наши продукты!",
        }
    }
  });
  const [getPromoNotifHistory, setPromoNotifHistory] = createSignal<PromotionalNotification[]>([]);

  // --- App Initialization ---
  if (window.Telegram?.WebApp) {
      // Signal to the Telegram client that the app is ready.
      // This is crucial for ensuring the webview is interactive and can prevent issues with event listeners.
      window.Telegram.WebApp.ready();
      // Expand the app to its full height for a better user experience.
      window.Telegram.WebApp.expand();
  }

  // Gemini API initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const t = (key: keyof typeof translations.en, ...args: any[]) => {
    const lang = getLanguage();
    const translation = translations[lang][key] || translations.en[key];
    if (typeof translation === 'function') {
      return (translation as (...args: any[]) => string)(...args);
    }
    return translation;
  };

  // --- CART LOGIC ---
  const incrementItem = (productId: number) => {
    const newCart = new Map(getCart());
    const currentQuantity = newCart.get(productId) || 0;
    newCart.set(productId, currentQuantity + 1);
    setCart(newCart);

    // Trigger animation only when adding a new item to the cart (quantity was 0)
    if (currentQuantity === 0) {
        const cartBtn = document.getElementById('cart-btn');
        if (cartBtn) {
            cartBtn.classList.add('updated');
            setTimeout(() => {
                cartBtn.classList.remove('updated');
            }, 400); // Duration should match the animation in CSS
        }
    }
  };

  const decrementItem = (productId: number) => {
    const newCart = new Map(getCart());
    const currentQuantity = newCart.get(productId) || 0;
    if (currentQuantity > 1) {
        newCart.set(productId, currentQuantity - 1);
    } else {
        newCart.delete(productId);
    }
    setCart(newCart);
  };

  const getCartItemCount = () => {
    return Array.from(getCart().values()).reduce((sum, count) => sum + count, 0);
  };
  
  const getCartTotal = () => {
    return Array.from(getCart().entries()).reduce((total, [productId, quantity]) => {
      const product = getProducts().find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  // --- RENDERING ---
  const renderQuantityControl = (product: Product, type: 'small' | 'large' = 'large') => {
      const quantity = getCart().get(product.id) || 0;
      const lang = getLanguage();

      if (quantity === 0) {
          if (type === 'small') {
              return `<button class="add-to-cart-btn-small" data-product-id="${product.id}" data-action="increment" aria-label="Add ${product.name[lang]} to cart">+</button>`;
          }
          return `<button class="add-to-cart-btn" data-product-id="${product.id}" data-action="increment">${t('addToCart')}</button>`;
      }

      return `
        <div class="quantity-control ${type === 'small' ? 'small' : ''}">
            <button class="quantity-btn" data-product-id="${product.id}" data-action="decrement" aria-label="Decrease quantity of ${product.name[lang]}">-</button>
            <span class="quantity-display" aria-live="polite">${quantity}</span>
            <button class="quantity-btn" data-product-id="${product.id}" data-action="increment" aria-label="Increase quantity of ${product.name[lang]}">+</button>
        </div>
      `;
  }
  
  const renderHeader = () => {
    const cartItemCount = getCartItemCount();
    return `
      <header>
        <img class="header-logo" src="${getLogoUrl()}" alt="${t('shopTitle')} Logo">
        <div class="header-controls">
            <div class="lang-switcher">
                <select id="lang-select" aria-label="Choose language">
                    <option value="en" ${getLanguage() === 'en' ? 'selected' : ''}>EN</option>
                    <option value="sr" ${getLanguage() === 'sr' ? 'selected' : ''}>SR</option>
                    <option value="ru" ${getLanguage() === 'ru' ? 'selected' : ''}>RU</option>
                </select>
            </div>
            <button class="cart-button" id="cart-btn" aria-label="${t('viewingCart', cartItemCount)}">
            <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
            </svg>
            ${cartItemCount > 0 ? `<span class="cart-count">${cartItemCount}</span>` : ''}
            </button>
        </div>
      </header>
    `;
  };

  const renderFooterNav = () => {
      const currentView = getView();
      const navItems: {view: View, label: string, icon: string}[] = [
          { view: 'home', label: t('navHome'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />' },
          { view: 'catalog', label: t('navCatalog'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l.383-1.437M7.5 14.25V5.106M7.5 14.25H3.375c-.621 0-1.125-.504-1.125-1.125V11.25m17.25-6.188L16.625 16.5h-1.25a2.25 2.25 0 0 1-2.25-2.25V5.106M9 12.75h9.075M12 12.75v-1.5a1.5 1.5 0 0 1 3 0v1.5" />'},
          { view: 'news', label: t('navNews'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />'},
          { view: 'promotions', label: t('navPromotions'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />' },
          { view: 'profile', label: t('navProfile'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />' }
      ];

      if (getRole() === 'admin') {
          navItems.push({ view: 'admin', label: t('navAdmin'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008h-.008v-.008Z" />' });
      }

      return `
        <nav class="footer-nav">
          ${navItems.map(item => `
            <button class="nav-button ${currentView === item.view ? 'active' : ''}" data-view="${item.view}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">${item.icon}</svg>
              <span>${item.label}</span>
            </button>
          `).join('')}
        </nav>
      `;
  }

  const renderHomePage = () => {
    const lang = getLanguage();
    const latestPromotion = getPromotions().sort((a,b) => b.id - a.id)[0];
    const latestNews = getNewsItems().sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    const popularProducts = getProducts().slice(0, 3); // Top 3 products

    return `
      <div class="home-header">
        <img src="${getBannerUrl()}" alt="Bela Zora Sapun natural soaps header image" class="home-header-img"/>
      </div>

      ${latestPromotion ? `
      <section class="home-section">
        <h2 class="home-section-title">${t('ourOffer')}</h2>
        <div class="content-card">
            <h3>${latestPromotion.title[lang]}</h3>
            <p>${latestPromotion.content[lang]}</p>
        </div>
      </section>
      ` : ''}
      
      <section class="home-section">
        <h2 class="home-section-title">${t('popularProducts')}</h2>
        <div class="popular-products-carousel">
            ${popularProducts.map(product => `
                <div class="popular-product-card">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${product.image}" alt="${product.name[lang]}" class="popular-product-image lazy-load" loading="lazy">
                    <div class="popular-product-info">
                        <h4>${product.name[lang]}</h4>
                        <div class="popular-product-footer">
                            <span class="popular-product-price">${product.price.toFixed(0)} RSD</span>
                            ${renderQuantityControl(product, 'small')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
      </section>

      ${latestNews ? `
      <section class="home-section">
        <h2 class="home-section-title">${t('latestNews')}</h2>
        <div class="content-card">
            <h3>${latestNews.title[lang]}</h3>
            <p class="date">${latestNews.date}</p>
            <p>${latestNews.content[lang]}</p>
        </div>
      </section>
      ` : ''}
    `;
  };
  
  const renderCatalogPage = () => {
    const lang = getLanguage();
    const selectedCategory = getSelectedCategory();
    const products = getProducts();
    const allReviews = getReviews();
    
    const categoryFilters = `
        <div class="category-filters">
            ${categories.map(cat => `
                <button class="category-btn ${selectedCategory === cat.key ? 'active' : ''}" data-category="${cat.key}">
                    ${cat.name[lang]}
                </button>
            `).join('')}
        </div>
    `;

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category.en === selectedCategory);

    const productGrid = `
      <div class="product-grid">
        ${filteredProducts.map(product => {
            const approvedReviews = allReviews.filter(r => r.productId === product.id && r.status === 'approved');
            const averageRating = approvedReviews.length > 0
                ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
                : 0;
            
            return `
              <div class="product-card">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${product.image}" alt="${product.name[lang]}" class="product-image lazy-load" loading="lazy">
                <div class="product-info">
                  <h3>${product.name[lang]}</h3>
                  <div class="product-reviews-summary" data-product-id="${product.id}" role="button" tabindex="0">
                      <div class="stars" style="--rating: ${averageRating.toFixed(2)};" aria-label="${t('averageRating')}: ${averageRating.toFixed(1)} / 5"></div>
                      <span class="review-count">(${approvedReviews.length})</span>
                  </div>
                  <p>${product.description[lang]}</p>
                  <div class="product-footer">
                    <span class="product-price">${product.price.toFixed(0)} RSD</span>
                    ${renderQuantityControl(product, 'large')}
                  </div>
                </div>
              </div>
            `;
        }).join('')}
      </div>
    `;

    return categoryFilters + productGrid;
  }

  const renderCartPage = () => {
    const cart = getCart();
    const lang = getLanguage();
    if (cart.size === 0) {
      return `
        <main class="cart-view">
            <div class="empty-cart">
                <h2 class="page-title">${t('emptyCartHeader')}</h2>
                <p>${t('emptyCartMessage')}</p>
                <button class="back-to-shop-btn" id="back-to-shop-btn">${t('continueShopping')}</button>
            </div>
        </main>
      `;
    }

    const cartItems = Array.from(cart.entries()).map(([productId, quantity]) => {
      const product = getProducts().find(p => p.id === productId);
      if (!product) return '';
      return `
        <div class="cart-item" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name[lang]}" class="cart-item-img">
            <div class="cart-item-details">
                <h4>${product.name[lang]}</h4>
                <p class="cart-item-price">${product.price.toFixed(0)} RSD</p>
                 <p class="cart-item-subtotal"><b>${(product.price * quantity).toFixed(0)} RSD</b></p>
            </div>
            <div class="cart-item-actions">
                ${renderQuantityControl(product, 'large')}
            </div>
        </div>
      `;
    }).join('');

    return `
      <main class="cart-view">
        <h2 class="page-title">${t('cartTitle')}</h2>
        <div class="cart-items-list">${cartItems}</div>
        <div class="cart-summary">
            <div class="cart-total">
                <span>${t('total')}</span>
                <span>${getCartTotal().toFixed(0)} RSD</span>
            </div>
            <div class="cart-actions">
                <button class="back-to-shop-btn" id="back-to-shop-btn">${t('continueShopping')}</button>
                <button class="checkout-btn" id="checkout-btn">${t('checkout')}</button>
            </div>
        </div>
      </main>
    `;
  };

  const renderNewsPage = () => {
      const lang = getLanguage();
      const newsItems = getNewsItems().sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return `
        <h2 class="page-title">${t('newsTitle')}</h2>
        ${newsItems.map(item => `
            <div class="content-card">
                <h3>${item.title[lang]}</h3>
                <p class="date">${item.date}</p>
                <p>${item.content[lang]}</p>
            </div>
        `).join('')}
      `;
  };

  const renderPromotionsPage = () => {
    const lang = getLanguage();
    const promotions = getPromotions().sort((a,b) => b.id - a.id);
    return `
      <h2 class="page-title">${t('promotionsTitle')}</h2>
      ${promotions.map(item => `
          <div class="content-card">
              <h3>${item.title[lang]}</h3>
              <p>${item.content[lang]}</p>
          </div>
      `).join('')}
    `;
  };
  
  const renderProfilePage = () => `
    <h2 class="page-title">${t('profileTitle')}</h2>
    <div class="content-card profile-info">
        <h3>${t('personalInfo')}</h3>
        <p><strong>${t('name')}:</strong> ${userProfile.name}</p>
        <p><strong>${t('email')}:</strong> ${userProfile.email}</p>
    </div>
    <div class="content-card">
        <h3>${t('orderHistory')}</h3>
        ${userProfile.orderHistory.map(order => `
            <div class="order-history-item">
                <span>${t('order')} #${order.id} (${t('date')}: ${order.date})</span>
                <strong>${order.total.toFixed(0)} RSD</strong>
            </div>
        `).join('')}
    </div>
  `;

  const renderAdminPage = () => {
      const report = getSalesReport();
      const lang = getLanguage();
      const products = getProducts();
      const newsItems = getNewsItems();
      const promotions = getPromotions();
      const reviews = getReviews();
      const editingProduct = getEditingProduct();
      const imagePreviewSrc = getNewProductImage();
      const editingNewsItem = getEditingNewsItem();
      const editingPromotion = getEditingPromotion();
      const orderStatusSettings = getOrderStatusNotifSettings();
      const promoHistory = getPromoNotifHistory();
      
      const renderReport = () => {
          if (!report) return '';
          if (report.length === 0) return `<p>No sales data for the selected period.</p>`;
          return `
              <ul class="sales-report-list">
                  ${report.map(item => `
                      <li>
                          <span>${item.name[lang]}</span>
                          <strong>${t('totalSold')}: ${item.totalQuantity}</strong>
                      </li>
                  `).join('')}
              </ul>
          `;
      };
      
      const voiceFeedback = getVoiceFeedback();
      const isListening = getIsListening();
      const pendingReviews = reviews.filter(r => r.status === 'pending');

      return `
        <h2 class="page-title">${t('adminTitle')}</h2>
        
        <!-- General Settings -->
        <div class="admin-section" id="admin-settings-section">
            <h3>${t('generalSettings')}</h3>
            <div class="admin-form">
                <div class="form-group">
                    <label for="logo-upload">${t('uploadLogo')}</label>
                    <input type="file" id="logo-upload" class="file-input" accept="image/*">
                    <label for="logo-upload" class="file-input-label">${t('chooseFile')}</label>
                    <div class="settings-preview-container">
                        <p>${t('currentLogo')}:</p>
                        <img src="${getLogoUrl()}" alt="Current Logo Preview" class="settings-preview-img logo-preview"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="banner-upload">${t('uploadBanner')}</label>
                    <input type="file" id="banner-upload" class="file-input" accept="image/*">
                    <label for="banner-upload" class="file-input-label">${t('chooseFile')}</label>
                    <div class="settings-preview-container">
                        <p>${t('currentBanner')}:</p>
                        <img src="${getBannerUrl()}" alt="Current Banner Preview" class="settings-preview-img banner-preview"/>
                    </div>
                </div>
            </div>
        </div>

        <!-- Notification Management -->
        <div class="admin-section" id="admin-notifications-section">
            <h3>${t('manageNotifications')}</h3>
            
            <!-- Order Status Notifications -->
            <div class="admin-subsection">
                <h4>${t('orderStatusNotifications')}</h4>
                <p class="subsection-description">${t('enableNotificationsFor')}</p>
                <form id="order-status-notif-form" class="admin-form">
                    ${Object.keys(orderStatusSettings).map(statusKey => `
                        <div class="form-group notification-status-group">
                            <label class="toggle-switch">
                                <input type="checkbox" id="notif-enabled-${statusKey}" ${orderStatusSettings[statusKey].enabled ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                            <label for="notif-enabled-${statusKey}" class="toggle-label">${t(`status${statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}` as any)}</label>
                            
                            <div class="i18n-textarea-group">
                                <label>${t('notificationTemplate')}</label>
                                <textarea id="notif-template-${statusKey}-en" rows="3" placeholder="EN Template">${orderStatusSettings[statusKey].templates.en}</textarea>
                                <textarea id="notif-template-${statusKey}-sr" rows="3" placeholder="SR Template">${orderStatusSettings[statusKey].templates.sr}</textarea>
                                <textarea id="notif-template-${statusKey}-ru" rows="3" placeholder="RU Template">${orderStatusSettings[statusKey].templates.ru}</textarea>
                                <p class="form-hint">${t('templatePlaceholderInfo')}</p>
                            </div>
                        </div>
                    `).join('')}
                    <div class="form-actions">
                         <button type="submit" class="admin-button">${t('saveSettings')}</button>
                    </div>
                </form>
            </div>

            <!-- Promotional Notifications -->
            <div class="admin-subsection">
                 <h4>${t('promotionalNotifications')}</h4>
                 <form id="promo-notif-form" class="admin-form">
                    <p class="subsection-description">${t('composeAndSend')}</p>
                    <div class="form-group-i18n">
                        <label>${t('messageTitle')}</label>
                        <input type="text" id="promo-notif-title-en" placeholder="${t('messageTitle')} (EN)" required>
                        <input type="text" id="promo-notif-title-sr" placeholder="${t('messageTitle')} (SR)" required>
                        <input type="text" id="promo-notif-title-ru" placeholder="${t('messageTitle')} (RU)" required>
                    </div>
                    <div class="form-group-i18n">
                        <label>${t('messageContent')}</label>
                        <textarea id="promo-notif-content-en" placeholder="${t('messageContent')} (EN)" rows="4" required></textarea>
                        <textarea id="promo-notif-content-sr" placeholder="${t('messageContent')} (SR)" rows="4" required></textarea>
                        <textarea id="promo-notif-content-ru" placeholder="${t('messageContent')} (RU)" rows="4" required></textarea>
                    </div>
                    <div class="form-actions">
                         <button type="submit" class="admin-button">${t('sendNotification')}</button>
                    </div>
                 </form>

                 <div class="promo-history">
                    <h5>${t('sentNotificationsHistory')}</h5>
                    ${promoHistory.length > 0 ? `
                        <ul class="promo-history-list">
                            ${promoHistory.map(item => `
                                <li class="promo-history-item">
                                    <span class="history-date">${item.date}</span>
                                    <strong class="history-title">${item.title[lang]}</strong>
                                    <p class="history-content">${item.content[lang].substring(0, 80)}...</p>
                                </li>
                            `).join('')}
                        </ul>
                    ` : `<p class="form-hint">${t('noNotificationsSent')}</p>`}
                 </div>
            </div>
        </div>

        <!-- Review Management -->
        <div class="admin-section" id="admin-reviews-section">
            <h3>${t('manageReviews')}</h3>
            ${pendingReviews.length > 0 ? `
                <p>${t('pendingReviews')}: ${pendingReviews.length}</p>
                <ul class="manage-list">
                    ${pendingReviews.map(review => {
                        const product = products.find(p => p.id === review.productId);
                        return `
                        <li class="manage-list-item review-moderation-item">
                            <div class="review-moderation-info">
                                <strong>${product ? product.name[lang] : 'Unknown Product'}</strong> - ${review.author} (${review.rating} ★)
                                <p><em>"${review.title[lang]}"</em>: ${review.content[lang]}</p>
                            </div>
                            <div class="manage-list-item-actions">
                                <button class="approve-btn" data-id="${review.id}" data-type="review">${t('approve')}</button>
                                <button class="reject-btn" data-id="${review.id}" data-type="review">${t('reject')}</button>
                            </div>
                        </li>
                    `}).join('')}
                </ul>
            ` : `<p>${t('noReviews')} ${t('pendingReviews').toLowerCase()}.</p>`}
        </div>

        <!-- Product Management -->
        <div class="admin-section" id="admin-products-section">
            <h3>${t('manageProducts')}</h3>
            <form id="product-form" class="admin-form">
                <div class="form-group-i18n">
                    <label>${t('nameLabel')}</label>
                    <div class="translatable-field">
                      <input type="text" id="product-name-en" placeholder="${t('nameLabel')} (EN)" required>
                      <button type="button" class="translate-btn ${getIsTranslatingName() ? 'loading' : ''}" data-field="name" title="${t('translate')}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                        </svg>
                      </button>
                    </div>
                    <input type="text" id="product-name-sr" placeholder="${t('nameLabel')} (SR)" required>
                    <input type="text" id="product-name-ru" placeholder="${t('nameLabel')} (RU)" required>
                </div>
                <div class="form-group-i18n">
                    <label>${t('descriptionLabel')}</label>
                    <div class="translatable-field">
                      <textarea id="product-desc-en" placeholder="${t('descriptionLabel')} (EN)" rows="3" required></textarea>
                      <button type="button" class="translate-btn ${getIsTranslatingDesc() ? 'loading' : ''}" data-field="description" title="${t('translate')}">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                        </svg>
                      </button>
                    </div>
                    <textarea id="product-desc-sr" placeholder="${t('descriptionLabel')} (SR)" rows="3" required></textarea>
                    <textarea id="product-desc-ru" placeholder="${t('descriptionLabel')} (RU)" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label for="product-price">${t('priceLabel')}</label>
                    <input type="number" id="product-price" placeholder="e.g., 900" min="0" step="10" required>
                </div>
                <div class="form-group">
                    <label for="product-image-upload">${t('imageLabel')}</label>
                    <input type="file" id="product-image-upload" class="file-input" accept="image/*">
                    <label for="product-image-upload" class="file-input-label">${t('chooseFile')}</label>
                    <div class="image-preview-container">
                        ${imagePreviewSrc ? `<img src="${imagePreviewSrc}" alt="Image Preview" class="image-preview"/>` : ''}
                    </div>
                </div>
                <div class="form-group">
                    <label for="product-category">${t('categoryLabel')}</label>
                    <select id="product-category" required>
                        ${categories.filter(c => c.key !== 'All').map(cat => `<option value="${cat.key}">${cat.name[lang]}</option>`).join('')}
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="admin-button">${editingProduct ? t('updateProduct') : t('addProduct')}</button>
                    ${editingProduct ? `<button type="button" id="cancel-edit-product-btn" class="cancel-btn">${t('cancel')}</button>` : ''}
                </div>
            </form>
             <ul class="manage-list" id="product-list">
                ${products.map(product => `
                    <li class="manage-list-item">
                        <img src="${product.image}" alt="${product.name[lang]}" class="manage-list-item-img"/>
                        <span>${product.name[lang]}</span>
                        <div class="manage-list-item-actions">
                            <button class="edit-btn" data-id="${product.id}" data-type="product">${t('edit')}</button>
                            <button class="delete-btn" data-id="${product.id}" data-type="product">${t('delete')}</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>

        <!-- News Management -->
        <div class="admin-section" id="admin-news-section">
            <h3>${t('manageNews')}</h3>
            <form id="news-form" class="admin-form">
                <div class="form-group">
                    <label for="news-date">${t('newsDate')}</label>
                    <input type="date" id="news-date" required>
                </div>
                <div class="form-group-i18n">
                    <label>${t('titleLabel')}</label>
                    <input type="text" id="news-title-en" placeholder="${t('titleLabel')} (EN)" required>
                    <input type="text" id="news-title-sr" placeholder="${t('titleLabel')} (SR)" required>
                    <input type="text" id="news-title-ru" placeholder="${t('titleLabel')} (RU)" required>
                </div>
                <div class="form-group-i18n">
                    <label>${t('contentLabel')}</label>
                    <textarea id="news-content-en" placeholder="${t('contentLabel')} (EN)" rows="3" required></textarea>
                    <textarea id="news-content-sr" placeholder="${t('contentLabel')} (SR)" rows="3" required></textarea>
                    <textarea id="news-content-ru" placeholder="${t('contentLabel')} (RU)" rows="3" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="admin-button">${editingNewsItem ? t('updateNews') : t('addNews')}</button>
                    ${editingNewsItem ? `<button type="button" id="cancel-edit-news-btn" class="cancel-btn">${t('cancel')}</button>` : ''}
                </div>
            </form>
            <ul class="manage-list" id="news-list">
                ${newsItems.map(item => `
                    <li class="manage-list-item">
                        <span>${item.title[lang]} (${item.date})</span>
                        <div class="manage-list-item-actions">
                           <button class="edit-btn" data-id="${item.id}" data-type="news">${t('edit')}</button>
                           <button class="delete-btn" data-id="${item.id}" data-type="news">${t('delete')}</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>

        <!-- Promotions Management -->
        <div class="admin-section" id="admin-promotions-section">
            <h3>${t('managePromotions')}</h3>
            <form id="promo-form" class="admin-form">
                <div class="form-group-i18n">
                    <label>${t('titleLabel')}</label>
                    <input type="text" id="promo-title-en" placeholder="${t('titleLabel')} (EN)" required>
                    <input type="text" id="promo-title-sr" placeholder="${t('titleLabel')} (SR)" required>
                    <input type="text" id="promo-title-ru" placeholder="${t('titleLabel')} (RU)" required>
                </div>
                <div class="form-group-i18n">
                    <label>${t('contentLabel')}</label>
                    <textarea id="promo-content-en" placeholder="${t('contentLabel')} (EN)" rows="3" required></textarea>
                    <textarea id="promo-content-sr" placeholder="${t('contentLabel')} (SR)" rows="3" required></textarea>
                    <textarea id="promo-content-ru" placeholder="${t('contentLabel')} (RU)" rows="3" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="admin-button">${editingPromotion ? t('updatePromotion') : t('addPromotion')}</button>
                    ${editingPromotion ? `<button type="button" id="cancel-edit-promo-btn" class="cancel-btn">${t('cancel')}</button>` : ''}
                </div>
            </form>
            <ul class="manage-list" id="promo-list">
                ${promotions.map(item => `
                    <li class="manage-list-item">
                        <span>${item.title[lang]}</span>
                         <div class="manage-list-item-actions">
                           <button class="edit-btn" data-id="${item.id}" data-type="promo">${t('edit')}</button>
                           <button class="delete-btn" data-id="${item.id}" data-type="promo">${t('delete')}</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <!-- Sales Statistics -->
        <div class="admin-section" id="admin-statistics-section">
            <h3>${t('salesStatistics')}</h3>
            <div class="date-range-selector">
                <label for="start-date">${t('startDate')}</label>
                <input type="date" id="start-date" value="${getStartDate()}">
                <label for="end-date">${t('endDate')}</label>
                <input type="date" id="end-date" value="${getEndDate()}">
            </div>
            <button id="generate-report-btn" class="admin-button">${t('generateReport')}</button>
            <div id="sales-report-container">
                ${renderReport()}
            </div>
        </div>

        <!-- Voice Control UI -->
        <button id="voice-control-btn" class="voice-control-btn ${isListening ? 'listening' : ''}" title="Activate Voice Control">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m12 7.5v-1.5a6 6 0 0 0-6-6v-1.5a6 6 0 0 0-6 6v1.5m6 7.5a6 6 0 0 0 6-6" />
             </svg>
        </button>
        ${voiceFeedback ? `<div class="voice-feedback-toast">${voiceFeedback}</div>` : ''}
      `;
  };
  
  const renderProductReviewsModal = () => {
    const product = getActiveProductReviews();
    if (!product) return '';

    const lang = getLanguage();
    const approvedReviews = getReviews().filter(r => r.productId === product.id && r.status === 'approved');

    return `
        <div class="reviews-modal-overlay" id="reviews-modal-overlay">
            <div class="reviews-modal-content">
                <button class="close-modal-btn" id="close-reviews-modal-btn" aria-label="${t('close')}">&times;</button>
                <h2>${t('reviews')} for ${product.name[lang]}</h2>
                
                <div class="reviews-list">
                    ${approvedReviews.length > 0 ? approvedReviews.map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <strong>${review.author}</strong>
                                <div class="stars" style="--rating: ${review.rating};" aria-label="${t('averageRating')}: ${review.rating} / 5"></div>
                            </div>
                            <h4>${review.title[lang]}</h4>
                            <p>${review.content[lang]}</p>
                        </div>
                    `).join('') : `<p>${t('noReviews')}</p>`}
                </div>

                <hr class="modal-divider"/>

                <h3>${t('submitReview')}</h3>
                <form id="review-form" class="admin-form">
                    <div class="form-group">
                        <label>${t('yourRating')}</label>
                        <div class="star-rating-input">
                           ${[5,4,3,2,1].map(star => `
                                <input type="radio" id="star${star}" name="rating" value="${star}" required/>
                                <label for="star${star}">&#9733;</label>
                           `).join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="review-title">${t('reviewTitleLabel')}</label>
                        <input type="text" id="review-title" required placeholder="${t('titleLabel')}...">
                    </div>
                    <div class="form-group">
                        <label for="review-content">${t('yourCommentLabel')}</label>
                        <textarea id="review-content" rows="4" required placeholder="${t('contentLabel')}..."></textarea>
                    </div>
                    <button type="submit" class="admin-button">${t('submit')}</button>
                </form>
            </div>
        </div>
    `;
  }

  const showVoiceFeedback = (message: string) => {
      setVoiceFeedback(message);
      setTimeout(() => setVoiceFeedback(null), 3000);
  };

  const handleVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase().trim();
    showVoiceFeedback(t('voiceHeard', command));

    let executedCommand: string | null = null;
    
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    // Navigation
    if (command.includes('product') || command.includes('производ') || command.includes('товар')) {
        scrollToSection('admin-products-section');
        executedCommand = 'Show Products';
    } else if (command.includes('review') || command.includes('рецензиј') || command.includes('отзыв')) {
        scrollToSection('admin-reviews-section');
        executedCommand = 'Show Reviews';
    } else if (command.includes('news') || command.includes('вест') || command.includes('новост')) {
        scrollToSection('admin-news-section');
        executedCommand = 'Show News';
    } else if (command.includes('promotion') || command.includes('промоциј') || command.includes('акци')) {
        scrollToSection('admin-promotions-section');
        executedCommand = 'Show Promotions';
    } else if (command.includes('statistic') || command.includes('статистик')) {
        scrollToSection('admin-statistics-section');
        executedCommand = 'Show Statistics';
    } 
    // Actions
    else if (command.includes('generate report') || command.includes('генериши извештај') || command.includes('создать отчет')) {
        (document.getElementById('generate-report-btn') as HTMLButtonElement)?.click();
        executedCommand = 'Generate Report';
    } else if (command.includes('add new product') || command.includes('додај нови производ') || command.includes('добавить новый товар')) {
        scrollToSection('admin-products-section');
        (document.getElementById('product-name-en') as HTMLInputElement)?.focus();
        executedCommand = 'Add New Product';
    }
    // Exit
    else if (command.includes('go home') || command.includes('почетну') || command.includes('главную')) {
        setView('home');
        executedCommand = 'Go Home';
    } else if (command.includes('exit admin') || command.includes('изађи') || command.includes('выйти')) {
        setView('home');
        executedCommand = 'Exit Admin';
    }

    if (executedCommand) {
        setTimeout(() => showVoiceFeedback(t('voiceCommandSuccess', executedCommand!)), 1000);
    } else {
        setTimeout(() => showVoiceFeedback(t('voiceCommandUnknown')), 1000);
    }
  };

  if (recognition) {
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
          setIsListening(true);
          showVoiceFeedback(t('voiceListening'));
      };
      
      recognition.onend = () => {
          setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
      };

      recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleVoiceCommand(transcript);
      };
  }
  
  const handleTranslate = async (field: 'name' | 'description') => {
      const sourceTextEl = document.getElementById(`product-${field}-en`) as HTMLInputElement | HTMLTextAreaElement;
      const sourceText = sourceTextEl.value;
      if (!sourceText) {
          alert('Please enter some English text first.');
          return;
      }

      if (field === 'name') setIsTranslatingName(true);
      else setIsTranslatingDesc(true);

      try {
          const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Translate the following product ${field} into Serbian and Russian: "${sourceText}"`,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: {
                      type: Type.OBJECT,
                      properties: {
                          sr: { type: Type.STRING, description: 'Serbian translation' },
                          ru: { type: Type.STRING, description: 'Russian translation' },
                      }
                  }
              }
          });
          const jsonText = response.text.trim();
          const translations = JSON.parse(jsonText);

          if (translations.sr) {
              (document.getElementById(`product-${field}-sr`) as HTMLInputElement).value = translations.sr;
          }
          if (translations.ru) {
              (document.getElementById(`product-${field}-ru`) as HTMLInputElement).value = translations.ru;
          }

      } catch (error) {
          console.error("Translation failed:", error);
          alert("Translation failed. Please check the console for details.");
      } finally {
          if (field === 'name') setIsTranslatingName(false);
          else setIsTranslatingDesc(false);
      }
  };

  const initializeLazyLoad = () => {
    const lazyImages = document.querySelectorAll('.lazy-load');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const src = img.dataset.src;
                    if (src) {
                        img.src = src;
                        img.onload = () => {
                            img.classList.add('loaded');
                        }
                    }
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: '0px 0px 200px 0px' }); // Load images when they are 200px from the viewport

        lazyImages.forEach(img => {
            observer.observe(img);
        });
    } else {
        // Fallback for older browsers: load all images immediately.
        lazyImages.forEach(img => {
            const image = img as HTMLImageElement;
            const src = image.dataset.src;
            if (src) {
              image.src = src;
              image.classList.add('loaded');
            }
        });
    }
  };

  const attachEventListeners = () => {
    // Header
    document.getElementById('cart-btn')?.addEventListener('click', () => setView('cart'));
    document.getElementById('lang-select')?.addEventListener('change', (e) => {
        setLanguage((e.target as HTMLSelectElement).value as Language);
    });

    // Footer Nav
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', e => {
            const view = (e.currentTarget as HTMLElement).dataset.view as View;
            if (view) setView(view);
        });
    });

    // Universal quantity controls and review modal listener
    document.getElementById('root')?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        
        // Quantity controls
        const quantityButton = target.closest('[data-product-id][data-action]');
        if (quantityButton) {
            const productId = parseInt(quantityButton.getAttribute('data-product-id')!, 10);
            const action = quantityButton.getAttribute('data-action');
            if (action === 'increment') {
                incrementItem(productId);
            } else if (action === 'decrement') {
                decrementItem(productId);
            }
            return;
        }

        // Open reviews modal
        const reviewsSummary = target.closest('.product-reviews-summary');
        if(reviewsSummary) {
            const productId = parseInt(reviewsSummary.getAttribute('data-product-id')!, 10);
            const product = getProducts().find(p => p.id === productId);
            if (product) {
                setActiveProductReviews(product);
            }
        }
    });

    // Modal listeners
    if (getActiveProductReviews()) {
        document.getElementById('reviews-modal-overlay')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                setActiveProductReviews(null);
            }
        });
        document.getElementById('close-reviews-modal-btn')?.addEventListener('click', () => setActiveProductReviews(null));
        
        const reviewForm = document.getElementById('review-form') as HTMLFormElement;
        reviewForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const product = getActiveProductReviews();
            if(!product) return;

            const rating = parseInt((reviewForm.querySelector('input[name="rating"]:checked') as HTMLInputElement)?.value, 10);
            const title = (document.getElementById('review-title') as HTMLInputElement).value;
            const content = (document.getElementById('review-content') as HTMLTextAreaElement).value;

            const newReview: Review = {
                id: Date.now(),
                productId: product.id,
                author: "User", // Mock user name
                rating: rating,
                title: { en: title, sr: title, ru: title }, // For simplicity, using same text. A real app would translate.
                content: { en: content, sr: content, ru: content },
                status: 'pending'
            };

            setReviews([newReview, ...getReviews()]);
            alert(t('reviewSubmitted'));
            setActiveProductReviews(null);
        });
    }

    const view = getView();

    if (view === 'catalog') {
      document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = (e.currentTarget as HTMLElement).dataset.category;
            if (category) {
                setSelectedCategory(category);
            }
        });
      });
    } else if (view === 'cart') {
      document.getElementById('back-to-shop-btn')?.addEventListener('click', () => setView('catalog'));
      
      document.getElementById('checkout-btn')?.addEventListener('click', async (e) => {
        const checkoutBtn = e.currentTarget as HTMLButtonElement;
        if (window.Telegram?.WebApp) {
            const orderData = {
                items: Object.fromEntries(getCart()),
                total: getCartTotal()
            };

            // !!! IMPORTANT !!!
            // Replace this URL with the URL of your deployed Python backend from Render.com
            const backendUrl = 'https://bela-zora-sapun-bot.onrender.com/process-order'; 

            try {
                checkoutBtn.disabled = true;
                checkoutBtn.textContent = t('processing');

                const response = await fetch(backendUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        orderData: orderData,
                        initData: window.Telegram.WebApp.initData
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`);
                }
                
                // The bot will send a confirmation message. We can close the app now.
                window.Telegram.WebApp.close();

            } catch (error) {
                console.error('Checkout failed:', error);
                window.Telegram.WebApp.showAlert('Could not place order. Please try again later.');
                checkoutBtn.disabled = false;
                checkoutBtn.textContent = t('checkout');
            }
        } else {
           // Fallback for browser testing
           alert(`Order Placed!\nDetails: ${JSON.stringify(Object.fromEntries(getCart()))}\n(This is a simulation)`);
           setCart(new Map());
           setView('catalog');
        }
      });
    } else if (view === 'admin') {
        // General Settings
        document.getElementById('logo-upload')?.addEventListener('change', async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const base64 = await fileToBase64(file) as string;
                setLogoUrl(base64);
            }
        });
        document.getElementById('banner-upload')?.addEventListener('change', async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const base64 = await fileToBase64(file) as string;
                setBannerUrl(base64);
            }
        });

        // Notification Management
        const orderStatusNotifForm = document.getElementById('order-status-notif-form') as HTMLFormElement;
        orderStatusNotifForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const newSettings: OrderStatusNotificationSettings = {};
            Object.keys(getOrderStatusNotifSettings()).forEach(statusKey => {
                newSettings[statusKey] = {
                    enabled: (document.getElementById(`notif-enabled-${statusKey}`) as HTMLInputElement).checked,
                    templates: {
                        en: (document.getElementById(`notif-template-${statusKey}-en`) as HTMLTextAreaElement).value,
                        sr: (document.getElementById(`notif-template-${statusKey}-sr`) as HTMLTextAreaElement).value,
                        ru: (document.getElementById(`notif-template-${statusKey}-ru`) as HTMLTextAreaElement).value,
                    }
                };
            });
            setOrderStatusNotifSettings(newSettings);
            alert('Notification settings saved!');
        });
        
        const promoNotifForm = document.getElementById('promo-notif-form') as HTMLFormElement;
        promoNotifForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            if(confirm(t('confirmSend'))) {
                const newPromo: PromotionalNotification = {
                    id: Date.now(),
                    date: new Date().toISOString().split('T')[0],
                    title: {
                        en: (document.getElementById('promo-notif-title-en') as HTMLInputElement).value,
                        sr: (document.getElementById('promo-notif-title-sr') as HTMLInputElement).value,
                        ru: (document.getElementById('promo-notif-title-ru') as HTMLInputElement).value,
                    },
                    content: {
                        en: (document.getElementById('promo-notif-content-en') as HTMLTextAreaElement).value,
                        sr: (document.getElementById('promo-notif-content-sr') as HTMLTextAreaElement).value,
                        ru: (document.getElementById('promo-notif-content-ru') as HTMLTextAreaElement).value,
                    }
                };
                setPromoNotifHistory([newPromo, ...getPromoNotifHistory()]);
                promoNotifForm.reset();
                alert(t('notificationSentSuccess'));
            }
        });

        // Voice Control
        document.getElementById('voice-control-btn')?.addEventListener('click', () => {
            if (!recognition) return;
            if (getIsListening()) {
                recognition.stop();
            } else {
                const lang = getLanguage();
                recognition.lang = lang === 'sr' ? 'sr-RS' : lang === 'ru' ? 'ru-RU' : 'en-US';
                recognition.start();
            }
        });

        // Sales Report
        document.getElementById('start-date')?.addEventListener('change', e => setStartDate((e.target as HTMLInputElement).value));
        document.getElementById('end-date')?.addEventListener('change', e => setEndDate((e.target as HTMLInputElement).value));
        document.getElementById('generate-report-btn')?.addEventListener('click', () => {
            const start = new Date(getStartDate());
            const end = new Date(getEndDate());
            end.setHours(23, 59, 59, 999); // Include the whole end day

            const filteredSales = salesHistory.filter(sale => {
                const saleDate = new Date(sale.date);
                return saleDate >= start && saleDate <= end;
            });

            const productSales = new Map<number, number>();
            filteredSales.forEach(sale => {
                const currentQty = productSales.get(sale.productId) || 0;
                productSales.set(sale.productId, currentQty + sale.quantity);
            });
            
            const reportData = Array.from(productSales.entries()).map(([productId, totalQuantity]) => {
                    const product = getProducts().find(p => p.id === productId);
                    return { productId, name: product!.name, totalQuantity };
                })
                .sort((a, b) => b.totalQuantity - a.totalQuantity);

            setSalesReport(reportData);
        });
        
        // Product Management
        const productForm = document.getElementById('product-form') as HTMLFormElement;
        const productFormReset = () => {
            productForm.reset();
            setEditingProduct(null);
            setNewProductImage(null);
        };

        document.getElementById('product-image-upload')?.addEventListener('change', async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const base64 = await fileToBase64(file) as string;
                setNewProductImage(base64);
            }
        });
        
        document.getElementById('cancel-edit-product-btn')?.addEventListener('click', productFormReset);

        productForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const editingProduct = getEditingProduct();
            const categoryKey = (document.getElementById('product-category') as HTMLSelectElement).value;
            const categoryObj = categories.find(c => c.key === categoryKey);
            if (!categoryObj) return;

            const productData = {
                name: {
                    en: (document.getElementById('product-name-en') as HTMLInputElement).value,
                    sr: (document.getElementById('product-name-sr') as HTMLInputElement).value,
                    ru: (document.getElementById('product-name-ru') as HTMLInputElement).value,
                },
                description: {
                    en: (document.getElementById('product-desc-en') as HTMLTextAreaElement).value,
                    sr: (document.getElementById('product-desc-sr') as HTMLTextAreaElement).value,
                    ru: (document.getElementById('product-desc-ru') as HTMLTextAreaElement).value,
                },
                price: parseFloat((document.getElementById('product-price') as HTMLInputElement).value),
                image: getNewProductImage() || (editingProduct ? editingProduct.image : 'https://placehold.co/300x300?text=No+Image'),
                category: categoryObj.name
            };

            if (editingProduct) {
                // Update existing product
                const updatedProducts = getProducts().map(p => 
                    p.id === editingProduct.id ? { ...p, ...productData } : p
                );
                setProducts(updatedProducts);
            } else {
                // Add new product
                const newProduct: Product = { id: Date.now(), ...productData };
                setProducts([newProduct, ...getProducts()]);
            }
            
            productFormReset();
        });

        document.querySelectorAll('.translate-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const field = (e.currentTarget as HTMLElement).dataset.field as 'name' | 'description';
                if (field) {
                    handleTranslate(field);
                }
            });
        });

        // News Management
        const newsForm = document.getElementById('news-form') as HTMLFormElement;
        const newsFormReset = () => {
            newsForm.reset();
            setEditingNewsItem(null);
        };

        document.getElementById('cancel-edit-news-btn')?.addEventListener('click', newsFormReset);

        newsForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const editingNewsItem = getEditingNewsItem();
            const newsData = {
                date: (document.getElementById('news-date') as HTMLInputElement).value,
                title: {
                    en: (document.getElementById('news-title-en') as HTMLInputElement).value,
                    sr: (document.getElementById('news-title-sr') as HTMLInputElement).value,
                    ru: (document.getElementById('news-title-ru') as HTMLInputElement).value,
                },
                content: {
                    en: (document.getElementById('news-content-en') as HTMLTextAreaElement).value,
                    sr: (document.getElementById('news-content-sr') as HTMLTextAreaElement).value,
                    ru: (document.getElementById('news-content-ru') as HTMLTextAreaElement).value,
                }
            };

            if (editingNewsItem) {
                const updatedNews = getNewsItems().map(item =>
                    item.id === editingNewsItem.id ? { ...item, ...newsData } : item
                );
                setNewsItems(updatedNews);
            } else {
                const newNewsItem: NewsItem = { id: Date.now(), ...newsData };
                setNewsItems([newNewsItem, ...getNewsItems()]);
            }
            newsFormReset();
        });
        
        // Promotions Management
        const promoForm = document.getElementById('promo-form') as HTMLFormElement;
        const promoFormReset = () => {
            promoForm.reset();
            setEditingPromotion(null);
        };
        
        document.getElementById('cancel-edit-promo-btn')?.addEventListener('click', promoFormReset);

        promoForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const editingPromotion = getEditingPromotion();
            const promoData = {
                title: {
                    en: (document.getElementById('promo-title-en') as HTMLInputElement).value,
                    sr: (document.getElementById('promo-title-sr') as HTMLInputElement).value,
                    ru: (document.getElementById('promo-title-ru') as HTMLInputElement).value,
                },
                content: {
                    en: (document.getElementById('promo-content-en') as HTMLTextAreaElement).value,
                    sr: (document.getElementById('promo-content-sr') as HTMLTextAreaElement).value,
                    ru: (document.getElementById('promo-content-ru') as HTMLTextAreaElement).value,
                }
            };

            if (editingPromotion) {
                const updatedPromos = getPromotions().map(item =>
                    item.id === editingPromotion.id ? { ...item, ...promoData } : item
                );
                setPromotions(updatedPromos);
            } else {
                 const newPromotion: Promotion = { id: Date.now(), ...promoData };
                 setPromotions([newPromotion, ...getPromotions()]);
            }
            promoFormReset();
        });
        
        // Action Buttons in Lists (Edit/Delete/Approve/Reject)
        document.querySelectorAll('.edit-btn, .delete-btn, .approve-btn, .reject-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const type = target.dataset.type;
                const id = parseInt(target.dataset.id!, 10);
                const isEdit = target.classList.contains('edit-btn');
                const isApprove = target.classList.contains('approve-btn');

                if (type === 'review') {
                    // FIX: Explicitly define the type of newStatus to match the Review['status'] union type.
                    const newStatus: 'approved' | 'rejected' = isApprove ? 'approved' : 'rejected';
                    const updatedReviews = getReviews().map(r => r.id === id ? {...r, status: newStatus} : r);
                    setReviews(updatedReviews);
                } else if (type === 'news') {
                    if (isEdit) {
                        const itemToEdit = getNewsItems().find(item => item.id === id);
                        if (itemToEdit) {
                            setEditingNewsItem(itemToEdit);
                            (document.getElementById('news-date') as HTMLInputElement).value = itemToEdit.date;
                            (document.getElementById('news-title-en') as HTMLInputElement).value = itemToEdit.title.en;
                            (document.getElementById('news-title-sr') as HTMLInputElement).value = itemToEdit.title.sr;
                            (document.getElementById('news-title-ru') as HTMLInputElement).value = itemToEdit.title.ru;
                            (document.getElementById('news-content-en') as HTMLTextAreaElement).value = itemToEdit.content.en;
                            (document.getElementById('news-content-sr') as HTMLTextAreaElement).value = itemToEdit.content.sr;
                            (document.getElementById('news-content-ru') as HTMLTextAreaElement).value = itemToEdit.content.ru;
                            newsForm.scrollIntoView({ behavior: 'smooth' });
                        }
                    } else {
                        setNewsItems(getNewsItems().filter(item => item.id !== id));
                    }
                } else if (type === 'promo') {
                    if (isEdit) {
                         const itemToEdit = getPromotions().find(item => item.id === id);
                         if (itemToEdit) {
                            setEditingPromotion(itemToEdit);
                            (document.getElementById('promo-title-en') as HTMLInputElement).value = itemToEdit.title.en;
                            (document.getElementById('promo-title-sr') as HTMLInputElement).value = itemToEdit.title.sr;
                            (document.getElementById('promo-title-ru') as HTMLInputElement).value = itemToEdit.title.ru;
                            (document.getElementById('promo-content-en') as HTMLTextAreaElement).value = itemToEdit.content.en;
                            (document.getElementById('promo-content-sr') as HTMLTextAreaElement).value = itemToEdit.content.sr;
                            (document.getElementById('promo-content-ru') as HTMLTextAreaElement).value = itemToEdit.content.ru;
                            promoForm.scrollIntoView({ behavior: 'smooth' });
                         }
                    } else {
                        setPromotions(getPromotions().filter(item => item.id !== id));
                    }
                } else if (type === 'product') {
                    if (isEdit) {
                        const productToEdit = getProducts().find(p => p.id === id);
                        if (productToEdit) {
                            setEditingProduct(productToEdit);
                            setNewProductImage(productToEdit.image); // set preview
                            // Populate form
                            (document.getElementById('product-name-en') as HTMLInputElement).value = productToEdit.name.en;
                            (document.getElementById('product-name-sr') as HTMLInputElement).value = productToEdit.name.sr;
                            (document.getElementById('product-name-ru') as HTMLInputElement).value = productToEdit.name.ru;
                            (document.getElementById('product-desc-en') as HTMLTextAreaElement).value = productToEdit.description.en;
                            (document.getElementById('product-desc-sr') as HTMLTextAreaElement).value = productToEdit.description.sr;
                            (document.getElementById('product-desc-ru') as HTMLTextAreaElement).value = productToEdit.description.ru;
                            (document.getElementById('product-price') as HTMLInputElement).value = productToEdit.price.toString();
                            const categoryKey = Object.keys(categories[0].name).find(lang => productToEdit.category[lang as Language] !== undefined);
                            const category = categories.find(c => c.name[categoryKey as Language] === productToEdit.category[categoryKey as Language]);
                            if(category) (document.getElementById('product-category') as HTMLSelectElement).value = category.key;

                            productForm.scrollIntoView({ behavior: 'smooth' });
                        }
                    } else { // Is Delete
                        setProducts(getProducts().filter(p => p.id !== id));
                    }
                }
            });
        });

    }
    initializeLazyLoad();
  };

  const render = () => {
    const root = document.getElementById('root');
    if (!root) return;

    let pageContent = '';
    switch(getView()) {
        case 'home': pageContent = renderHomePage(); break;
        case 'catalog': pageContent = renderCatalogPage(); break;
        case 'cart': pageContent = renderCartPage(); break;
        case 'news': pageContent = renderNewsPage(); break;
        case 'promotions': pageContent = renderPromotionsPage(); break;
        case 'profile': pageContent = renderProfilePage(); break;
        case 'admin': pageContent = renderAdminPage(); break;
    }

    const modal = getActiveProductReviews() ? renderProductReviewsModal() : '';

    root.innerHTML = `
      ${renderHeader()}
      <main>${pageContent}</main>
      ${renderFooterNav()}
      ${modal}
    `;

    attachEventListeners();
  };

  (setCart as any).subscribe(render);
  (setView as any).subscribe(render);
  (setLanguage as any).subscribe(render);
  (setRole as any).subscribe(render);
  (setSelectedCategory as any).subscribe(render);
  (setSalesReport as any).subscribe(render);
  (setProducts as any).subscribe(render);
  (setNewsItems as any).subscribe(render);
  (setPromotions as any).subscribe(render);
  (setReviews as any).subscribe(render);
  (setLogoUrl as any).subscribe(render);
  (setBannerUrl as any).subscribe(render);
  (setActiveProductReviews as any).subscribe(render);
  (setEditingProduct as any).subscribe(render);
  (setNewProductImage as any).subscribe(render);
  (setEditingNewsItem as any).subscribe(render);
  (setEditingPromotion as any).subscribe(render);
  (setIsListening as any).subscribe(render);
  (setVoiceFeedback as any).subscribe(render);
  (setIsTranslatingName as any).subscribe(render);
  (setIsTranslatingDesc as any).subscribe(render);
  (setOrderStatusNotifSettings as any).subscribe(render);
  (setPromoNotifHistory as any).subscribe(render);
  
  // Initial render on app load
  if (window.Telegram?.WebApp?.initDataUnsafe?.start_param === 'BelaZoraAdmin2024') {
    setRole('admin');
    setView('admin');
  } else {
    render();
  }
};

App();

export {};