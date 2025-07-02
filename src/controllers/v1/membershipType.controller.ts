import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import {
  createMembershipType,
  getMembershipTypes,
  getMembershipTypeById,
  updateMembershipType,
  deleteMembershipType,
} from "../../services/membershipType.service";
import { MembershipType } from "../../db/models";

const router: Router = Router();

const validateMembershipType = [
  body("type").isIn(Object.values(MembershipType)),
  body("fee").isInt({ min: 500 }).withMessage("Fee cannot be less than 500"),
];

router.post(
  "/",
  validateMembershipType,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const data = await createMembershipType(req.body);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getMembershipTypes();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getMembershipTypeById(req.params.id);
    if (!data) {
      res.status(404).json({ message: "Membership type not found" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateMembershipType,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const data = await updateMembershipType(req.params.id, req.body);
      if (!data) {
        res.status(404).json({ message: "Membership type not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteMembershipType(req.params.id);
      if (!data) {
        res.status(404).json({ message: "Membership type not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
