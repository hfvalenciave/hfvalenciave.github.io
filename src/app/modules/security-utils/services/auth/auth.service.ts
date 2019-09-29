import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private signed$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private afAuth: AngularFireAuth) { }

    get signed() { return this.signed$; }

    login(email: string, password: string) {
        return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
            .pipe(
                tap(user => this.signed.next(true)),
                catchError(error => {
                    this.signed.next(false);
                    return error;
                })
            );
    }

    logout() {
        return from(this.afAuth.auth.signOut())
            .pipe(
                tap(value => this.signed.next(false))
            );
    }
}
