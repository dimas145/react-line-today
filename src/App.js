import React, { useState, useEffect } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavComponent from "./component/NavComponent"
import FeedsComponent from "./component/FeedsComponent"
import axios from "axios";
import "./styles/app.css"

function App() {
    const [categories, setCategories] = useState([]);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        axios.get("/portaljson").then(res => {
            setCategories(res.data.result.categoryList);
            setFeeds(res.data.result.categories);
        });
    }, []);

    if (!feeds.length || !categories.length) return (<span>loading...</span>);

    return (
        <div className="App">
            <BrowserRouter>
                <NavComponent categories={categories} />
                <Switch>
                    <Redirect exact from="/" to={"/category/" + categories[0].name} />
                    <Redirect exact from="/category" to={"/category/" + categories[0].name} />
                    <Route path="/category/:name">
                        <FeedsComponent feeds={feeds} />
                    </Route>
                    <Route path="/bookmarks">
                        <FeedsComponent />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
