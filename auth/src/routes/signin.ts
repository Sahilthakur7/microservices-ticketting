import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  res.send("Mohit is the user");
});

export { router as signinRouter };
