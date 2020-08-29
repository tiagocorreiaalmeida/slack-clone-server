import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

import { Workspace } from './Workspace';

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'createdAt' | 'updatedAt'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;
  email!: string;
  password!: string;
  isVerified!: boolean;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const UserFactory = (sequelize: Sequelize): void => {
  User.init(
    {
      id: { type: DataTypes.STRING, unique: true, allowNull: false, primaryKey: true },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.DATE,
      },
    },
    {
      sequelize,
    },
  );

  User.hasMany(Workspace, { foreignKey: 'ownerId' });
};
