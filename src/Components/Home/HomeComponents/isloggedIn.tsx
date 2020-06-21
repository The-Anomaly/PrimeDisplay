import * as React from "react";
import { Link } from "react-router-dom";
import avatar from "../../../assets/avatar.svg";

export interface IAppProps {
  Logout?:Function|any;
}

export function NavIsLoggedIn(props: IAppProps|any) {
  return (
    <React.Fragment>
      <div className="title1">
        <button onClick={props.Logout} className="title_ll">
          Log out
        </button>
      </div>
      <div className="title1">
        <Link to="/clarityforteams">
          <span className="useravatarwraper">
            <img src={avatar} className="useravatar" alt="avatar" />
          </span>
        </Link>
      </div>
    </React.Fragment>
  );
}
