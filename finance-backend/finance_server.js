var express = require('express')
var app = express()
//const cors = require('cors');  // CORS for cross-origin requests

var sql = require("mssql");

var config = {
    user: 'Ken',
    password: '1234',
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
app.get('/getOverviewPots', async (req, res) => {

    try {
        // Connect to the database
        const pool = await sql.connect(config);

        const result = await pool.request().query('SELECT TOP 4 p.pots_id, p.category_id, p.target, p.total_amount, col.color, c.category_name, SUM(p.total_amount) OVER() AS total_sum '
                                                   + 'from dbo.Pots p JOIN dbo.Category c ON p.category_id = c.category_id JOIN dbo.Colors col ON p.color_id = col.color_id ORDER BY p.pots_id ');

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

//BILLS PAGE

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

//LOGIN PAGE

app.post('/createAccount', async (req, res) => {
    const {name, username, password} = req.body;
    
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        const result = await pool
            .request()
            .input('username', sql.VarChar, username)
            .query('SELECT COUNT(*) AS count from dbo.Users WHERE username = @username');

            if (result.recordset[0].count > 0) {
                return res.status(409).json({ message: 'User already exists' });
            }

            const insertQuery = 'INSERT INTO dbo.Users (name, username, password) VALUES (@name, @username, @password)';

            await pool
                .request()
                .input('name', sql.VarChar, name)
                .input('username', sql.VarChar, username)
                .input('password', sql.VarChar, password)
                .query(insertQuery);
            
            res.status(201).json({ message: 'Account created successfully!'});
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({error: 'Internal server error'})
    }
})

//TRANSACTION PAGE

app.post('/checkUserPassword', async (req, res) => {
    
    const {username, password} = req.body;
    
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        const result = await pool
            .request()
            .input('username', sql.VarChar, username)
            .query('SELECT * from dbo.Users WHERE username = @username');
        
            const user = result.recordset[0];

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }


            if (password === user.password) {
                return res.status(200).json({ message: 'Login successful', user });
            } else {
            return res.status(401).json({ message: 'Invalid password' });
            }
          
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Serv');
    }
})

//POTS PAGE

app.get('/getAllPots', async (req, res) => {

    try {
        // Connect to the database
        const pool = await sql.connect(config);

        const result = await pool.request().query('SELECT p.pots_id, p.category_id, p.target, p.total_amount, col.color, col.color_id, c.category_name, col.color_name '
                                                   + 'FROM dbo.Pots p JOIN dbo.Category c ON p.category_id = c.category_id '
                                                   + 'JOIN dbo.Colors col ON p.color_id = col.color_id ' 
                                                   + 'ORDER BY p.pots_id');

        // Send the query result back to the client
        res.status(200).json(result.recordset);
    } catch (err) { 
        console.error('SQL error', err);
        res.status(500).send('Error retrieving data from database');
    }
})

app.get('/getListOfColors', async (req, res) => {

    try {
        // Connect to the database
        const pool = await sql.connect(config);

        const result = await pool.request().query('SELECT color_id, color, color_name from dbo.Colors');

        // Send the query result back to the client
        res.status(200).json(result.recordset);
    } catch (err) { 
        console.error('SQL error', err);
        res.status(500).send('Error retrieving data from database');
    }
})

app.post('/AddNewPot', async (req, res) => {
    const { category_name, target, color_name } = req.body;
    
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Begin transaction
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        // Check if the category exists
        const categoryResult = await transaction
            .request()
            .input('category_name', sql.VarChar, category_name)
            .query('SELECT COUNT(*) AS count FROM dbo.Category WHERE category_name = @category_name');

        if (categoryResult.recordset[0].count > 0 || (category_name === null || category_name === '')) {
            await transaction.rollback();
            return res.status(409).json({ message: 'Category name already exists or is empty. Please enter a new category name.' });
        }

        // Validate color_name
        if (!color_name) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Please select a color' });
        }

        // Validate target
        if (target < 1) {
            await transaction.rollback();
            return res.status(411).json({ message: 'Please enter a target bigger than 1' });
        }

        // Get color_id
        const colorResult = await transaction
            .request()
            .input('color_name', sql.VarChar, color_name)
            .query('SELECT color_id FROM dbo.Colors WHERE color_name = @color_name');

        if (colorResult.recordset.length === 0) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Invalid color name' });
        }

        const colorId = colorResult.recordset[0].color_id;

        // Insert new category
        await transaction
            .request()
            .input('category_name', sql.VarChar, category_name)
            .query('INSERT INTO dbo.Category (category_name) VALUES (@category_name)');

        // Get the new category_id
        const categoryIdResult = await transaction
            .request()
            .input('category_name', sql.VarChar, category_name)
            .query('SELECT category_id FROM dbo.Category WHERE category_name = @category_name');

        const categoryId = categoryIdResult.recordset[0].category_id;

        // Insert new pot
        await transaction
            .request()
            .input('category_id', sql.Int, categoryId)
            .input('target', sql.Int, target)
            .input('color_id', sql.Int, colorId)
            .query('INSERT INTO dbo.Pots (category_id, target, total_amount, color_id) VALUES (@category_id, @target, 0 , @color_id)');

        // Commit transaction
        await transaction.commit();

        res.status(201).json({ message: 'Pot created successfully!' });
    } catch (error) {
        console.error('Database error:', error);

        if (transaction) {
            try {
                await transaction.rollback();
            } catch (rollbackError) {
                console.error('Rollback error:', rollbackError);
            }
        }

        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/EditPot', async (req, res) => {
    const { pots_id, category_id, category_name, target, color_name } = req.body;
    
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Begin transaction
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        // Check if the category exists
        const categoryResult = await transaction
            .request()
            .input('category_name', sql.VarChar, category_name)
            .query('SELECT COUNT(*) AS count FROM dbo.Category WHERE category_name = @category_name');

        if (categoryResult.recordset[0].count > 0 || (category_name === null || category_name === '')) {
            await transaction.rollback();
            return res.status(409).json({ message: 'Category name already exists or is empty. Please enter a new category name.' });
        }

        // Validate color_name
        if (!color_name) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Please select a color' });
        }

        // Validate target
        if (target < 1) {
            await transaction.rollback();
            return res.status(411).json({ message: 'Please enter a target bigger than 1' });
        }

        // Get color_id
        const colorResult = await transaction 
            .request()
            .input('color_name', sql.VarChar, color_name)
            .query('SELECT color_id FROM dbo.Colors WHERE color_name = @color_name');

        if (colorResult.recordset.length === 0) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Invalid color name' });
        }

        const colorId = colorResult.recordset[0].color_id;

        // Insert new category
        await transaction
            .request()
            .input('category_name', sql.VarChar, category_name)
            .input('category_id', sql.Int, category_id)
            .query('UPDATE dbo.Category SET category_name = @category_name WHERE category_id = @category_id');

        // Insert new pot
        await transaction
            .request()
            .input('pots_id', sql.Int, pots_id)
            .input('target', sql.Int, target)
            .input('color_id', sql.Int, colorId)
            .query('UPDATE dbo.Pots SET target = @target, color_id = @color_id WHERE pots_id = @pots_id');

        // Commit transaction
        await transaction.commit();

        res.status(201).json({ message: 'Pot edited successfully!' });
    } catch (error) {
        console.error('Database error:', error);

        if (transaction) {
            try {
                await transaction.rollback();
            } catch (rollbackError) {
                console.error('Rollback error:', rollbackError);
            }
        }

        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/depositMoney', async (req, res) => {
    
    const {total_amount, pots_id} = req.body;
    
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        const depositResult = await pool
            .request()
            .input('total_amount', sql.Real, total_amount)
            .input('pots_id', sql.Int, pots_id)
            .query('UPDATE dbo.Pots SET total_amount = @total_amount WHERE pots_id = @pots_id');
        
        return res.status(200).json({ message: 'Deposit successful', depositResult });
          
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Serv');
    }
})

app.post('/withdrawMoney', async (req, res) => {
    
    const {total_amount, pots_id} = req.body;
    
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        const depositResult = await pool
            .request()
            .input('total_amount', sql.Real, total_amount)
            .input('pots_id', sql.Int, pots_id)
            .query('UPDATE dbo.Pots SET total_amount = @total_amount WHERE pots_id = @pots_id');
        
        return res.status(200).json({ message: 'Withdraw successful', depositResult });
          
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Serv');
    }
})

app.delete('/deletePots', async (req, res) => {
    
    const { pots_id, category_id } = req.body;
    
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Run a SQL query to get data from the Users table
        await pool
            .request()
            .input('pots_id', sql.Int, pots_id)
            .query('DELETE from dbo.Pots WHERE pots_id = @pots_id');

            await pool
                .request()
                .input('category_id', sql.Int, category_id)
                .query('DELETE from dbo.Category WHERE category_id = @category_id');
        
        return res.status(200).json({ message: 'Delete Successful!' });
          
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Serv');
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