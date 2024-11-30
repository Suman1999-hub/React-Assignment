import { current } from "@reduxjs/toolkit";
import React, { useRef, useState } from "react";
import { Button, TabContent, TabPane } from "reactstrap";
import BookingStep1 from "./bookingStep1";
import BookingStep2 from "./bookingStep2";
import BookingStep3 from "./bookingStep3";
import BookingStep4 from "./bookingStep4";
import SvgIcons from "./SvgIcons";

function MainComponents() {
  const [currentStep, setCurrentStep] = useState(1);
  const comp1Ref = useRef();
  const comp2Ref = useRef();
  const comp3Ref = useRef();
  const comp4Ref = useRef();
  return (
    <>
      {/* <div className="tabAction">
        {currentStep !== 1 && (
          <Button color="primary" outline>
            <SvgIcons type={"logArrowLeft"} />
            Previous
          </Button>
        )}
        {currentStep !== 4 && (
          <div>
            <Button color="primary" className="ms-auto">
              Next
              <SvgIcons type={"logArrowRight"} />
            </Button>
          </div>
        )}
        {currentStep === 4 && (
          <div>
            <Button color="primary" className="ms-auto">
              <i className="fa fa-spinner fa-spin mr-2" />
              Book
            </Button>
          </div>
        )}
      </div> */}
    </>
  );
}

export default MainComponents;
