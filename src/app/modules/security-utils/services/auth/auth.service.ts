import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private signed$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private afAuth: AngularFireAuth) {
        this.signed.next(!isNullOrUndefined(localStorage.getItem('uuid')));
    }

    get signed() { return this.signed$; }

    login(email: string, password: string) {
        return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
            .pipe(
                tap(user => {
                    console.log(user);
                    localStorage.setItem('uuid', user.user.uid);
                    this.signed.next(true);
                }),
                catchError(error => {
                    this.signed.next(false);
                    throw new Error('No ha podido iniciar sesión, revise los datos e intente de nuevo.');
                })
            );
    }

    logout() {
        return from(this.afAuth.auth.signOut())
            .pipe(
                tap(value => {
                    localStorage.removeItem('uuid');
                    this.signed.next(false);
                })
            );
    }
}
