import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "@next-logger/logger";

import { NextApiResponseBody, NextApiResponseErrorBody } from "@/types";
import { ALLOWED_GAME_FIELDS } from "@/services/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextApiResponseBody | NextApiResponseErrorBody>
) {
  const { id: gameId } = req.query;

  const logger = getLogger(`api/game/${gameId}`);

  if (req.method !== "GET") {
    res.status(405).json({
      message: "Method Not Allowed",
      timestamp: new Date().getTime(),
      error: "Method Not Allowed",
    });
    return;
  }

  if (
    !req.query.type ||
    !ALLOWED_GAME_FIELDS.find((f) => f.id === req.query.type)
  ) {
    res.status(400).json({
      message: "Bad request",
      timestamp: new Date().getTime(),
      error:
        "type is required, and must be one of: " +
        ALLOWED_GAME_FIELDS.map((f) => f.id).join(","),
    });
    return;
  }

  // TODO: retrive game data from database

  res.status(200).json({
    message: "OK",
    timestamp: new Date().getTime(),
    data: ALLOWED_GAME_FIELDS.find((f) => f.id === req.query.type)?.getSql(
      `${gameId}`
    ),
  });
}
