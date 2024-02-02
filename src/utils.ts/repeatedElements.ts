export const repeatedElements = (elements: string[]) => {
    const uniqueElements = new Set(elements);

    const repeatedItems = elements.filter(item => {
        if (uniqueElements.has(item)) {
            uniqueElements.delete(item);
        } else {
            return item;
        }
    });

    return repeatedItems
}