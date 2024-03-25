import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";
import bodyParser from "body-parser";

dotenv.config();

const jsonParser = bodyParser.json();
const router = express.Router();

router.post("/api/projects/changeTime/:id", jsonParser, async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const inputNumber = request.body.inputNumber;
  const projectId = request.params.id; 

  try {
    const result = await notion.pages.update({
      page_id: projectId, 
      properties: {
        "Total Hours": {
          number: parseFloat(inputNumber),
        },
      },
    });
    response.sendStatus(200);
  } catch (error) {
    console.log(error);
    response.status(500).send(error.message); 
  }
});

export default router;
