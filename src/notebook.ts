import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const connectionTry = require('./db')
// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});


connectionTry.connectToDatabase()

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
