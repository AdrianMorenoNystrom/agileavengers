import express from "express";
const router = express.Router();

// Check if the session is authenticated (signed in) or not.
router.get("/api/auth/status", (request, response) => {
  request.sessionStore.get(request.sessionID, (err, session) => {
    console.log(session); // Debug
  });
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ msg: "Not Authenticated" });
});

export default router;
