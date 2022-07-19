import mongoose, { model } from 'mongoose';
import { HospRegStatusSchema } from '../schemas/HospRegStatusSchema';

const HospRegStatus = model('hospRegStatus', HospRegStatusSchema);

export interface HospRegStatusInfo {
  _id?: mongoose.Types.ObjectId;
  name: string;
}

interface ToUpdate {
  hospRegStatusId: string;
  update: {
    [key: string]: string;
  };
}

export class HospRegStatusModel {
  async findAll() {
    const allHospRegStatus = await HospRegStatus.find({});
    return allHospRegStatus;
  }

  async findById(hospRegStatusId: string): Promise<HospRegStatusInfo> {
    const hospRegStatus = (await HospRegStatus.findById(
      hospRegStatusId
    )) as HospRegStatusInfo;
    return hospRegStatus;
  }

  async findByName(hospRegStatusId: string): Promise<HospRegStatusInfo> {
    const hospRegStatus = (await HospRegStatus.findOne({
      name: hospRegStatusId,
    })) as HospRegStatusInfo;
    return hospRegStatus;
  }

  async create(name: string) {
    const createdNew = await HospRegStatus.create({ name: name });
    return createdNew;
  }

  async update({
    hospRegStatusId,
    update,
  }: ToUpdate): Promise<HospRegStatusInfo> {
    const filter = { _id: hospRegStatusId };
    const option = { returnOriginal: false };

    const updated = (await HospRegStatus.findOneAndUpdate(
      filter,
      update,
      option
    )) as HospRegStatusInfo;
    return updated;
  }

  async deleteById(hospRegStatusId: string): Promise<{ deletedCount: number }> {
    const del = await HospRegStatus.deleteOne({ _id: hospRegStatusId });
    return del;
  }
}

const hospRegStatusModel = new HospRegStatusModel();

export { hospRegStatusModel };
