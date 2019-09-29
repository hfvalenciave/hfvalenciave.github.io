export interface Event {
    _id?: string;
    type: string;
    name: string;
    date: { seconds: number, nanoseconds: number };
    startTime: number;
    endTime: number;
    description: string;
    location: string;
    image: string;
}
