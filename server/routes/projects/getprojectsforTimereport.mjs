import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();
router.get("/api/projects/user-specific", async (request, response) => {
    if (!request.session.user) return response.sendStatus(401);

    const userId = request.session.user.id;
    const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;

    try {
      
        const userActiveProjectsResult = await notion.databases.query({
            database_id: databaseId,
            filter: {
                and: [
                    {
                        property: "Status",
                        select: {
                            equals: "Active"
                        }
                    },
                    {
                        property: "People",
                        relation: {
                            contains: userId
                        }
                    }
                ]
            },
            sorts: [
                {
                    property: "Status",
                    direction: "ascending",
                },
                {
                    property: "Timespan",
                    direction: "ascending",
                },
            ],
        });

        const otherProjectsResult = await notion.databases.query({
            database_id: databaseId,
            filter: {
                or: [
                    {
                        property: "Status",
                        select: {
                            does_not_equal: "Active"
                        }
                    },
                    {
                        property: "People",
                        relation: {
                            does_not_contain: userId
                        }
                    }
                ]
            },
            sorts: [
                {
                    property: "Status",
                    direction: "ascending",
                },
                {
                    property: "Timespan",
                    direction: "ascending",
                },
            ],
        });

        const combinedProjects = [...userActiveProjectsResult.results, ...otherProjectsResult.results];

        response.json({ message: combinedProjects });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;