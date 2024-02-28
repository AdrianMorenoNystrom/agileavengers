const express = require('express');
const dotenv = require('dotenv').config();
const { Client } = require('@notionhq/client');
const port = process.env.PORT || 3500;

const app = express();

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

app.get('/api', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
