import express, { Request, Response } from "express";

import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

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
      "asdf"
    );

    req.session = {
      ...req.session,
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
