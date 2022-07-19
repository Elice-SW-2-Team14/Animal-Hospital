import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  HospitalInfoRequired,
  SearchOptions,
  ToUpdate,
  HospitalLoginResult,
  HospitalInfo,
  HospitalRegisterData,
  hospitalModel,
  HospitalModel,
} from '../db';
import { hospRegStatusService, hospStatusService } from './index';

class HospitalService {
  constructor(private hospitalModel: HospitalModel) {}

  // 일반 회원가입
  async addUser(hospitalInfo: HospitalRegisterData): Promise<HospitalInfo> {
    // 객체 destructuring
    const {
      name,
      email,
      director,
      password,
      address,
      phoneNumber,
      businessNumber,
      licenseNumber,
    } = hospitalInfo;

    // 이메일 중복 확인
    const hospitalFindbyEmail = await this.hospitalModel.findByEmail(email);

    if (hospitalFindbyEmail) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
      );
    }

    const hospitalFindbyname = await this.hospitalModel.findByName(name);

    if (hospitalFindbyname) {
      throw new Error(
        '이 병원명은 현재 사용중입니다. 다른 병원명을 입력해 주세요.'
      );
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newHospitalInfo: HospitalRegisterData = {
      name,
      email,
      director,
      password: hashedPassword,
      address,
      phoneNumber,
      businessNumber,
      licenseNumber,
    };

    // db에 저장
    const createdNewUser = await this.hospitalModel.create(newHospitalInfo);

    return createdNewUser;
  }

  async getHospitalToken(
    email: string,
    password: string
  ): Promise<HospitalLoginResult> {
    // 이메일 db에 존재 여부 확인
    const hospital = await this.hospitalModel.findByEmail(email);

    if (!hospital) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 가입승인 확인
    const hospRegStatusId = hospital.hospRegStatus?.toString() as string;
    const hospRegStatus = await hospRegStatusService.findById(hospRegStatusId);
    const { name: hospRegStatusName } = hospRegStatus;
    if (hospRegStatusId !== '62cc3c6432b6e445bc83920b') {
      throw new Error(`${hospRegStatusName}`);
    }

    // 회원상태 확인
    const hospStatusId = hospital.hospStatus?.toString() as string;
    const hospStatus = await hospStatusService.findById(hospStatusId);
    const { name: hospStatusName } = hospStatus;
    if (
      hospStatusId !== '62ccf2f039864cbe2c2dccf4' &&
      hospStatusId !== '62d18a00c41f60c4768ddc53'
    ) {
      throw new Error(`${hospStatusName}`);
    }

    const hospitalEmail = hospital.email;
    const hospitalname = hospital.name;
    const correctPasswordHash = hospital.password;
    const hospitalId = hospital._id;
    const hospitalIdToString = hospitalId.toString();
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    const accessToken = jwt.sign(
      {
        hospitalEmail: hospitalEmail,
        hospitalname: hospitalname,
        hospitalId: hospitalIdToString,
        role: 'hospital',
      },
      secretKey,
      {
        expiresIn: '60s',
      }
    );

    const refreshToken = jwt.sign({}, secretKey, {
      expiresIn: '90s',
    });

    console.log(refreshToken);

    const updatedUser = await this.hospitalModel.updateRefreshToken({
      hospitalId,
      update: { refreshToken: refreshToken },
    });

    return { accessToken, hospitalname, hospitalState: hospStatusName };
  }

  async findHospitalById(hospitalId: string): Promise<HospitalInfo> {
    // 객체 destructuring

    const hospital = await this.hospitalModel.findById(hospitalId);

    return hospital;
  }

  async findHospitalByName(hospitalName: string): Promise<HospitalInfo> {
    // 객체 destructuring

    const hospital = await this.hospitalModel.findByName(hospitalName);

    return hospital;
  }

  async updateRefreshToken({
    hospitalId,
    update,
  }: ToUpdate): Promise<HospitalInfo> {
    const filter = { _id: hospitalId };
    const option = { returnOriginal: false };

    const updatedUser = await this.hospitalModel.updateRefreshToken({
      hospitalId: hospitalId,
      update,
    });
    return updatedUser;
  }

  async setHospitalInfo(
    hospitalInfoRequired: HospitalInfoRequired,
    toUpdate: Partial<HospitalInfo>
  ): Promise<HospitalInfo> {
    // 객체 destructuring
    const { hospitalId, currentPassword } = hospitalInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let hospital = await this.hospitalModel.findById(hospitalId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!hospital) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = hospital.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 이제 업데이트 시작

    // 비밀번호도 변경하는 경우에는 해쉬화 해주어야 함.
    const { password, name } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password!, 10);
      toUpdate.password = newPasswordHash;
    }

    if (name) {
      const hospitalFindbyname = await this.hospitalModel.findByName(name);

      if (hospitalFindbyname) {
        throw new Error(
          '이 병원명은 현재 사용중입니다. 다른 병원명을 입력해 주세요.'
        );
      }
    }

    // 업데이트 진행
    hospital = await this.hospitalModel.update({
      hospitalId: hospital._id,
      update: toUpdate,
    });

    return hospital;
  }

  async countTotalHospitals(searchOptions: SearchOptions): Promise<number> {
    const total = await this.hospitalModel.countHospitals(searchOptions);

    if (total < 1) {
      throw new Error('병원이 없습니다.');
    }
    return total;
  }

  async getHospitals(
    page: number,
    perPage: number,
    searchOptions: SearchOptions
  ): Promise<HospitalInfo[]> {
    const users = await this.hospitalModel.findByOption(
      page,
      perPage,
      searchOptions
    );
    return users;
  }
}

const hospitalService = new HospitalService(hospitalModel);

export { hospitalService };
