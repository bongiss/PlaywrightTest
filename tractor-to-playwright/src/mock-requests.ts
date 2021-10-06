import { Page } from '@playwright/test';

export type MockOptions = { 
    body?: unknown,
    headers?: Record<string, string>,
    status?: number
};

type BodyModule = {
    default?: unknown
}

type MockMatch = {
    method: string;
    matcher: RegExp;
}

type Mock = {
    body: string,
    headers: Record<string, string>,
    status: number
}

type MockResponses = Map<MockMatch, Mock>;

const MOCK_RESPONSES: Map<Page, MockResponses> = new Map();

const DEFAULT_HEADERS = {
    // Setting this header to get around weirdness.
    // Without it, we return a cached version of index.html
    // (but only in tests???)
    'Accept-Encoding': '',
    'Content-Type': 'application/json',
    'x-tractor': 'true',
    'access-control-allow-origin': '*'
}

export const mockRequests = {
    /**
     * Mocks a GET request
     * @param page - Page provides methods to interact with a single tab
     * @param matcher - url regex
     * @param options - mockdata body
     * @param multiple - allows duplicate calls to the same url for mockdata
     */
    async whenGET (page: Page, matcher: RegExp, options: MockOptions = {}, multiple = false) {
        addMock(page, 'GET', matcher, options, multiple);
    },
    /**
     * Mocks a POST request
     * @param page - Page provides methods to interact with a single tab
     * @param matcher - url regex
     * @param options - mockdata body
     * @param multiple - allows duplicate calls to the same url for mockdata
     */
    async whenPOST  (page: Page, matcher: RegExp, options: MockOptions = {}, multiple = false) {
        addMock(page, 'POST', matcher, options, multiple);
    },
    /**
     * Mocks an options request
     * @param page - Page provides methods to interact with a single tab
     * @param matcher - url regex
     * @param options - mockdata body
     */
    async whenDELETE  (page: Page, matcher: RegExp, options: MockOptions = {}) {
        addMock(page, 'DELETE', matcher, options);
    }
}

async function addMock(page: Page, method: string, matcher: RegExp, options: MockOptions, multiple = false) {
    let { body, headers, status } = options;

    body = (body as BodyModule).default || body || {};
    headers = headers || {};
    status = status || 200;

    if (multiple && method !== 'OPTIONS') {
        await page.route(method, route => {
            route.fulfill({ body: options.toString()} );
        });
    }

    const match = { method, matcher };
    const responses = await getResponses(page);
    responses.set(match, { body: JSON.stringify(body), headers: { ...DEFAULT_HEADERS, ...headers }, status })
}

async function getResponses (page: Page): Promise<MockResponses> {
    if (MOCK_RESPONSES.has(page)) {
        return MOCK_RESPONSES.get(page) as MockResponses;
    }
    const responses: MockResponses = new Map();
    MOCK_RESPONSES.set(page, responses);
    await page.route(/.*/, (route, request) => {
        debugger;
        const url = request.url();
        const method = request.method();
        if (method === 'OPTIONS') {
            return route.continue();
        }
        let possibleResponses = Array.from(responses.keys()).filter(key => {
            let isMethod = key.method === method;
            let isMatch = new RegExp(key.matcher).test(url);
            return isMethod && isMatch;
        });
        if (possibleResponses.length > 0) {
            if (possibleResponses.length > 1) {
                /* eslint-disable no-console */
                console.error(`Multiple possible responses found for "${method}" request to "${url}". Use a more specific matcher. Using first matched response...`);
                /* eslint-enable no-console */
            }
            let [match] = possibleResponses;
            return route.fulfill(responses.get(match) as Mock)
            // TODO FRE-2197 remove the check for fees.json, this is here to error with POST requests
        } else if (request.url().includes('/v1/') && !request.url().includes('fees.json')) {
            console.warn(`Mockdata not supplied for: "${method}" request to "${request.url()}"`);
        }
        return route.continue();
    });
    return responses;
}
