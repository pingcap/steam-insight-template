import type { NextApiRequest, NextApiResponse } from "next";

import { NextApiResponseBody, NextApiResponseErrorBody } from "@/types";
import { DataServiceHandler } from "@/services/dataService/api";

const rootRoute = `genre`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextApiResponseBody | NextApiResponseErrorBody>
) {
  const routeHandler = new DataServiceHandler(req, res, rootRoute);

  if (!routeHandler.validateRoute()) {
    return;
  }
  if (!routeHandler.validateQuery()) {
    return;
  }

  routeHandler.fetchData();
}
