import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router();

/*
Verifies that the provided credentials in the body matches a user in the database
and stores the user information in the session if authentication is successful.
*/
router.post("/api/auth/login", async (request, response) => {
  const {
    body: { email, password },
  } = request;

  const databaseId = process.env.NOTION_DATABASE_ID_PEOPLE;
  const result = await notion.databases.query({ database_id: databaseId });
  const foundUser = result.results.find((user) => {
    return user.properties.Email?.rich_text[0]?.text.content === email;
  });

  // Password comparison
  const isCorrectPassword = await bcrypt.compare(
    password,
    foundUser.properties.Password?.rich_text[0]?.text.content
  );

  if (!foundUser || !isCorrectPassword)
    return response.status(401).send({ msg: "Invalid credentials" });

  request.session.user = { id: foundUser.id }; // Lagrar ID i sessionen.

  return response.status(200).send(foundUser);
});

export default router;
