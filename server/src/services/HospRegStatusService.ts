import {
  HospRegStatusInfo,
  HospRegStatusModel,
  hospRegStatusModel,
} from '../db';

interface ToUpdate {
  hospRegStatusId: string;
  update: {
    [key: string]: string;
  };
}

class HospRegStatusService {
  constructor(private hospRegStatusModel: HospRegStatusModel) {}

  async findById(hospRegStatusId: string): Promise<HospRegStatusInfo> {
    const hospRegStatus = await this.hospRegStatusModel.findById(
      hospRegStatusId
    );
    if (!hospRegStatus) {
      throw new Error(
        '해당 병원 가입 상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return hospRegStatus;
  }

  async findAll() {
    const hospRegStatus = await this.hospRegStatusModel.findAll();
    return hospRegStatus;
  }

  async findByName(hospRegStatusName: string): Promise<HospRegStatusInfo> {
    const hospRegStatus = await this.hospRegStatusModel.findByName(
      hospRegStatusName
    );
    if (!hospRegStatus) {
      throw new Error(
        '해당 병원 가입 상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return hospRegStatus;
  }

  async create(hospRegStatusName: string): Promise<HospRegStatusInfo> {
    const isExist = await this.hospRegStatusModel.findByName(hospRegStatusName);
    if (isExist) {
      throw new Error(
        '이 이름으로 생성된 병원 가입 상태코드가 있습니다. 다른 이름을 지어주세요.'
      );
    }
    const newHospRegStatus = await this.hospRegStatusModel.create(
      hospRegStatusName
    );
    return newHospRegStatus;
  }

  async update({
    hospRegStatusId,
    update,
  }: ToUpdate): Promise<HospRegStatusInfo> {
    const isExist = await this.hospRegStatusModel.findById(hospRegStatusId);
    if (!isExist) {
      throw new Error(
        '해당 병원 가입 상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const newHospRegStatus = await this.hospRegStatusModel.update({
      hospRegStatusId,
      update,
    });
    return newHospRegStatus;
  }

  async deleteById(hospRegStatusId: string): Promise<{ message: string }> {
    const isExist = await this.hospRegStatusModel.findById(hospRegStatusId);
    if (!isExist) {
      throw new Error(
        '해당 병원 가입 상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    const { deletedCount } = await this.hospRegStatusModel.deleteById(
      hospRegStatusId
    );
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(
        `${isExist.name} 병원 가입 상태코드 삭제를 실패하였습니다.`
      );
    }

    return {
      message: `${isExist.name} 병원 가입 상태코드 삭제를 성공하였습니다.`,
    };
  }
}

const hospRegStatusService = new HospRegStatusService(hospRegStatusModel);

export { hospRegStatusService };
