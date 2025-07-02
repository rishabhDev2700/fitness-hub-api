import { UserI } from "../../src/db/models";
import { JwtPayload } from "../../src/utils/jwt";
declare global {
  namespace Express {
    interface Request {
      user?: UserI;
    }
  }
}
