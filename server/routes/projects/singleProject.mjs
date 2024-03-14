import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.get("/api/projects/project", async (request, response) => {
    if (!request.session.user) return response.sendStatus(401);

  const pageId = "6801ccd5-1acc-4c19-a293-3074bacba39c";

  try {
    const pageData = await notion.pages.retrieve({ page_id: pageId });
    response.json({ data: pageData });
    console.log(response);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
