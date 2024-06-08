"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
const connectionTry = require('./db');
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});
connectionTry.connectToDatabase();
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
