require("dotenv").config();
const { express, notion } = require("../../server");
const router = express.Router();

// Get all data from Projects Table
router.get("/", async (req, res) => {
  const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;

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
