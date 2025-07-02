
import {
  Member,
  MemberI,
} from "../db/models";

export const createMember = async (data: MemberI) => {
  return await Member.create(data);
};

export const getMembers = async () => {
  return await Member.find().populate("memberships");
};

export const getMemberById = async (id: string) => {
  return await Member.findById(id).populate("memberships");
};

export const updateMember = async (id: string, data: Partial<MemberI>) => {
  return await Member.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMember = async (id: string) => {
  return await Member.findByIdAndDelete(id);
};
