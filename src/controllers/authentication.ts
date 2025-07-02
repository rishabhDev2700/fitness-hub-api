import { Router, Request, Response } from "express";
import { LoginCredentials } from "../../types";
import { User, UserI } from "../db/models";
import { signJwt } from "../utils/jwt";
import { checkPassword, generatePasswordHash } from "../utils/password";
import { body, validationResult } from "express-validator";
const router = Router();

router.post(
  "/login",
  [
    body("email").isEmail().notEmpty().withMessage("Email Required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password cannot be empty"),
  ],
  async function (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const credentials: LoginCredentials = req.body;
      if (!credentials.email || !credentials.password) {
        res.status(400).json({ message: "credentials missing" });
        return;
      }
      const user = await User.findOne({ email: credentials.email });
      if (!user) {
        res.status(401).json({ message: "invalid credentials" });
        return;
      }
      const valid = await checkPassword(
        credentials.password,
        user?.password as string
      );
      if (!valid) {
        res.status(401).json({ message: "invalid credentials" });
        return;
      }
      const token = await signJwt({ email: user?.email, sub: user?._id });
      res.json({ token });
      return;
    } catch (err) {
      console.error(err);
      res.json({ message: "Internal server error" });
    }
  }
);

router.post(
  "/register",
  [
    body("fullName").isLength({ min: 2 }).notEmpty(),
    body("email").isEmail().notEmpty().withMessage("Email Required"),
    body("password")
      .isLength({ min: 8 })
      .isStrongPassword()
      .withMessage("Password cannot be empty"),
    body("location").notEmpty().withMessage("Location cannot be empty"),
  ],
  async function (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const data: UserI = req.body;
      if (!data.email || !data.password || !data.fullName || !data.location) {
        res.status(400).json({ message: "data missing" });
        return;
      }
      let user = await User.findOne({ email: data.email });
      if (user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      data.password = await generatePasswordHash(data.password);
      user = await User.create(data);
      if (!user) {
        res.status(400).json({ message: "User not registered" });
        return;
      }
      res.json({ message: "User Registered Successfully" });
      return;
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
