"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
const mssql_1 = __importDefault(require("mssql"));
const db_1 = __importDefault(require("../config/db"));
let pool;
const getConnection = async () => {
    if (!pool) {
        pool = await mssql_1.default.connect(db_1.default);
    }
    return pool;
};
exports.getConnection = getConnection;
