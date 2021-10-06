export type Selector = {
  (selector?: string): string;
  createSelector: (subselector: string) => Selector
  createGroupSelector: (subselector: string, groupSelector: string) => Selector
}

export function createSelector (host: string = ''): Selector {
    const selector = function select (selector?: string): string {
        if (!selector) {
            return host;
        }
        return `${host} ${selector}`;
    };
    selector.createSelector = function (subselector: string): Selector {
        return createSelector(selector(subselector));
    };
    selector.createGroupSelector = function (subselector: string, groupSelector: string): Selector {
        const groupBase = selector.createSelector(subselector)();
        let index = parseOrdinal(groupSelector);
        if (index) {
            return createSelector(`:nth-match(${groupBase}, ${index})`);
        }
        return createSelector(`${groupBase}:has-text("${groupSelector}")`);
    }
    return selector;
}

const ORDINAL_REGEX = /^(\d+)(st|nd|rd|th)?$/;

function parseOrdinal (str: string): number | null {
    let [, ordinal] = str.match(ORDINAL_REGEX) || [];
    return +ordinal || null;
}
