import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MailerService {

    constructor(private http: HttpClient) { }

    sendMail(email) {
        const url = `${environment.firebaseFunctionsUrl}/sendEmail`;
        const params: URLSearchParams = new URLSearchParams();
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        return this.http.post(url, email, {headers})
                        .toPromise()
                        .then( res => {
                            console.log(res);
                        })
                        .catch(err => {
                            console.log(err);
                        });
    }
}
