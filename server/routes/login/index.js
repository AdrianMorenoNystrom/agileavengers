require("dotenv").config();

const { express } = require("../../express");
const notion = require("../../notion");
const bodyParser = require("body-parser");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  const databaseId = process.env.NOTION_DATABASE_ID_PEOPLE;
  const { username, password } = req.body;

  try {
    const response = await notion.databases.query({ database_id: databaseId });
    const userData = await usernameLookUp(response, username);

    if (userData.found && isPasswordCorrect(userData.password, password)) {
      res.status(200).json({
        success: true
      });
    } else {
      res.status(401).json({
        success: false
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

async function usernameLookUp(response, targetUsername) {
  const result = response.results.find((result) => {
    const username =
      result.properties.Email?.rich_text[0]?.text.content.toLowerCase();
    return username === targetUsername;
  });

  if (result) {
    const username = result.properties.Email?.rich_text[0]?.text.content.toLowerCase();
    const password = result.properties.Password?.rich_text[0]?.text.content;
    const pageId = result.id;

    return {
      found: true,
      username: username,
      password: password,
      page_id: pageId,
    };
  } else {
    return {
      found: false,
      username: targetUsername,
    };
  }
}

function isPasswordCorrect(dbPassword, userPassword) {
  if (dbPassword === userPassword) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;

