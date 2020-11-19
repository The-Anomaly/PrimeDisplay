import * as React from "react";
import { Link } from "react-router-dom";

export interface IAppProps {}

export function NavIsLoggedOut(props: IAppProps) {
  return (
    <React.Fragment>
      <div className="title1 shiftlefff">
        {/* <Link to="/signup">
          <button className="title_t signupbtn">Sign Up</button>
        </Link> */}
        {/* <Link to="/signin">
          <button className="title_t signupbtn">LOGIN</button>
        </Link> */}
        <div className="title1 shiftlefff newshft">
          <Link to="/signin">
            <button className="title_t signupbtn newlogin">Login</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
