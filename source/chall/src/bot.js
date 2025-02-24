const puppeteer = require('puppeteer');

const sleep = ms => new Promise(res => setTimeout(res, ms));

async function visitPageAndCheckForProof(url, proofString, timeout = 2000) {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        args: [
            // For the chall
            '--disable-web-security',
            '--incognito',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            // For resource optimization
            '--js-flags="--max-old-space-size=300"',
            '--disable-dev-shm-usage',
            '--single-process',
            '--disable-gpu',
            '--disable-background-timer-throttling',
            '--disable-renderer-backgrounding',
            '--memory-pressure-off'
        ],
    });

    const page = await browser.newPage();

    // Create a variable to track if proofString is logged
    let proofFound = false;

    // Listen for console events on the page
    page.on('console', (msg) => {
        if (msg.text() === proofString) {
            proofFound = true;
        }
    });

    // Visit the provided URL
    await page.goto(url);

    // Wait for the specified timeout to ensure console logs are captured
    await sleep(timeout);

    // Close the browser
    await browser.close();

    return proofFound;
}

module.exports = {visitPageAndCheckForProof}