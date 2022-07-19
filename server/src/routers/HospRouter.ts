import { Router } from 'express';
import * as _ from 'lodash';
import {
  hospitalService,
  hospServiceService,
  hospStatusService,
  hospTagService,
} from '../services';
import { HospLoginRequired, onlyHospOwner } from '../middlewares';
import { upload } from '../utils';
import mongoose, { model } from 'mongoose';

const hospitalRouter = Router();

hospitalRouter.post('/register', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (_.isEmpty(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    interface address {
      postalCode: string;
      address1: string;
      address2: string;
    }

    interface user {
      name: string;
      email: string;
      director: string;
      password: string;
      address: address;
      phoneNumber: string;
      businessNumber: string;
      licenseNumber: string;
    }

    const {
      name,
      email,
      director,
      password,
      address,
      phoneNumber,
      businessNumber,
      licenseNumber,
    }: user = req.body;

    if (
      !name ||
      !email ||
      !director ||
      !password ||
      !address ||
      !phoneNumber ||
      !businessNumber ||
      !licenseNumber
    ) {
      throw new Error('필수 항목이 빠졌습니다. 다시 확인해주세요.');
    }

    // 이메일 폼 검증
    let regexEmail =
      /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }

    //패스워드 폼 검증
    let regexPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    if (!regexPassword.test(password)) {
      throw new Error('비밀번호 형식이 올바르지 않습니다.');
    }

    // //이메일 인증 로직
    // let serverAuthNumber: string = '0';
    // const AuthEmailIdentifier = req.cookies['AuthEmailIdentifier'];
    // console.log('req.cookies', AuthEmailIdentifier);
    // if (!AuthEmailIdentifier) {
    //   throw new Error('이메일 인증을 다시 시작하세요');
    // }
    // const redisData = await redisClient.HGETALL(AuthEmailIdentifier);
    // console.log(redisData);
    // console.log(redisData.authNumber);
    // console.log(typeof redisData.authNumber);

    // if (typeof redisData.authNumber == 'undefined') {
    //   const flag: string = 'email';
    //   const toFindAuthNumber = {
    //     email: email,
    //     flag: flag,
    //     identifierNumber: AuthEmailIdentifier,
    //   };
    //   const dbSave = await authNumberService.findAuthNumber(toFindAuthNumber);
    //   if (!dbSave) {
    //     throw new Error(
    //       '인증 시간이 지났습니다. 이메일 인증을 다시 시작하세요'
    //     );
    //   }
    //   serverAuthNumber = dbSave.authNumber;
    // } else {
    //   serverAuthNumber = redisData.authNumber;
    // }

    // if (emailAuthNumber !== serverAuthNumber) {
    //   throw new Error('인증번호가 틀립니다. 다시 입력해주세요');
    // }

    // // 위 데이터를 유저 db에 추가하기
    const hospitalInfo: user = {
      name,
      email,
      director,
      password,
      address,
      phoneNumber,
      businessNumber,
      licenseNumber,
    };

    const newHospital = await hospitalService.addUser(hospitalInfo);

    res.status(201).json({
      message: '병원가입 내역 확인중입니다.',
      data: { hospital: newHospital },
    });
  } catch (error) {
    next(error);
  }
});

hospitalRouter.post('/login', async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (_.isEmpty(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { email, password } = req.body;

    // 위 데이터가 db에 있는지 확인하고,
    // db 있을 시 로그인 성공 및, 토큰 받아오기
    const hospitalToken = await hospitalService.getHospitalToken(
      email,
      password
    );

    const { accessToken, hospitalname, hospitalState } = hospitalToken;

    res.cookie('user', accessToken, {
      httpOnly: true,
    });

    res.status(201).json({
      data: {
        hospitalName: hospitalname,
        role: 'hospital',
        hospitalState: hospitalState,
      },
      message: '로그인에 성공했습니다!',
    });
  } catch (error) {
    next(error);
  }
});

//일반 병원 정보 수정
hospitalRouter.patch(
  '/',
  HospLoginRequired,
  upload.array('image'),
  async (req, res, next) => {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      let image: string[] = [];
      if (req.files) {
        const images = req.files as Express.MulterS3.File[];
        image = images.map((img) => img.location);
        console.log(image);
      } else {
        if (_.isEmpty(req.body)) {
          throw new Error(
            'headers의 Content-Type을 application/json으로 설정해주세요'
          );
        }
      }

      // body data 로부터 업데이트할 사용자 정보를 추출함.

      const {
        name,
        director,
        password,
        address,
        phoneNumber,
        businessNumber,
        businessHours,
        holiday,
        hospitalCapacity,
        tag,
        keyword,
      } = req.body;

      if (password) {
        let regexPassword =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
        if (!regexPassword.test(password)) {
          throw new Error('비밀번호 형식이 올바르지 않습니다.');
        }
      }

      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      const currentPassword = req.body.currentPassword;

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
      }

      const hospitalId = req.currentHospId;

      const hospitalInfoRequired = { hospitalId, currentPassword };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(name && { name }),
        ...(director && { director }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(businessHours && { businessHours }),
        ...(businessNumber && { businessNumber }),
        ...(holiday && { holiday }),
        ...(hospitalCapacity && { hospitalCapacity }),
        ...(tag && { tag }),
        ...(keyword && { keyword }),
        ...(image && { image }),
      };

      // 사용자 정보를 업데이트함.
      const updatedHospInfo = await hospitalService.setHospitalInfo(
        hospitalInfoRequired,
        toUpdate
      );

      res.status(200).json({
        data: { updatedHospInfo: updatedHospInfo },
        message: '수정되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  }
);

//병원 추가 정보 입력
hospitalRouter.patch(
  '/additional-info',
  HospLoginRequired,
  upload.array('image'),
  async (req, res, next) => {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      let image: string[] = [];
      if (req.files) {
        const images = req.files as Express.MulterS3.File[];
        image = images.map((img) => img.location);
        console.log(image);
      } else {
        if (_.isEmpty(req.body)) {
          throw new Error(
            'headers의 Content-Type을 application/json으로 설정해주세요'
          );
        }
      }

      // body data 로부터 업데이트할 사용자 정보를 추출함.

      const {
        name,
        director,
        password,
        address,
        phoneNumber,
        businessNumber,
        businessHours,
        holiday,
        hospitalCapacity,
        tag,
        keyword,
      } = req.body;

      if (
        !(
          image &&
          businessHours &&
          holiday &&
          hospitalCapacity &&
          tag &&
          keyword
        )
      ) {
        throw new Error('기입하지 않은 정보가 있습니다. 다시 확인해주세요');
      }

      if (password) {
        let regexPassword =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
        if (!regexPassword.test(password)) {
          throw new Error('비밀번호 형식이 올바르지 않습니다.');
        }
      }

      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      const currentPassword = req.body.currentPassword;

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
      }

      const hospitalId = req.currentHospId;

      const hospitalInfoRequired = { hospitalId, currentPassword };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const hospStatus = new mongoose.Types.ObjectId(
        '62ccf2f039864cbe2c2dccf4'
      );
      const hospStatusInfo = await hospStatusService.findById(
        '62ccf2f039864cbe2c2dccf4'
      );

      const toUpdate = {
        ...(name && { name }),
        ...(director && { director }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(businessHours && { businessHours }),
        ...(businessNumber && { businessNumber }),
        ...(holiday && { holiday }),
        ...(hospitalCapacity && { hospitalCapacity }),
        ...(tag && { tag }),
        ...(keyword && { keyword }),
        ...(image && { image }),
        ...(hospStatus && { hospStatus }),
      };

      // 사용자 정보를 업데이트함.
      const updatedHospInfo = await hospitalService.setHospitalInfo(
        hospitalInfoRequired,
        toUpdate
      );

      res.status(200).json({
        data: {
          updatedHospInfo: updatedHospInfo,
          hospStatus: hospStatusInfo.name,
        },
        message: '수정되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  }
);

// 병원회원 탈퇴
hospitalRouter.patch(
  '/withdrawal',
  HospLoginRequired,
  async (req, res, next) => {
    try {
      if (_.isEmpty(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }

      // body data 로부터 업데이트할 사용자 정보를 추출함.

      const { currentPassword } = req.body;

      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error('탈퇴할려면, 현재의 비밀번호가 필요합니다.');
      }

      const hospitalId = req.currentHospId;

      const hospitalInfoRequired = { hospitalId, currentPassword };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        hospStatus: new mongoose.Types.ObjectId('62cbe26a0a094d23799511f3'),
      };

      // 사용자 정보를 업데이트함.
      const deleteHospInfo = await hospitalService.setHospitalInfo(
        hospitalInfoRequired,
        toUpdate
      );

      res.status(200).json({
        data: { deleteHospInfo: deleteHospInfo },
        message: '탈퇴하였습니다.',
      });
    } catch (error) {
      next(error);
    }
  }
);

hospitalRouter.get('/:hospitalName/Services', async (req, res, next) => {
  try {
    const { hospitalName } = req.params;
    const hospital = await hospitalService.findHospitalByName(hospitalName);

    if (!hospital) {
      throw new Error('찾고자 하는 병원이 없습니다.');
    }

    const hospitalId = hospital._id;

    const hospServices = await hospServiceService.findAll(hospitalId);
    res.status(200).json({ data: { hospServices: hospServices }, message: '' });
  } catch (error) {
    next(error);
  }
});

hospitalRouter.get(
  '/:hospitalName/Services/:hospServiceId',
  async (req, res, next) => {
    try {
      const { hospServiceId, hospitalName } = req.params;

      const hospital = await hospitalService.findHospitalByName(hospitalName);

      if (!hospital) {
        throw new Error('찾고자 하는 병원이 없습니다.');
      }

      const hospService = await hospServiceService.findById(hospServiceId);
      res.status(200).json({ data: { hospService: hospService }, message: '' });
    } catch (error) {
      next(error);
    }
  }
);

hospitalRouter.post(
  '/:hospitalName/Service',
  HospLoginRequired,
  onlyHospOwner,
  async (req, res, next) => {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (_.isEmpty(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }

      const { name, price, serviceCapacity, desc } = req.body;

      const createHospServiceData = {
        name: name,
        price: price,
        serviceCapacity: serviceCapacity,
        desc: desc,
        hospital: req.currentHospObjectId,
      };
      const newhospService = await hospServiceService.create(
        createHospServiceData
      );
      res.status(201).json({
        data: { hospitalService: newhospService },
        message: '생성되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  }
);

hospitalRouter.patch(
  '/:hospitalName/Services/:hospServiceId',
  HospLoginRequired,
  onlyHospOwner,
  async (req, res, next) => {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (_.isEmpty(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }
      const { hospServiceId } = req.params;
      const { name, price, serviceCapacity, desc } = req.body;

      const toUpdate = {
        ...(name && { name }),
        ...(price && { price }),
        ...(serviceCapacity && { serviceCapacity }),
        ...(desc && { desc }),
      };

      console.log(toUpdate);

      const updateHospService = await hospServiceService.update({
        hospServiceId,
        update: toUpdate,
      });

      res.status(201).json({
        data: { hospitalService: updateHospService },
        message: '수정되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  }
);

hospitalRouter.delete(
  '/:hospitalName/Services/:hospServiceId',
  HospLoginRequired,
  onlyHospOwner,
  async (req, res, next) => {
    try {
      const { hospServiceId } = req.params;
      const deleteHospService = await hospServiceService.deleteById(
        hospServiceId
      );
      res.status(201).json({ data: {}, message: deleteHospService });
    } catch (error) {
      next(error);
    }
  }
);

hospitalRouter.get('/:hospitalName/detail', async (req, res, next) => {
  try {
    const { hospitalName } = req.params;

    const hospInfo = await hospitalService.findHospitalByName(hospitalName);

    const {
      name,
      address,
      businessHours,
      holiday,
      tag,
      keyword,
      image,
      phoneNumber,
      hospitalCapacity,
      director,
      starRating,
    } = hospInfo;

    const tagIds = tag?.map((data) => data.toString()) as string[];

    const tagsData = await hospTagService.findByIds(tagIds);

    const hospDetailInfo = {
      name,
      address,
      businessHours,
      holiday,
      tag: tagsData,
      keyword,
      image,
      phoneNumber,
      hospitalCapacity,
      director,
      starRating,
    };
    res
      .status(200)
      .json({ data: { hospDetailInfo: hospDetailInfo }, message: '' });
  } catch (error) {
    next(error);
  }
});

//pagination 변수
//page : 현재 페이지
//perPage : 페이지 당 게시글개수
hospitalRouter.get('/list/main', async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);

    const tagName = req.query.tagName as string;
    const tagsData = await hospTagService.findByName(tagName);
    const tagId = tagsData._id as mongoose.Types.ObjectId;

    const searchOptions = { tag: tagId };

    const totalHospitals = await hospitalService.countTotalHospitals(
      searchOptions
    );

    const hospitals = await hospitalService.getHospitals(
      page,
      perPage,
      searchOptions
    );

    const totalPage = Math.ceil(totalHospitals / perPage);

    res.status(200).json({
      data: {
        searchOptions: searchOptions,
        hospitals: hospitals,
        page: page,
        perPage: perPage,
        totalPage: totalPage,
        totalHospitals: totalHospitals,
      },
      message: '',
    });
  } catch (error) {
    next(error);
  }
});

hospitalRouter.get('/detail', HospLoginRequired, async (req, res, next) => {
  try {
    const hospInfo = await hospitalService.findHospitalByName(
      req.currentHospName
    );

    const { name, address, businessHours, holiday, tag, keyword, image } =
      hospInfo;

    const tagIds = tag?.map((data) => data.toString()) as string[];

    const tagsData = await hospTagService.findByIds(tagIds);

    res
      .status(200)
      .json({ data: { hospDetailInfo: hospInfo, tag: tagsData }, message: '' });
  } catch (error) {
    next(error);
  }
});

export { hospitalRouter };
