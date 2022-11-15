import "./foundation/side-effects";

import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "./foundation/App";

hydrate(
    <BrowserRouter>
        <App isServerSide={false} precomputedValues={window && window.__INITIAL_STATE__} />
    </BrowserRouter>
, document.getElementById("root"));
