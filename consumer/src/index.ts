import "dotenv/config"
import express from "express";
import router from "./router/notification-router";
import kafkaConsumer from "./kafka-consumer";

const app = express();
app.use(express.json());

const port = process.env.SERVER_PORT || 3000;

kafkaConsumer();

app.use("/notification", router);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});


