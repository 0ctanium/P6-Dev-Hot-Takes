import { ApiCode } from '../constants/api_codes';

export * from './schemas';

export interface ApiResponse<D = unknown> {
    message: string;
    code: ApiCode;
    data?: D;
}
