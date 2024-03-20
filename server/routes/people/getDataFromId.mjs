import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.get("/api/people/:id", async (request, response) => {
    if (!request.session.user) return response.sendStatus(401);

    const userId = request.params.id;

    try {
        const result = await notion.pages.retrieve({ page_id: userId });

        response.json({ message: result });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;