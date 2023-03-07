// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "@next-logger/logger";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  getLogger("api/healthy").info("Hello from api");
  res.status(200).json({
    message: "Hello from api",
    time: new Date().toISOString(),
    timestamp: new Date().getTime(),
  });
}
