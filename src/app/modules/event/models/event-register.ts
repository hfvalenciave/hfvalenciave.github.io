import { FirebaseDate } from './event';
export interface EventRegister {
    name: string;
    email: string;
    birthdate: Date | FirebaseDate;
    occupationArea: string;
}
