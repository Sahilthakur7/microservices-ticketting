import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.send("Mohit is the user");
});

export { router as signoutRouter };
