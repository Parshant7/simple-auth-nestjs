import { userDocument } from "src/common/modules/database/models/user.model";
export {};

declare global {
  namespace Express {
    interface Request {
      user: userDocument;
    }
  }
}