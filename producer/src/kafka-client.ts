import "dotenv/config"
import { Kafka, logLevel } from "kafkajs";

const brokers: string[] = process.env.KAFKA_BROKERS?.split(",") || ["localhost:29092", "localhost:29093"];

const kafka = new Kafka({
  clientId: "notification-producer",
  brokers,
  logLevel: logLevel.ERROR
});

const producer = kafka.producer();

export { kafka, producer };