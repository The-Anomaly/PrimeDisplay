import * as React from "react";
import "./chart.css";
import { useState, useEffect } from "react";

interface chartProps {
  value: number;
}
const HorizontalBar = (props: chartProps) => {
  const [remainingVal, updateVal] = useState(10);
  const calculateRemainder = (value: number): any => {};
  useEffect(() => {
    const remainingPercent = 100 - props.value;
    updateVal(remainingPercent);
  }, []);
  return (
    <>
      <div className="chartwar">
        <div
          className={
            remainingVal > 50 ? "changeinnerflex areawrapper1" : "areawrapper1"
          }
        >
          <div className="areawrappera" style={{ width: props.value + "%" }}>
            {props.value + "%"}
          </div>
          <div className={
            remainingVal===0?
            "areawrapperb"
            :"areawrapperb"
          }>{remainingVal}%</div>
        </div>
      </div>
    </>
  );
};
HorizontalBar.defaultProps = {
  value: 70,
};
export default HorizontalBar;
