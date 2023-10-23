import { UUID } from "crypto";

export interface Notification {
    id?: UUID;  
    message: string;
    timestamp: Date;
}