declare namespace Express {
  export interface Request {
    currentUserId: string;
    currentHospId: string;
    currentHospObjectId: mongoose.Types.ObjectId;
    currentHospName: string;
  }
}
