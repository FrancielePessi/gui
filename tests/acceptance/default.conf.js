const env = require('./env.conf');

const config = {
   tests: './Scenarios/*_test.js',
    
   clearDb: false,
    output: './output',
    multiple: {
       parallel: {
        chunks: process.env.THREADS || 30,
        browsers: [
            { browser: 'firefox', windowSize: '1920x1080',},
            {browser: 'chrome', windowSize: '1920x1080',}
                 
          ],
        },
    },
    helpers: {
        Puppeteer: {
            url: env.dojot_host,
            keepCookies: true,
            fullPageScreenshots: true,
            // Para rodar no FireFox, descomentar a linha a baixo
            // browser: process.env.BROWSER || 'firefox',   
            restart: false,
            keepBrowserState: true,
            show: true,
            //waitForNavigation: ['networkidle2', 'domcontentloaded'],
            chrome: {
                //args: ['--no-sandbox', '--start-maximized', '--start-fullscreen'],
                args: ['--no-sandbox', '--start-maximized'],
                handleSIGTERM: false,
                handleSIGHUP: false,
                defaultViewport: {
                    width: 1280,
                    height: 720,
                },
            },
            firefox: {
                args: [
                    '--ignore-certificate-errors'
                ],
            },
        },
        MyHelper: {
          require: './getPageUr.js'
        },
        REST: {
            endpoint: env.dojot_host,
        },
    },
    include: {
        I: './steps_file.js',
        Commons: './PageObject/Common.js',
        Device: './PageObject/Device.js',
        Flow: './PageObject/Flow.js',
        Notification: './PageObject/Notification.js',
        Template: './PageObject/Template.js',
        User: './PageObject/User.js',
    },
    plugins: {
        allure: {},
        autoDelay: {
            enabled: true,
        },
        autoLogin: {
            enabled: true,
            saveToFile: false,
            inject: 'login',
            users: {
                admin: {
                    login: (I) => {
                        I.loginAdmin(I, config.clearDb);
                    }
                    ,
                    check: (I) => {
                        I.amOnPage(`${env.dojot_host}/#/`);
                        I.see('admin');
                    },
                },
            },
        },
    },
    bootstrap: null,
    mocha: {},
    name: 'dojot-codecept',
};


module.exports = config;