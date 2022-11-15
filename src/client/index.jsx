import "./foundation/side-effects";

import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Html, App } from "./foundation/App";

hydrate(
<Html>
    <BrowserRouter>
        <App isServerSide={false} precomputedValues={{}} />
    </BrowserRouter>
</Html>
, document);
