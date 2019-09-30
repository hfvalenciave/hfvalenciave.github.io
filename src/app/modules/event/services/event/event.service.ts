import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from './../../models/event';

const urlTable = 'events';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor(private db: AngularFirestore) { }

    all() {
        return this.db.collection<Event>(urlTable).snapshotChanges()
            .pipe(
                map(documents => documents.map(doc => {
                    const data = doc.payload.doc.data();
                    const id = doc.payload.doc.id;
                    return {_id: id, ...data};
                }))
            );
    }

    getById(id: string) {
        return this.db.collection<Event>(urlTable).doc(id).snapshotChanges()
            .pipe(
                map(doc => {
                    if (doc.payload.exists) {
                        const data = doc.payload.data();
                        return {_id: id, ...data} as Event;
                    }
                    return null;
                })
            );
    }

    save(event: Event) {
        return from(this.db.collection(urlTable).add(event));
    }

    update(id: string, event: Event) {
        return from(this.db.collection(urlTable).doc(id).update(event));
    }

    delete(id: string) {
        return from(this.db.collection(urlTable).doc(id).delete());
    }
}
