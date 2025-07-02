import { Schema, model, Model, Types } from "mongoose";

// system users

export interface UserI {
  email: string;
  fullName: string;
  password: string;
  location: string;
}

const UserSchema: Schema = new Schema<UserI>({
  email: { type: String, required: true, unique: true, index: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
});
UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});
export const User: Model<UserI> = model<UserI>("User", UserSchema);

// Membership type

export enum MembershipType {
  STRENGTH = "Strength",
  CARDIO = "Cardio",
  PRO = "Pro",
}

export interface MembershipOptionsI {
  type: MembershipType;
  fee: number;
}

const MembershipOptionsSchema = new Schema<MembershipOptionsI>({
  type: {
    type: String,
    enum: Object.values(MembershipType),
    required: true,
  },
  fee: { type: Number, required: true },
});

export const MemberShipOption = model<MembershipOptionsI>(
  "MembershipOptions",
  MembershipOptionsSchema
);

// Membership

export enum Status {
  EXPIRED = "Expired",
  ACTIVE = "Active",
  CANCELLED = "Cancelled",
}

export interface MembershipI {
  plan: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: Status;
}
export interface PopulatedMembershipI extends Omit<MembershipI, "plan"> {
  plan: MembershipOptionsI;
}
const MembershipSchema = new Schema<MembershipI>({
  plan: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "MembershipOptions",
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(Status),
    required: true,
  },
});

export const MemberShip = model<MembershipI>("Membership", MembershipSchema);

// Member

export enum Gender {
  M = "Male",
  F = "Female",
  O = "Others",
}

export interface MemberI {
  email: string;
  name: string;
  phoneNo: string;
  memberships: [Types.ObjectId];
  gender: Gender;
  address: string;
}

const MemberSchema = new Schema<MemberI>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phoneNo: { type: String, required: true },
  memberships: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref:"Membership"
  },
  gender: {
    type: String,
    enum: Object.values(Gender),
    required: true,
  },
  address: { type: String, required: true },
});

export const Member = model<MemberI>("Member", MemberSchema);
