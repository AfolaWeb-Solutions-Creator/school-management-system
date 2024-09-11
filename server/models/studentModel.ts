import mongoose, { Schema, Document } from 'mongoose';

interface IResult {
  subjectName: string;
  term: string;
  score: number;
}

export interface IStudent extends Document {
  name: string;
  userId: string;
  className: string;
  password: string;
  results: IResult[];
  currentTerm: string;
  promoted: boolean;
}

const studentSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  className: { type: String, required: true },
  password: { type: String, required: true },
  results: [{
    subjectName: { type: String, required: true },
    term: { type: String, enum: ['first', 'second', 'third'], required: true },
    score: { type: Number, required: true }
  }],
  currentTerm: { type: String, enum: ['first', 'second', 'third'], default: 'first' },
  promoted: { type: Boolean, default: false }
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;

