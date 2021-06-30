export function haha(iterable) {
    const arr = []
    for (const el of iterable) {
        arr.push(`This thing: ${el}`)
    }
}

export class Jaja {
    constructor(iterable) {
        this.data = haha(iterable)
    }

    [Symbol.iterator] = function* () {
        for (const el of this.data) {
            yield `yeeting ${el}`
        }
    }
}
