const puppeteer = require('puppeteer');

const scraping = async (amount) => {
    const browser = await puppeteer.launch({
        headless: true,
        timeout: 30000,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    const sites = {
        g1: {
            url: "https://g1.globo.com/tecnologia/",
            selector: ".bastian-feed-item"
        },
        tecmundo: {
            url: "https://www.tecmundo.com.br/tecnologia",
            selector: ".tec--card__title"
        },
        tecnoblog: {
            url: "https://tecnoblog.net",
            selector: ".grid4"
        }
    };

    const data = {};

    for (const [site, config] of Object.entries(sites)) {
        try {
            await page.goto(config.url);
            await page.waitForSelector(config.selector);

            const reports = await page.$$eval(config.selector, (elements, site, amount) => {
                const limitedElements = elements.slice(0, Number(amount));
                return limitedElements.map(el => {
                    let textContent = ''; 

                    if (site !== 'tecnoblog') {
                        textContent = el.textContent.trim();
                    } else {
                        textContent = el.querySelector('h2')?.textContent.trim() || '';
                    }
                    
                    const urlElement = el.querySelector('a');
                    const url = urlElement ? urlElement.href : null;
            
                    return { title: textContent, url };
                }).filter(Boolean);
            }, site, amount);
    
            data[site] = reports;

            console.log(`Noticias ${site} Geradas com Sucesso!`)
        } catch (error) {
            console.error(`Ocorreu um erro durante o scraping do site ${site}:`, error.message);
            continue;
        }
    }

    await browser.close();

    return data;
};

module.exports = scraping;
