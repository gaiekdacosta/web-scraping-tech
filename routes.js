const express = require('express');
const router = express.Router();
const scraping = require('./scraping');

router.get('/getNews/:amount', async (req, res) => {
    try {
        const { amount } = req.params;
        const data = await scraping(amount);
        res.json(data);
    } catch (error) {
        res.status(500).send('Ocorreu um erro: ' + error.message);
    }
});

module.exports = router;
