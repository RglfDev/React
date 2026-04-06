import { model, Schema } from "mongoose";

export interface IUser {
    name: string;
    email:string;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true}
}, 
{ timestamps: true });

export default model <IUser>('User', UserSchema);