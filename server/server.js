// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3500;

// app.get('/api', (req, res) => {
//     res.send({ message: 'Hello from Express!' });
// });
// app.listen(port, () => console.log(`Listening on port ${port}`));

// const express = require('express');
// const { NotionClient } = require('@notionhq/client');
// const integrationToken = process.env.NOTION_INTEGRATION_TOKEN;
// const pageId = process.env.NOTION_PAGE_ID;

// const app = express();

// const client = new NotionClient({
//     auth: integrationToken,
// });

// app.get('/page/:pageId', async (req, res) => {
//     try {
//         const page = await client.getPage(req.params.pageId);
//         res.json(page);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching page' });
//     }
// });

// app.listen(3500);

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
