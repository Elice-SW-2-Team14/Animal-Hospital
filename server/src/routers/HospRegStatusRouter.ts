import { Router } from 'express';
import is from '@sindresorhus/is';
import { hospRegStatusService } from '../services';
import {} from '../middlewares';

const hospRegStatusRouter = Router();

hospRegStatusRouter.get('/list', async (req, res, next) => {
  try {
    const hospRegStatus = await hospRegStatusService.findAll();
    res.status(200).json(hospRegStatus);
  } catch (error) {
    next(error);
  }
});

hospRegStatusRouter.get('/:hospRegStatusId', async (req, res, next) => {
  try {
    const { hospRegStatusId } = req.params;
    const hospRegStatus = await hospRegStatusService.findById(hospRegStatusId);
    res.status(200).json(hospRegStatus);
  } catch (error) {
    next(error);
  }
});

hospRegStatusRouter.post('/', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { name } = req.body;
    const newhospRegStatus = await hospRegStatusService.create(name);
    res.status(201).json({ newhospRegStatus, message: '생성되었습니다.' });
  } catch (error) {
    next(error);
  }
});

hospRegStatusRouter.patch('/:hospRegStatusId', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }
    const { hospRegStatusId } = req.params;
    const { name } = req.body;
    const updateHospStatus = await hospRegStatusService.update({
      hospRegStatusId,
      update: { name: name },
    });
    res.status(201).json({ updateHospStatus, message: '수정되었습니다.' });
  } catch (error) {
    next(error);
  }
});

hospRegStatusRouter.delete('/:hospRegStatusId', async (req, res, next) => {
  try {
    const { hospRegStatusId } = req.params;
    const deleteHospRegStatus = await hospRegStatusService.deleteById(
      hospRegStatusId
    );
    res.status(201).json(deleteHospRegStatus);
  } catch (error) {
    next(error);
  }
});

export { hospRegStatusRouter };
