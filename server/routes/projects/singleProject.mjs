import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.get("/api/projects/project/:id", async (request, response) => {
    if (!request.session.user) return response.sendStatus(401);

    const {id} = request.params; 

    if (!id) {
        return response.status(400).json({ error: "Missing pageId parameter" });
    }

    try {
        const pageData = await notion.pages.retrieve({ page_id: id });

        response.json({ data: pageData });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
