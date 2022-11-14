import { join } from "path";

import fastifyStatic from "fastify-static";

import {App} from "../../client/foundation/App"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server";
import React from "react";


const Html = ({children}) => (
<html>
  <head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CyberTicket</title>
  <link rel="preload" as="image" href="/assets/images/hero.avif" />
</head>
<body>
  {children}
  <script src="/main.js"></script>
</body>
</html>
);

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
