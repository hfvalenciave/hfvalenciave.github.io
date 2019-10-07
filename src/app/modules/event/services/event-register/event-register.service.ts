import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, merge } from 'rxjs';
import { map, share, mergeMap } from 'rxjs/operators';
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

    update(eventId: string, registerId: string, register: EventRegister) {
        const collectionUrl = `events/${eventId}/register`;
        return from(this.db.collection(collectionUrl).doc(registerId).update(register));
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

    getByEvent(eventId: string) {
        const collectionUrl = `events/${eventId}/register`;
        return this.db.collection<EventRegister>(collectionUrl).snapshotChanges()
            .pipe(
                map(documents => documents.map(doc => {
                    const data = doc.payload.doc.data();
                    const id = doc.payload.doc.id;
                    return { _id: id, ...data };
                }))
            );
    }

    getByEventAndEmail(eventId: string, email: string) {
        const collectionUrl = `events/${eventId}/register`;
        return this.db.collection<EventRegister>(collectionUrl, ref => ref.where('email', '==', email)).valueChanges();
    }

    getByCriteria(eventId: string, criteria: string) {
        const collectionUrl = `events/${eventId}/register`;
        const email = this.db.collection<EventRegister>(collectionUrl,
            ref => ref.orderBy('email').startAt(criteria).endAt(criteria + '\uf8ff'))
            .valueChanges();
        const firstName = this.db.collection<EventRegister>(collectionUrl,
            ref => ref.orderBy('firstName').startAt(criteria).endAt(criteria + '\uf8ff'))
            .valueChanges();
        const lastName = this.db.collection<EventRegister>(collectionUrl,
            ref => ref.orderBy('lastName').startAt(criteria).endAt(criteria + '\uf8ff'))
            .valueChanges();

        // const filter = merge(email, firstName, lastName).pipe(share());

        const filter = email.pipe(
            mergeMap(emails => firstName
                .pipe(
                    map(firstNames => lastName
                        .pipe(
                            map(lastNames => {
                                return { ...emails, ...lastNames, ...firstNames };
                            })
                        )
                    )
                )
            )
        );
        return email;
    }

    getTotalRegistered(eventId: string) {
        const collectionUrl = `events/${eventId}/register`;
        return this.db.collection(collectionUrl).snapshotChanges()
            .pipe(map(docmuents => docmuents.length));
    }

    getTotalAttendees(eventId: string) {
        const collectionUrl = `events/${eventId}/register`;
        return this.db.collection(collectionUrl, ref => ref.where('confirmed', '==', true)).snapshotChanges()
            .pipe(map(docmuents => docmuents.length));
    }
}
