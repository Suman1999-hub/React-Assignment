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
  ListGroupItem,
  Row,
} from "reactstrap";
import ReactDatetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  formatDate,
  formatTime,
  splitDateAndTime,
  step3DateFormate,
  timezoneList,
} from "../helper-methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SvgIcons from "./SvgIcons";
import { useEffect, useRef, useState } from "react";
import { GOOGLE_LOCATION_API_KEY } from "../config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../redux/actions";
import moment from "moment";

const BookingStep3 = ({ goNext, goPrevious }) => {
  const allStateData = useSelector((state) => {
    return state?.bookingDataReducer;
  });

  const reduxStep3Data = useSelector((state) => {
    return state?.bookingDataReducer?.step3;
  });
  const inputRef1 = useRef(null);
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [selectPlace, setSelectPlace] = useState("");
  const [selectPlaceObj, setSelectPlaceObj] = useState({});
  const today = new Date();
  const [formFields, setFormFields] = useState({
    selectedDate: today,
    selectedTime: "",
    timeZone: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(reduxStep3Data);
    if (reduxStep3Data) {
      const dateTime = splitDateAndTime(reduxStep3Data.appointmentDate);
      setFormFields({
        selectedDate: moment(dateTime, "MM/DD/YYYY"),
        selectedTime: moment(dateTime, "DD/MM/YYYY HH:mm"),
        timeZone: reduxStep3Data.timeZone,
      });
      if (
        reduxStep3Data?.closingAddress?.line1 &&
        reduxStep3Data?.closingAddress?.city &&
        reduxStep3Data?.closingAddress?.state &&
        reduxStep3Data?.closingAddress?.county
      ) {
        setSelectPlace(
          reduxStep3Data?.closingAddress?.line1 +
            ", " +
            reduxStep3Data?.closingAddress?.city +
            ", " +
            reduxStep3Data?.closingAddress?.state +
            ", " +
            reduxStep3Data?.closingAddress?.county
        );
      }
    }
  }, [reduxStep3Data]);

  const handleChange = (name, value) => {
    console.log(name, value);
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidDate = (currentDate) => {
    return currentDate.isAfter(today);
  };

  const googlePlaceSearch = (searchValue) => {
    debugger;
    setSelectPlace(searchValue);
    return new Promise((resolve, reject) => {
      if (searchValue) {
        const searchedPlaces = [];
        let config = {
          input: searchValue,
          componentRestrictions: {
            country: "US",
          },
        };
        const googleService =
          new window.google.maps.places.AutocompleteService();
        // console.log("googleService", googleService);
        googleService.getPlacePredictions(config, (predictions) => {
          // console.log("Predictions", predictions);
          if (predictions) {
            predictions.forEach((prediction) => {
              searchedPlaces.push(prediction);
            });
          }
          resolve(searchedPlaces);
          setSearchedPlaces(searchedPlaces);
        });
      } else {
        resolve([]);
      }
    });
  };

  const googlePlaceDetails = (placeId) => {
    return new Promise((resolve, reject) => {
      if (placeId) {
        const placesService = new window.google.maps.Geocoder();
        placesService.geocode({ placeId }, (result) => {
          if (result) {
            resolve(_formatAddress(result));
          } else {
            resolve([]);
          }
        });
      } else {
        resolve([]);
      }
    });
  };

  const _formatAddress = (result) => {
    // Create an object containing required fields
    const addressComponents = {};
    result[0].address_components.forEach((component) => {
      component.types.forEach((type) => {
        if (!(addressComponents[type] && addressComponents[type].length)) {
          addressComponents[type] = [];
        }
        addressComponents[type].push(component.long_name);
      });
    });
    // Required: Street address, City, State, ZIP/PIN, Country
    let sublocalities = "";
    if (addressComponents.sublocality && addressComponents.sublocality.length) {
      addressComponents.sublocality.forEach((sublocality) => {
        sublocalities += sublocality + " ";
      });
    }
    return {
      address:
        (addressComponents.street_number?.length
          ? addressComponents.street_number[0]
          : "") +
        (addressComponents.route?.length
          ? ` ${addressComponents.route[0]}`
          : "") +
        (addressComponents?.subpremise?.length
          ? ` ${addressComponents?.subpremise[0]}`
          : "") +
        `${sublocalities?.trim().length ? ` ${sublocalities.trim()}` : ""}`,
      county:
        addressComponents.administrative_area_level_2 &&
        addressComponents.administrative_area_level_2.length
          ? addressComponents.administrative_area_level_2[0]
          : "",
      city:
        addressComponents.locality && addressComponents.locality.length
          ? addressComponents.locality[0]
          : addressComponents.administrative_area_level_2 &&
            addressComponents.administrative_area_level_2.length
          ? addressComponents.administrative_area_level_2[0]
          : "",
      state:
        addressComponents.administrative_area_level_1 &&
        addressComponents.administrative_area_level_1.length
          ? addressComponents.administrative_area_level_1[0]
          : "",
      country:
        addressComponents.country && addressComponents.country.length
          ? addressComponents.country[0]
          : "",
      postal:
        addressComponents.postal_code && addressComponents.postal_code.length
          ? addressComponents.postal_code[0]
          : "",
      lat:
        result?.length && result[0]?.geometry?.location?.lat()
          ? result[0].geometry.location.lat()
          : undefined,
      lng:
        result?.length && result[0]?.geometry?.location?.lng()
          ? result[0].geometry.location.lng()
          : undefined,
    };
  };

  const handleplaceDetails = async (place) => {
    console.log(place);
    const placeDetails = await googlePlaceDetails(place.place_id);
    if (
      !placeDetails.address ||
      !placeDetails.city ||
      !placeDetails.state ||
      !placeDetails.country
    ) {
      toast.error("Invalid Address", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      return;
    }
    setSelectPlace(
      placeDetails.address +
        ", " +
        placeDetails.city +
        ", " +
        placeDetails.state +
        ", " +
        placeDetails.country
    );
    setSelectPlaceObj(placeDetails);
    // console.log(inputRef1);
    setSearchedPlaces([]);
    console.log(placeDetails);
  };

  const handleNext = () => {
    console.log(selectPlace);
    const step3 = {
      timeZone: formFields.timeZone,
      appointmentDate:
        step3DateFormate(formFields.selectedDate) +
        " " +
        formatTime(formFields.selectedTime),
      closingAddress: {
        line1: selectPlaceObj?.address,
        city: selectPlaceObj?.city,
        state: selectPlaceObj?.state,
        zip: selectPlaceObj?.postal,
        county: selectPlaceObj?.country,
      },
    };
    dispatch(updateBooking({ ...allStateData, step3 }));
    goNext();
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
                    ref={inputRef1}
                    value={selectPlace}
                    onChange={(e) => googlePlaceSearch(e.target.value)}
                  />
                </InputGroup>
                <ListGroup>
                  {searchedPlaces?.map((each, index) => {
                    return (
                      <ListGroupItem
                        key={each.place_id || index}
                        className="cursorPointer"
                        onClick={(e) => handleplaceDetails(each)}
                      >
                        {each.description}
                      </ListGroupItem>
                    );
                  })}
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
                    onChange={(value) => handleChange("selectedDate", value)}
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
                  value={formFields.timeZone}
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
          <Button color="primary" className="ms-auto" onClick={handleNext}>
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
