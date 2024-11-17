import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import ReferenceRate from './ReferenceRate';

class CreditCalculation extends Model {
  declare id: number;
  declare totalInstallments: number;
  declare remainingInstallments: number;
  declare installmentAmount: number;
  declare financingAmount: number;
  declare interestRate: number;
  declare remainingContractValue: number;
  declare newInstallmentAmount: number;
  declare referenceRateId: number;
}

CreditCalculation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalInstallments: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remainingInstallments: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    installmentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    financingAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    interestRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    remainingContractValue: {
      type: DataTypes.DECIMAL(10, 2),
    },
    newInstallmentAmount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    referenceRateId: {
      type: DataTypes.INTEGER,
      references: {
        model: ReferenceRate,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'CreditCalculation',
    tableName: 'credit_calculations',
    timestamps: false,
  }
);

ReferenceRate.hasMany(CreditCalculation, { foreignKey: 'referenceRateId' });
CreditCalculation.belongsTo(ReferenceRate, { foreignKey: 'referenceRateId' });

export default CreditCalculation;
