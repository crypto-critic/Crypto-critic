import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {Home} from "./home/home";
import {AppLayout} from "./component/app-layout/app-layout";
// import {StatusBar} from "./component/app-layout/status-bar";
// import {AboutUs} from "./about-us/about-us";
// import {Listing} from "./listing/listing";
// import {App} from './app'
export default class MainRoutes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="main-routes">
                <BrowserRouter>
                    <Switch>
                        {/* <Route path="/" exact component={Home}/> */}
                        {/* <Route path="/test" exact component={Test}/> */}
                        {/* <Route path="/menu" exact component={MenuAppBar}/> */}
                        <Route path="/" exact component={AppLayout}/>
                        {/* <Route path="/stt" exact component={StatusBar}/> */}
                        {/* <Route path="/coins/:id" component={Coin}/>
                        <Route path="/layout" exact component={AppLayout}/>
                        <Route path="/share" exact component={Share}/>
                        <Route path="/search" exact component={Sa}/>
                        <Route path="/about-us" exact component={AboutUs}/> */}
                        {/* <Route path="/listing" exact component={Listing}/> */}
                        {/* <Route path="/test" exact component={App}/> */}
                        <Route exact render={()=><Redirect to="/" />}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}