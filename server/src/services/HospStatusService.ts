import { HospStatusInfo, HospStatusModel, hospStatusModel } from '../db';

interface ToUpdate {
  hospStatusId: string;
  update: {
    [key: string]: string;
  };
}

class HospStatusService {
  constructor(private hospStatusModel: HospStatusModel) {}

  async findById(hospStatusId: string): Promise<HospStatusInfo> {
    const hospStatus = await this.hospStatusModel.findById(hospStatusId);
    if (!hospStatus) {
      throw new Error(
        '해당 병원상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return hospStatus;
  }

  async findAll() {
    const hospStatus = await this.hospStatusModel.findAll();
    return hospStatus;
  }

  async findByName(hospStatusName: string): Promise<HospStatusInfo> {
    const hospStatus = await this.hospStatusModel.findByName(hospStatusName);
    if (!hospStatus) {
      throw new Error(
        '해당 병원상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return hospStatus;
  }

  async create(hospStatusName: string): Promise<HospStatusInfo> {
    const isExist = await this.hospStatusModel.findByName(hospStatusName);
    if (isExist) {
      throw new Error(
        '이 이름으로 생성된 병원상태코드가 있습니다. 다른 이름을 지어주세요.'
      );
    }
    const newHospStatus = await this.hospStatusModel.create(hospStatusName);
    return newHospStatus;
  }

  async update({ hospStatusId, update }: ToUpdate): Promise<HospStatusInfo> {
    const isExist = await this.hospStatusModel.findById(hospStatusId);
    if (!isExist) {
      throw new Error(
        '해당 병원상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const newHospStatus = await this.hospStatusModel.update({
      hospStatusId,
      update,
    });
    return newHospStatus;
  }

  async deleteById(hospStatusId: string): Promise<{ message: string }> {
    const isExist = await this.hospStatusModel.findById(hospStatusId);
    if (!isExist) {
      throw new Error(
        '해당 병원상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    const { deletedCount } = await this.hospStatusModel.deleteById(
      hospStatusId
    );
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${isExist.name} 병원상태코드 삭제를 실패하였습니다.`);
    }

    return { message: `${isExist.name} 병원상태코드 삭제를 성공하였습니다.` };
  }
}

const hospStatusService = new HospStatusService(hospStatusModel);

export { hospStatusService };
