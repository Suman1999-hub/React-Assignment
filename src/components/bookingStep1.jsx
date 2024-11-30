import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Button,
} from "reactstrap";
import SvgIcons from "./SvgIcons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { addBooking, updateBooking } from "../redux/actions/booking";
import { useDispatch, useSelector } from "react-redux";
import { nameFormate } from "../helper-methods";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const phoneNumberRegex = /^\d{10}$/;

export const LanguageList = [
  { label: "English", value: "English" },
  { label: "Russian", value: "Russian" },
  { label: "German", value: "German" },
  { label: "French", value: "French" },
  { label: "Italian", value: "Italian" },
  { label: "Spanish", value: "Spanish" },
  { label: "Mandarin", value: "Mandarin" },
  { label: "Japanese", value: "Japanese" },
  { label: "Korean", value: "Korean" },
  { label: "Vietnamese", value: "Vietnamese" },
  { label: "Hindi", value: "Hindi" },
  { label: "Portuguese", value: "Portuguese" },
  { label: "Arabic", value: "Arabic" },
  { label: "Hebrew", value: "Hebrew" },
  { label: "Swahili", value: "Swahili" },
  { label: "Tagalog", value: "Tagalog" },
  { label: "Haitian Creole", value: "Haitian Creole" },
  { label: "Polish", value: "Polish" },
  { label: "Urdu", value: "Urdu" },
  { label: "Persian", value: "Persian" },
  { label: "Other", value: "Other" },
];

const BookingStep1 = ({ goNext }) => {
  const allStateData = useSelector((state) => {
    return state?.bookingDataReducer;
  });
  const reduxData = useSelector((state) => {
    return state?.bookingDataReducer?.step1;
  });
  const dispatch = useDispatch();

  const [bookingFor, setBookingFor] = useState(
    reduxData
      ? reduxData.isBookingMainSigner === true
        ? "mainSigner"
        : "bookingSomeone"
      : "bookingSomeone"
  );
  // const [formFields, setFormFields] = useState([
  //   reduxData
  //     ? reduxData.borrower
  //     : { name: "", email: "", phone: "", language: "" },
  // ]);

  const [formFields, setFormFields] = useState([
    reduxData
      ? reduxData.borrower
      : {
          name: "",
          email: "",
          phone: "",
          language: "",
        },
  ]);
  const [errors, setErrors] = useState({});

  const reduxFormStructure = (borrower) => {
    return borrower.map((field) => ({
      name: field.name.first + " " + field.name.last,
      email: field.email,
      phone: field.phone.home,
      language: field.language,
    }));
  };
  useEffect(() => {
    console.log(reduxData);
    if (reduxData) {
      setBookingFor(
        reduxData.isBookingMainSigner ? "mainSigner" : "bookingSomeone"
      );
      setFormFields(reduxFormStructure(reduxData.borrower));
    }
  }, [reduxData]);
  const handleAddInput = () => {
    setFormFields([
      ...formFields,
      { name: "", email: "", phone: "", language: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    const newArray = [...formFields];
    newArray.splice(index, 1);
    setFormFields(newArray);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[index];
      return newErrors;
    });
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;

    setFormFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, [name]: value } : field
      )
    );
  };

  const handleBlur = (event, index) => {
    const { name } = event.target;

    validateField(name, formFields[index][name], index);
  };

  const validateField = (name, value, index) => {
    let error = "";
    if (!value && name !== "language") {
      error = "*Required";
    } else if (name === "email" && !emailRegex.test(value)) {
      error = "Invalid Email";
    } else if (name === "phone" && !phoneNumberRegex.test(value)) {
      error = "Invalid Phone Number";
    }
    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [name]: error,
      },
    }));
    return error === "";
  };

  const validateForm = () => {
    let isValid = true;
    formFields.forEach((field, index) => {
      Object.keys(field).forEach((key) => {
        const formisValid = validateField(key, field[key], index);
        if (isValid !== false) {
          isValid = formisValid;
        }
      });
    });
    return isValid;
  };

  const handleRadioBtn = (val) => {
    console.log(val);
    setBookingFor(val);
  };

  const handleNext = () => {
    if (validateForm()) {
      const formatedFormFields = formFields.map((field) => {
        const splitedName = nameFormate(field.name);
        const first = splitedName[0] ? splitedName[0] : "";
        const last = splitedName[1] ? splitedName[1] : "";
        return {
          ...field,
          name: {
            first,
            last,
          },
          phone: {
            home: field.phone,
          },
        };
      });
      const step1 = {
        borrower: formatedFormFields,
        isBookingMainSigner: bookingFor === "mainSigner",
      };
      dispatch(updateBooking({ ...allStateData, step1 }));
      goNext();
    }
  };

  return (
    <>
      <Card className="stepCard">
        <CardHeader>Add Your Order Details</CardHeader>
        <CardBody>
          <div className="cardInerInfo">
            <h5>Who are you booking for?</h5>
            <FormGroup check inline>
              <Input
                id="mainSigner"
                type="radio"
                name="bookingFor"
                value="mainSigner"
                onChange={(e) => handleRadioBtn(e.target.value)}
                checked={bookingFor === "mainSigner"}
              />
              <Label for="mainSigner" check>
                I am the main signer
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                id="bookingSomeone"
                type="radio"
                name="bookingFor"
                value="bookingSomeone"
                onChange={(e) => handleRadioBtn(e.target.value)}
                checked={bookingFor === "bookingSomeone"}
              />
              <Label for="bookingSomeone" check>
                I am booking for someone else
              </Label>
            </FormGroup>
          </div>

          <div className="cardInerInfo">
            <h5>Basic Info</h5>
            {formFields.map((item, index) => (
              <div className="SignerInfo" key={index}>
                <div className="formGroup">
                  <Label>Signer Name</Label>
                  <Input
                    placeholder="Enter Signer Name"
                    name="name"
                    value={item.name}
                    onBlur={(e) => handleBlur(e, index)}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <span style={{ color: "red" }}>{errors[index]?.name}</span>
                </div>

                <div className="formGroup">
                  <Label>Email ID</Label>
                  <Input
                    placeholder="Enter Email"
                    name="email"
                    value={item.email}
                    onBlur={(e) => handleBlur(e, index)}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <span style={{ color: "red" }}>{errors[index]?.email}</span>
                </div>

                <div className="formGroup">
                  <Label>Phone Number</Label>
                  <InputGroup className="withCountryCode">
                    <InputGroupText>
                      <Input type="select" defaultValue="+1">
                        <option value="+1">+1</option>
                      </Input>
                    </InputGroupText>
                    <Input
                      placeholder="Enter Phone Number"
                      name="phone"
                      value={item.phone}
                      onBlur={(e) => handleBlur(e, index)}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </InputGroup>
                  <span style={{ color: "red" }}>{errors[index]?.phone}</span>
                </div>

                <div className="formGroup">
                  <Label>Language</Label>
                  <Input
                    type="select"
                    name="language"
                    value={item.language}
                    onBlur={(e) => handleBlur(e, index)}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">Select</option>
                    {LanguageList.map((lang, idx) => (
                      <option key={idx} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </Input>
                </div>

                {formFields.length > 1 && (
                  <div className="action">
                    <Button
                      color="link"
                      className="remove"
                      onClick={() => handleDeleteRow(index)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <Button color="link" size="sm" onClick={handleAddInput}>
              <FontAwesomeIcon icon={faPlus} /> Add New Person
            </Button>
          </div>
        </CardBody>
      </Card>
      <div className="tabAction">
        <div>
          <Button color="primary" className="ms-auto" onClick={handleNext}>
            Next
            <SvgIcons type={"logArrowRight"} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingStep1;
