
import {
  MemberShipOption,
  MembershipOptionsI,
} from "../db/models";

export const createMembershipType = async (data: MembershipOptionsI) => {
  return await MemberShipOption.create(data);
};

export const getMembershipTypes = async () => {
  return await MemberShipOption.find();
};

export const getMembershipTypeById = async (id: string) => {
  return await MemberShipOption.findById(id);
};

export const updateMembershipType = async (
  id: string,
  data: Partial<MembershipOptionsI>
) => {
  return await MemberShipOption.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMembershipType = async (id: string) => {
  return await MemberShipOption.findByIdAndDelete(id);
};
