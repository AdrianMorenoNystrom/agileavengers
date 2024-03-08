require("dotenv").config();

const { express } = require("../../express");
const router = express.Router();
const notion = require("../../notion");

router.get("/", async (req, res) => { 
    const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;
  
    try {
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: "Status",
          select: {
            equals: "Active", 
          },
        },
      });
      const relevantData = response.results;
  
      res.json({ message: relevantData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = router;