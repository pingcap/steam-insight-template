export interface NextApiResponseCommonBody {
  message: string;
  time?: string;
  timestamp: number;
}

export interface NextApiResponseBody extends NextApiResponseCommonBody {
  data: any;
}

export interface NextApiResponseErrorBody extends NextApiResponseCommonBody {
  error: any;
}
