import { v4 as uuidv4 } from "uuid";
class BaseEntity {
    id: string | undefined = "";
    uId!: string ;
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
    customFields: any[] = [];

initialize (
        isNew: boolean,
        dType: string,
        createdOrUpdatedBy: string,
        createdOrUpdatedByName: string
    ):void {
        this.dType = dType;
        this.id = uuidv4();
        this.active = true;
        this.archived = false;

        if (isNew) {
            // Adding new record
            this.uId = this.id;
            this.createdBy = createdOrUpdatedBy;
            this.createdByName = createdOrUpdatedByName;
            this.createdOn = new Date().toISOString();
            this.version = 1;
            this.updatedBy = createdOrUpdatedBy;
            this.updatedByName = createdOrUpdatedByName;
            this.updatedOn = this.createdOn;
        } else {
            // Updating record
            this.updatedBy = createdOrUpdatedBy;
            this.updatedByName = createdOrUpdatedByName;
            this.updatedOn = new Date().toISOString();
            this.version++;
        }
    }
}


export default BaseEntity;
