
import { Router } from "express";
import membershipTypeController from "./membershipType.controller";
import membershipController from "./membership.controller";
import memberController from "./member.controller";

const router = Router();

router.use("/membership-types", membershipTypeController);
router.use("/memberships", membershipController);
router.use("/members", memberController);

export default router;
