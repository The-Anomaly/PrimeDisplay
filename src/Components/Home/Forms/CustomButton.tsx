import * as React from 'react';
import './recruitmentform.css';
import { userContext } from '../../../createContext';


interface CustomBtnProps {
    Answer:string,
    questionNumber:any
}

const CustomButton: React.FunctionComponent<CustomBtnProps> = (props) => {
    // const {buttonIsActive,setIsactive} :any= React.useContext(userContext);
    const all:any= React.useContext(userContext);
    const whineColor = "#9c1258";
    const white = "#fff";   
    const updateBtnStatus =()=>{
    all.setIsactive({
        FirstbuttonIsClicked:!all.FirstbuttonIsClicked?true:false,
    })
    }   
    return (
      <>
      {
        <div className="boxgroup">
            <div className="boxwrapper" onClick={updateBtnStatus}
                style={{background:all.FirstbuttonIsClicked?whineColor:white,color:all.FirstbuttonIsClicked?white:whineColor}}
                >
                <span className="contentanswer">
                    <span className="alphaIndex" 
                        style={{background:all.FirstbuttonIsClicked?whineColor:white,color:all.FirstbuttonIsClicked?white:whineColor,borderColor:all.FirstbuttonIsClicked?white:whineColor}}>
                            {props.questionNumber}
                    </span>
                    <span className="answ">
                        {props.Answer}
                    </span>
                </span>
            </div>
        </div>
      }
      </>
  );
};

export default CustomButton;
