import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.get("/api/timereports/weekly", async (request, response) => {
    if (!request.session.user) return response.sendStatus(401);

    try {
        const result = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID_TIMEREPORTS,
            filter: {
                property: 'Date',
                date: {
                    past_week: {}
                }
            }
        });

        const relevantData = result.results;

        response.json({ message: relevantData });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;