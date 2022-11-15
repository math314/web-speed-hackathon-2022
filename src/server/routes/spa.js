import { join } from "path";

import fastifyStatic from "fastify-static";
import { ServerStyleSheet } from 'styled-components';
import { App } from "../../client/foundation/App"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server";
import React from "react";
import { getRaces, getRaceDetails } from "./api"

const render = async (url, precomputedValues) => {
  const sheet = new ServerStyleSheet();

  try {
    const main = renderToString(sheet.collectStyles(
      <StaticRouter location={url}>
        <App isServerSide={true} precomputedValues={precomputedValues} />
      </StaticRouter>
    ));
    const StyleEl = sheet.getStyleElement();

    const rendered = renderToString(
      <html>
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>CyberTicket</title>
          {precomputedValues && 
              // note: vulnerable, DON'T DO THIS ON ACTUAL PRODUCTION. https://redux.js.org/usage/server-rendering#security-considerations
              <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(precomputedValues)}`}} />
          }
          {StyleEl}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: main}} />
          <script src="/main.js"></script>
        </body>
      </html>
    );
    return "<!DOCTYPE html>" + rendered;
  } catch (error) {
    // handle error
    console.error(error);
  } finally {
    sheet.seal();
  }
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
    const races = await getRaces({since: null, until: null});
    const precomputedValue = {
      "/api/races": { races },
    }
    reply.type("text/html").send(await render(_req.url, precomputedValue));
  });

  fastify.get("/races/:raceId/race-card", async (req, reply) => {
    const race = await getRaceDetails(req.params.raceId);
    const apiUrl = `/api/races/${req.params.raceId}`;
    let precomputedValue = {};
    precomputedValue[apiUrl] = race;
    reply.type("text/html").send(await render(req.url, precomputedValue));
  });

  fastify.get("/races/:raceId/odds", async (req, reply) => {
    const race = await getRaceDetails(req.params.raceId);
    const apiUrl = `/api/races/${req.params.raceId}`;
    let precomputedValue = {};
    precomputedValue[apiUrl] = race;
    reply.type("text/html").send(await render(req.url, precomputedValue));
  });

  fastify.get("*", async (_req, reply) => {
    reply.type("text/html").send(await render(_req.url, {}));
  });

  // fastify.get("*", (_req, reply) => {
  //   return reply.sendFile("index.html", join(__dirname, "public"));
  // });
};
