const puppeteer = require('puppeteer');

const scraping = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        timeout: 30000,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    const sites = {
        g1: {
            url: "https://g1.globo.com/tecnologia/",
            selector: ".feed-post-link"
        },
        tecmundo: {
            url: "https://www.tecmundo.com.br/tecnologia",
            selector: ".tec--card__title"
        },
        olharDigital: {
            url: "https://olhardigital.com.br/tag/tecnologia/",
            selector: ".post-title"
        },
        tecnoblog: {
            url: "https://tecnoblog.net",
            selector: ".texts"
        }
    };

    console.log("Iniciando Scraping...");

    const data = {};

    for (const [site, config] of Object.entries(sites)) {
        await page.goto(config.url);
        await page.waitForSelector(config.selector);

        const reports = await page.$$eval(config.selector, (elements, site) => {
            const limitedElements = elements.slice(0, 3);
            return limitedElements.map(el => {
                const textContent = el.textContent.trim();
                const url = el.href;
        
                if (site !== 'tecmundo' && site !== 'tecnoblog') {
                    return { title: textContent, url };
                }
        
                if (site === 'tecmundo' && /^\d/.test(textContent)) {
                    return null;
                }
        
                if (site === 'tecnoblog') {
                    return { title: textContent.match(/(.*?)\n/)[1], url };
                }
        
                return { title: textContent, url };
            }).filter(Boolean);
        }, site);

        data[site] = reports;
    }

    await browser.close();

    console.log('data', data)

    return data;
};

module.exports = scraping;
