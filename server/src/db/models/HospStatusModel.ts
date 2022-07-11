import { model } from "mongoose";
import { HospStatusSchema } from "../schemas/HospStatusSchema";

const HospStatus = model("hospStatus", HospStatusSchema);

export interface HospStatusInfo {
  _id?: object;
  name: string;
}

interface ToUpdate {
  hospStatusId: string;
  update: {
    [key: string]: string;
  };
}

export class HospStatusModel {
  async findAll() {
    const allHospStatus = await HospStatus.find({});
    return allHospStatus;
  }

  async findById(hospStatusId: string): Promise<HospStatusInfo> {
    const hospStatus = (await HospStatus.findById(
      hospStatusId
    )) as HospStatusInfo;
    return hospStatus;
  }

  async findByName(hospStatusName: string): Promise<HospStatusInfo> {
    const hospStatus = (await HospStatus.findOne({
      name: hospStatusName,
    })) as HospStatusInfo;
    return hospStatus;
  }

  async create(name: string) {
    const createdNew = await HospStatus.create({ name: name });
    return createdNew;
  }

  async update({ hospStatusId, update }: ToUpdate): Promise<HospStatusInfo> {
    const filter = { _id: hospStatusId };
    const option = { returnOriginal: false };

    const updated = (await HospStatus.findOneAndUpdate(
      filter,
      update,
      option
    )) as HospStatusInfo;
    return updated;
  }

  async deleteById(hospStatusId: string): Promise<{ deletedCount: number }> {
    const del = await HospStatus.deleteOne({ _id: hospStatusId });
    return del;
  }
}

const hospStatusModel = new HospStatusModel();

export { hospStatusModel };
