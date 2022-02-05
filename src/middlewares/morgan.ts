import chalk from 'chalk';
import morganMiddleware from 'morgan';

function minLength(s: string, l: number) {
    while (s.length < l) {
        s += ' ';
    }
    return s;
}

function formatMethod(method?: string): string | undefined {
    if (method) {
        let formatter;

        switch (method) {
            case 'PUT':
                formatter = chalk.bgYellow;
                break;
            case 'PATCH':
                formatter = chalk.bgYellow;
                break;

            case 'OPTIONS':
                formatter = chalk.bgBlue;
                break;

            case 'DELETE':
                formatter = chalk.bgRed;
                break;

            case 'GET':
                formatter = chalk.bgBlue;
                break;

            case 'POST':
                formatter = chalk.bgGreen;
                break;

            default:
                formatter = chalk.bgGray;
                break;
        }

        return `|${formatter(minLength(` ${method} `, 10))}|`;
    }
    return undefined;
}

function formatStatus(status?: string): string | undefined {
    if (status) {
        let formatter;
        const group = status.charAt(0);

        switch (group) {
            case '5':
                formatter = chalk.bold.whiteBright.bgYellow;
                break;
            case '4':
                formatter = chalk.bold.whiteBright.bgRed;
                break;
            case '3':
                formatter = chalk.bold.whiteBright.bgBlue;
                break;
            case '2':
                formatter = chalk.bold.whiteBright.bgGreen;
                break;
            default:
                formatter = chalk.bold.whiteBright.bgGray;
                break;
        }

        return `|${formatter(minLength(` ${status} `, 5))}|`;
    }
    return undefined;
}

function formatResponseTime(time?: string): string | undefined {
    if (time) {
        const f = parseFloat(time);
        let formatter;

        if (f <= 500) {
            formatter = chalk.whiteBright.green;
        } else if (f <= 2000) {
            formatter = chalk.whiteBright.yellow;
        } else {
            formatter = chalk.whiteBright.red;
        }

        // min length is enough for an hour of response time
        return formatter(minLength(`${time}ms`, 11));
    }
    return undefined;
}

export const morgan = morganMiddleware((tokens, req, res) => {
    return [
        formatStatus(tokens.status(req, res)),
        formatResponseTime(tokens['response-time'](req, res)),
        formatMethod(tokens.method(req, res)),
        chalk.bold.whiteBright(tokens.url(req, res)),
    ].join(' ');
});
