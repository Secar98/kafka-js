import express, { Request, Response } from "express";
import { Notification } from "../interface/notification";
import { randomUUID } from "crypto";
import notificationService from "../service/notification-service";
import { NotificationStatus } from "../enum/notification-status";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    let messageToSend: Notification = req.body;
    messageToSend.timestamp = new Date();
    messageToSend.id = randomUUID();
    await notificationService.sendNotification(messageToSend);
   
    res.status(201).send({"STATUS": NotificationStatus.SUCCESS, "notification": messageToSend});
});


export default router;