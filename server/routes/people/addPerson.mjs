import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";
import bodyParser from "body-parser";

dotenv.config();

const jsonParser = bodyParser.json();
const router = express.Router();

router.post("/api/people/add", jsonParser, async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const fullName = request.body.fullName;
  const email = request.body.email;
  const password = request.body.password;
  const role = "User";

  const databaseId = process.env.NOTION_DATABASE_ID_PEOPLE;
  try {
    const result = await notion.pages.create({
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
        Role: {
          select: {
            name: role,
          },
        },
      },
    });
    
    console.log(result);
    console.log("Success!");
    response.status(200).json({ message: "Success!" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;