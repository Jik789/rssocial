import { getModelForClass, modelOptions, pre, prop, index } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@index({ name: 'text', lastname: 'text' })
@pre<User>('save', async function onSave(next) {
  this.id = this._id;
  if (this.isNew) this.password = await bcrypt.hash(this.password, 12);
  next();
})
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @prop()
  id: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  lastname: string;

  @prop({ unique: true, required: true, select: false })
  email: string;

  @prop({ required: true, minlength: 8, maxLength: 16, select: false })
  password: string;

  @prop({ default: false, select: false })
  isAdmin: boolean;

  @prop({ default: '' })
  avatar: string;

  @prop()
  age?: number;

  @prop()
  relationship?: string;

  @prop()
  interests?: string;

  @prop()
  work?: string;

  verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

const userModel = getModelForClass(User);

export default userModel;
