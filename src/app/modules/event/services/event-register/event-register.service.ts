import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { EventRegister } from '../../models/event-register';

@Injectable({
    providedIn: 'root'
})
export class EventRegisterService {

    constructor(private db: AngularFirestore) { }

    save(eventId: string, register: EventRegister) {
        const collectionURl = `events/${eventId}/register`;
        return from(this.db.collection(collectionURl).add(register));
    }

    getById(eventId: string, registerId: string) {
        const collectionUrl = `events/${eventId}/register`;
        return this.db.collection<EventRegister>(collectionUrl).doc(registerId).snapshotChanges()
            .pipe(
                map(doc => {
                    if (doc.payload.exists) {
                        const data = doc.payload.data();
                        const id = doc.payload.id;
                        return { _id: id, ...data } as Event;
                    }
                    return null;
                })
            );
    }
}
