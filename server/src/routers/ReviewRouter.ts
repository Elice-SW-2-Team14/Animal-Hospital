import {Router} from 'express';

import {postReviewCTR, getReviewCTR, getMyReviewCTR, updateReviewCTR, getAllReviewsCTR,deleteReviewCTR} from '../controllers/ReviewController';

import {loginRequired} from '../middlewares';

const router = Router();

router.post('/posting', loginRequired, postReviewCTR);
router.get('/vet', getReviewCTR );
router.get('/user',loginRequired, getMyReviewCTR);
router.get('/admin', loginRequired, getAllReviewsCTR);
router.patch('/update', loginRequired, updateReviewCTR);
router.delete('/delete', loginRequired, deleteReviewCTR)


export {router as reviewRouter};