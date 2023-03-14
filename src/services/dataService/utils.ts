import type { RouteItemType } from "@/services/dataService/routes";
import { request } from "urllib";

export const DATA_SERVICE_ENDPOINT = process.env.DATA_SERVICE_ENDPOINT || "";

export function slug2path(slug: string[]): string {
  return "/" + slug.join("/");
}

export function isPathExistInRoutes(
  path: string,
  routes: RouteItemType[]
): boolean {
  return routes.some((route) => route.path === path);
}

export function getRouteBySlug(
  slug: string[],
  routes: RouteItemType[]
): RouteItemType | undefined {
  const path = slug2path(slug);
  return routes.find((route) => route.path === path);
}

export async function fetchDataServiceAPI(
  servicePath: string,
  resourcePath: string,
  query?: {
    [key: string]: string | number | boolean;
  },
  isDraftEndpoint?: true
): Promise<import("urllib").HttpClientResponse<any>> {
  const url = `${DATA_SERVICE_ENDPOINT}${servicePath}${resourcePath}`;
  const headers: {
    [key: string]: string;
  } = {};
  if (isDraftEndpoint) {
    headers["endpoint-type"] = "draft";
  }
  return request(url, {
    digestAuth: `${process.env.DATA_SERVICE_PUBLIC_API_KEY}:${process.env.DATA_SERVICE_PRIVATE_API_KEY}`,
    data: query,
    headers: {
      ...headers,
    },
    dataType: "json",
  });
}
