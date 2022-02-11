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

export class ResourceNotFoundError<Q = unknown> extends ApplicationError {
    private data: { resource: string; query?: Q };

    constructor(resource: string, query?: Q) {
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
