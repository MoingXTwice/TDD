const express = require('express');

const PORT = 8080;

const app = express();
app.use(express.json());

const productRoutes = require('./routes');

app.use('/api/products', productRoutes);

const mongoose = require('mongoose');
mongoose.connect(`mongodb://admin:admin@localhost:27017/tdd?authSource=admin&authMechanism=SCRAM-SHA-1`, { ignoreUndefined: true }).then(() => {
    console.log('몽고 ON!');
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message }); // next(e) 에서 넘어온 에러처리를 담당한다. next를 사용하지 않으면 넘어오지 않는다.
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);

module.exports = app;