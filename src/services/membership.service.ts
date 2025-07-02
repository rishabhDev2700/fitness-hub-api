
import {
  MemberShip,
  MembershipI,
} from "../db/models";

export const createMembership = async (data: MembershipI) => {
  return await MemberShip.create(data);
};

export const getMemberships = async () => {
  return await MemberShip.find().populate("plan");
};

export const getMembershipById = async (id: string) => {
  return await MemberShip.findById(id).populate("plan");
};

export const updateMembership = async (id: string, data: Partial<MembershipI>) => {
  return await MemberShip.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMembership = async (id: string) => {
  return await MemberShip.findByIdAndDelete(id);
};
