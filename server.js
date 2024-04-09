const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const port = 4138;

app.listen(port, () => {
    console.log(`➜ Server running in port: ${port}`);
});
