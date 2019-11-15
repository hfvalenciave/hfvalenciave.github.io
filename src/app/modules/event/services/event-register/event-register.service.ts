import { Event } from './../../models/event';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, merge } from 'rxjs';
import { map, share, mergeMap } from 'rxjs/operators';
import { EventRegister } from '../../models/event-register';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
})
export class EventRegisterService {

    constructor(private db: AngularFirestore) { }

    private toLowercase(register: EventRegister) {
        register.email = register.email.toLowerCase();
        if (!isNullOrUndefined(register.firstName)) {
            register.firstName = register.firstName.toLowerCase();
        }
        if (!isNullOrUndefined(register.lastName)) {
            register.lastName = register.lastName.toLowerCase();
        }
        return register;
    }

    save(eventId: string, register: EventRegister) {
        const collectionURl = `events/${eventId}/register`;
        register = this.toLowercase(register);
        register.registerTime = Date.now();
        return from(this.db.collection(collectionURl).add(register));
    }

    update(eventId: string, registerId: string, register: EventRegister) {
        const collectionUrl = `events/${eventId}/register`;
        register = this.toLowercase(register);
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

    getRegisteredEmail(eventId: string) {
        const collectionURl = `events/${eventId}/register`;
        return this.db.collection<EventRegister>(collectionURl).snapshotChanges()
            .pipe(
                map(documents => documents.map(doc => {
                    const email = doc.payload.doc.data().email;
                    return email;
                }))
            )
    }

    getByEventAndEmail(eventId: string, email: string) {
        const collectionUrl = `events/${eventId}/register`;
        return this.db.collection<EventRegister>(collectionUrl, 
            ref => ref.orderBy('email').startAt(email).endAt(email + '\uf8ff'))
            .valueChanges();
    }

    getByEventAndFirstName(eventId: string, firstName: string) {
        const collectionUrl = `events/${eventId}/register`;
        return this.db.collection<EventRegister>(collectionUrl, 
            ref => ref.orderBy('firstName').startAt(firstName).endAt(firstName + '\uf8ff'))
            .valueChanges();
    }

    getByEventAndLasttName(eventId: string, lastName: string) {
        const collectionUrl = `events/${eventId}/register`;
        return this.db.collection<EventRegister>(collectionUrl, 
            ref => ref.orderBy('lastName').startAt(lastName).endAt(lastName + '\uf8ff'))
            .valueChanges();
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
