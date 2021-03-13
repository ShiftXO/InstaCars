const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { auth } = require('./middlewares/auth');
const config = require('./config/index');
const mongoose = require('./config/mongoose');

const app = express();
mongoose();
app.use(cors());
app.use(express.json());
app.use(auth);
app.get('/', (req, res) => {
    res.json({ message: 'OMEGALUL' });
});

app.use('/', routes);
//app.use(errorHandler);

app.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}...`))