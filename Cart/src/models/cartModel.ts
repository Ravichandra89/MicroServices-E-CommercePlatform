import mongoose, {Schema, Document} from "mongoose";

export interface Cart extends Document {
    userId: string;
    productId: string;
    quantity: number;
    createdAt: Date;
};

const cartSchema : Schema<Cart> = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    }
});


const cartModel = mongoose.models.Cart || mongoose.model<Cart>("User", cartSchema);