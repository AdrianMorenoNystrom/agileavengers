require("dotenv").config();

const { express } = require("../../express");
const router = express.Router();
const notion = require("../../notion");

// Get all data from People Table
router.get("/", async (req, res) => {
  const databaseId = process.env.NOTION_DATABASE_ID_PEOPLE;

  try {
    const response = await notion.databases.query({ database_id: databaseId });
    const relevantData = response.results;

    res.json({ message: relevantData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
