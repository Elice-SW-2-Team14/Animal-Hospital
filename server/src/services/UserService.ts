import {
  userModel,
  UserModel,
  UserInfo,
  UserData,
  StatusInfoRequired,
} from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginInfo {
  email: string;
  password: string;
}

interface LoginResult {
  token: string;
  role: string;
  userStatus: string;
}

interface UserInfoRequired {
  email: string;
  currentPassword: string;
}

enum UserStatus {
  NORMAL = 'normal',
  EXPIRED = 'expired',
}

class UserService {
  constructor(private userModel: UserModel) {}

  //일반회원가입
  async addUser(userInfo: UserInfo): Promise<UserInfo> {
    const {
      userName,
      email,
      password,
      phoneNumber,
      address,
      role,
      userStatus,
    } = userInfo;
    const user = await this.userModel.findByEmail(email);

    // 이메일 중복 확인
    if (user) {
      throw new Error(
        '현재 이 이메일은 사용 중입니다. 다른 이메일을 입력해 주세요.'
      );
    }

    //비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = {
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
      userStatus,
    };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);
    return createdNewUser;
  }

  // 일반 로그인
  async getUserToken(loginInfo: LoginInfo): Promise<LoginResult> {
    const { email, password } = loginInfo;

    const user = await this.userModel.findByEmail(email);

    if (!user) {
      throw new Error(
        '해당 이메일의 가입 내역을 찾을 수 없습니다. 다시 한 번 확인해주세요.'
      );
    }

    const hashedPassword = user.password;
    const isPWCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPWCorrect) {
      throw new Error('비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.');
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const token = jwt.sign(
      { userId: user._id, role: user.role, userStatus: user.userStatus },
      secretKey
    );

    const role = user.role!;
    const userStatus = user.userStatus!;

    return { token, role, userStatus };
  }

  // 개인정보 조회
  async getUserData(userId: string): Promise<UserData> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요!.');
    }
    return user;
  }

  // 개인정보 수정
  async setUser(
    userInfoRequired: UserInfoRequired,
    toUpdate: Partial<UserInfo>
  ): Promise<UserData | null> {
    const { email, currentPassword } = userInfoRequired;

    let user = (await this.userModel.findByEmail(email)) as UserData;

    const correctPasswordHash = user.password;

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    user = (await this.userModel.update({
      email,
      update: toUpdate,
    })) as UserData;

    return user;
  }

  // 비밀번호 맞는지 확인
  async checkUserPassword(userId: string, password: string): Promise<Boolean> {
    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findById(userId);

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user?.password;

    if (correctPasswordHash) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        correctPasswordHash
      );
      if (!isPasswordCorrect) {
        throw new Error(
          '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
        );
      }

      // 비밀번호 일치함. 유저 정보 반환
      return true;
    } else {
      return false;
    }
  }

  async getUsers(): Promise<UserData[]> {
    const users = await this.userModel.findAll();
    return users;
  }

  async setStatus(
    statusInfoRequired: StatusInfoRequired
  ): Promise<string | undefined> {
    const { userId, userStatus } = statusInfoRequired;
    const user = await this.userModel.findById(userId);
    const newStatus = await this.userModel.updateStatus(statusInfoRequired);
    console.log(newStatus);
    return newStatus;
  }

  //탈퇴한 회원 로그인 차단
  async blockExpiredUser(email: string): Promise<boolean> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
    }
    const userStatus = user.userStatus;

    if (userStatus === UserStatus.EXPIRED) {
      return true;

    } else {
      return false;
    }
  }


  //권한 없는 리뷰작성자 차단
  async blockUnauthorized (userId : string) : Promise<boolean>{
    const user = await this.userModel.findById(userId);
    console.log(user.role);

    if(user && user.role==="basic-user") {
      
     return true

    } else {
      return false;
    }

  }
}

const userService = new UserService(userModel);

export { userService };
