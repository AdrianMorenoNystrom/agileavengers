require("dotenv").config();

const { express } = require("../../express");
const router = express.Router();
const notion = require("../../notion");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  // Lägger bara till Projektnamn och timmar som test till en början.
  const projectName = req.body.projectName;
  const hours = req.body.hours;
  const status = req.body.status;
  const projectStart = req.body.projectStart;
  const projectEnd = req.body.projectEnd;
  const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Hours: {
          number: parseFloat(hours),
        },
        Projectname: {
          title: [
            {
              text: {
                content: projectName,
              },
            },
          ],
        },
        Status: {
          select: {
            name: status,
          },
        },
        Timespan: {
          date: {
            start: projectStart,
            end: projectEnd,
          },
        },
      },
    });
    console.log(response);
    console.log("Success!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
