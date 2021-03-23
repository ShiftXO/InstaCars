const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { auth } = require('./middlewares/auth');
const config = require('./config/index');
const mongoose = require('./config/mongoose');

const app = express();
mongoose();
app.use(cors({
    origin: ["http://localhost:3000"], credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'OMEGALUL' });
});

app.use('/', routes);
//app.use(errorHandler);

app.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}...`))