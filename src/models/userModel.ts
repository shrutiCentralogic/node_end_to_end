import mongoose, { Model, Schema, Document } from 'mongoose';
import { BaseEntity, BaseEntitySchema } from '../common/baseEntity';

// ✅ Interface for User
export interface IUser {
  name: string;
  email: string;
  password: string;
}

// ✅ Mongoose Document Interface
export interface IUserDocument extends IUser, Document, BaseEntity {}

// ✅ Mongoose Schema (Fix the Spread Issue)
export const UserSchemaFields: mongoose.SchemaDefinition<IUserDocument> = {
  uId: { type: String, required: true, default: () => new mongoose.Types.ObjectId().toString() },
  dType: { type: String, required: false, default: 'User' },
  createdBy: { type: String, required: false },
  createdByName: { type: String, required: false },
  createdOn: { type: String, required: true, default: () => new Date().toISOString() },
  updatedBy: { type: String, required: false },
  updatedByName: { type: String, required: false },
  updatedOn: { type: String, required: true, default: () => new Date().toISOString() },
  version: { type: Number, default: 1 },
  active: { type: Boolean, default: true },
  archived: { type: Boolean, default: false },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
};

// ✅ Create UserSchema Separately
const UserSchema = new Schema<IUserDocument>(UserSchemaFields, { _id: true });

// ✅ Create the Mongoose Model
export const MongooseUserModel: Model<IUserDocument> = mongoose.model('User', UserSchema);
false