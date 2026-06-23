import { Router, Request, Response } from "express";
import CommunityModel from "../Shema/community";

interface OpinionRequestBody {
  username?: string;
  opinion?: string;
}

const communityRouter = Router();

communityRouter.post(
  "/opinion",
  async (req: Request<{}, {}, OpinionRequestBody>, res: Response) => {
    try {
      const username = req.body.username?.trim();
      const opinion = req.body.opinion?.trim();

      if (!username || !opinion) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
        });
      }

      await CommunityModel.create({ username, opinion });

      return res.status(201).json({
        success: true,
        message: "Opinion submitted successfully",
      });
    } catch (error) {
      console.error("Failed to submit community opinion", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

communityRouter.get("/opinions", async (_req: Request, res: Response) => {
  try {
    const opinions = await CommunityModel.find().sort({ createdAt: -1 }).lean();

    return res.json(
      opinions.map((opinion) => ({
        id: opinion._id,
        username: opinion.username,
        opinion: opinion.opinion,
        createdAt: opinion.createdAt,
      })),
    );
  } catch (error) {
    console.error("Failed to fetch community opinions", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default communityRouter;
