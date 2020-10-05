import * as React from 'react';
import Col from 'react-bootstrap/Col';
import './dashboard.css';
import { Link } from 'react-router-dom';
import leftImg from '../../../../assets/leftarrow.png';
import { useState } from 'react';
import '../../../Home/Home/animate.css';
import axios from 'axios';
import { API } from '../../../../config';
import { dashboardContext } from '../../../../createContext';


type SideLinkProps = {
    personality?:Boolean |false,
    career_fitness?:Boolean | false,
    result?:string
}

export default function Sidebar (props:SideLinkProps) {
const [ state,updateState ] = useState<any>({sideBarIsOpen:false,result:''})
const { sideBarIsOpen } = state;
const getDashContext:any = React.useContext(dashboardContext)

  return (   
    <>
      <div className={!sideBarIsOpen?"flexconts":"hidesidebar"}>
        <div className="titlearea">
            <span className={!sideBarIsOpen?"dashtitle":"hidesidebarlinks"}>
                Dashboard- 
                <span className="res1">
                Results
                </span> 
            </span>
            <span className="arrowcover">
            <img src={leftImg} onClick={()=>updateState({...state,sideBarIsOpen:!sideBarIsOpen?true:false})} className={!sideBarIsOpen?"arrow arrowflip":"arrow"} alt="leftimg" />
            </span>
        </div>
        <div className="titleareafirst">    
        </div>
        <div className={!sideBarIsOpen?"titlearea1":"hidesidebarlinks animated fadeInLeft"}>
            <Link to="/dashboard/careerfitness"  className={props.career_fitness?"linkss active":"linkss animated fadeInLeft"}>
                CAREER FITNESS
            </Link>  
        </div>
        <div className={!sideBarIsOpen?"titlearea1":"hidesidebarlinks animated fadeInLeft"}>
            <Link to="/dashboard/personality" className={props.personality?"linkss active":"linkss animated fadeInLeft"}>
                YOUR PERSONALITY TYPE
            </Link>
        </div>
        <div className="titlearea1">
            <span  className={!sideBarIsOpen?"linkss":"hidesidebarlinks"}>
                STRENGTHS & WEAKNESS
            </span>
        </div>
        <div className="titlearea1">
            <span  className={!sideBarIsOpen?"linkss":"hidesidebarlinks"}>
                YOUR WORK LIFE MISSION
            </span>
        </div>
        <div className="titlearea1">
            <span className={!sideBarIsOpen?"linkss":"hidesidebarlinks"}>
                RULES FOR YOUR SUCCESS
            </span>
        </div>
        <div className="titlearea1 ">
            <span className={!sideBarIsOpen?"linkss":"hidesidebarlinks"}>
                LEADERSHIP COMPETENCIES
            </span>
        </div>
        <div className="titlearea1">
            <span className={!sideBarIsOpen?"linkss":"hidesidebarlinks"}>
                CAREER/BUSINESS EXPRESSIONS
            </span>
        </div>
        <div className="titlearealast">    
        </div>
        </div>
    </>
  );
}
