export interface FirebaseDate {
    seconds: number;
    nanoseconds: number;
}

export interface Event {
    _id?: string;
    type: string;
    name: string;
    date: FirebaseDate | Date;
    startTime: number;
    endTime: number;
    description: string;
    location: string;
    image: string;
}
