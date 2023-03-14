import type { NextApiRequest, NextApiResponse } from "next";

import { NextApiResponseBody, NextApiResponseErrorBody } from "@/types";
import { DataServiceTPHandler } from "@/services/dataService/api";

const rootRoute = `tag`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextApiResponseBody | NextApiResponseErrorBody>
) {
  const routeHandler = new DataServiceTPHandler(req, res, rootRoute);

  if (!routeHandler.validateRoute()) {
    return;
  }
  if (!routeHandler.validateQuery()) {
    return;
  }

  routeHandler.fetchAPI();
}
