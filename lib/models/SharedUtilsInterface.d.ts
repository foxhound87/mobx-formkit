export interface SharedUtilsInferface {
    select(path: string | number, fields?: any, isStrict?: boolean): any;
    container(path?: string | null): any;
    has(path: string): boolean;
    map(cb: any): any;
    each(iteratee: any, fields?: any, depth?: number): any;
    reduce(iteratee: any, acc: any): any;
}
export default SharedUtilsInferface;
//# sourceMappingURL=SharedUtilsInterface.d.ts.map