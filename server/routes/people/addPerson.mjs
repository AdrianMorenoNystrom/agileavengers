import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

dotenv.config();

const jsonParser = bodyParser.json();
const router = express.Router();

router.post("/api/people/add", jsonParser, async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const email = request.body.email;
  const password = request.body.password;
  const role = request.body.role;

  // Encryption with Bcrypt
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  const databaseId = process.env.NOTION_DATABASE_ID_PEOPLE;
  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "First Name": {
          title: [
            {
              text: {
                content: firstName,
              },
            },
          ],
        },
        "Last Name": {
          rich_text: [
            {
              text: {
                content: lastName,
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
                content: hash,
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

    console.log("Success!");
    response.status(200).json({ message: "Success!" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
