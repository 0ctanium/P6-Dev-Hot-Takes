import { Claims } from './schemas';
export * from './schemas';

export type ApiResponse<D = Record<string, unknown>> =
    | ({
          message: string;
      } & D)
    | {
          message: string;
      };

// @types/express-jwt
declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }

        interface User extends Claims {
            [_: string]: unknown;
        }
    }
}
