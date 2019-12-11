export default class Cookie {
    protected cookies: CookieObject;
    constructor() {
        this.cookies = this.getFormattedObject();
    }

    public show(): CookieObject {
        this.cookies = this.getFormattedObject();
        return this.cookies;
    }

    public get(name: string): string {
        return this.cookies[name];
    }

    public set(name: string, value: string, options: OptionsInterface): void {
        this.cookies[name] = value;
        this.save(name, value, options);
    }

    public remove(name: string): void {
        let options: OptionsInterface = {
            expires: -60,
        };
        delete this.cookies[name];
        this.save(name, '', options);
    }

    private save(name: string, value: string, options?: OptionsInterface): void {
        let query = name + '=' + value + ';';

        if (options) {
            if(options.path) {
                query += 'path=' + options.path + ';';
            }

            if(options.domain) {
                query += 'domain=' + options.domain + ';';
            }

            if(options.expires) {
                let date = new Date();
                date.setTime(date.getTime() + options.expires * 1000);
                query += 'expires=' + date.toUTCString();
            }
        }

        document.cookie = query;
    }

    private getFormattedObject(): CookieObject {
        const cookies = document.cookie.split('; ');
        let cookiesObject: CookieObject = {};
        for(let i=0; i<cookies.length; i++){
            let array = cookies[i].split('=');
            if(array[0] !== '') {
                let key = array[0];
                cookiesObject[key] = unescape(array[1]);
            }
        }

       return cookiesObject;
    }
}

export interface CookieObject {
    [key: string]: string
}

export interface OptionsInterface {
    domain?: string|null,
    path?: string|null,
    expires?: number|null,
}
