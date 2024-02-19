import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { GET_SELLER_ORDER_COMPLETE_DATA } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { capitalizeFirstLetter } from "../../utils/utility";
import { date_DD_MMM_YYYY_HH_MM_SS } from "../../utils/dateFormater";
import { Spinner } from "../../components/Spinner/index";
import CustomInputBox from "../../components/Input";
import {
  GET_PINCODE_DATA,
  UPDATE_TEMP_ORDER_INFO,
  GET_SERVICE_LIST_ORDER,
  SET_SERVICE_INFO,
} from "../../utils/ApiUrls";
import { pickupAddress } from "../../utils/dummyData";
import { convertXMLToXLSX } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { convertEpochToDateTimeV2 } from "../../utils/utility";
import DatePicker from "react-datepicker";
import InputBox from "../../components/Input";
import CustomDropDown from "../../components/DropDown";
import ItemIcon from "../../assets/Product/Item.svg";
import BoxIcon from "../../assets/layer.svg";
import DownwardArrow from "../../assets/downwardArrow.svg";
import { gstRegex } from "../../utils/regexCheck";
import UpwardArrow from "../../assets/AccordionUp.svg";

interface ICustomTableAccordion {
  data?: any;
}

const Accordion = (props: ICustomTableAccordion) => {
  const isFirstRender = useRef(true);
  const { data } = props;
  let servicePartnerServiceId: any;
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<any>(null);
  const [orderDetails, setOrderDetails]: any = useState([]);

  const [isLoading, setIsLoading]: any = useState(false);
  const [pincode, setPincode] = useState<any>();
  const [pincodeData, setPincodeData] = useState<any>({});
  const [boxProductDetails, setBoxProductDetails] = useState<any>();

  const [serviceLoading, setServiceLoading] = useState<any>(false);

  const [productAccordian, setproductAccordian] = useState<any>([]);

  const [otherDetailsAccordian, setOtherDetailsAccordian] = useState(false);

  const [validationError, setValidationError] = useState<any>({
    contactName: "",
    contactType: "",
    flatNo: "",
    locality: "",
    landMark: "",
    city: "",
    state: "",
    country: "",
    addressType: "",
    date: "",
    pincode: "",
    mobileNo: "",
    emailId: "",
    deliveryMobileNo: "",
    deliveryPincode: "",
    pickUpEmailId: "",
    gstValue: "",
    deliveryContactName: "",
    deliveryType: "",
    deliveryFlatNo: "",
    deliveryLocality: "",
    deliveryLandmark: "",
    deliveryCity: "",
    deliveryState: "",
    deliveryCountry: "",
    deliveryAddressType: "",
    orderId: "",
    deadWeight: "",
    volumetricWeight: "",
    length: "",
    breadth: "",
    height: "",
    boxDeadWeight: "",
    boxVolumtericWeight: "",
    boxLength: "",
    boxBreadth: "",
    boxHeight: "",
  });

  const [orderId, setOrderId] = useState<any>();
  const [inputError, setInputError] = useState(false);

  const [productDetails, setProductDetails] = useState<any>([
    {
      companyId: "",
      sellerId: 0,
      boxId: "",
      name: "",
      weightUnit: "",
      volumetricWeight: 0,
      deadWeight: 0,
      appliedWeight: 0,
      divisor: 0,
      measureUnit: "",
      length: 0,
      breadth: 0,
      height: 10,
      color: "",
      price: 0,
      currency: "",
      isFragile: "",
      eWayBillNo: 0,
      tracking: {
        awb: "",
        label: "",
        taxInvoice: "",
        manifest: "",
        status: [],
      },
      codInfo: {
        isCod: "",
        collectableAmount: 0,
        invoiceValue: 0,
      },
      podInfo: {
        isPod: "",
      },
      insurance: {
        isInsured: "",
        amount: 0,
      },
      service: {
        partnerServiceId: "",
        partnerServiceName: "",
        companyServiceId: "",
        companyServiceName: "",
        partnerName: "",
        serviceMode: "",
        appliedWeight: 0,
        invoiceValue: 0,
        collectableAmount: 0,
        insurance: 0,
        base: 0,
        add: 0,
        variables: 0,
        cod: 0,
        tax: 0,
        total: 0,
      },
      images: [],
      Products: [
        {
          companyId: "",
          privateCompanyId: 0,
          sellerId: 0,
          productId: "",
          name: "",
          category: "",
          qty: 0,
          sku: "",
          hsnCode: "",
          currency: "",
          unitPrice: 0,
          unitTax: 0,
          measureUnit: "",
          length: 0,
          breadth: 0,
          height: 0,
          deadWeight: 0,
          weightUnit: "",
          volumetricWeight: 0,
          appliedWeight: 0,
          divisor: 0,
          images: [],
          selected: "",
        },
      ],

      payloads: [],
    },
  ]);
  const [boxDetails, setBoxDetails] = useState<any>();

  const [boxAccordian, setBoxAccordian] = useState<any>(false);

  const [pickupDate, setPickupDate] = useState("");
  //storing these details to call the post api for updation
  const [updatePayload, setUpdatePayload] = useState({
    orderId: "",
    tempOrderId: "",
    source: "",
  });

  //storing the data of pickupaddress, which is getting from GET_SELLER_ORDER_COMPLETE_DATA api
  const [getPickAddressData, setGetPickUpAddressData] = useState<any>({
    pickUpAddress: {
      contact: {
        contactName: "",
        mobileNo: "",
        emailId: "",
        contactType: "",
      },

      flatNo: "",
      locality: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      addressType: "",
      pickupDate: "",
    },
  });

  const [serviceList, setServiceList] = useState<any>([]);

  const mainDate: any = convertEpochToDateTimeV2(
    getPickAddressData?.pickUpAddress?.pickupDate
  );

  let selectedDate = getPickAddressData?.pickUpAddress?.pickupDate;

  const epochTimestamp = new Date(selectedDate).getTime() / 1000;

  const [getDeliveryAddressData, setGetDeliveryAddressData] = useState<any>({
    deliveryAddress: {
      contact: {
        contactName: "",
        mobileNo: "",
        emailId: "",
        contactType: "",
      },

      flatNo: "",
      locality: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      addressType: "",
      gstNumber: "",
    },
  });

  const [serviceIndex, setServiceIndex]: any = useState(0);

  const [addressOpenModal, setAddressOpenModal] = useState(false);

  const [open, setOpen] = useState<any>({});

  const measureUnits = [
    {
      label: "Cm",
      value: "Cm",
    },
  ];

  const entries: any = document?.getElementsByClassName("entries");

  const handleService = (index: any) => {
    setServiceIndex(index);
  };

  const hanldeProducts = async (eachProduct: any, index: any) => {
    let temp = boxProductDetails?.boxInfo?.[0]?.products;
    for (let i = 0; i < temp?.length; i++) {
      if (index === i) {
      }
    }
  };

  //for updating product details api
  const handleSingleProductUpdation = async () => {
    try {
      const payload = boxProductDetails;

      const { data } = await POST(UPDATE_TEMP_ORDER_INFO, payload);
      if (data?.status) {
        // toast.success("Updated Successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  //for product updation
  const handleInputUpdation = (
    product_index: any,
    value: any,
    fieldName: any
  ) => {
    let temp = boxProductDetails?.boxInfo?.[0]?.products;
    for (let i = 0; i < temp?.length; i++) {
      if (product_index === i) {
        temp[i][fieldName] = value == "" ? "" : Number(value);
      }
    }
    boxProductDetails.boxInfo[0].products = temp;
  };

  const handleBoxAccordian = async () => {
    if (boxAccordian === true) {
      try {
        const payload = boxProductDetails;

        const { data } = await POST(UPDATE_TEMP_ORDER_INFO, payload);
        if (data?.status) {
          // toast.success("Updated Successfully");
        } else {
          toast.error(data.message);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const handleBoxInputUpdation = (
    box_index: any,
    value: any,
    fieldName: any
  ) => {
    let boxTemp = boxProductDetails?.boxInfo;
    for (let i = 0; i < boxTemp?.length; i++) {
      if (box_index === i) {
        boxTemp[i][fieldName] = value == "" ? "" : Number(value);
      }
      boxProductDetails.boxInfo = boxTemp;
    }
  };

  //checking for validations of email
  const validateEmailId = (emailId: string) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) {
      setValidationError({
        ...validationError,
        emailId: "",
        pickUpEmailId: "",
      });
    } else if (emailId === "") {
      setValidationError({
        ...validationError,
        emailId: "",
        pickUpEmailId: "",
      });
    } else {
      setValidationError({
        ...validationError,
        emailId: "Invalid Email",
        pickUpEmailId: "Invalid Email",
      });
    }
  };

  const entriesHeight = entries?.[0]?.offsetHeight;

  const getServiceList = async () => {
    if (boxProductDetails?.tempOrderId && boxProductDetails?.source) {
      try {
        const payload = {
          tempOrderId: boxProductDetails?.tempOrderId,
          source: boxProductDetails?.source,
        };

        setServiceLoading(true);
        const response = await POST(GET_SERVICE_LIST_ORDER, payload);
        if (response?.status) {
          setServiceLoading(false);
          setServiceList(response?.data?.data);
        } else {
          setServiceLoading(false);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };
  const [apiCall, setApiCall] = useState<any>(false);

  const handleItemClick = async (
    index: any,
    requestName?: string
    // title?: any
  ) => {
    if (addressOpenModal === false) {
      if (requestName === "Services") {
        getServiceList();
      }
    }

    setOpenIndex(openIndex === index ? null : index);

    if (!apiCall) {
      setApiCall(true);
      return;
    }

    setAddressOpenModal(!addressOpenModal);

    if (requestName == "Pickup Address") {
      try {
        const payload = {
          pickupAddress: {
            contact: {
              name: getPickAddressData?.pickUpAddress?.contact?.contactName,
              mobileNo: getPickAddressData?.pickUpAddress?.contact?.mobileNo,
              emailId: getPickAddressData?.pickUpAddress?.contact?.emailId,
              type: getPickAddressData?.pickUpAddress?.contact?.contactType,
            },

            flatNo: getPickAddressData?.pickUpAddress?.flatNo,
            locality: getPickAddressData?.pickUpAddress?.locality,
            landmark: getPickAddressData?.pickUpAddress?.landmark,
            city: getPickAddressData?.pickUpAddress?.city,
            state: getPickAddressData?.pickUpAddress?.state,
            country: getPickAddressData?.pickUpAddress?.country,
            pincode: getPickAddressData?.pickUpAddress?.pincode,
            fullAddress:
              getPickAddressData?.pickUpAddress?.flatNo +
              " " +
              getPickAddressData?.pickUpAddress?.locality +
              " " +
              getPickAddressData?.pickUpAddress?.city +
              " " +
              getPickAddressData?.pickUpAddress?.state +
              " " +
              getPickAddressData?.pickUpAddress?.country +
              " " +
              getPickAddressData?.pickUpAddress?.pincode,
            addressType: getPickAddressData?.pickUpAddress?.addressType,
            pickupDate: epochTimestamp,
          },
          orderId: updatePayload.orderId,
          tempOrderId: updatePayload.tempOrderId,
          source: updatePayload.source,
        };

        const { data } = await POST(UPDATE_TEMP_ORDER_INFO, payload);
        if (data?.status) {
          // toast.success("Updated Successfully");
          let temp: any;
          temp.pickUpAddress.pickupDate = "";
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (requestName == "Delivery Address") {
      try {
        const payload = {
          deliveryAddress: {
            contact: {
              name: getDeliveryAddressData?.deliveryAddress?.contact
                ?.contactName,
              mobileNo:
                getDeliveryAddressData?.deliveryAddress?.contact?.mobileNo,
              emailId:
                getDeliveryAddressData?.deliveryAddress?.contact?.emailId,
              type: getDeliveryAddressData?.deliveryAddress?.contact
                ?.contactType,
            },

            flatNo: getDeliveryAddressData?.deliveryAddress?.flatNo,
            locality: getDeliveryAddressData?.deliveryAddress?.locality,
            landmark: getDeliveryAddressData?.deliveryAddress?.landmark,
            city: getDeliveryAddressData?.deliveryAddress?.city,
            state: getDeliveryAddressData?.deliveryAddress?.state,
            country: getDeliveryAddressData?.deliveryAddress?.country,
            pincode: getDeliveryAddressData?.deliveryAddress?.pincode,
            fullAddress:
              getDeliveryAddressData?.deliveryAddress?.flatNo +
              " " +
              getDeliveryAddressData?.deliveryAddress?.locality +
              " " +
              getDeliveryAddressData?.deliveryAddress?.city +
              " " +
              getDeliveryAddressData?.deliveryAddress?.state +
              " " +
              getDeliveryAddressData?.deliveryAddress?.country +
              " " +
              getDeliveryAddressData?.deliveryAddress?.pincode,
            addressType: getDeliveryAddressData?.deliveryAddress?.addressType,
            gstNumber: getDeliveryAddressData?.deliveryAddress?.gstNumber,
          },

          orderId: updatePayload.orderId,
          tempOrderId: updatePayload.tempOrderId,
          source: updatePayload.source,
        };

        const { data } = await POST(UPDATE_TEMP_ORDER_INFO, payload);
        if (data?.status) {
          // toast.success("Updated Successfully");
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (requestName == "Services") {
      try {
        const payload: any = {
          partnerServiceId: serviceList[serviceIndex].partnerServiceId,
          partnerServiceName: serviceList[serviceIndex].partnerServiceName,
          companyServiceId: serviceList[serviceIndex].companyServiceId,
          companyServiceName: serviceList[serviceIndex].companyServiceName,
          tempOrderId: boxProductDetails?.tempOrderId,
          source: boxProductDetails?.source,

          category: "Service",
        };

        const { data: responseData } = await POST(SET_SERVICE_INFO, payload);
        if (responseData?.success) {
          // toast.success(responseData?.message);
        } else {
          toast.error(responseData?.message);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  //this is for updation the order id in other details
  const postOtherDetails = async () => {
    if (!apiCall) {
      setApiCall(true);
      return;
    }

    if (!orderId) {
      // setOpen({
      //   [`otherDetails`]: true,
      // });
      setOtherDetailsAccordian(true);
      setInputError(true);
      return;
    }
    //if (otherDetailsAccordian === false) {
    setOtherDetailsAccordian(false);
    const payload = {
      orderId: orderId,
      tempOrderId: boxProductDetails?.tempOrderId,
      source: boxProductDetails?.source,
      eWayBillNo: boxProductDetails?.boxInfo[0]?.eWayBillNo,
    };
    // if(payload.orderId.length === 0){

    // }

    try {
      const { data } = await POST(UPDATE_TEMP_ORDER_INFO, payload);
      if (data?.status) {
        // toast.success("Updated Successfully");
      }
    } catch (error: any) {
      console.log(error.message);
    }
    // }
  };

  const fetchPincodeData = async (e: any) => {
    if (!isNaN(e.target.value)) {
      setPincode(e.target.value);
    }
    if (e.target.value?.length === 6) {
      const payload = {
        pincode: e.target.value,
      };
      const { data: response } = await POST(GET_PINCODE_DATA, payload);

      setPincodeData(response?.data[0]);
    }
  };

  const getSellerOrderCompleteData = async (orderData: any) => {
    try {
      setIsLoading(true);
      const { data } = await POST(GET_SELLER_ORDER_COMPLETE_DATA, {
        tempOrderId: orderData?.orderId?.split("T")[1],
        awb: orderData?.awb ? orderData?.awb : "0",
      });

      let temp;
      temp = getPickAddressData;
      temp.pickUpAddress.contact.contactName =
        data?.data[0]?.data[0]?.pickupAddress.contact.name;
      temp.pickUpAddress.contact.mobileNo =
        data?.data[0]?.data[0]?.pickupAddress.contact.mobileNo;
      temp.pickUpAddress.contact.emailId =
        data?.data[0]?.data[0]?.pickupAddress.contact.emailId;
      temp.pickUpAddress.contact.contactType =
        data?.data[0]?.data[0]?.pickupAddress.contact.type;
      temp.pickUpAddress.flatNo = data?.data[0]?.data[0]?.pickupAddress.flatNo;
      temp.pickUpAddress.locality =
        data?.data[0]?.data[0]?.pickupAddress.locality;
      temp.pickUpAddress.landmark =
        data?.data[0]?.data[0]?.pickupAddress.landmark;
      temp.pickUpAddress.city = data?.data[0]?.data[0]?.pickupAddress.city;
      temp.pickUpAddress.state = data?.data[0]?.data[0]?.pickupAddress.state;
      temp.pickUpAddress.country =
        data?.data[0]?.data[0]?.pickupAddress.country;
      temp.pickUpAddress.pincode =
        data?.data[0]?.data[0]?.pickupAddress.pincode;
      temp.pickUpAddress.addressType =
        data?.data[0]?.data[0]?.pickupAddress.addressType;
      temp.pickUpAddress.pickupDate = +(
        +data?.data[0]?.data[0]?.pickupAddress.pickupDate * 1000
      );

      setGetPickUpAddressData({ ...temp });

      let deliveryTemp;
      deliveryTemp = getDeliveryAddressData;
      deliveryTemp.deliveryAddress.contact.contactName =
        data?.data[0]?.data[0]?.deliveryAddress.contact.name;
      deliveryTemp.deliveryAddress.contact.mobileNo =
        data?.data[0]?.data[0]?.deliveryAddress.contact.mobileNo;
      deliveryTemp.deliveryAddress.contact.emailId =
        data?.data[0]?.data[0]?.deliveryAddress.contact.emailId;
      deliveryTemp.deliveryAddress.contact.contactType =
        data?.data[0]?.data[0]?.deliveryAddress.contact.type;
      deliveryTemp.deliveryAddress.flatNo =
        data?.data[0]?.data[0]?.deliveryAddress.flatNo;
      deliveryTemp.deliveryAddress.locality =
        data?.data[0]?.data[0]?.deliveryAddress.locality;
      deliveryTemp.deliveryAddress.landmark =
        data?.data[0]?.data[0]?.deliveryAddress.landmark;
      deliveryTemp.deliveryAddress.city =
        data?.data[0]?.data[0]?.deliveryAddress.city;
      deliveryTemp.deliveryAddress.state =
        data?.data[0]?.data[0]?.deliveryAddress.state;
      deliveryTemp.deliveryAddress.country =
        data?.data[0]?.data[0]?.deliveryAddress.country;
      deliveryTemp.deliveryAddress.pincode =
        data?.data[0]?.data[0]?.deliveryAddress.pincode;
      deliveryTemp.deliveryAddress.addressType =
        data?.data[0]?.data[0]?.deliveryAddress.addressType;
      deliveryTemp.deliveryAddress.gstNumber =
        data?.data[0]?.data[0]?.deliveryAddress.gstNumber;
      setGetDeliveryAddressData({ ...deliveryTemp });

      let productTemp;
      productTemp = productDetails;

      productTemp[0].companyId = data?.data[0]?.data[0]?.boxInfo[0]?.companyId;
      productTemp[0].sellerId = data?.data[0]?.data[0]?.boxInfo[0]?.sellerId;
      productTemp[0].boxId = data?.data[0]?.data[0]?.boxInfo[0]?.boxId;
      productTemp[0].name = data?.data[0]?.data[0]?.boxInfo[0]?.name;
      productTemp[0].weightUnit =
        data?.data[0]?.data[0]?.boxInfo[0]?.weightUnit;
      productTemp[0].volumetricWeight =
        data?.data[0]?.data[0]?.boxInfo[0]?.volumetricWeight;
      productTemp[0].deadWeight =
        data?.data[0]?.data[0]?.boxInfo[0]?.deadWeight;
      productTemp[0].appliedWeight =
        data?.data[0]?.data[0]?.boxInfo[0]?.appliedWeight;
      productTemp[0].divisor = data?.data[0]?.data[0]?.boxInfo[0]?.divisor;
      productTemp[0].measureUnit =
        data?.data[0]?.data[0]?.boxInfo[0]?.measureUnit;
      productTemp[0].length = data?.data[0]?.data[0]?.boxInfo[0]?.length;
      productTemp[0].breadth = data?.data[0]?.data[0]?.boxInfo[0]?.breadth;
      productTemp[0].height = data?.data[0]?.data[0]?.boxInfo[0]?.height;
      productTemp[0].color = data?.data[0]?.data[0]?.boxInfo[0]?.color;
      productTemp[0].price = data?.data[0]?.data[0]?.boxInfo[0]?.price;
      productTemp[0].currency = data?.data[0]?.data[0]?.boxInfo[0]?.currency;
      productTemp[0].isFragile = data?.data[0]?.data[0]?.boxInfo[0]?.isFragile;
      productTemp[0].eWayBillNo =
        data?.data[0]?.data[0]?.boxInfo[0]?.eWayBillNo;
      productTemp[0].tracking.awb =
        data?.data[0]?.data[0]?.boxInfo[0]?.tracking.awb;
      productTemp[0].tracking.label =
        data?.data[0]?.data[0]?.boxInfo[0]?.tracking.label;
      productTemp[0].tracking.taxInvoice =
        data?.data[0]?.data[0]?.boxInfo[0]?.tracking.taxInvoice;
      productTemp[0].tracking.manifest =
        data?.data[0]?.data[0]?.boxInfo[0]?.tracking.manifest;
      productTemp[0].tracking.status =
        data?.data[0]?.data[0]?.boxInfo[0]?.tracking.status;
      productTemp[0].codInfo.isCod =
        data?.data[0]?.data[0]?.boxInfo[0]?.codInfo.isCod;
      productTemp[0].codInfo.collectableAmount =
        data?.data[0]?.data[0]?.boxInfo[0]?.codInfo.collectableAmount;
      productTemp[0].codInfo.invoiceValue =
        data?.data[0]?.data[0]?.boxInfo[0]?.codInfo.invoiceValue;
      productTemp[0].podInfo.isPod =
        data?.data[0]?.data[0]?.boxInfo[0]?.podInfo.isPod;
      productTemp[0].insurance.isInsured =
        data?.data[0]?.data[0]?.boxInfo[0]?.insurance.isInsured;
      productTemp[0].insurance.amount =
        data?.data[0]?.data[0]?.boxInfo[0]?.insurance.amount;
      productTemp[0].service.partnerServiceId =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.partnerServiceId;
      productTemp[0].service.partnerServiceName =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.partnerServiceName;
      productTemp[0].service.companyServiceId =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.companyServiceId;
      productTemp[0].service.companyServiceName =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.companyServiceName;
      productTemp[0].service.partnerName =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.partnerName;
      productTemp[0].service.serviceMode =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.serviceMode;
      productTemp[0].service.appliedWeight =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.appliedWeight;
      productTemp[0].service.invoiceValue =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.invoiceValue;
      productTemp[0].service.collectableAmount =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.collectableAmount;
      productTemp[0].service.insurance =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.insurance;
      productTemp[0].service.base =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.base;
      productTemp[0].service.add =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.add;
      productTemp[0].service.variables =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.variables;
      productTemp[0].service.cod =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.cod;
      productTemp[0].service.tax =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.tax;
      productTemp[0].service.total =
        data?.data[0]?.data[0]?.boxInfo[0]?.service.total;

      if (data.status) {
        const rowsData = data?.data[0]?.data[0];

        setBoxProductDetails(rowsData);

        setBoxDetails(rowsData);

        //otherdetails orderid
        let orderId;
        orderId = data?.data[0]?.data[0]?.orderId;
        setOrderId(data?.data[0]?.data[0]?.orderId);
        let updateData;
        updateData = updatePayload;
        updateData.orderId = rowsData?.orderId;
        updateData.tempOrderId = rowsData?.tempOrderId;
        updateData.source = rowsData?.source;
        setUpdatePayload({ ...updateData });

        let rows: any = [
          {
            "Contact Name": capitalizeFirstLetter(
              rowsData?.pickupAddress?.contact?.name
            ),
            "Mobile No": rowsData?.pickupAddress?.contact?.mobileNo,
            "Email Id": capitalizeFirstLetter(
              rowsData?.pickupAddress?.contact?.emailId
            ),
            "Contact Type": capitalizeFirstLetter(
              rowsData?.pickupAddress?.contact?.type
            ),
            FlatNo: rowsData?.pickupAddress?.flatNo,
            Locality: capitalizeFirstLetter(rowsData?.pickupAddress?.locality),
            LandkMark: capitalizeFirstLetter(rowsData?.pickupAddress?.landmark),
            City: capitalizeFirstLetter(rowsData?.pickupAddress?.city),
            State: capitalizeFirstLetter(rowsData?.pickupAddress?.state),
            Country: capitalizeFirstLetter(rowsData?.pickupAddress?.country),
            Pincode: rowsData?.pickupAddress?.pincode,
            "Address Type": capitalizeFirstLetter(
              rowsData?.pickupAddress?.addressType
            ),
            "Pickup Date": capitalizeFirstLetter(
              rowsData?.pickupAddress?.pickupDate
            ),
            title: "Pickup Address",
          },

          {
            "Contact Name": capitalizeFirstLetter(
              rowsData?.deliveryAddress?.contact?.name
            ),
            "Mobile No": rowsData?.deliveryAddress?.contact?.mobileNo,
            "Email Id": capitalizeFirstLetter(
              rowsData?.deliveryAddress?.contact?.emailId
            ),
            Type: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.contact?.type
            ),
            FlatNo: rowsData?.deliveryAddress?.flatNo,
            Locality: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.locality
            ),
            LandkMark: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.landmark
            ),
            City: capitalizeFirstLetter(rowsData?.deliveryAddress?.city),
            State: capitalizeFirstLetter(rowsData?.deliveryAddress?.state),
            Country: capitalizeFirstLetter(rowsData?.deliveryAddress?.country),
            Pincode: rowsData?.deliveryAddress?.pincode,
            "Address Type": capitalizeFirstLetter(
              rowsData?.deliveryAddress?.addressType
            ),
            title: "Delivery Address",
            "GST Number": rowsData?.deliveryAddress?.gstNumber,
          },
          {
            title:
              rowsData?.boxInfo?.[0]?.service?.companyServiceId && "Services",
            "Partner Name": capitalizeFirstLetter(
              rowsData?.boxInfo?.[0]?.service?.partnerName
            ),
            "AVN Service": capitalizeFirstLetter(
              rowsData?.boxInfo?.[0]?.service?.companyServiceName
            ),
            "Service Mode": capitalizeFirstLetter(
              rowsData?.boxInfo?.[0]?.service?.serviceMode
            ),
            "Applied Weight": `${rowsData?.boxInfo?.[0]?.service?.appliedWeight} Kg`,
            "Freight Charges": `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.add +
                rowsData?.boxInfo?.[0]?.service?.base
            )?.toLocaleString("en-IN")}`,
            "COD Charges": `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.cod
            )?.toLocaleString("en-IN")}`,
            Insurance: `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.insurance
            )?.toLocaleString("en-IN")}`,
            "Other Charges": `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.variables
            )?.toLocaleString("en-IN")}`,
            Tax: `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.tax
            )?.toLocaleString("en-IN")}`,
            Total: `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.total
            )?.toLocaleString("en-IN")}`,
          },
        ];
        let boxObj: any = { title: "" };
        rowsData?.boxInfo?.map((item: any, index: any) => {
          let title = `Box Info ${
            rowsData?.boxInfo?.length > 1 ? `${index + 1}` : ""
          }`;
          let qty = 0;
          item?.products?.map((elem: any, num: any) => {
            boxObj = {
              ...boxObj,
              [`Name ${num + 1}`]: elem?.name,
              [`QTY ${num + 1}`]: elem?.qty,
              [`Dead Weight ${num + 1}`]: `${elem?.deadWeight} Kg`,
              [`Applied Weight ${num + 1}`]: `${elem?.appliedWeight} Kg`,
              [`Dimensions ${
                num + 1
              }`]: `${elem?.length} x ${elem?.breadth} x ${elem?.height}`,
              [`Price ${num + 1}`]: `₹ ${Math.round(
                elem?.unitPrice
              )?.toLocaleString("en-IN")}`,
              [`Tax ${num + 1}`]: `₹ ${Math.round(
                elem?.unitTax
              )?.toLocaleString("en-IN")}`,

              [`SKU ${num + 1}`]: elem?.sku,
            };
            qty += elem?.qty;
          });
          title += ` Product(s) x ${qty}`;
          boxObj.title = title;
          rows.push(boxObj);
        });

        let statusObj: any = { title: "" };
        rowsData?.status?.map((elem: any, index: any) => {
          statusObj = {
            ...statusObj,
            [`AWB No ${index + 1}`]: orderData?.awb,
            [`Current Status ${index + 1}`]: capitalizeFirstLetter(
              elem?.currentStatus
            ),

            [`Description ${index + 1}`]: elem?.description,
            [`LogId ${index + 1}`]: elem.logId,
            [`Notes ${index + 1}`]: elem.notes,
            [`Time ${index + 1}`]: date_DD_MMM_YYYY_HH_MM_SS(elem.timeStamp),
          };
          statusObj.title = "Status";
        });
        rows.push(statusObj);

        rows.push({
          title: "Other Details",
          "Shipyaari ID": rowsData?.tempOrderId,
          "Order Id": rowsData?.orderId,
          "Tracking Id": orderData?.awb,
          Source: capitalizeFirstLetter(rowsData?.source),
          "Order Type": rowsData?.orderType,
          Zone: capitalizeFirstLetter(rowsData?.zone),
        });

        setOrderDetails(rows);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      return [];
    }
  };

  servicePartnerServiceId =
    boxProductDetails?.boxInfo[0]?.service?.partnerServiceId;

  const [productError, setProdctError] = useState<any>({
    deadWeight: false,
    volumetricWeight: false,
    length: false,
    breadth: false,
    height: false,
  });

  const productLoops = (productAccordian: any, index: any) => {
    // for (let i = 0; i < productAccordian.length; i++) {
    const product = productAccordian[index];

    if (
      product.deadWeight > 0 &&
      product.volumetricWeight > 0 &&
      product.length > 0 &&
      product.breadth > 0 &&
      product.height > 0
    ) {
      return false;
    } else {
      setInputError(true);
      return true;
    }

    // }
  };

  const boxloops: any = (boxProductDetails: any, index: any) => {
    const boxDetails = boxProductDetails?.boxInfo[index];

    if (
      boxDetails?.deadWeight > 0 &&
      boxDetails?.volumetricWeight > 0 &&
      boxDetails?.length > 0 &&
      boxDetails?.breadth > 0 &&
      boxDetails?.height > 0
    ) {
      return false;
    } else {
      setInputError(true);
      return true;
    }
    // }
  };

  useEffect(() => {
    const { data: dataFromState, isOpen } = data;

    if (data !== undefined && isOpen === true) {
      setOrderDetails([]);
      getSellerOrderCompleteData(dataFromState);
    }
  }, [data]);

  useEffect(() => {
    if (orderDetails.length > 0) {
      const deliveryAddress = orderDetails[1];

      delete deliveryAddress.title;

      const pickAddress = orderDetails[0];

      delete pickAddress.title;
      setOrderDetails({ ...orderDetails, deliveryAddress });
    }
  }, []);

  useEffect(() => {
    setGetPickUpAddressData(getPickAddressData);
  }, [getPickAddressData]);

  useEffect(() => {
    // getServiceList();
  }, [boxProductDetails]);

  useEffect(() => {
    // if()

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // postOtherDetails();
  }, [addressOpenModal]);

  useEffect(() => {
    setproductAccordian(boxProductDetails?.boxInfo?.[0]?.products);
  }, [boxProductDetails]);

  useEffect(() => {
    serviceList.map((id: any, index: number) => {
      return (
        id.partnerServiceId == servicePartnerServiceId && setServiceIndex(index)
      );
    });
  }, [serviceList]);

  const validationFunction = (e: any, key: any, index: any) => {
    if (key == "Pickup Address") {
      if (
        getPickAddressData?.pickUpAddress?.contact?.contactName?.length === 0 ||
        getPickAddressData?.pickUpAddress?.contact?.mobileNo?.length === 0 ||
        getPickAddressData?.pickUpAddress?.contact?.emailId?.length === 0 ||
        getPickAddressData?.pickUpAddress?.contact?.contactType?.length === 0 ||
        getPickAddressData?.pickUpAddress?.flatNo?.length === 0 ||
        getPickAddressData?.pickUpAddress?.locality?.length === 0 ||
        getPickAddressData?.pickUpAddress?.landmark?.length === 0 ||
        getPickAddressData?.pickUpAddress?.city?.length === 0 ||
        getPickAddressData?.pickUpAddress?.state?.length === 0 ||
        getPickAddressData?.pickUpAddress?.country?.length === 0 ||
        getPickAddressData?.pickUpAddress?.pincode?.length === 0 ||
        getPickAddressData?.pickUpAddress?.addressType?.length === 0 ||
        getPickAddressData?.pickUpAddress?.pickupDate?.length === 0
      ) {
        // setOpenIndex(0);
        setOpen({
          [`item${index}`]: true,
        });
        setInputError(true);
      } else {
        // setOpenIndex(0);
        handleItemClick(index, e.target.textContent);
        setOpen({
          [`item${index}`]: false,
        });
        setApiCall(false);
      }
    }
    if (key == "Delivery Address") {
      if (
        getDeliveryAddressData?.deliveryAddress?.contact?.contactName
          ?.length === 0 ||
        getDeliveryAddressData?.deliveryAddress?.contact?.mobileNo?.length ===
          0 ||
        getDeliveryAddressData?.deliveryAddress?.contact?.emailId?.length ===
          0 ||
        getDeliveryAddressData?.deliveryAddress?.contact?.contactType
          ?.length === 0 ||
        getDeliveryAddressData?.deliveryAddress?.flatNo?.length === 0 ||
        getDeliveryAddressData?.deliveryAddress?.locality?.length === 0 ||
        getDeliveryAddressData?.deliveryAddress?.landmark?.length === 0 ||
        getDeliveryAddressData?.deliveryAddress?.city?.length === 0 ||
        getDeliveryAddressData?.deliveryAddress?.state?.length === 0 ||
        getDeliveryAddressData?.deliveryAddress?.country?.length === 0 ||
        getDeliveryAddressData?.deliveryAddress?.pincode?.length === 0 ||
        getDeliveryAddressData?.deliveryAddress?.addressType?.length === 0 ||
        getDeliveryAddressData?.deliveryAddress?.gstNumber?.length === 0
      ) {
        setOpen({
          [`item${index}`]: true,
        });
        setInputError(true);
      } else {
        // setOpenIndex(0);
        handleItemClick(index, e.target.textContent);
        setOpen({
          [`item${index}`]: false,
        });
        setApiCall(false);
      }
    }
    if (key == "Other Details") {
      {
        if (!orderId) {
          setOpen({
            [`item${index}`]: true,
          });
          setInputError(true);
        } else {
          //  handleItemClick(index, e.target.textContent);
          postOtherDetails();
          setOpen({
            [`item${index}`]: false,
          });
          setOpenIndex(null);
          setOtherDetailsAccordian(false);
          setAddressOpenModal(false);
          setApiCall(false);
        }
      }
    }
  };

  return (
    <div className="overflow-auto h-[100%] pb-[2rem]">
      {isLoading ? (
        <div className="flex w-full justify-center items-center h-[80%]">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="w-[100%] p-[1rem] items-start overflow-auto">
            {orderDetails?.length > 0 &&
              orderDetails?.map((item: any, index: any) => {
                return (
                  item?.title && (
                    <div
                      className="flex flex-col mb-3 cursor-pointer"
                      key={index}
                    >
                      <div
                        className={`flex flex-col select-none gap-y-[1rem] justify-between p-3 h-[52px] border-[1px] border-[#E8E8E8] ${
                          openIndex === index
                            ? "  rounded-tr-lg rounded-tl-lg rounded-b-none "
                            : " text-[black] rounded-lg "
                        }`}
                        onClick={(e: any) => {
                          validationFunction(e, item.title, index);

                          if (!open[`item${index}`]) {
                            setOpen({
                              [`item${index}`]: true,
                            });
                            handleItemClick(index, e.target.textContent);
                          } else if (e.target.textContent === "Status") {
                            setOpen({
                              [`item${index}`]: false,
                            });
                            setOpenIndex(null);
                            // setApiCall(false);
                            // setOpen({
                            //   [`item${index}`]: false,
                            // });
                          }
                        }}
                        key={index}
                      >
                        <div className="flex justify-between">
                          {item?.title}
                          {/* {open[`item${index}`] && item} */}
                          {open?.[`item${index}`] ? (
                            <img src={UpwardArrow} alt="" />
                          ) : (
                            <img src={DownwardArrow} alt="" />
                          )}
                        </div>
                      </div>
                      {openIndex === index && (
                        <div>
                          <div>
                            <div
                              className={`entries ${
                                entriesHeight && entriesHeight < 500
                                  ? `h-[${entriesHeight}]px`
                                  : `h-[${500}]px`
                              } flex flex-col overflow-auto border p-[0.5rem]`}
                            >
                              {Object.entries(item)?.map(
                                ([key, value]: any, index: any) => {
                                  // Need To Implement this dynamically, It is applied for time being

                                  return index === 0 ? (
                                    ""
                                  ) : item?.title?.includes("Box") &&
                                    index === 4 ? (
                                    <div
                                      className="items-center flex flex-col gap-y-[1rem] justify-between my-5 w-[100%]"
                                      style={{
                                        boxShadow:
                                          "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                                      }}
                                    >
                                      {productAccordian !== "" &&
                                        productAccordian !== undefined &&
                                        productAccordian?.map(
                                          (eachProduct: any, index: number) => {
                                            return (
                                              <div className="w-full">
                                                <div className="w-full">
                                                  <div
                                                    className="border-2  border-black-600 p-2 rounded-md w-full"
                                                    onClick={(e: any) => {
                                                      productLoops(
                                                        productAccordian,
                                                        index
                                                      );
                                                      let temp = [
                                                        ...productAccordian,
                                                      ];

                                                      if (
                                                        eachProduct?.isCollapse ===
                                                          true &&
                                                        !productLoops(
                                                          productAccordian,
                                                          index
                                                        )
                                                      ) {
                                                        eachProduct.isCollapse =
                                                          false;
                                                        setproductAccordian(
                                                          temp
                                                        );

                                                        handleSingleProductUpdation();
                                                      } else {
                                                        eachProduct.isCollapse =
                                                          true;
                                                        setproductAccordian(
                                                          temp
                                                        );
                                                        // setInputError(true);
                                                      }
                                                      hanldeProducts(
                                                        index,
                                                        eachProduct
                                                      );
                                                      if (
                                                        !open[
                                                          `itemproductAccordian${index}`
                                                        ]
                                                      ) {
                                                        setOpen({
                                                          [`itemproductAccordian${index}`]:
                                                            true,
                                                        });
                                                      } else {
                                                        setOpen({
                                                          [`itemproductAccordian${index}`]:
                                                            false,
                                                        });
                                                      }
                                                    }}
                                                  >
                                                    <div className="flex justify-between">
                                                      <div className="flex gap-x-3">
                                                        <img
                                                          src={ItemIcon}
                                                          className=""
                                                          alt=""
                                                        />
                                                        <p className="flex items-center text-[18px] font-Open">
                                                          {eachProduct?.name}
                                                        </p>
                                                        <span className="flex items-center mt-1 text-[16px] font-Open">
                                                          (Product Info)
                                                        </span>
                                                      </div>
                                                      <div className="flex items-center">
                                                        {/* <img
                                                          src={DownwardArrow}
                                                        /> */}
                                                        {open?.[
                                                          `itemproductAccordian${index}`
                                                        ] ? (
                                                          <img
                                                            src={UpwardArrow}
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={DownwardArrow}
                                                            alt=""
                                                          />
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {eachProduct?.isCollapse && (
                                                    <div className="border-b-2 border-l-2 border-r-2 border-black-600 pt-4 pb-6 rounded-md">
                                                      <div className="grid grid-cols-2  px-[1rem] gap-x-4">
                                                        <div className="col-span-1">
                                                          <InputBox
                                                            label="Dead Weight (Kg)"
                                                            defaultValue={
                                                              eachProduct?.deadWeight
                                                            }
                                                            name="deadWeight"
                                                            inputType="number"
                                                            inputMode="numeric"
                                                            className="!w-[100%]"
                                                            onChange={(
                                                              e: any
                                                            ) => {
                                                              handleInputUpdation(
                                                                index,
                                                                e.target.value,
                                                                "deadWeight"
                                                              );
                                                              if (
                                                                e.target
                                                                  .value <= 0 &&
                                                                eachProduct
                                                                  .deadWeight
                                                                  ?.length != 0
                                                              ) {
                                                                setValidationError(
                                                                  {
                                                                    ...validationError,
                                                                    deadWeight:
                                                                      "Should be greater than 0",
                                                                  }
                                                                );
                                                              } else {
                                                                setValidationError(
                                                                  {
                                                                    ...validationError,
                                                                    deadWeight:
                                                                      "",
                                                                  }
                                                                );
                                                              }
                                                            }}
                                                            inputError={
                                                              eachProduct
                                                                .deadWeight
                                                                ?.length == 0
                                                            }
                                                          />
                                                          <p className="open-sans text-[12px] text-red-600">
                                                            {
                                                              validationError.deadWeight
                                                            }
                                                          </p>
                                                        </div>
                                                        <div className="col-span-1">
                                                          <InputBox
                                                            label="Volumetric Weight"
                                                            defaultValue={
                                                              eachProduct?.volumetricWeight
                                                            }
                                                            name="volumetricWeight"
                                                            className="!w-[100%]"
                                                            inputType="number"
                                                            onChange={(
                                                              e: any
                                                            ) => {
                                                              handleInputUpdation(
                                                                index,
                                                                e.target.value,
                                                                "volumetricWeight"
                                                              );
                                                              if (
                                                                e.target
                                                                  .value <= 0 &&
                                                                eachProduct
                                                                  .volumetricWeight
                                                                  ?.length != 0

                                                                // e.target.value
                                                                //   .length === 0
                                                              ) {
                                                                setValidationError(
                                                                  {
                                                                    ...validationError,
                                                                    volumetricWeight:
                                                                      "Should be greater than 0",
                                                                  }
                                                                );
                                                              } else {
                                                                setValidationError(
                                                                  {
                                                                    ...validationError,
                                                                    volumetricWeight:
                                                                      "",
                                                                  }
                                                                );
                                                              }
                                                            }}
                                                            inputError={
                                                              eachProduct
                                                                .volumetricWeight
                                                                ?.length === 0
                                                            }
                                                          />
                                                          <p className="open-sans text-[12px] text-red-600">
                                                            {
                                                              validationError.volumetricWeight
                                                            }
                                                          </p>
                                                        </div>
                                                      </div>
                                                      <div className="flex justify-between  w-[100%] gap-x-[1rem] px-[1rem]  mt-2">
                                                        <div className="w-[50%]">
                                                          <CustomDropDown
                                                            onChange={() => {}}
                                                            options={
                                                              measureUnits
                                                            }
                                                          />
                                                        </div>
                                                        <div className="flex w-[50%] gap-x-4">
                                                          <div>
                                                            <InputBox
                                                              label="L"
                                                              inputType="number"
                                                              inputMode="numeric"
                                                              name="length"
                                                              defaultValue={
                                                                eachProduct?.length
                                                              }
                                                              onChange={(
                                                                e: any
                                                              ) => {
                                                                handleInputUpdation(
                                                                  index,
                                                                  e.target
                                                                    .value,
                                                                  "length"
                                                                );
                                                                if (
                                                                  e.target
                                                                    .value <=
                                                                    0 &&
                                                                  eachProduct
                                                                    .length
                                                                    ?.length !=
                                                                    0
                                                                ) {
                                                                  setValidationError(
                                                                    {
                                                                      ...validationError,
                                                                      length:
                                                                        "sould be greater than 0",
                                                                    }
                                                                  );
                                                                } else {
                                                                  setValidationError(
                                                                    {
                                                                      ...validationError,
                                                                      length:
                                                                        "",
                                                                    }
                                                                  );
                                                                }
                                                              }}
                                                              inputError={
                                                                eachProduct
                                                                  .length
                                                                  ?.length === 0
                                                              }
                                                            />
                                                            <p className="open-sans text-[12px] text-red-600">
                                                              {
                                                                validationError?.length
                                                              }
                                                            </p>
                                                          </div>
                                                          <div>
                                                            <InputBox
                                                              label="B"
                                                              defaultValue={
                                                                eachProduct?.breadth
                                                              }
                                                              name="breadth"
                                                              inputType="number"
                                                              inputMode="numeric"
                                                              onChange={(
                                                                e: any
                                                              ) => {
                                                                handleInputUpdation(
                                                                  index,
                                                                  e.target
                                                                    .value,
                                                                  "breadth"
                                                                );
                                                                if (
                                                                  e.target
                                                                    .value <=
                                                                    0 &&
                                                                  eachProduct
                                                                    .breadth
                                                                    ?.length !=
                                                                    0
                                                                ) {
                                                                  setValidationError(
                                                                    {
                                                                      ...validationError,
                                                                      breadth:
                                                                        "Should be greater than 0",
                                                                    }
                                                                  );
                                                                } else {
                                                                  setValidationError(
                                                                    {
                                                                      ...validationError,
                                                                      breadth:
                                                                        "",
                                                                    }
                                                                  );
                                                                }
                                                              }}
                                                              inputError={
                                                                eachProduct
                                                                  ?.breadth
                                                                  ?.length === 0
                                                              }
                                                            />
                                                            <p className="open-sans text-[12px] text-red-600">
                                                              {
                                                                validationError.breadth
                                                              }
                                                            </p>
                                                          </div>
                                                          <div>
                                                            <InputBox
                                                              label="H"
                                                              defaultValue={
                                                                eachProduct?.breadth
                                                              }
                                                              name="height"
                                                              inputType="number"
                                                              inputMode="numeric"
                                                              onChange={(
                                                                e: any
                                                              ) => {
                                                                handleInputUpdation(
                                                                  index,
                                                                  e.target
                                                                    .value,
                                                                  "height"
                                                                );
                                                                if (
                                                                  e.target
                                                                    .value <=
                                                                    0 &&
                                                                  eachProduct
                                                                    ?.height
                                                                    ?.length !=
                                                                    0
                                                                ) {
                                                                  setValidationError(
                                                                    {
                                                                      ...validationError,
                                                                      height:
                                                                        "Should be greater than 0",
                                                                    }
                                                                  );
                                                                } else {
                                                                  setValidationError(
                                                                    {
                                                                      ...validationError,
                                                                      height:
                                                                        "",
                                                                    }
                                                                  );
                                                                }
                                                              }}
                                                              inputError={
                                                                eachProduct
                                                                  .height
                                                                  ?.length === 0
                                                              }
                                                            />
                                                            <p className="open-sans text-[12px] text-red-600">
                                                              {
                                                                validationError.height
                                                              }
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
                                      {boxProductDetails?.boxInfo.map(
                                        (eachBox: any, index: number) => {
                                          return (
                                            <div className="w-full">
                                              <div className="w-full">
                                                <div
                                                  className="border-2  border-black-600 p-2 flex justify-between w-full rounded-md"
                                                  onClick={(e: any) => {
                                                    boxloops(
                                                      boxProductDetails,
                                                      index
                                                    );
                                                    if (
                                                      boxAccordian === true &&
                                                      !boxloops(
                                                        boxProductDetails,
                                                        index
                                                      )
                                                    ) {
                                                      setBoxAccordian(false);

                                                      handleBoxAccordian();
                                                    } else {
                                                      setBoxAccordian(true);
                                                    }

                                                    if (
                                                      !open[
                                                        `itemboxProductDetails${index}`
                                                      ]
                                                    ) {
                                                      setOpen({
                                                        [`itemboxProductDetails${index}`]:
                                                          true,
                                                      });
                                                    } else {
                                                      setOpen({
                                                        [`itemboxProductDetails${index}`]:
                                                          false,
                                                      });
                                                    }
                                                  }}
                                                >
                                                  <div className="flex gap-x-3">
                                                    <img
                                                      src={BoxIcon}
                                                      className="w-10 h-10"
                                                      alt=""
                                                    />
                                                    <p className="flex items-center text-[18px] font-Open">
                                                      {eachBox?.name}
                                                    </p>
                                                    <span className="flex items-center mt-1 text-[16px] font-Open">
                                                      (Box Info)
                                                    </span>
                                                  </div>

                                                  <div className="flex items-center">
                                                    {/* <img src={DownwardArrow} /> */}
                                                    {open?.[
                                                      `itemboxProductDetails${index}`
                                                    ] ? (
                                                      <img
                                                        src={UpwardArrow}
                                                        alt=""
                                                      />
                                                    ) : (
                                                      <img
                                                        src={DownwardArrow}
                                                        alt=""
                                                      />
                                                    )}
                                                  </div>
                                                </div>
                                                {boxAccordian && (
                                                  <div className="border-b-2 border-l-2 border-r-2 border-black-600 pt-4 pb-4 rounded-md">
                                                    <div className="grid grid-cols-2 gap-x-[1rem] px-[1rem]">
                                                      <div className="col-span-1">
                                                        <InputBox
                                                          label="Dead Weight (Kg)"
                                                          defaultValue={
                                                            eachBox?.breadth
                                                          }
                                                          inputType="number"
                                                          name="deadWeight"
                                                          inputMode="numeric"
                                                          onChange={(
                                                            e: any
                                                          ) => {
                                                            handleBoxInputUpdation(
                                                              index,
                                                              e.target.value,
                                                              "deadWeight"
                                                            );
                                                            if (
                                                              e.target.value <=
                                                                0 &&
                                                              eachBox.deadWeight
                                                                ?.length != 0
                                                            ) {
                                                              setValidationError(
                                                                {
                                                                  ...validationError,
                                                                  boxDeadWeight:
                                                                    "Should be greater than 0",
                                                                }
                                                              );
                                                            } else {
                                                              setValidationError(
                                                                {
                                                                  ...validationError,
                                                                  boxDeadWeight:
                                                                    "",
                                                                }
                                                              );
                                                            }
                                                          }}
                                                          inputError={
                                                            eachBox?.deadWeight
                                                              ?.length === 0
                                                          }
                                                        />
                                                        <p className="open-sans text-[12px] text-red-600">
                                                          {
                                                            validationError.boxDeadWeight
                                                          }
                                                        </p>
                                                      </div>
                                                      <div className="col-span-1">
                                                        <InputBox
                                                          label="Volumetric Weight"
                                                          defaultValue={
                                                            eachBox?.volumetricWeight
                                                          }
                                                          name="volumetricWeight"
                                                          inputType="number"
                                                          onChange={(
                                                            e: any
                                                          ) => {
                                                            handleBoxInputUpdation(
                                                              index,
                                                              e.target.value,
                                                              "volumetricWeight"
                                                            );
                                                            if (
                                                              e.target.value <=
                                                                0 &&
                                                              eachBox
                                                                .volumetricWeight
                                                                ?.length != 0
                                                            ) {
                                                              setValidationError(
                                                                {
                                                                  ...validationError,
                                                                  boxVolumetricWeight:
                                                                    "Should be greater than 0",
                                                                }
                                                              );
                                                            } else {
                                                              setValidationError(
                                                                {
                                                                  ...validationError,
                                                                  boxVolumetricWeight:
                                                                    "",
                                                                }
                                                              );
                                                            }
                                                          }}
                                                          inputError={
                                                            eachBox
                                                              ?.volumetricWeight
                                                              ?.length === 0
                                                          }
                                                        />
                                                        <p className="open-sans text-[12px] text-red-600">
                                                          {
                                                            validationError.boxVolumetricWeight
                                                          }
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div className="flex justify-between w-[100%] gap-x-[1rem] px-[1rem] mt-2">
                                                      <div className="w-[50%]">
                                                        <CustomDropDown
                                                          onChange={() => {}}
                                                          options={measureUnits}
                                                        />
                                                      </div>
                                                      <div className="flex w-[50%] gap-x-4">
                                                        <div>
                                                          <InputBox
                                                            label="L"
                                                            inputType="number"
                                                            inputMode="numeric"
                                                            name="length"
                                                            defaultValue={
                                                              eachBox?.length
                                                            }
                                                            onChange={(
                                                              e: any
                                                            ) => {
                                                              handleBoxInputUpdation(
                                                                index,
                                                                e.target.value,
                                                                "length"
                                                              );
                                                              if (
                                                                e.target
                                                                  .value <= 0 &&
                                                                eachBox.length
                                                                  ?.length != 0
                                                              ) {
                                                                setValidationError(
                                                                  {
                                                                    ...validationError,
                                                                    boxLength:
                                                                      "Should be greater than 0",
                                                                  }
                                                                );
                                                              } else {
                                                                setValidationError(
                                                                  {
                                                                    ...validationError,
                                                                    boxLength:
                                                                      "",
                                                                  }
                                                                );
                                                              }
                                                            }}
                                                            inputError={
                                                              eachBox?.length
                                                                ?.length === 0
                                                            }
                                                          />
                                                          <p className="open-sans text-[12px] text-red-600">
                                                            {
                                                              validationError.boxLength
                                                            }
                                                          </p>
                                                        </div>
                                                        <div>
                                                          <InputBox
                                                            label="B"
                                                            defaultValue={
                                                              eachBox?.breadth
                                                            }
                                                            name="breadth"
                                                            inputType="number"
                                                            inputMode="numeric"
                                                            onChange={(
                                                              e: any
                                                            ) => {
                                                              handleBoxInputUpdation(
                                                                index,
                                                                e.target.value,
                                                                "breadth"
                                                              );
                                                              if (
                                                                e.target
                                                                  .value <= 0 &&
                                                                eachBox.breadth
                                                                  ?.length != 0
                                                              ) {
                                                                setValidationError(
                                                                  {
                                                                    ...validationError,
                                                                    boxBreadth:
                                                                      "Should be greater than 0",
                                                                  }
                                                                );
                                                              } else {
                                                                setValidationError(
                                                                  {
                                                                    ...validationError,
                                                                    boxBreadth:
                                                                      "",
                                                                  }
                                                                );
                                                              }
                                                            }}
                                                            inputError={
                                                              eachBox?.breadth
                                                                ?.length === 0
                                                            }
                                                          />
                                                          <p className="open-sans text-[12px] text-red-600">
                                                            {
                                                              validationError.boxBreadth
                                                            }
                                                          </p>
                                                        </div>
                                                        <div>
                                                          <InputBox
                                                            label="H"
                                                            defaultValue={
                                                              eachBox.height
                                                            }
                                                            name="height"
                                                            inputType="number"
                                                            inputMode="numeric"
                                                            onChange={(
                                                              e: any
                                                            ) => {
                                                              handleBoxInputUpdation(
                                                                index,
                                                                e.target.value,
                                                                "height"
                                                              );
                                                              if (
                                                                e.target
                                                                  .value <= 0 &&
                                                                eachBox.height
                                                                  ?.length != 0
                                                              ) {
                                                                setValidationError(
                                                                  {
                                                                    ...validationError,
                                                                    boxHeight:
                                                                      "Should be greater than 0",
                                                                  }
                                                                );
                                                              } else {
                                                                setValidationError(
                                                                  {
                                                                    ...validationError,
                                                                    boxHeight:
                                                                      "",
                                                                  }
                                                                );
                                                              }
                                                            }}
                                                            inputError={
                                                              eachBox?.height
                                                                ?.length === 0
                                                            }
                                                          />
                                                          <p className="open-sans text-[12px] text-red-600">
                                                            {
                                                              validationError.boxHeight
                                                            }
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  ) : (
                                    <>
                                      <div>
                                        {item.title === "Status" &&
                                          index === 4 && (
                                            <div>
                                              {boxProductDetails?.status.map(
                                                (
                                                  eachStatus: any,
                                                  index: any
                                                ) => {
                                                  return (
                                                    <div className="border border-[#A4A4A4]  p-4 mt-2 rounded-md">
                                                      <div className="flex justify-between">
                                                        <p>AWB:</p>
                                                        <p>{eachStatus?.awb}</p>
                                                      </div>
                                                      <div className="flex justify-between mt-4">
                                                        <p>Current Status:</p>
                                                        <p>
                                                          {
                                                            eachStatus?.currentStatus
                                                          }
                                                        </p>
                                                      </div>
                                                      <div className="flex justify-between mt-4">
                                                        <p>Description:</p>
                                                        <p className="whitespace-nowrap overflow-x-scroll w-100% ml-16 customScroll">
                                                          {
                                                            eachStatus?.description
                                                          }
                                                        </p>
                                                      </div>
                                                      <div className="flex justify-between mt-4">
                                                        <p>Login:</p>
                                                        <p className="whitespace-nowrap overflow-x-scroll w-100% ml-16 customScroll">
                                                          {eachStatus?.logId}
                                                        </p>
                                                      </div>
                                                      <div className="flex justify-between mt-4">
                                                        <p>Notes:</p>
                                                        <p className="whitespace-nowrap overflow-x-scroll w-100% ml-16 customScroll">
                                                          {eachStatus?.notes}
                                                        </p>
                                                      </div>
                                                      <div className="flex justify-between mt-4">
                                                        <p>Time Stamp:</p>
                                                        <p>
                                                          {
                                                            eachStatus?.timeStamp
                                                          }
                                                        </p>
                                                      </div>
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </div>
                                          )}
                                      </div>

                                      <div>
                                        {item.title === "Other Details" &&
                                          index === 5 && (
                                            <>
                                              {
                                                <>
                                                  <div className="p-4">
                                                    <div>
                                                      {Object.entries(
                                                        orderDetails[5]
                                                      ).map(
                                                        (
                                                          eachService: any,
                                                          index: any
                                                        ) => {
                                                          return (
                                                            index === 1 && (
                                                              <div className="flex justify-between">
                                                                <p className="open-sans">
                                                                  {
                                                                    eachService[0]
                                                                  }
                                                                </p>
                                                                <p>
                                                                  {
                                                                    eachService[1]
                                                                  }
                                                                </p>
                                                              </div>
                                                            )
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                    {/* this is for order id */}
                                                    <div className="mt-2">
                                                      {Object.entries(
                                                        orderDetails[5]
                                                      ).map(
                                                        (
                                                          eachService: any,
                                                          index: any
                                                        ) => {
                                                          return (
                                                            index === 2 && (
                                                              <div className="flex justify-between">
                                                                <div>
                                                                  <p className="open-sans">
                                                                    {
                                                                      eachService[0]
                                                                    }
                                                                  </p>
                                                                </div>

                                                                <div>
                                                                  <CustomInputBox
                                                                    defaultValue={
                                                                      // eachService[1]
                                                                      orderId
                                                                    }
                                                                    onChange={(
                                                                      e: any
                                                                    ) => {
                                                                      setOrderId(
                                                                        e.target
                                                                          .value
                                                                      );
                                                                      if (
                                                                        e.target
                                                                          .value <=
                                                                          0 &&
                                                                        e.target
                                                                          .value
                                                                          .length !=
                                                                          0
                                                                        // eachService
                                                                        //   .orderId
                                                                        //   .length !=
                                                                        //   0
                                                                      ) {
                                                                        setValidationError(
                                                                          {
                                                                            ...validationError,
                                                                            orderId:
                                                                              "Should be greater than 0",
                                                                          }
                                                                        );
                                                                      } else {
                                                                        setValidationError(
                                                                          {
                                                                            ...validationError,
                                                                            orderId:
                                                                              "",
                                                                          }
                                                                        );
                                                                      }
                                                                    }}
                                                                    inputError={
                                                                      // eachBox
                                                                      //   ?.height
                                                                      //   .length ===
                                                                      // 0
                                                                      orderId?.length ===
                                                                      0
                                                                    }
                                                                    className="!max-w-[100px] !h-[20px]"
                                                                  />
                                                                  <p className="open-sans text-[12px] text-red-600">
                                                                    {
                                                                      validationError.orderId
                                                                    }
                                                                  </p>
                                                                </div>
                                                              </div>
                                                            )
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                    <div className="mt-2">
                                                      {Object.entries(
                                                        orderDetails[5]
                                                      ).map(
                                                        (
                                                          eachService: any,
                                                          index: any
                                                        ) => {
                                                          return (
                                                            index === 3 && (
                                                              <div className="flex justify-between">
                                                                <p className="open-sans">
                                                                  {
                                                                    eachService[0]
                                                                  }
                                                                </p>
                                                                <p className="open-sans">
                                                                  {
                                                                    eachService[1]
                                                                  }
                                                                </p>
                                                              </div>
                                                            )
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                    <div className="mt-2">
                                                      {Object.entries(
                                                        orderDetails[5]
                                                      ).map(
                                                        (
                                                          eachService: any,
                                                          index: any
                                                        ) => {
                                                          return (
                                                            index === 4 && (
                                                              <div className="flex justify-between">
                                                                <p className="open-sans">
                                                                  {
                                                                    eachService[0]
                                                                  }
                                                                </p>
                                                                <p className="open-sans">
                                                                  {
                                                                    eachService[1]
                                                                  }
                                                                </p>
                                                              </div>
                                                            )
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                    <div className="mt-2">
                                                      {Object.entries(
                                                        orderDetails[5]
                                                      ).map(
                                                        (
                                                          eachService: any,
                                                          index: any
                                                        ) => {
                                                          return (
                                                            index === 5 && (
                                                              <div className="flex justify-between">
                                                                <p className="open-sans">
                                                                  {
                                                                    eachService[0]
                                                                  }
                                                                </p>
                                                                <p className="open-sans">
                                                                  {
                                                                    eachService[1]
                                                                  }
                                                                </p>
                                                              </div>
                                                            )
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                    <div className="mt-2">
                                                      {Object.entries(
                                                        orderDetails[5]
                                                      ).map(
                                                        (
                                                          eachService: any,
                                                          index: any
                                                        ) => {
                                                          return (
                                                            index === 6 && (
                                                              <div className="flex justify-between">
                                                                <p className="open-sans">
                                                                  {
                                                                    eachService[0]
                                                                  }
                                                                </p>
                                                                <p className="open-sans">
                                                                  {
                                                                    eachService[1]
                                                                  }
                                                                </p>
                                                              </div>
                                                            )
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                  </div>
                                                </>
                                              }
                                            </>
                                          )}
                                      </div>

                                      <div>
                                        {item.title === "Services" &&
                                          index === 3 && (
                                            <div>
                                              {index === 3 && (
                                                <>
                                                  {serviceLoading ? (
                                                    <div className="flex w-full justify-center items-center h-[80%]">
                                                      <Spinner />
                                                    </div>
                                                  ) : (
                                                    <div>
                                                      {serviceList?.map(
                                                        (
                                                          service: any,
                                                          index: any
                                                        ) => {
                                                          return (
                                                            <div
                                                              className={`flex  cursor-pointer min-w-[90%] border-2 rounded-br rounded-bl border-t-0`}
                                                              onClick={() =>
                                                                handleService(
                                                                  index
                                                                )
                                                              }
                                                            >
                                                              <div
                                                                className="flex flex-col items-center gap-y-[1rem] my-5 w-[100%]"
                                                                style={{
                                                                  boxShadow:
                                                                    "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                                                                }}
                                                                // onClick={() => handleProductsDetails(index)}
                                                              >
                                                                <div
                                                                  className="flex items-center  max-w-[90%] min-w-[90%]  "
                                                                  style={{
                                                                    justifyContent:
                                                                      "space-between",
                                                                    marginRight:
                                                                      "1rem",
                                                                  }}
                                                                >
                                                                  <div
                                                                    className={`flex gap-x-4 ${
                                                                      index ===
                                                                        serviceIndex &&
                                                                      "font-semibold"
                                                                    }`}
                                                                  >
                                                                    {capitalizeFirstLetter(
                                                                      service.partnerName
                                                                    ) +
                                                                      " " +
                                                                      capitalizeFirstLetter(
                                                                        service.serviceMode
                                                                      )}
                                                                  </div>
                                                                  <div>
                                                                    {
                                                                      service.total
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                  )}
                                                </>
                                              )}
                                            </div>
                                          )}
                                      </div>
                                      <div>
                                        {item.title === "Pickup Address" &&
                                          // <p>{key + "-- " + value}</p>
                                          index === 1 && (
                                            <div className="flex gap-x-5 mt-4 mb-2">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.contact
                                                      ?.contactName
                                                  }
                                                  onChange={(e: any) => {
                                                    const nameValue =
                                                      e.target.value;
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.contact.contactName =
                                                      nameValue;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });

                                                    // if (
                                                    //   e.target.value.length ===
                                                    //   0
                                                    // ) {
                                                    //   setValidationError({
                                                    //     ...validationError,
                                                    //     contactName:
                                                    //       "Field is required",
                                                    //   });
                                                    // } else {
                                                    //   setValidationError({
                                                    //     ...validationError,
                                                    //     contactName: "",
                                                    //   });
                                                    // }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                <p className="open-sans text-[12px] text-red-600">
                                                  {validationError.contactName}
                                                </p>
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.contact
                                                      ?.mobileNo
                                                  }
                                                  maxLength={10}
                                                  inputMode="numeric"
                                                  onChange={(e: any) => {
                                                    const numericValue =
                                                      e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                      );
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.contact.mobileNo =
                                                      numericValue;
                                                    if (
                                                      numericValue?.length ===
                                                      10
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        mobileNo: "",
                                                      });
                                                    } else if (
                                                      numericValue?.length === 0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        mobileNo: "",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        mobileNo:
                                                          "Invalid Number",
                                                      });
                                                    }
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                  inputError={inputError}
                                                />
                                                <p className="open-sans text-[12px] text-red-600">
                                                  {validationError.mobileNo}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        {item.title === "Pickup Address" &&
                                          // <p>{key + "-- " + value}</p>
                                          index === 3 && (
                                            <div className="flex gap-x-5 mt-4">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.contact
                                                      ?.emailId
                                                  }
                                                  onChange={(e: any) => {
                                                    const emailValue =
                                                      e.target.value;
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.contact.emailId =
                                                      emailValue;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });

                                                    validateEmailId(emailValue);
                                                  }}
                                                  inputError={inputError}
                                                />
                                                <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.pickUpEmailId
                                                  }
                                                </p>
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.contact
                                                      ?.contactType
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.contact.contactType =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });

                                                    // if (
                                                    //   e.target.value.length ===
                                                    //   0
                                                    // ) {
                                                    //   setValidationError({
                                                    //     ...validationError,
                                                    //     contactType:
                                                    //       "Field is required",
                                                    //   });
                                                    // } else {
                                                    //   setValidationError({
                                                    //     ...validationError,
                                                    //     contactType: "",
                                                    //   });
                                                    // }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                <p className="open-sans text-[12px] text-red-600">
                                                  {validationError.contactType}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        {item.title === "Pickup Address" &&
                                          index === 5 && (
                                            <div className="flex gap-x-5 mt-4">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.flatNo
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.flatNo =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });

                                                    // if (
                                                    //   e.target.value.length ===
                                                    //   0
                                                    // ) {
                                                    //   setValidationError({
                                                    //     ...validationError,
                                                    //     flatNo:
                                                    //       "Field is required",
                                                    //   });
                                                    // } else {
                                                    //   setValidationError({
                                                    //     ...validationError,
                                                    //     flatNo: "",
                                                    //   });
                                                    // }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[14px] text-red-600">
                                                  {validationError.flatNo}
                                                </p> */}
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.locality
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.locality =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });

                                                    if (
                                                      e.target.value?.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        locality:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        locality: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[14px] text-red-600">
                                                  {validationError.locality}
                                                </p> */}
                                              </div>
                                            </div>
                                          )}
                                        {item.title === "Pickup Address" &&
                                          index === 7 && (
                                            <div className="flex gap-x-5 mt-4">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.landmark
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.landmark =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });

                                                    if (
                                                      e.target.value?.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        landmark:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        landmark: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[14px] text-red-600">
                                                  {validationError.landmark}
                                                </p> */}
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.city
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.city =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });

                                                    if (
                                                      e.target.value?.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        city: "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        city: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[14px] text-red-600">
                                                  {validationError.city}
                                                </p> */}
                                              </div>
                                            </div>
                                          )}
                                        {item.title === "Pickup Address" &&
                                          index === 9 && (
                                            <div className="flex gap-x-5 mt-4">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.state
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.state =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });

                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        state:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        state: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[14px] text-red-600">
                                                  {validationError.state}
                                                </p> */}
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.country
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.country =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });

                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        country:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        country: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[14px] text-red-600">
                                                  {validationError.country}
                                                </p> */}
                                              </div>
                                            </div>
                                          )}

                                        {item.title === "Pickup Address" &&
                                          // <p>{key + "-- " + value}</p>
                                          index === 11 && (
                                            <div className="flex gap-x-5 mt-4 mb-2">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress?.pincode
                                                  }
                                                  maxLength={6}
                                                  inputMode="numeric"
                                                  isRequired={true}
                                                  onChange={(e: any) => {
                                                    const numericValue =
                                                      e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                      );
                                                    let temp =
                                                      getPickAddressData;

                                                    temp.pickUpAddress.pincode =
                                                      numericValue;
                                                    if (
                                                      numericValue.length === 6
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        pincode: "",
                                                      });
                                                    } else if (
                                                      numericValue.length === 0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        pincode: "",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        pincode:
                                                          "Pincode must be 6 digits",
                                                      });
                                                    }

                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                  inputError={inputError}
                                                />
                                                <p className="open-sans text-[12px] text-red-600">
                                                  {validationError.pincode}
                                                </p>
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getPickAddressData
                                                      ?.pickUpAddress
                                                      ?.addressType
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.addressType =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });

                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        addressType:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        addressType: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[14px] text-red-600">
                                                  {validationError.addressType}
                                                </p> */}
                                              </div>
                                            </div>
                                          )}

                                        {item.title === "Pickup Address" &&
                                          index === 13 && (
                                            <div className="grid grid-cols-2  mt-2">
                                              <div className="  xl:w-[274px] col-span-1 pr-[10px] xl:pr-[70px] 2xl:pr-[0px]">
                                                <div className="rounded border-[1px]  border-[#A4A4A4]">
                                                  <DatePicker
                                                    value={convertEpochToDateTimeV2(
                                                      +getPickAddressData
                                                        ?.pickUpAddress
                                                        ?.pickupDate
                                                    )}
                                                    onChange={(e: any) => {
                                                      let temp =
                                                        getPickAddressData;
                                                      temp.pickUpAddress.pickupDate =
                                                        +Date.parse(e);
                                                      setGetPickUpAddressData({
                                                        ...temp,
                                                      });
                                                    }}
                                                    placeholderText="Pickup Date"
                                                    className="cursor-pointer removePaddingPlaceHolder  !w-full "
                                                    dateFormat="dd/MM/yyyy"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                        {item?.title === "Status" &&
                                          (index === 7 ||
                                            index === 13 ||
                                            index === 19) && <br />}
                                      </div>

                                      <div>
                                        {item.title === "Delivery Address" &&
                                          index === 1 && (
                                            <div className="flex gap-x-5 mt-4 mb-2">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress?.contact
                                                      ?.contactName
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.contact.contactName =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });

                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryContactName: "",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryContactName: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.deliveryContactName
                                                  }
                                                </p>
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  maxLength={10}
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress?.contact
                                                      ?.mobileNo
                                                  }
                                                  onChange={(e: any) => {
                                                    const numbericValue =
                                                      e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                      );
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.contact.mobileNo =
                                                      numbericValue;
                                                    if (
                                                      numbericValue.length ===
                                                      10
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryMobileNo: "",
                                                      });
                                                    } else if (
                                                      numbericValue.length === 0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryMobileNo: "",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryMobileNo:
                                                          "Invalid Number",
                                                      });
                                                    }
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                  inputError={inputError}
                                                />
                                                <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.deliveryMobileNo
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        {item.title === "Delivery Address" &&
                                          index === 3 && (
                                            <div className="flex gap-x-5 mt-4">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress?.contact
                                                      ?.emailId
                                                  }
                                                  onChange={(e: any) => {
                                                    const emailValue =
                                                      e.target.value;
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.contact.emailId =
                                                      emailValue;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                    validateEmailId(emailValue);
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[12px] text-red-600">
                                                  {validationError.emailId}
                                                </p> */}
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress?.contact
                                                      ?.contactType
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.contact.contactType =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryContactType:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryContactType: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.deliveryContactType
                                                  }
                                                </p> */}
                                              </div>
                                            </div>
                                          )}
                                        {item.title === "Delivery Address" &&
                                          index === 5 && (
                                            <div className="flex gap-x-5 mt-4">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress.flatNo
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.flatNo =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryFlatNo:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryFlatNo: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.deliveryFlatNo
                                                  }
                                                </p> */}
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress.locality
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.locality =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryLocality:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryLocality: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.deliveryLocality
                                                  }
                                                </p> */}
                                              </div>
                                            </div>
                                          )}
                                        {item.title === "Delivery Address" &&
                                          index === 7 && (
                                            <div className="flex gap-x-5 mt-4">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress.landmark
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.landmark =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryLandmark:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryLandmark: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.deliveryLandmark
                                                  }
                                                </p> */}
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress?.city
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.city =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryCity:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryCity: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[12px] text-red-600">
                                                  {validationError.deliveryCity}
                                                </p> */}
                                              </div>
                                            </div>
                                          )}
                                        {item.title === "Delivery Address" &&
                                          // <p>{key + "-- " + value}</p>
                                          index === 9 && (
                                            <div className="flex gap-x-5 mt-4">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress.state
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.state =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryState:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryState: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.deliveryState
                                                  }
                                                </p> */}
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress.country
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.country =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryCountry:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryCountry: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.deliveryCountry
                                                  }
                                                </p> */}
                                              </div>
                                            </div>
                                          )}

                                        {item.title === "Delivery Address" &&
                                          index === 11 && (
                                            <div className="flex gap-x-5 mt-4 mb-2">
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index - 1]
                                                  }
                                                  inputMode="numeric"
                                                  maxLength={6}
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress.pincode
                                                  }
                                                  onChange={(e: any) => {
                                                    const numericValue =
                                                      e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                      );
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.pincode =
                                                      numericValue;
                                                    if (
                                                      numericValue.length === 6
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryPincode: "",
                                                      });
                                                    } else if (
                                                      numericValue.length === 0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryPincode: "",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryPincode:
                                                          "Pincode must be 6 digits",
                                                      });
                                                    }
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                  inputError={inputError}
                                                />
                                                <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.deliveryPincode
                                                  }
                                                </p>
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress
                                                      .addressType
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.addressType =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                    if (
                                                      e.target.value.length ===
                                                      0
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryAddressType:
                                                          "Field is required",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        deliveryAddressType: "",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />
                                                {/* <p className="open-sans text-[12px] text-red-600">
                                                  {
                                                    validationError.deliveryAddressType
                                                  }
                                                </p> */}
                                              </div>
                                            </div>
                                          )}
                                        {item.title === "Delivery Address" &&
                                          index === 13 && (
                                            <div className="grid grid-cols-2   mt-4">
                                              <div className="xl:w-[274px] col-span-1 pr-[10px] xl:pr-[70px] 2xl:pr-[0px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress
                                                      .gstNumber
                                                  }
                                                  onChange={(e: any) => {
                                                    const gstValue =
                                                      e.target.value.toUpperCase();
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.gstNumber =
                                                      gstValue;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                    if (
                                                      gstRegex.test(gstValue)
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        gstValue: "",
                                                      });
                                                    } else if (
                                                      gstValue === ""
                                                    ) {
                                                      setValidationError({
                                                        ...validationError,
                                                        gstValue: "",
                                                      });
                                                    } else {
                                                      setValidationError({
                                                        ...validationError,
                                                        gstValue: "Invalid GST",
                                                      });
                                                    }
                                                  }}
                                                  inputError={inputError}
                                                />

                                                <p className="open-sans text-[12px] text-red-600">
                                                  {validationError.gstValue}
                                                </p>
                                              </div>
                                            </div>
                                          )}

                                        {item?.title === "Status" &&
                                          (index === 7 ||
                                            index === 13 ||
                                            index === 19) && <br />}
                                      </div>
                                    </>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Accordion;
