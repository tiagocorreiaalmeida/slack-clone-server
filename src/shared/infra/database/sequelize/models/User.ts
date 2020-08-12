import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface UserAttributes {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  password: string;
  isVerified: boolean;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'createdAt' | 'updatedAt'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;
  email!: string;
  username!: string;
  displayName: string | null;
  password!: string;
  isVerified!: boolean;
  isActive!: boolean;
  isAdmin!: boolean;

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
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
};
