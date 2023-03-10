import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "@next-logger/logger";

import { retriveGameListByName } from "@/services/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const logger = getLogger(`api/game`);
  logger.info(`req.query.name: ${req.query.name}`);

  if (!req.query.name) {
    res.status(400).json({
      message: "Bad request",
      time: new Date().toISOString(),
      timestamp: new Date().getTime(),
    });
    return;
  }

  const result = retriveGameListByName(req.query.name as string);

  res.status(200).json({
    message: "OK",
    time: new Date().toISOString(),
    timestamp: new Date().getTime(),
    data: result,
  });
}
