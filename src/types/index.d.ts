export * from './schemas';

export type ApiResponse<D = Record<string, unknown>> =
    | ({
          message: string;
      } & D)
    | {
          message: string;
      };
