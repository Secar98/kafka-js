import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class Notification extends Model {
  message!: string;
  timestamp!: Date;
  id!: string;
}

Notification.init({
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
}, {
  sequelize,
  modelName: 'Notification',
  timestamps: false
});