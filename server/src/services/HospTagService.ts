import { HospTagInfo, HospTagModel, hospTagModel } from '../db';

interface ToUpdate {
  hospTagId: string;
  update: {
    [key: string]: string;
  };
}

interface ToCreate {
  name: string;
  image?: string;
}

class HospTagService {
  constructor(private hospTagModel: HospTagModel) {}

  async findById(hospTagId: string): Promise<HospTagInfo> {
    const hospTag = await this.hospTagModel.findById(hospTagId);
    if (!hospTag) {
      throw new Error(
        '해당 병원태그코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return hospTag;
  }

  async findByIds(hospTagIds: string[]): Promise<HospTagInfo[]> {
    const HospTagInfoes: HospTagInfo[] = [];
    for (let hospTagId of hospTagIds) {
      const hospTag = await this.hospTagModel.findById(hospTagId);
      if (!hospTag) {
        throw new Error(
          '해당 병원태그코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
        );
      }
      HospTagInfoes.push(hospTag);
    }
    return HospTagInfoes;
  }

  async findAll() {
    const hospTag = await this.hospTagModel.findAll();
    return hospTag;
  }

  async findByName(hospTagName: string): Promise<HospTagInfo> {
    const hospTag = await this.hospTagModel.findByName(hospTagName);
    if (!hospTag) {
      throw new Error(
        '해당 병원태그코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return hospTag;
  }

  async create(createData: ToCreate): Promise<HospTagInfo> {
    const isExist = await this.hospTagModel.findByName(createData.name);
    if (isExist) {
      throw new Error(
        '이 이름으로 생성된 병원태그코드가 있습니다. 다른 이름을 지어주세요.'
      );
    }
    const newHospTag = await this.hospTagModel.create(createData);
    return newHospTag;
  }

  async update({ hospTagId, update }: ToUpdate): Promise<HospTagInfo> {
    const isExist = await this.hospTagModel.findById(hospTagId);
    if (!isExist) {
      throw new Error(
        '해당 병원태그코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const updateHospTag = await this.hospTagModel.update({
      hospTagId,
      update,
    });
    return updateHospTag;
  }

  async deleteById(hospTagId: string): Promise<{ message: string }> {
    const isExist = await this.hospTagModel.findById(hospTagId);
    if (!isExist) {
      throw new Error(
        '해당 병원태크코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    const { deletedCount } = await this.hospTagModel.deleteById(hospTagId);
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${isExist.name} 병원태크코드 삭제를 실패하였습니다.`);
    }

    return { message: `${isExist.name} 병원태크코드 삭제를 성공하였습니다.` };
  }
}

const hospTagService = new HospTagService(hospTagModel);

export { hospTagService };
