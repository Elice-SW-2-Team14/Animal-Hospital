import { Router } from "express";
import is from "@sindresorhus/is";
import { hospStatusService } from "../services";
import {} from "../middlewares";

const hospStatusRouter = Router();

hospStatusRouter.get("/list", async (req, res, next) => {
  try {
    const hospStatus = await hospStatusService.findAll();
    res.status(200).json(hospStatus);
  } catch (error) {
    next(error);
  }
});

hospStatusRouter.get("/:hospStatusId", async (req, res, next) => {
  try {
    const { hospStatusId } = req.params;
    const hospStatus = await hospStatusService.findById(hospStatusId);
    res.status(200).json(hospStatus);
  } catch (error) {
    next(error);
  }
});

hospStatusRouter.post("/", async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { name } = req.body;
    const newhospStatus = await hospStatusService.create(name);
    res.status(201).json({ newhospStatus, message: "생성되었습니다." });
  } catch (error) {
    next(error);
  }
});

hospStatusRouter.patch("/:hospStatusId", async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const { hospStatusId } = req.params;
    const { name } = req.body;
    const updateHospStatus = await hospStatusService.update({
      hospStatusId,
      update: { name: name },
    });
    res.status(201).json({ updateHospStatus, message: "수정되었습니다." });
  } catch (error) {
    next(error);
  }
});

hospStatusRouter.delete("/:hospStatusId", async (req, res, next) => {
  try {
    const { hospStatusId } = req.params;
    const deleteHospStatus = await hospStatusService.deleteById(hospStatusId);
    res.status(201).json(deleteHospStatus);
  } catch (error) {
    next(error);
  }
});

export { hospStatusRouter };
