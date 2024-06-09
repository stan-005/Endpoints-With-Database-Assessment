"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getNotes = exports.createNote = void 0;
const noteService_1 = require("../services/noteService");
const db_1 = __importDefault(require("../config/db"));
const mssql_1 = __importDefault(require("mssql"));
const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const pool = await (0, noteService_1.getConnection)();
        const result = await pool.request()
            .input('Title', title)
            .input('Content', content)
            .query('INSERT INTO Notes (Title, Content) OUTPUT INSERTED.ID, INSERTED.CreatedAt VALUES (@Title, @Content)');
        const newNote = {
            id: result.recordset[0].ID,
            title,
            content,
            createdAt: result.recordset[0].CreatedAt
        };
        res.status(201).json(newNote);
    }
    catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};
exports.createNote = createNote;
const getNotes = async (req, res) => {
    let pool = await mssql_1.default.connect(db_1.default);
    try {
        const result = await pool.request().query('SELECT * FROM Notes');
        res.status(200).json(result.recordset);
    }
    catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};
exports.getNotes = getNotes;
const getNoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await (0, noteService_1.getConnection)();
        const result = await pool.request()
            .input('ID', id)
            .query('SELECT * FROM Notes WHERE ID = @ID');
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(result.recordset[0]);
    }
    catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};
exports.getNoteById = getNoteById;
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const pool = await (0, noteService_1.getConnection)();
        const result = await pool.request()
            .input('ID', id)
            .input('Title', title)
            .input('Content', content)
            .query('UPDATE Notes SET Title = @Title, Content = @Content WHERE ID = @ID');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ message: 'Note updated successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await (0, noteService_1.getConnection)();
        const result = await pool.request()
            .input('ID', id)
            .query('DELETE FROM Notes WHERE ID = @ID');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};
exports.deleteNote = deleteNote;
