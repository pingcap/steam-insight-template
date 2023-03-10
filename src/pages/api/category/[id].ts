import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "@next-logger/logger";

import { NextApiResponseBody, NextApiResponseErrorBody } from "@/types";
import { ALLOWED_GAME_FIELDS } from "@/services/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextApiResponseBody | NextApiResponseErrorBody>
) {
  const { id: categoryId, offset, size } = req.query;
  const logger = getLogger(`api/category/${categoryId}`);

  if (req.method !== "GET") {
    res.status(405).json({
      message: "Method Not Allowed",
      timestamp: new Date().getTime(),
      error: "Method Not Allowed",
    });
    return;
  }

  if (!offset || !size) { 
    res.status(400).json({
      message: "Bad request",
      timestamp: new Date().getTime(),
      error: "offset and size are required",
    });
    return;
  }

  // TODO: retrive game categories from database

  res.status(200).json({
    message: "OK",
    timestamp: new Date().getTime(),
    data: {
      offset: offset,
      size: size,
      total: 0,
    },
  });
}
