const express = require('express');
const config = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const connectToMongoDB = require('./config/db');
const cors = require('cors')

connectToMongoDB();
app.use(cors());
app.use(express.json());

app.use('/api/user', require('./routes/authRoute'));

app.listen(PORT, () => [
    console.log(`task app running at http://localhost:${PORT}`)
])