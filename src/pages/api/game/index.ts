import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "@next-logger/logger";

import { retriveGameListByName } from "@/services/game";
import { NextApiResponseBody, NextApiResponseErrorBody } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextApiResponseBody | NextApiResponseErrorBody>
) {
  const logger = getLogger(`api/game`);
  logger.info(`req.query.name: ${req.query.name}`);

  if (req.method !== "GET") {
    res.status(405).json({
      message: "Method Not Allowed",
      timestamp: new Date().getTime(),
      error: "Method Not Allowed",
    });
    return;
  }

  if (!req.query.name) {
    res.status(400).json({
      message: "Bad request",
      timestamp: new Date().getTime(),
      error: "name is required",
    });
    return;
  }

  const result = retriveGameListByName(req.query.name as string);

  res.status(200).json({
    message: "OK",
    timestamp: new Date().getTime(),
    data: result,
  });
}
