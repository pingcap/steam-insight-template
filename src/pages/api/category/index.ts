import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "@next-logger/logger";

import { NextApiResponseBody, NextApiResponseErrorBody } from "@/types";
import { ALLOWED_GAME_FIELDS } from "@/services/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextApiResponseBody | NextApiResponseErrorBody>
) {
  if (req.method !== "GET") {
    res.status(405).json({
      message: "Method Not Allowed",
      timestamp: new Date().getTime(),
      error: "Method Not Allowed",
    });
    return;
  }

  // TODO: retrive game categories from database

  res.status(200).json({
    message: "OK",
    timestamp: new Date().getTime(),
    data: [],
  });
}
