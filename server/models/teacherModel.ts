import mongoose, { Schema, Document } from 'mongoose';

interface ISubject {
  subjectName: string;
  className: string;
  isCompulsory: boolean;
}

export interface ITeacher extends Document {
  name: string;
  userId: string;
  password: string;
  subjects: ISubject[];
}

const teacherSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjects: [{
    subjectName: { type: String, required: true },
    className: { type: String, required: true },
    isCompulsory: { type: Boolean, required: true }
  }]
});

const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);

export default Teacher;
