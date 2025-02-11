import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export class BaseEntity {
  uId!: string;
  dType: string | null = null;
  createdBy: string | null = null;
  createdByName: string | null = null;
  createdOn: string | null = null;
  updatedBy: string | null = null;
  updatedByName: string | null = null;
  updatedOn: string | null = null;
  version: number = 0;
  active: boolean = true;
  archived: boolean = false;

  initialize(
    isNew: boolean,
    dType: string,
    createdOrUpdatedBy: string,
    createdOrUpdatedByName: string
  ): void {
    this.dType = dType;
    this.uId = uuidv4();
    this.active = true;
    this.archived = false;

    if (isNew) {
      this.createdBy = createdOrUpdatedBy;
      this.createdByName = createdOrUpdatedByName;
      this.createdOn = new Date().toISOString();
      this.version = 1;
      this.updatedBy = createdOrUpdatedBy;
      this.updatedByName = createdOrUpdatedByName;
      this.updatedOn = this.createdOn;
    } else {
      this.updatedBy = createdOrUpdatedBy;
      this.updatedByName = createdOrUpdatedByName;
      this.updatedOn = new Date().toISOString();
      this.version++;
    }
  }
}

// ✅ Mongoose Schema (Removes `id` Conflict)
export const BaseEntitySchema = new Schema<BaseEntity>(
  {
    uId: { type: String, required: true, default: uuidv4 },
    dType: { type: String, required: true, default: 'User' },
    createdBy: { type: String, required: true },
    createdByName: { type: String, required: true },
    createdOn: { type: String, required: true, default: () => new Date().toISOString() },
    updatedBy: { type: String, required: true },
    updatedByName: { type: String, required: true },
    updatedOn: { type: String, required: true, default: () => new Date().toISOString() },
    version: { type: Number, default: 1 },
    active: { type: Boolean, default: true },
    archived: { type: Boolean, default: false },
  },
  { _id: false } // ✅ Prevents separate `_id` in BaseEntity
);
