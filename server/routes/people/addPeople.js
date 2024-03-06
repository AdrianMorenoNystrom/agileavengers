require("dotenv").config();

const { express } = require("../../express");
const router = express.Router();
const notion = require("../../notion");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  // Accounts get the role "user" as default.
  const role = "User";
  const databaseId = process.env.NOTION_DATABASE_ID_PEOPLE;
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: fullName,
              },
            },
          ],
        },
        Email: {
          rich_text: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        Password: {
          rich_text: [
            {
              text: {
                content: password,
              },
            },
          ],
        },
        Role:{
          select:{
            name:role,
          }
        }
      },
    });
    console.log(response);
    console.log("Success!");
    res.status(200).json({ message: 'Success!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
