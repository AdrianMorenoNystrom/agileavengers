const express = require('express');
const dotenv = require('dotenv').config();
const { Client } = require('@notionhq/client');
const port = process.env.PORT || 3500;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const app = express();

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


app.post('/projects',jsonParser,async(req,res)=>{
    // Lägger bara till Projektnamn och timmar som test till en början.
    const projectName = req.body.projectName;
    const hours = req.body.hours;
    const status=req.body.status;
    const projectStart=req.body.projectStart;
    const projectEnd=req.body.projectEnd;
    const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                Hours: {
                    number: parseFloat(hours)
                },
                "Projectname": {
                    title: [
                        {
                            text: {
                                content: projectName
                            }
                        }
                    ]
                },
                "Status":{
                    select:{
                        name:status
                    }
                },
                "Timespan":{
                    date:{
                        start:projectStart,
                        end:projectEnd
                    }
                }
            }
        });
        console.log(response);
        console.log("Success!");
    } catch (error) {
        console.log(error);
    }
})


app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
