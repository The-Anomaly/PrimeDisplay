import * as React from 'react';
import './recruitmentform.css';
import { userContext } from '../../../createContext';


interface CustomBtnProps {
    Answer:string,
    questionNumber:any
}

const CustomButton_1: React.FunctionComponent<CustomBtnProps> = (props) => {
    // const {buttonIsActive,setIsactive} :any= React.useContext(userContext);
    const all:any= React.useContext(userContext);
    const whineColor = "#9c1258";
    const white = "#fff";   
    const updateBtnStatus =()=>{
    all.setIsactive({
        SecondbuttonIsClicked:!all.SecondbuttonIsClicked?true:false,
    })
}
    return (
      <>
      {
        <div className="boxgroup">
            <div className="boxwrapper" onClick={updateBtnStatus}
                style={{background:all.SecondbuttonIsClicked?whineColor:white,color:all.SecondbuttonIsClicked?white:whineColor}}
                >
                <span className="contentanswer">
                    <span className="alphaIndex" 
                        style={{background:all.SecondbuttonIsClicked?whineColor:white,color:all.SecondbuttonIsClicked?white:whineColor,borderColor:all.SecondbuttonIsClicked?white:whineColor}}>
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

export default CustomButton_1;
