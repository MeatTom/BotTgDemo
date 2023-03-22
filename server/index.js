const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true, interval: 300, onlyFirstMatch: true });
const webAppUrl ='https://github.com/MeatTom';

const commands = [
    { command: 'start', description: 'Начать работу с ботом' },
    { command: 'catalog', description: 'Открыть каталог'},
    { command: 'about', description: 'Получить информацию о компании' },
    { command: 'contacts', description: 'Контакты для связи' },
    { command: 'help', description: 'Как пользоваться ботом' },
];

bot.setMyCommands(commands);

const keyboardMarkup = {
    reply_markup: {
        keyboard: [
            [{ text: 'Открыть каталог', web_app: {url: webAppUrl} }],
            [{ text: 'О компании' }],
            [{ text: 'Контакты' }],
            [{ text: 'Помощь' }],
        ],

        resize_keyboard: true,
        one_time_keyboard: false,
    },
};

const sendCatalogButton = {
    text: 'Открыть каталог',
    web_app: {url: webAppUrl}
};

const sendAboutMessage = (chatId) => {
    bot.sendMessage(
        chatId,
        '<pre>Наша компания</pre>\n' +
        '\n' +
        '<b>MERA</b> – это динамично развивающийся бренд, занимающийся изготовлением и поставками контрольно-измерительных приборов и автоматики для промышленных предприятий.\n' +
        '\n' +
        'Торговая марка MERA появилась на отечественном рынке промышленной автоматизации, когда активные и амбициозные специалисты отрасли осознали, что российская торговая площадка не может обеспечить потребителя качественным оборудованием по доступной цене. Тем не менее современным производствам необходима автоматизация высокого уровня.\n' +
        '\n' +
        'Так <b>MERA</b> определила свою <b>миссию</b> - предложить российским предприятиям и организациям <b>высококачественное оборудование по разумной цене.</b>',
        { parse_mode: 'HTML' }
    );
};

const sendContactsMessage = (chatId) => {
    bot.sendMessage(
        chatId,
        '<pre>Наши контакты</pre>\n' +
        '\n' +
        '📞 Телефон: +7(812)677-05-77 \n' +
        '\n' +
        '✉ Почта: info@mera-russia.com \n' +
        '\n' +
        '🕓 Время работы: \n' +
        'Пн-Пт: 9.00 - 18.00\n' +
        'Сб-Вс: Выходной\n' +
        '\n' +
        '📍Адрес: 199106, Санкт- Петербург, ул. Большая Морская, 37',
        { parse_mode: 'HTML' }
    ).then(() => {
        bot.sendLocation(
            chatId,
            59.934871, 30.253076
        );
    });
};

const sendHelpMessage = (chatId) => {
    bot.sendMessage(
        chatId,
        'Для использования бота выберите одну из опций на виртуальной клавиатуре или введите одну из следующих команд и нажмите на неё:\n' +
        '\n' +
        '/start - Начать работу с ботом\n' +
        '/catalog - Открыть каталог товаров\n' +
        '/about - Получить информацию о компании\n' +
        '/contacts - Контакты для связи\n' +
        '/help - Как пользоваться ботом\n'+
        '\n' +
        'При необходимости можете связаться с разработчиком: @furno_kalipso',
        { parse_mode: 'HTML' }
    );
};

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Добро пожаловать! Вас приветствует бот компании "MERA" по заказу контрольно-измерительных приборов. Выберите одну из опций на клавиатуре или введите одну из следующих команд (их также можно выбрать в боковом меню с командами):\n'+
        '/start\n' +
        '/catalog\n' +
        '/about\n' +
        '/contacts\n' +
        '/help',
        keyboardMarkup);
});

bot.onText(/\/about/, (msg) => {
    sendAboutMessage(msg.chat.id);
});

bot.onText(/\/contacts/, (msg) => {
    sendContactsMessage(msg.chat.id);
});

bot.onText(/\/help/, (msg) => {
    sendHelpMessage(msg.chat.id);
});

bot.onText(/\/catalog/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Нажмите на кнопку, чтобы открыть каталог', {
        reply_markup: {
            inline_keyboard: [[sendCatalogButton]]
        }
    });
});

bot.on('message', (msg) => {
    const message = msg.text.toLowerCase();
    switch (message) {
        case 'о компании':
            sendAboutMessage(msg.chat.id);
            break;
        case 'контакты':
            sendContactsMessage(msg.chat.id);
            break;
        case 'помощь':
            sendHelpMessage(msg.chat.id);
            break;
    }
});