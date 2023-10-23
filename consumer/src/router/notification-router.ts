import express from "express";
import { Notification } from "../model/notification";
import { Op, where } from "sequelize";

const router = express.Router();

router.get("/", async (req, res) => {
    let {page, limit} = req.query;
    if (!page) page = `${0}`;
    if (!limit) limit = `${10}`;
    if (Number(limit) > 100) return res.status(400).send({"Error": "Limit cannot be greater than 100"});

    const notifications: Notification[] = await Notification.findAll({
        order: [['timestamp', 'DESC']],
        limit: Number(limit),
        offset: Number(page),
    });
    return res.send(notifications);
});

router.get("/:message", async (req, res) => {
    let { message } = req.params;
    if (!message) return res.status(400).send({"Error": "Must provide message"});

    const notifications: Notification[] = await Notification.findAll({
        where: {
            message: {
            [Op.like]: `%${message}%`
          }
        }
    });
    return res.send(notifications);
});

export default router;