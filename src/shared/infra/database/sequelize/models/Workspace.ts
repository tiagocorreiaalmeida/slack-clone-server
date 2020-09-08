import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

import { User } from './User';

export interface WorkspaceAttributes {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type WorkspaceCreationAttributes = Optional<WorkspaceAttributes, 'createdAt' | 'updatedAt'>;

export class Workspace
  extends Model<WorkspaceAttributes, WorkspaceCreationAttributes>
  implements WorkspaceAttributes {
  id!: string;
  name!: string;
  ownerId!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const WorkspaceFactory = (sequelize: Sequelize): void => {
  Workspace.init(
    {
      id: { type: DataTypes.STRING, unique: true, allowNull: false, primaryKey: true },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      ownerId: {
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

  Workspace.belongsTo(User);
};
