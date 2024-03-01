const express = require('express');
const dotenv = require('dotenv').config();
const { Client } = require('@notionhq/client');
const cors = require('cors');
const port = process.env.PORT || 3500;
const app = express();

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3500'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); 


const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

app.get('/people', async (req, res) => {
    const databaseId = process.env.NOTION_DATABASE_ID;

    try {
        const response = await notion.databases.query({ database_id: databaseId });
        const relevantData = response.results;

        res.json({ message: relevantData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/projects', async (req, res) => {
    const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;

    try {
        const response = await notion.databases.query({ database_id: databaseId });
        const relevantData = response.results;

        res.json({ message: relevantData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
