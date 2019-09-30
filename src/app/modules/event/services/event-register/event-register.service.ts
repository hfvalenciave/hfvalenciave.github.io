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
}
