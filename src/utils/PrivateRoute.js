import React from "react";
import {HashRouter, Redirect, Route} from "react-router-dom";

function PrivateRoute({ isLoggedIn, ...props }) {
    return isLoggedIn
        ? <Route {...props} />
        : <Redirect to="/login"/>
};

export default PrivateRoute;