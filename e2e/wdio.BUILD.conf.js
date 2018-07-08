const phantom = require('phantomjs-prebuilt');
const wdioConfig = require('./wdio.conf.js');

wdioConfig.config.capabilities = [{
    browserName: 'phantomjs',
    acceptSslCerts: true,

    loggingPrefs: {
        browser: 'ALL',
        client: 'ALL',
    },

    'phantomjs.binary.path': phantom.path,

    'phantomjs.cli.args': [
        // '--debug=yes',
        '--web-security=false',
        '--ignore-ssl-errors=true',
        '--ssl-protocol=any',
        '--webdriver-logfile=cache/phantomjsdriver.log',
    ],
    'phantomjs.page.settings.userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'
}];

wdioConfig.config.services = ['phantomjs'];
wdioConfig.config.maxInstances = 10;

exports.config = wdioConfig.config;
