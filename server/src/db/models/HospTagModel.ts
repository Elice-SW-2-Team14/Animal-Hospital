import mongoose, { model } from 'mongoose';
import { HospTagSchema } from '../schemas/HospTagSchema';

const HospTag = model('hospTag', HospTagSchema);

export interface HospTagInfo {
  _id?: mongoose.Types.ObjectId;
  name: string;
  image?: string;
}

interface ToUpdate {
  hospTagId: string;
  update: {
    [key: string]: string;
  };
}

export class HospTagModel {
  async findAll() {
    const allHospStatus = await HospTag.find({});
    return allHospStatus;
  }

  async findById(hospTagId: string): Promise<HospTagInfo> {
    const hospTag = (await HospTag.findById(hospTagId)) as HospTagInfo;
    return hospTag;
  }

  async findByName(hospTagName: string): Promise<HospTagInfo> {
    const hospTag = (await HospTag.findOne({
      name: hospTagName,
    })) as HospTagInfo;
    return hospTag;
  }

  async create(createData: HospTagInfo) {
    const createdNew = await HospTag.create(createData);
    return createdNew;
  }

  async update({ hospTagId, update }: ToUpdate): Promise<HospTagInfo> {
    const filter = { _id: hospTagId };
    const option = { returnOriginal: false };

    const updated = (await HospTag.findOneAndUpdate(
      filter,
      update,
      option
    )) as HospTagInfo;
    return updated;
  }

  async deleteById(hospTagId: string): Promise<{ deletedCount: number }> {
    const del = await HospTag.deleteOne({ _id: hospTagId });
    return del;
  }
}

const hospTagModel = new HospTagModel();

export { hospTagModel };
