import express, { Request, Response } from "express";

import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middleware/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Please enter valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Please enter a password between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT and store it on session object
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      ...req.session,
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
