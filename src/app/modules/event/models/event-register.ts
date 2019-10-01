import { FirebaseDate } from './event';
export interface EventRegister {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    birthdate: Date | FirebaseDate;
    gender: string;
    sector: string;
    position: string;
}
