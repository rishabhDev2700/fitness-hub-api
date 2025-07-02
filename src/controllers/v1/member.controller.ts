import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../../services/member.service";
import { Gender } from "../../db/models";

const router: Router = Router();

const validateMember = [
  body("gender").isIn(Object.values(Gender)).withMessage("Invalid Selection"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("name").isString().withMessage("Invalid Name"),
  body("phoneNo").isMobilePhone("en-IN").withMessage("Invalid phoneNo"),
  body("address").isLength({ min: 30 }),
];

router.post(
  "/",
  validateMember,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const data = await createMember(req.body);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getMembers();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getMemberById(req.params.id);
    if (!data) {
      res.status(404).json({ message: "Member not found" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateMember,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const data = await updateMember(req.params.id, req.body);
      if (!data) {
        res.status(404).json({ message: "Member not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteMember(req.params.id);
      if (!data) {
        res.status(404).json({ message: "Member not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
