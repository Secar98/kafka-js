import "dotenv/config"
import { Kafka, logLevel } from "kafkajs";

const brokers: string[] = process.env.KAFKA_BROKERS?.split(",") || ["localhost:29092", "localhost:29093"];

if (!brokers) {
  throw new Error("KAFKA_BROKERS environment variable is not set");
}

const kafka = new Kafka({
  clientId: `notification-service`,
  brokers,
  logLevel: logLevel.ERROR
});

const consumer = kafka.consumer({
  groupId: `notification-group`,
  retry: {
    restartOnFailure: (function (e) {
      return Promise.resolve(true);
    })
  }
});

const producer = kafka.producer();

export { consumer, kafka, producer };