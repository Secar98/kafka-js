import { EachMessagePayload } from "kafkajs";
import { Notification } from "./model/notification";
import {consumer} from "./kafka-client";

export default async function () {
    await consumer.connect();
    await consumer.subscribe({topic: "notification-topic", fromBeginning: true})
    await consumer.run({
        eachMessage: async ({ message }: EachMessagePayload) => {
            if (!message.value) return;

            const res: Notification = JSON.parse(message.value.toString());
            const notification = new Notification();

            notification.id = res.id;
            notification.message = res.message;
            notification.timestamp = res.timestamp;

            await notification.save();
    }});
}