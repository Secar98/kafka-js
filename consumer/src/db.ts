import { Sequelize } from "sequelize";
import "dotenv/config"

const dbString = process.env.DB_STRING || "mysql://root:root@localhost:3306/notification";

const sequelize = new Sequelize(dbString, {
    logging: false,
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true})
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
)();

export default sequelize;