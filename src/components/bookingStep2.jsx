import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import SvgIcons from "./SvgIcons";
import { getStandardFees } from "../http/http-calls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooking, updateBooking } from "../redux/actions/booking";

const BookingStep2 = ({ goPrevious, goNext }) => {
  const [apiData, setApiData] = useState(null);
  const [activeTab, setActiveTab] = useState("0");
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [signingType, setSigningType] = useState("Mobile");
  const [witnessNumber, setWitnessNumber] = useState(0);
  const [stateData, setStateData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const allStateData = useSelector((state) => {
    return state?.bookingDataReducer;
  });
  const dispatch = useDispatch();
  console.log("apiData", apiData);
  useEffect(() => {
    if (allStateData?.step2 && apiData) {
      setSigningType(allStateData?.step2?.signingType);
      setWitnessNumber(allStateData?.step2?.witnessCount);
      let stateArray = [];
      apiData?.forEach((curr) => {
        const currentProductType = curr.productType;
        const currentProductCatagory = curr.productCategory;
        const currentProductValue = curr.productValue;
        const isAvailableProduct = allStateData.step2.loanType.find(
          (value) => value === currentProductType
        );
        if (isAvailableProduct) {
          stateArray.push({
            productType: currentProductType,
            productValue: currentProductValue,
            category: currentProductCatagory,
          });
        }
      });
      console.log({ stateArray });
      setStateData(stateArray);
    }
  }, [allStateData?.step2, apiData]);
  const fetchApiCall = async () => {
    setIsLoading(true);
    try {
      const getStandardFeesApiRes = await getStandardFees(
        "63997eef2475d90ca5205bd2"
      );
      const rawData = getStandardFeesApiRes?.agent?.standardFees || [];
      const uniqueData = processApiData(rawData);
      console.log(getStandardFeesApiRes);
      setApiData(rawData);
      setUniqueCategories(uniqueData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const processApiData = (data) => {
    return data.reduce((acc, cur) => {
      if (cur.productValue > 0) {
        const existingItem = acc.find(
          (item) => item.productCategory === cur.productCategory
        );

        const currentProductType = Array.isArray(cur.productType)
          ? cur.productType
          : [cur.productType];

        const currentProductValue = Array.isArray(cur.productValue)
          ? cur.productValue
          : [cur.productValue];

        if (existingItem) {
          existingItem.productType = [
            ...existingItem.productType,
            ...currentProductType,
          ];
          existingItem.productValue = [
            ...existingItem.productValue,
            ...currentProductValue,
          ];
        } else {
          acc.push({
            productCategory: cur.productCategory,
            productType: currentProductType,
            productValue: currentProductValue,
          });
        }
        console.log(acc);
      }

      return acc;
    }, []);
  };

  useEffect(() => {
    fetchApiCall();
  }, []);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const handleRadioBtn = (val) => {
    setSigningType(val);
    console.log(val);
  };

  const handleWithnessNumber = (value) => {
    if (value !== "") {
      setWitnessNumber(Number(value));
    } else {
      setWitnessNumber(0);
    }
  };

  const handleSaveData = (event, prodType, prodVal, category) => {
    if (event.target.checked) {
      // Add new product type to state
      setStateData((prev = []) => [
        ...prev,
        { productType: prodType, productValue: prodVal, category: category },
      ]);
    } else {
      // Remove product type from state if unchecked
      setStateData((prev) =>
        prev.filter(
          (item) =>
            !(
              item.productType === prodType &&
              item.productValue === prodVal &&
              item.category === category
            )
        )
      );
    }
  };

  console.log(stateData);
  const handleButtonNext = () => {
    debugger;
    console.log(stateData.length);
    if (!productTypeValidation()) {
      setError("*Required");
      console.log(error);
      return;
    }
    setError(null);
    const step2 = {
      signingType: signingType,
      loanType: [],
      loanCategories: [],
      witnessCount: witnessNumber,
      agentFee: 0,
    };
    let totalProductValue = 0;
    const productCategorySet = new Set();

    stateData?.forEach((curr) => {
      console.log(curr);
      productCategorySet.add(curr.category);
      step2.loanType.push(curr.productType);
      totalProductValue += curr.productValue;
    });
    console.log({ totalProductValue, witnessNumber });
    step2.agentFee = Number(
      (totalProductValue + 67 * witnessNumber).toFixed(2)
    );
    step2.loanCategories = [...productCategorySet];
    const step3 = allStateData.step3 ? { ...allStateData.step3 } : null;
    if (
      signingType === "Mobile" &&
      allStateData?.step3 &&
      allStateData?.step3?.timeZone
    ) {
      step3.timeZone = "";
    }
    dispatch(updateBooking({ ...allStateData, step2, step3 }));
    goNext();
  };

  const productTypeValidation = () => {
    if (stateData.length === 0) {
      return false;
    }
    return true;
  };
  const handelCheck = (type) => {
    console.log(type);
    const isChecked = stateData.find((currType) => {
      if (type === currType.productType) {
        return true;
      }
      return false;
    });
    return isChecked;
  };
  return (
    <>
      <Card className="stepCard">
        <CardHeader>Select Signing &amp; Product Type</CardHeader>
        <CardBody>
          <div className="cardInerInfo">
            <h5>Signing Type</h5>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="radio"
                  name="radioOption"
                  value="Mobile"
                  onChange={(e) => handleRadioBtn(e.target.value)}
                  checked={signingType === "Mobile"}
                />{" "}
                <span> Mobile</span> (We come to you!)
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="radio"
                  name="radioOption"
                  value="RON"
                  onChange={(e) => handleRadioBtn(e.target.value)}
                  checked={signingType === "RON"}
                />{" "}
                <span>Remote Online</span> (Virtual signing * available in
                certain states) <i className="fa fa-info"></i>
              </Label>
            </FormGroup>
          </div>

          <div className="cardInerInfo">
            <h5>Product Type</h5>

            <div className="tabs">
              <Nav pills>
                {uniqueCategories.length > 0 ? (
                  uniqueCategories.map((navItem, index) => (
                    <NavItem key={index}>
                      <NavLink
                        className={activeTab === `${index}` ? "active" : ""}
                        onClick={() => toggleTab(`${index}`)}
                      >
                        {navItem.productCategory} ({navItem.productType.length})
                      </NavLink>
                    </NavItem>
                  ))
                ) : (
                  <p>Loading product categories...</p>
                )}
              </Nav>

              <TabContent activeTab={activeTab}>
                {uniqueCategories.map((category, index) => (
                  <TabPane tabId={`${index}`} key={index}>
                    <div className="productList">
                      <ul>
                        {category.productType.map((type, idx) => (
                          <li key={idx}>
                            <div className="formLabel">
                              <Input
                                type="checkbox"
                                name="signing"
                                checked={handelCheck(type)}
                                onChange={(e) =>
                                  handleSaveData(
                                    e,
                                    type,
                                    category.productValue[idx],
                                    category.productCategory
                                  )
                                }
                              />
                              {type} (${category.productValue[idx] || ""})
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabPane>
                ))}
              </TabContent>
            </div>
          </div>
          {error && <span style={{ color: "red" }}>{error}</span>}

          <div className="formGroup mt-4">
            <Label>Witness Number ($67 per Witness)</Label>
            <Input
              placeholder="Enter"
              name="witnessNumber"
              value={witnessNumber}
              onChange={(e) => handleWithnessNumber(e.target.value)}
            />
          </div>
        </CardBody>
      </Card>
      <div className="tabAction">
        <Button color="primary" outline onClick={goPrevious}>
          <SvgIcons type={"logArrowLeft"} />
          Previous
        </Button>
        <div>
          <Button
            color="primary"
            className="ms-auto"
            onClick={handleButtonNext}
          >
            Next
            <SvgIcons type={"logArrowRight"} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingStep2;
