import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  userId: string;
  password: string;
}

const adminSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
