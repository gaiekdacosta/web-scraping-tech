const puppeteer = require('puppeteer');
const fs = require('fs');

const scraping = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        timeout: 60000,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    console.log("Scraping em andamento...");

    await page.goto('https://g1.globo.com/tecnologia/');

    await page.waitForSelector(".feed-post-link");

    const titles = await page.$$eval('.feed-post-link', elements => {
        return elements.map(el => el.textContent.trim());
    });

    console.log("Títulos das notícias:");
    console.log(titles);

    await browser.close();
}

scraping();
