const mongoose = require("mongoose");

export function generateSchemaFromObject(obj:any) {
    const schemaDefinition:any = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            if (typeof value === "string") {
                schemaDefinition[key] = { type: String };
            } else if (typeof value === "number") {
                schemaDefinition[key] = { type: Number };
            } else if (typeof value === "boolean") {
                schemaDefinition[key] = { type: Boolean };
            } else if (value instanceof Date || !isNaN(Date.parse(value))) {
                schemaDefinition[key] = { type: Date };
            } else {
                schemaDefinition[key] = { type: mongoose.Schema.Types.Mixed };
            }
        }
    }

    return new mongoose.Schema(schemaDefinition, { timestamps: true });
}



