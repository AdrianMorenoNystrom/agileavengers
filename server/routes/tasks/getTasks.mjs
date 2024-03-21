import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.get("/api/tasks", async (request, response) => {
    if (!request.session.user) return response.sendStatus(401);

    try {
        const result = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID_TASKS });

        var options = result.properties.Task.select.options;

        response.json({ message: options });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
