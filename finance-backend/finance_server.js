var express = require('express')
var app = express()
//const cors = require('cors');  // CORS for cross-origin requests

var sql = require("mssql");

var config = {
    user: 'Ken',
    password: 'abcd',
    server: 'DESKTOP-BRJAM44\\SQLEXPRESS',
    database: 'Finance_App_Database',
    
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
};

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

//OVERVIEW PAGE
app.get('/getUsernamePassword', async (req, res) => {

    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        const result = await pool.request().query('SELECT * FROM dbo.Users');

        // Send the query result back to the client
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Error retrieving data from database');
    }
})

app.get('/getOverviewPots', async (req, res) => {

    try {
        // Connect to the database
        const pool = await sql.connect(config);

        const result = await pool.request().query('SELECT TOP 4 p.pots_id, p.category_id, p.target, p.total_amount, p.color, c.category_name, SUM(p.total_amount) OVER() AS total_sum '
                                                   + 'from dbo.Pots p JOIN dbo.Category c ON p.category_id = c.category_id ORDER BY p.pots_id');

        // Send the query result back to the client
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Error retrieving data from database');
    }
})

app.get('/getTransactionOverview', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        const result = await pool.request().query('SELECT TOP 5 t.transaction_id, u.name, c.category_name, t.avatar_path, t.transaction_date, t.transaction_amount, t.transaction_type '
                                                   + 'from [dbo].[Transaction] t JOIN dbo.Category c ON t.category_id = c.category_id JOIN dbo.Users u ON t.user_id = u.user_id ORDER BY t.transaction_date DESC');

        // Send the query result back to the client
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Error retrieving data from database');
    }
})

app.get('/getBudgetOverview', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        const result = await pool.request().query('SELECT TOP 4 b.budget_id, c.category_name, b.max_amount, b.spent, b.remaining, b.color from [dbo].[Budget] b JOIN dbo.Category c ON c.category_id = b.category_id  ORDER BY b.budget_id');

        // Send the query result back to the client
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Error retrieving data from database');
    }
})

app.get('/getAllBills', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        const result = await pool.request().query('SELECT * from dbo.Bills');

        // Send the query result back to the client
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Error retrieving data from database');
    }
})

app.get('/getBalances', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        const result = await pool.request().query('SELECT * from dbo.Balance');

        // Send the query result back to the client
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Error retrieving data from database');
    }
})

app.get('/getTest', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        const result = await pool.request().query('SELECT * from dbo.Balance');

        // Send the query result back to the client
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Error retrieving data from database');
    }
})

app.listen(5000, function() {
    console.log('Server is running...');
});