import type { NextApiRequest, NextApiResponse } from "next";

import { NextApiResponseBody, NextApiResponseErrorBody } from "@/types";
import { getLogger } from "@next-logger/logger";
import { routes } from "@/services/dataService/routes";
import {
  slug2path,
  getRouteBySlug,
  fetchDataServiceAPI,
} from "@/services/dataService/utils";

import { DataServiceApiHandler } from "@/services/dataService";

// export class DataServiceHandler {
//   protected logger: ReturnType<typeof getLogger>;
//   protected targetRouteObj: typeof routes[keyof typeof routes];
//   protected slug: string[];
//   protected targetRoute: ReturnType<typeof getRouteBySlug>;
//   protected path: string;

//   constructor(
//     protected req: NextApiRequest,
//     protected res: NextApiResponse<
//       NextApiResponseBody | NextApiResponseErrorBody
//     >,
//     private rootRoute: keyof typeof routes
//   ) {
//     const targetRouteObj = routes[rootRoute];
//     const allRoutes = targetRouteObj.routes;
//     const slug = (req.query.slug as string[]) || [];
//     const path = slug2path(slug);
//     const targetRoute = getRouteBySlug(slug, allRoutes);

//     const logger = getLogger(`api/${rootRoute}/${path}`);

//     this.logger = logger;
//     this.targetRouteObj = targetRouteObj;
//     this.slug = slug;
//     this.targetRoute = targetRoute;
//     this.path = path;
//   }

//   public validateRoute() {
//     if (!this.targetRoute) {
//       this.logger.error(`Not found: ${this.path}`);
//       this.res.status(404).json({
//         message: "Not found",
//         time: new Date().toISOString(),
//         timestamp: new Date().getTime(),
//         data: this.slug,
//       });
//       return false;
//     }
//     return true;
//   }

//   public validateQuery() {
//     const requiredQuery =
//       this.targetRoute!.query?.filter((q) => q.required) || [];
//     const missingQuery = requiredQuery.filter(
//       (q) => !this.req.query[q.id] || this.req.query[q.id] === ""
//     );
//     if (missingQuery.length > 0) {
//       this.logger.error(
//         `Bad request: ${this.path}, missing query: ${missingQuery}`
//       );
//       this.res.status(400).json({
//         message: "Bad request",
//         time: new Date().toISOString(),
//         timestamp: new Date().getTime(),
//         data: missingQuery,
//       });
//       return false;
//     }
//     return true;
//   }

//   public getQuery() {
//     const query = this.targetRoute!.query?.reduce((acc, q) => {
//       if (this.req.query[q.id]) {
//         acc[q.field] = this.req.query[q.id] as string | number | boolean;
//       }
//       return acc;
//     }, {} as Record<string, string | number | boolean>);
//     return query;
//   }

//   public async fetchData() {
//     try {
//       const { data, res: dataServiceRes } = await fetchDataServiceAPI(
//         this.targetRouteObj!.path,
//         this.targetRoute!.path,
//         this.getQuery(),
//         true // draft mode
//       );
//       this.logger.info(`data: ${JSON.stringify(data)}, res: ${dataServiceRes}`);
//       this.res.status(200).json({
//         message: "OK",
//         time: new Date().toISOString(),
//         timestamp: new Date().getTime(),
//         data,
//       });
//     } catch (error) {
//       this.logger.error(`error: ${error}`);
//       this.res.status(500).json({
//         message: "Internal server error",
//         time: new Date().toISOString(),
//         timestamp: new Date().getTime(),
//         error,
//       });
//     }
//   }
// }
export class DataServiceTPHandler extends DataServiceApiHandler {
  protected slug: string[];

  constructor(
    protected req: NextApiRequest,
    protected res: NextApiResponse<
      NextApiResponseBody | NextApiResponseErrorBody
    >,
    rootRoute: keyof typeof routes
  ) {
    const slug = (req.query.slug as string[]) || [];
    const path = slug2path(slug);
    super(rootRoute, path);
    this.slug = slug;
  }

  public validateRoute() {
    if (!this.targetRoute) {
      this.logger.error(`Not found: ${this.path}`);
      this.res.status(404).json({
        message: "Not found",
        time: new Date().toISOString(),
        timestamp: new Date().getTime(),
        data: this.slug,
      });
      return false;
    }
    return true;
  }

  public validateQuery() {
    const requiredQuery =
      this.targetRoute!.query?.filter((q) => q.required) || [];
    const missingQuery = requiredQuery.filter(
      (q) => !this.req.query[q.id] || this.req.query[q.id] === ""
    );
    if (missingQuery.length > 0) {
      this.logger.error(
        `Bad request: ${this.path}, missing query: ${missingQuery}`
      );
      this.res.status(400).json({
        message: "Bad request",
        time: new Date().toISOString(),
        timestamp: new Date().getTime(),
        data: missingQuery,
      });
      return false;
    }
    return true;
  }

  public getQuery() {
    const query = this.targetRoute!.query?.reduce((acc, q) => {
      if (this.req.query[q.id]) {
        acc[q.field] = this.req.query[q.id] as string | number | boolean;
      }
      return acc;
    }, {} as Record<string, string | number | boolean>);
    return query;
  }

  public async fetchAPI() {
    const data = await this.fetchData(
      this.targetRouteObj!.path,
      this.targetRoute!.path,
      this.getQuery(),
      true // draft mode
    );
    if (data.error) {
      this.res.status(500).json({
        message: "Internal server error",
        time: new Date().toISOString(),
        timestamp: new Date().getTime(),
        error: data.error,
      });
      return;
    }
    this.res.status(200).json({
      message: "OK",
      time: new Date().toISOString(),
      timestamp: new Date().getTime(),
      data,
    });
  }
}
