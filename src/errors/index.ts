export class ApplicationError extends Error {
    public status: number;
    constructor(message: string, status?: number) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = message || 'Something went wrong. Please try again.';
        this.status = status || 500;
    }
}

export class ResourceNotFoundError extends ApplicationError {
    private data: { resource: string; query?: any };

    constructor(resource: string, query?: any) {
        super(`Resource ${resource} was not found.`, 404);
        this.data = { resource, query };
    }
}

export class InternalError extends ApplicationError {
    private data: { error: Error };
    constructor(error: Error) {
        super(error.message);
        this.data = { error };
    }
}
