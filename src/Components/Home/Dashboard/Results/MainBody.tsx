import * as React from 'react';
import Col from 'react-bootstrap/Col';
import './dashboard.css';
import { Link } from 'react-router-dom';
import leftImg from '../../../../assets/leftarrow.png';
import { useState } from 'react';
import '../../../Home/Home/animate.css';
import axios from 'axios';
import { API } from '../../../../config';
import './dashboard.css';
import seekleft from '../../../../assets/seekleft.png';
import seekright from '../../../../assets/seekright.png';
import { dashboardContext } from '../../../../createContext';



export const MainBody =(props:any)=> {
const getDashContext:any = React.useContext(dashboardContext)
  return (
    <>
      <div className="emptysecwrapper">
        <div className="emptysection">
        </div>
        <div className="dashcontent">
            <span>
               {props.title}
            </span>
            <div>
            <span className="arrowcover">
                {/* <img src={leftImg} alt="leftimg" /> */}
            </span>
            </div>
        </div>
        <div className="dashcontent1">
            {props.result}
        </div>
        <div className="shititms">
            <div className="ssflex">
            <img src={seekleft} className="seekleft" alt="left"/>
            <div className="textlink">
            Clarity Score
            </div>
            </div>
            <div className="ssflex">
            <div className="textlink1">
                <Link to="/paymentplan">VIEW FULL RESULTS</Link>
            </div>
            <img src={seekright} className="seekleft" alt="right"/>
            </div>
        </div>
        </div>
    </>
  );
}
