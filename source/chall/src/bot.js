// chall.js
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // Set to false for debugging
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(`https://google.com`);
    console.log('Visited example.html');
    await browser.close();
})();
