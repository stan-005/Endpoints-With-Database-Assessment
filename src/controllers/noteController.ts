import { Request, Response } from 'express';
import { note } from '../interfaces/note';
import { getConnection } from '../services/noteService';
import dbConfig from '../config/db'; 
import sql from 'mssql';

export const createNote = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Title', title)
            .input('Content', content)
            .query('INSERT INTO Notes (Title, Content) OUTPUT INSERTED.ID, INSERTED.CreatedAt VALUES (@Title, @Content)');

        const newNote: note = {
            id: result.recordset[0].ID,
            title,
            content,
            createdAt: result.recordset[0].CreatedAt
        };

        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};

export const getNotes = async (req: Request, res: Response) => {
    let pool = await sql.connect(dbConfig);
    try {
        const result = await pool.request().query('SELECT * FROM Notes');
        console.log(result.recordset);
        


        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};

export const getNoteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('ID', id)
            .query('SELECT * FROM Notes WHERE ID = @ID');

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};

export const updateNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('ID', id)
            .input('Title', title)
            .input('Content', content)
            .query('UPDATE Notes SET Title = @Title, Content = @Content WHERE ID = @ID');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('ID', id)
            .query('DELETE FROM Notes WHERE ID = @ID');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};
