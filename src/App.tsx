import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import PicturesPage from "./pages/PicutresPage";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/pictures">
            <PicturesPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
