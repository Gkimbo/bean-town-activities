import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="btn-3 draw-border">
        Sign In
      </Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="btn-3 draw-border">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar make-transparent grid-x">
      <div className="top-bar-left">
        <ul className="menu">
          <li>
            <Link to="/" className="btn-3 draw-border">
              Home
            </Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
