import type { NextApiRequest, NextApiResponse } from "next";

import { NextApiResponseBody, NextApiResponseErrorBody } from "@/types";
import { getLogger } from "@next-logger/logger";
import { routes } from "@/services/dataService/routes";
import {
  slug2path,
  getRouteBySlug,
  getRouteByPath,
  fetchDataServiceAPI,
} from "@/services/dataService/utils";

export class DataServiceApiHandler {
  protected logger: ReturnType<typeof getLogger>;
  protected targetRouteObj: typeof routes[keyof typeof routes];
  protected targetRoute: ReturnType<typeof getRouteBySlug>;

  constructor(
    protected rootRoute: keyof typeof routes,
    protected path: string
  ) {
    const targetRouteObj = routes[rootRoute];
    const allRoutes = targetRouteObj.routes;
    const targetRoute = getRouteByPath(path, allRoutes);

    const logger = getLogger(`api/${rootRoute}/${path}`);

    this.logger = logger;
    this.targetRouteObj = targetRouteObj;
    this.targetRoute = targetRoute;
    this.path = path;
  }

  public async fetchData(
    servicePath: string,
    resourcePath: string,
    query?: {
      [key: string]: string | number | boolean;
    },
    isDraftEndpoint?: boolean
  ) {
    try {
      const { data, res: dataServiceRes } = await fetchDataServiceAPI(
        servicePath,
        resourcePath,
        query,
        isDraftEndpoint // draft mode
      );
      this.logger.info(`data: ${JSON.stringify(data)}, res: ${dataServiceRes}`);
      return { data, res: dataServiceRes };
    } catch (error) {
      this.logger.error(`error: ${error}`);
      return { error };
    }
  }
}

