const express = require('express');
const router = express.Router();
const scraping = require('./scraping');

router.get('/getNews', async (req, res) => {
    try {
        const data = await scraping();
        res.json(data);
    } catch (error) {
        res.status(500).send('Ocorreu um erro durante a scraping: ' + error.message);
    }
});

module.exports = router;
