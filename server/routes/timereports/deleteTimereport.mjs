import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.post("/api/timereport/delete", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const {
    body: { time_report_id },
  } = request;

  console.log(time_report_id);

  try {
    await notion.pages.update({
      page_id: time_report_id,
      archived: true,
    });

    return response
      .status(200)
      .send({ message: "Time report deleted successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
