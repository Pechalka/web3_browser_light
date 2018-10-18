import {hashHistory, IndexRoute, Route, Router} from "react-router";
import Application from "./Application";
import RootRegistry from "./RootRegistry";
import Settings from "./Settings";
import Wallet from "./Wallet";
import NotFound from "./NotFound";
import Browser from "./Browser";
import Home from "./Home";
import React from "react";

const AppRouter = () => (<Router history={hashHistory}>
    <Route path='/' component={Application}>
        <Route path='/rootregistry' component={RootRegistry}/>
        <Route path='/settings' component={Settings}/>
        <Route path='/wallet' component={Wallet}/>
        <Route path='/notfound' component={NotFound}/>
        <Route path='/browser' component={Browser}/>
        <IndexRoute component={Home}/>
        <Route path='*' exact={true} component={RootRegistry}/>
    </Route>
</Router>);

export default AppRouter;
