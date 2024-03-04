require("dotenv").config();
const { express, notion } = require("../../server");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();


router.post('/', jsonParser, async (req, res) => {
    const databaseId = process.env.NOTION_DATABASE_ID_PEOPLE;
    const name = req.body.properties.Name.title[0].text.content;

    console.log('Received data:', name);

    try {
        const response = await notion.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: name
                            },
                        },
                    ],
                }
            },
        });
        res.json({ message: `Name ${name} added successfully`, newName: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;