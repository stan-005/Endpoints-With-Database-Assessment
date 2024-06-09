"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/notes', noteRoutes_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    }
    else {
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
