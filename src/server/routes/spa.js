import { join } from "path";

import fastifyStatic from "fastify-static";

import { Html, App } from "../../client/foundation/App"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server";
import React from "react";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyStatic, {
    root: join(__dirname, "public"),
    wildcard: false,
    index: false
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (_req, reply) => {
    const rendered = renderToString(
    <Html>
      <StaticRouter location={_req.url}>
        <App />
      </StaticRouter>
    </Html>
    );

    reply.type("text/html").send("<!DOCTYPE html>" + rendered);
  });

  // fastify.get("*", (_req, reply) => {
  //   return reply.sendFile("index.html", join(__dirname, "public"));
  // });
};
