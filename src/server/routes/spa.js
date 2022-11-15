import { join } from "path";

import fastifyStatic from "fastify-static";

import { Html, App } from "../../client/foundation/App"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server";
import React from "react";

const render = async (url, precomputedValues) => {
  const rendered = renderToString(
    <Html>
      <StaticRouter location={url}>
      <App isServerSide={true} precomputedValues={precomputedValues} />
      </StaticRouter>
    </Html>
    );
    return "<!DOCTYPE html>" + rendered;
};

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

  fastify.get("/", async (_req, reply) => {
    reply.type("text/html").send(await render(_req.url, {}));
  });

  fastify.get("*", async (_req, reply) => {
    reply.type("text/html").send(await render(_req.url, {}));
  });

  // fastify.get("*", (_req, reply) => {
  //   return reply.sendFile("index.html", join(__dirname, "public"));
  // });
};
