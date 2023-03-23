export declare const encodeText: (txt: string) => Uint8Array;
export declare const decodeText: (bytes: number[]) => string;
export declare const sleep: (ms: number) => Promise<unknown>;
export declare function runPromisesSequentially<T>(functions: (() => Promise<T>)[]): Promise<T[]>;
