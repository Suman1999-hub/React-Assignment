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
  ListGroup,
  Row,
} from "reactstrap";
import ReactDatetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { formatDate, formatTime, timezoneList } from "../helper-methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SvgIcons from "./SvgIcons";
import { useState } from "react";

const BookingStep3 = ({ goNext, goPrevious }) => {
  const today = new Date();
  const [formFields, setFormFields] = useState({
    selectedDate: today,
    selectedTime: "",
    timeZone: "",
  });

  const handleChange = (name, value) => {
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidDate = (currentDate) => {
    return currentDate.isAfter(today);
  };

  return (
    <>
      <Card className="stepCard">
        <CardHeader>Add Your Appointment Details</CardHeader>
        <CardBody>
          <Row>
            <Col md={6}>
              <FormGroup className="searchList">
                <Label>Appointment location</Label>
                <InputGroup>
                  <InputGroupText>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </InputGroupText>
                  <Input
                    placeholder="Search"
                    className="w-full"
                    // onChange={(e) => getAutoCompleteData(e.target.value)}
                  />
                </InputGroup>
                <ListGroup>
                  {/* {searchResult?.map((each, index) => {
              return (
                <ListGroupItem
                  key={each.place_id}
                  className="cursorPointer"
                  onClick={() => getPlaceDetail(each)}
                >
                  {each.description}
                </ListGroupItem>
              );
            })} */}
                </ListGroup>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup className="searchList">
                <Label>Select date</Label>
                <InputGroup>
                  <ReactDatetime
                    inputProps={{
                      className: "form-control",
                      placeholder: "Select Date",
                      value: formatDate(formFields.selectedDate),
                      readOnly: true,
                    }}
                    initialValue={new Date()}
                    value={formFields.selectedDate}
                    onChange={(value) => handleChange("selectedDate", value)} // Corrected
                    isValidDate={isValidDate}
                    dateFormat={true}
                    closeOnSelect={true}
                    timeFormat={false}
                  />
                  <InputGroupText>
                    <SvgIcons type={"calendar"} />
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Time Zone</Label>
                <Input
                  type="select"
                  name="timeZone"
                  onChange={(e) => handleChange(e.target.name, e.target.value)} // Using name attribute
                >
                  <option value="">Select</option>
                  {timezoneList().map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Time </Label>
                <ReactDatetime
                  inputProps={{
                    className: "form-control",
                    placeholder: "Select Start Time",
                    value: formFields.selectedTime
                      ? formatTime(formFields.selectedTime)
                      : "",
                    readOnly: true,
                  }}
                  value={formFields.selectedTime}
                  onChange={(value) => handleChange("selectedTime", value)} // Corrected
                  onClose={() => {}}
                  dateFormat={false}
                  timeFormat={true}
                  timeConstraints={{
                    minutes: { min: 0, max: 59, step: 15 },
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div className="tabAction">
        <Button color="primary" outline onClick={goPrevious}>
          <SvgIcons type={"logArrowLeft"} />
          Previous
        </Button>
        <div>
          <Button color="primary" className="ms-auto" onClick={goNext}>
            <i className="fa fa-spinner fa-spin mr-2" />
            Next
            <SvgIcons type={"logArrowRight"} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingStep3;
