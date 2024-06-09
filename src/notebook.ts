import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import noteRoutes from './routes/noteRoutes';

const app = express();

app.use(bodyParser.json());
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error(err);
    }
});


// import express from 'express';
// import bodyParser from 'body-parser';
// import noteRoutes from './routes/noteRoutes';
// import dbConfig from './db';


// const app = express();
// const port = 3000;
// const connectionTry = require('./db')
// // Middleware
// app.use(bodyParser.json());

// // Routes
// app.get('/', (req, res) => {
//     res.send('Server is running');
// });


// connectionTry.connectToDatabase()

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
// export default dbConfig;
