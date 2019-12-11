export default class Cookie {
    protected cookies: CookieObject;
    constructor();
    show(): CookieObject;
    get(name: string): string;
    set(name: string, value: string, options: OptionsInterface): void;
    remove(name: string): void;
    private save;
    private getFormattedObject;
}
export interface CookieObject {
    [key: string]: string;
}
export interface OptionsInterface {
    domain?: string | null;
    path?: string | null;
    expires?: number | null;
}
