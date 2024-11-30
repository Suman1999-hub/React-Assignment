import "bootstrap/dist/css/bootstrap.min.css";
import "./global.scss";
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import SvgIcons from "./components/SvgIcons";
import BookingStep1 from "./components/bookingStep1";
import BookingStep2 from "./components/bookingStep2";
import BookingStep3 from "./components/bookingStep3";
import BookingStep4 from "./components/bookingStep4";
import { GOOGLE_LOCATION_API_KEY, STRIPE_API_KEY } from "./config";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Providers } from "./redux/provider";
import { useEffect, useRef, useState } from "react";
import MainComponents from "./components/MainComponents";

const stripePromise = loadStripe(STRIPE_API_KEY);
function App() {
  const [currentStep, setCurrentStep] = useState(1);
  console.log(currentStep);
  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    let tab = params.get("tab");
    if (tab) {
      setCurrentStep(Number(tab));
    }
  }, []);
  const goNext = () => {
    console.log(currentStep);
    setCurrentStep((currentStep) => currentStep + 1);
    if (window.history.pushState) {
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?tab=" +
        (currentStep + 1);
      window.history.pushState({ path: newurl }, "", newurl);
    }
    // window.location.href = window.location.href + "?tab=" + (currentStep + 1);
  };
  const goPrevious = () => {
    console.log("suman", currentStep);
    setCurrentStep((currentStep) => currentStep - 1);
    if (window.history.pushState) {
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?tab=" +
        (currentStep - 1);
      window.history.pushState({ path: newurl }, "", newurl);
    }
    // window.location.href = window.location.href + "?tab=" + (currentStep - 1);
  };
  return (
    <>
      {/* <script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_LOCATION_API_KEY}&libraries=places`}
      /> */}
      <Providers>
        <Elements stripe={stripePromise}>
          <div className="bookingForm">
            <div className="personalWebsiteSetps">
              <div className="verticalTabs">
                <Nav pills>
                  <NavItem>
                    <NavLink
                      className={currentStep === 1 ? "current" : "active"}
                    >
                      <div
                        className={`stepCount ${
                          currentStep > 1 ? "success" : ""
                        }`}
                      >
                        {currentStep > 1 ? <SvgIcons type={"check"} /> : 1}
                      </div>
                      <span className="stepTitle">Order Details</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={currentStep === 2 ? "current" : "active"}
                    >
                      <div
                        className={`stepCount ${
                          currentStep > 2 ? "success" : ""
                        }`}
                      >
                        {currentStep > 2 ? <SvgIcons type={"check"} /> : 2}
                      </div>
                      <span className="stepTitle">
                        Signing &amp; Product Type
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={currentStep === 3 ? "current" : "active"}
                    >
                      <div
                        className={`stepCount ${
                          currentStep > 3 ? "success" : ""
                        }`}
                      >
                        {currentStep > 3 ? <SvgIcons type={"check"} /> : 3}
                      </div>
                      <span className="stepTitle">Appointment Detailss</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={currentStep === 4 ? "current" : "active"}
                    >
                      <div
                        className={`stepCount ${
                          currentStep > 4 ? "success" : ""
                        }`}
                      >
                        {currentStep > 4 ? <SvgIcons type={"check"} /> : 4}
                      </div>
                      <span className="stepTitle">
                        Person Placing &amp; Payment Details
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <div className="tabContentWrapper">
                  <div>
                    <TabContent activeTab={currentStep + ""}>
                      <TabPane tabId="1">
                        <BookingStep1 goNext={goNext} />
                      </TabPane>

                      <TabPane tabId="2">
                        <BookingStep2 goNext={goNext} goPrevious={goPrevious} />
                      </TabPane>

                      <TabPane tabId="3">
                        <BookingStep3 goNext={goNext} goPrevious={goPrevious} />
                      </TabPane>

                      <TabPane tabId="4">
                        <BookingStep4 goPrevious={goPrevious} />
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Elements>
      </Providers>
    </>
  );
}

export default App;
