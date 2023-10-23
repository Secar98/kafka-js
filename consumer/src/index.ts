import "dotenv/config"
import { EachMessagePayload } from "kafkajs";
import { consumer } from "./kafka-client";
import express from "express";
import { Notification } from "./model/notification";
import router from "./router/notification-router";

const app = express();
app.use(express.json());

const port = process.env.SERVER_PORT || 3000;

(async () => {
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
})();

app.use("/notification", router);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});


