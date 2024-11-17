import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class ReferenceRate extends Model {
  declare id: number;
  declare value: number;
  declare retrievalDate: Date;
}

ReferenceRate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    retrievalDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ReferenceRate',
    tableName: 'reference_rates',
    timestamps: false,
  }
);

export default ReferenceRate;
