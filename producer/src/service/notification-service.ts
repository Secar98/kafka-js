import { Notification } from "../interface/notification";
import { producer } from "../kafka-client";

const notificationService = {
    sendNotification: async (notification: Notification) => {
        await producer.connect();
        await producer.send({
            topic: "notification-topic",
            messages: [
            { value: JSON.stringify(notification) }
            ]
        });
    }
}


export default notificationService;