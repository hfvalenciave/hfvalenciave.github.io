import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private db: AngularFirestore) { }

    save(email: string) {
        return from(this.db.collection('contacts').add(email))
    }
}
