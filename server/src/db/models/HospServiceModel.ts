import mongoose, { model } from 'mongoose';
import { HospServiceSchema } from '../schemas/HospServiceSchema';

const HospService = model('hospService', HospServiceSchema);

export interface HospServiceInfo {
  _id?: mongoose.Types.ObjectId;
  name: string;
  hospital: mongoose.Types.ObjectId;
  price: number;
  serviceCapacity: number;
  desc: string;
}

interface ToUpdate {
  hospServiceId: string;
  update: {
    [key: string]: string | mongoose.Types.ObjectId;
  };
}

export class HospServiceModel {
  async findAll(hospitalId: mongoose.Types.ObjectId) {
    const allHospService = await HospService.find({ hospital: hospitalId });
    return allHospService;
  }

  async findById(hospitalServiceId: string): Promise<HospServiceInfo> {
    const hospService = (await HospService.findById(
      hospitalServiceId
    )) as HospServiceInfo;
    return hospService;
  }

  async findByName(
    hospServiceName: string,
    hospitalId: mongoose.Types.ObjectId
  ): Promise<HospServiceInfo> {
    const hospService = (await HospService.findOne({
      name: hospServiceName,
      hospital: hospitalId,
    })) as HospServiceInfo;
    return hospService;
  }

  async create(
    createHospServiceData: Omit<HospServiceInfo, '_id'>
  ): Promise<HospServiceInfo> {
    const createdNew = await HospService.create(createHospServiceData);
    return createdNew;
  }

  async update({ hospServiceId, update }: ToUpdate): Promise<HospServiceInfo> {
    const filter = { _id: hospServiceId };
    const option = { returnOriginal: false };

    const updated = (await HospService.findOneAndUpdate(
      filter,
      update,
      option
    )) as HospServiceInfo;
    return updated;
  }

  async deleteById(hospServiceId: string): Promise<{ deletedCount: number }> {
    const del = await HospService.deleteOne({ _id: hospServiceId });
    return del;
  }
}

const hospServiceModel = new HospServiceModel();

export { hospServiceModel };
