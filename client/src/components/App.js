import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import ActivitiesList from "./ActivitiesList";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import HomePage from "./HomePage";

import ActivityShow from "./ActivityShow";
import ReviewsEditor from "./ReviewsEditor";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <AuthenticatedRoute
          exact={true}
          path="/categories/:id"
          component={ActivitiesList}
          user={currentUser}
        />
        <AuthenticatedRoute
          exact={true}
          path="/activities/:id"
          component={ActivityShow}
          user={currentUser}
        />
        <Route exact path="/reviews/:id" component={ReviewsEditor} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
