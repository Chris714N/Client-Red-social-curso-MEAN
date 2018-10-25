import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { promise } from 'protractor';

@Injectable()
export class UploadService {
    public url: string;
    constructor() {
        this.url = GLOBAL.url;
    }
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {
        return new Promise((resolve, reject) => {
            const formData: FormData = new FormData();
            const xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++ ) {
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(JSON.parse(xhr.response));
                    }
                }
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
}
