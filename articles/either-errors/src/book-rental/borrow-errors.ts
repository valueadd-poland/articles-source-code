export const OutOfStock = Symbol(`book out of stock`);
export const BooksLimitReached = Symbol(`books limit reached`);

export type BorrowError = typeof OutOfStock | typeof BooksLimitReached;
