import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import SvgIcons from "./SvgIcons";
import { useEffect, useState } from "react";
import {
  getDetailsWithEmail,
  sendOtpEmailForBooking,
  verificationForBooking,
} from "../http/http-calls";
import { emailDotFormat } from "../helper-methods";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { STRIPE_API_KEY } from "../config";

const BookingStep4 = ({ goPrevious, goNext }) => {
  const reduxStep2Data = useSelector((state) => {
    return state?.bookingDataReducer?.step2;
  });
  console.log(reduxStep2Data);
  const [email, setEmail] = useState("");
  const [emailDot, setEmailDot] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [tokenCode, setTokenCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [timer, setTimer] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [stripeClientSec, setStripeClientSec] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const intializeStrip = () => {
    if (!stripePromise) {
      const stripeRes = loadStripe(STRIPE_API_KEY);
      setStripePromise(stripeRes);
    }
  };
  useEffect(() => {
    intializeStrip();
  }, []);

  const handleUserDetailsApi = async () => {
    setIsLoading(true);
    const payload = {
      agentId: "63997eef2475d90ca5205bd2",
      email: email,
    };
    try {
      const response = await getDetailsWithEmail(payload);
      setUserDetails(response?.user);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setFormData({
      name: userDetails?.name?.full || "",
      phone: userDetails?.phone || "",
    });
  }, [userDetails]);

  useEffect(() => {
    let timerId;

    if (showTimer && timer > 0) {
      timerId = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowTimer(false);
    }

    return () => clearInterval(timerId);
  }, [showTimer, timer]);

  const handleverifyEmailApi = async () => {
    setIsLoading(true);
    const payload = {
      agentId: "63997eef2475d90ca5205bd2",
      email: email,
    };
    try {
      const response = await sendOtpEmailForBooking(payload);
      if (response) {
        setTimer(60);
        setShowTimer(true);
      }
      setEmailDot(emailDotFormat(email));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCodeApi = async () => {
    setIsLoading(true);
    const payload = {
      agentId: "63997eef2475d90ca5205bd2",
      email: email,
      token: tokenCode,
    };
    try {
      const response = await verificationForBooking(payload);
      setIsVerified(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBook = async () => {
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
  };
  return (
    <>
      <Card className="stepCard">
        <CardHeader>Person Placing The Order</CardHeader>
        <CardBody>
          <Row>
            {/* Email Section */}
            <Col lg={6} md={6}>
              <FormGroup>
                <Label>Email</Label>
                <InputGroup className="InputWithButton">
                  <Input
                    placeholder="Enter"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isVerified ? (
                    !userDetails ? (
                      <InputGroupText>
                        <Button
                          color="link"
                          className="p-0"
                          onClick={handleUserDetailsApi}
                          disabled={isLoading}
                        >
                          {isLoading ? <Spinner size="sm" /> : "Check Email"}
                        </Button>
                      </InputGroupText>
                    ) : (
                      <InputGroupText>
                        {showTimer ? (
                          <Button color="success">{timer}</Button>
                        ) : (
                          <Button
                            color="primary"
                            onClick={handleverifyEmailApi}
                            disabled={isLoading}
                          >
                            {isLoading ? <Spinner size="sm" /> : "Send OTP"}
                          </Button>
                        )}
                      </InputGroupText>
                    )
                  ) : (
                    <InputGroupText>
                      <Button color="success">Verified</Button>
                    </InputGroupText>
                  )}
                </InputGroup>
                <span className="mt-1 fs-11 d-block text-muted">
                  Enter your email to get 4 digit verification code!
                </span>
              </FormGroup>
            </Col>

            {/* OTP Section */}
            <Col lg={6} md={6}>
              <FormGroup>
                <Label>Enter the code sent to your email</Label>
                <InputGroup className="InputWithButton">
                  <Input
                    placeholder="Enter"
                    name="token"
                    onChange={(e) => setTokenCode(e.target.value)}
                  />
                  <InputGroupText>
                    <Button
                      color="link"
                      onClick={handleVerifyCodeApi}
                      disabled={isLoading || isVerified}
                      style={{ display: isVerified ? "none" : "inline" }}
                    >
                      {isLoading ? <Spinner size="sm" /> : "Verify"}
                    </Button>
                  </InputGroupText>
                </InputGroup>
                {emailDot && (
                  <span className="mt-1 fs-11 d-block text-muted">
                    We have sent you a 4-digit code at {emailDot}
                  </span>
                )}
              </FormGroup>
            </Col>

            {/* Name Section */}
            <Col lg={6} md={6}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  placeholder="Enter"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </FormGroup>
            </Col>

            {/* Phone Number Section */}
            <Col lg={6} md={6}>
              <FormGroup>
                <Label>Phone Number</Label>
                <InputGroup className="withCountryCode">
                  <InputGroupText>
                    <Input type="select">
                      <option>+1</option>
                    </Input>
                  </InputGroupText>
                  <Input
                    placeholder="Enter"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Payment Section */}
      <Card className="stepCard">
        <CardHeader>Payment Process</CardHeader>
        <CardBody>
          <Row>
            <Col xl="auto">
              <ul className="agentAmount">
                <li>
                  <span>Agent Fee:</span>
                  <span>
                    <FontAwesomeIcon icon={faDollarSign} />
                    {reduxStep2Data.agentFee}
                  </span>
                </li>
                <li>
                  <span>Processing Fee:</span>
                  <span>
                    <FontAwesomeIcon icon={faDollarSign} />
                    $1.76
                  </span>
                </li>
                <li>
                  <span>Total:</span>
                  <span>
                    <FontAwesomeIcon icon={faDollarSign} />
                    $52.09
                  </span>
                </li>
              </ul>
            </Col>
            <Col>
              <FormGroup>
                <Label>Card Details</Label>
                <div className="stripeWrapper">
                  <CardElement onChange={() => {}} />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <div className="tabAction">
        <Button color="primary" outline onClick={goPrevious}>
          <SvgIcons type={"logArrowLeft"} />
          Previous
        </Button>
        <Button color="primary" className="ms-auto">
          <i className="fa fa-spinner fa-spin mr-2" />
          Book
          <SvgIcons type={"logArrowRight"} />
        </Button>
      </div>
    </>
  );
};

export default BookingStep4;
