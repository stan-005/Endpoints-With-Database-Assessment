import sql from 'mssql';

const config = {
    server: 'localhost',
    database: 'notesdb',
    user: 'stanley',
    password: 'nyakinda',
    options: {
        encrypt: false, // For Azure SQL Database
        trustServerCertificate: true // For Azure SQL Database
    }
};

async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

connectToDatabase();
