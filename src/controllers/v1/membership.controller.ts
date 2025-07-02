
import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import {
  createMembership,
  getMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
} from "../../services/membership.service";
import { Status } from "../../db/models";

const router: Router = Router();

const validateMembership = [
  body("status").isIn(Object.values(Status)),
  body("startDate").isDate().withMessage("Invalid start Date"),
  body("endDate").isDate().withMessage("Invalid end Date"),
  body("plan").isMongoId().withMessage("Invalid plan"),
];

router.post(
  "/",
  validateMembership,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return
    }
    try {
      const data = await createMembership(req.body);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getMemberships();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getMembershipById(req.params.id);
    if (!data) {
      res.status(404).json({ message: "Membership not found" });
      return
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateMembership,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return
    }
    try {
      const data = await updateMembership(req.params.id, req.body);
      if (!data) {
        res.status(404).json({ message: "Membership not found" });
        return
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await deleteMembership(req.params.id);
    if (!data) {
      res.status(404).json({ message: "Membership not found" });
      return
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
