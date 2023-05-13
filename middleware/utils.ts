import Router from "next/router";
import Cookies from "js-cookie";
import { NextRequest } from "next/server";

/**
 * @param {NextRequest}
 * @param {localhost} your localhost address
 */
export function absoluteUrl(req: NextRequest, localhost: string) {
  let protocol = "https:";
  let host = req.headers.get("x-forwarded-host") || req.headers.get("host");

  // @ts-ignore
  if (host?.indexOf("localhost") > -1) {
    if (localhost) host = localhost;
    protocol = "http:";
  }
  return {
    protocol,
    host,
    origin: protocol + "//" + host,
    url: req,
  };
}

/**
 * * Function to logout and remove token from cookies
 * @param e to prevent default action
 * @return {void} void
 */

export function setLogout(e: any) {
  e.preventDefault();
  Cookies.remove("token");
  Router.push("/login");
}