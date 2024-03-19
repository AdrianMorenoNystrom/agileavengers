import express from "express";

const router = express.Router();

router.post("/api/auth/logout", async (request, response) => {
  if (request.session.destroy) {
    console.log("A session was destroyed!");

    return response.status(200).json({
      redirectTo: "/login",
    });
  }

  throw new Error("Failed to logout!");
});

export default router;
