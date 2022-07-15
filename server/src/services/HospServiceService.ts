import { HospServiceInfo, HospServiceModel, hospServiceModel } from '../db';
import mongoose, { model } from 'mongoose';

interface ToUpdate {
  hospServiceId: string;
  update: {
    [key: string]: string;
  };
}

class HospServiceService {
  constructor(private hospServiceModel: HospServiceModel) {}

  async findById(hospServiceId: string): Promise<HospServiceInfo> {
    const hospService = await this.hospServiceModel.findById(hospServiceId);
    if (!hospService) {
      throw new Error(
        '해당 병원서비스 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return hospService;
  }

  async findAll(hospitalId: mongoose.Types.ObjectId) {
    const hospServices = await this.hospServiceModel.findAll(hospitalId);
    return hospServices;
  }

  async findByName(
    hospServiceName: string,
    hospitalId: mongoose.Types.ObjectId
  ): Promise<HospServiceInfo> {
    const hospService = await this.hospServiceModel.findByName(
      hospServiceName,
      hospitalId
    );
    if (!hospService) {
      throw new Error(
        '해당 병원서비스 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return hospService;
  }

  async create(
    createHospServiceData: Omit<HospServiceInfo, '_id'>
  ): Promise<HospServiceInfo> {
    const isExist = await this.hospServiceModel.findByName(
      createHospServiceData.name,
      createHospServiceData.hospital
    );
    if (isExist) {
      throw new Error(
        '이 이름으로 생성된 병원서비스가 있습니다. 다른 이름을 지어주세요.'
      );
    }
    const newHospService = await this.hospServiceModel.create(
      createHospServiceData
    );
    return newHospService;
  }

  async update({ hospServiceId, update }: ToUpdate): Promise<HospServiceInfo> {
    const isExist = await this.hospServiceModel.findById(hospServiceId);
    if (!isExist) {
      throw new Error(
        '해당 병원서비스 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const updateHospStatus = await this.hospServiceModel.update({
      hospServiceId,
      update,
    });
    return updateHospStatus;
  }

  async deleteById(hospServiceId: string): Promise<{ message: string }> {
    const isExist = await this.hospServiceModel.findById(hospServiceId);
    if (!isExist) {
      throw new Error(
        '해당 병원서비스 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    const { deletedCount } = await this.hospServiceModel.deleteById(
      hospServiceId
    );
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${isExist.name} 병원서비스 삭제를 실패하였습니다.`);
    }

    return { message: `${isExist.name} 병원서비스 삭제를 성공하였습니다.` };
  }
}

const hospServiceService = new HospServiceService(hospServiceModel);

export { hospServiceService };
