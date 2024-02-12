import { useEffect, useState } from "react";
import { GET_SELLER_ORDER_COMPLETE_DATA } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { capitalizeFirstLetter } from "../../utils/utility";
import { date_DD_MMM_YYYY_HH_MM_SS } from "../../utils/dateFormater";
import { Spinner } from "../../components/Spinner/index";
import CustomInputBox from "../../components/Input";
import { GET_PINCODE_DATA, UPDATE_TEMP_ORDER_INFO } from "../../utils/ApiUrls";
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
import Index from "../InputBox";

interface ICustomTableAccordion {
  data?: any;
}

const Accordion = (props: ICustomTableAccordion) => {
  const { data } = props;
  const [openIndex, setOpenIndex] = useState(null);
  console.log("openIndex", openIndex);
  const [orderDetails, setOrderDetails]: any = useState([]);
  console.log("orderDetails", orderDetails);
  const [isLoading, setIsLoading]: any = useState(false);
  const [pincode, setPincode] = useState<any>();
  const [pincodeData, setPincodeData] = useState<any>({});
  const [boxProductDetails, setBoxProductDetails] = useState<any>();
  const [productAccordian, setproductAccordian] = useState<any>([]);

  useEffect(() => {
    setproductAccordian(boxProductDetails?.boxInfo?.[0]?.products);
  }, [boxProductDetails]);

  //this was written for the products
  // const [productDetails, setProductDetails] = useState<any>({
  //   products: {
  //     deadWeight: "",
  //     volumetricWeight: "",
  //     measureUnit: "",
  //     length: "",
  //     breadth: "",
  //     height: "",
  //   },
  // });

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

      // Products: [],
    },
  ]);

  // console.log("productDetails%%%%%%%", productDetails);
  const [boxDetails, setBoxDetails] = useState<any>();
  const [accordian, setAccordian] = useState<any>(false);
  const [boxAccordian, setBoxAccordian] = useState<any>(false);

  // console.log("lengthofproduct", productDetails[0]?.Products[0]);

  const navigate = useNavigate();

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

  const [addressOpenModal, setAddressOpenModal] = useState(false);
  const measureUnits = [
    {
      label: "Cm",
      value: "Cm",
    },
  ];

  const entries: any = document?.getElementsByClassName("entries");

  const hanldeProducts = async (eachProduct: any, index: any) => {
    let temp = boxProductDetails?.boxInfo?.[0]?.products;
    for (let i = 0; i < temp?.length; i++) {
      if (index === i) {
        setAccordian(!accordian);
      }
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
        temp[i][fieldName] = Number(value);
      }
    }
    boxProductDetails.boxInfo[0].products = temp;

    console.log("🚀 ~ Accordion ~ temp:", boxProductDetails);
  };

  //for box updation
  const handleBoxInputUpdation = (
    box_index: any,
    value: any,
    fieldName: any
  ) => {
    let boxTemp = boxProductDetails?.boxInfo;
    for (let i = 0; i < boxTemp?.length; i++) {
      if (box_index === i) {
        boxTemp[i][fieldName] = Number(value);
      }
      boxProductDetails.boxInfo = boxTemp;
      console.log("🚀 ~ Accordion ~ temp:", boxProductDetails);
    }
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
      // delete deliveryAddress.Type;
      delete deliveryAddress.title;
      // delete deliveryAddress["Email Id"];
      // delete deliveryAddress["Address Type"];
      const pickAddress = orderDetails[0];
      // delete deliveryAddress.Type;
      delete pickAddress.title;
      setOrderDetails({ ...orderDetails, deliveryAddress });
    }
  }, []);

  useEffect(() => {
    setGetPickUpAddressData(getPickAddressData);
  }, [getPickAddressData]);

  const entriesHeight = entries?.[0]?.offsetHeight;

  const handleItemClick = async (index: any, requestName?: string) => {
    setOpenIndex(openIndex === index ? null : index);

    setAddressOpenModal(!addressOpenModal);
    if (openIndex === 0) {
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
        if (data?.success) {
          toast.success("Update Success");
          let temp: any;
          temp.pickUpAddress.pickupDate = "";
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (openIndex === 1) {
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
        if (data?.success) {
          toast.success("Update Success");
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchPincodeData = async (e: any) => {
    if (!isNaN(e.target.value)) {
      setPincode(e.target.value);
    }
    if (e.target.value.length === 6) {
      const payload = {
        pincode: e.target.value,
      };
      const { data: response } = await POST(GET_PINCODE_DATA, payload);

      setPincodeData(response?.data[0]);
    }
  };

  const getSellerOrderCompleteData = async (orderData: any) => {
    // GET_SELLER_ORDER_COMPLETE_DATA
    try {
      setIsLoading(true);
      const { data } = await POST(GET_SELLER_ORDER_COMPLETE_DATA, {
        tempOrderId: orderData?.orderId?.split("T")[1],
        awb: orderData?.awb ? orderData?.awb : "0",
      });

      // console.log(
      //   "dataproduct",
      //   data?.data[0]?.data[0]?.boxInfo[0]?.appliedWeight
      // );
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

      //this was written for the products
      // let productTemp;
      // productTemp = productDetails;
      // productTemp.products.deadWeight =
      //   data?.data[0]?.data[0]?.boxInfo[0]?.products[0]?.deadWeight;
      // productTemp.products.volumetricWeight =
      //   data?.data[0]?.data[0]?.boxInfo[0]?.products[0]?.volumetricWeight;
      // productTemp.products.measureUnit =
      //   data?.data[0]?.data[0]?.boxInfo[0]?.products[0]?.measureUnit;
      // productTemp.products.length =
      //   data?.data[0]?.data[0]?.boxInfo[0]?.products[0]?.length;
      // productTemp.products.breadth =
      //   data?.data[0]?.data[0]?.boxInfo[0]?.products[0]?.breadth;
      // productTemp.products.height =
      //   data?.data[0]?.data[0]?.boxInfo[0]?.products[0]?.height;

      // images: [],
      // products: [
      //   {
      //     companyId: "",
      //     privateCompanyId: 0,
      //     sellerId: 0,
      //     productId: "",
      //     name: "",
      //     category: "",
      //     qty: 0,
      //     sku: "",
      //     hsnCode: "",
      //     currency: "",
      //     unitPrice: 0,
      //     unitTax: 0,
      //     measureUnit: "",
      //     length: 0,
      //     breadth: 0,
      //     height: 0,
      //     deadWeight: 0,
      //     weightUnit: "",
      //     volumetricWeight: 0,
      //     appliedWeight: 0,
      //     divisor: 0,
      //     images: [],
      //     selected: "",
      //   },
      // ],
      // payloads: [],

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
        // console.log(
        //   "rowsData****",
        //   rowsData?.boxInfo?.[0]?.products?.[0]?.name
        // );
        setBoxProductDetails(rowsData);
        // console.log("rowDataaaaaaaa", rowsData?.boxInfo?.[0]?.products);
        setBoxDetails(rowsData);

        let updateData;
        updateData = updatePayload;
        updateData.orderId = rowsData?.orderId;
        updateData.tempOrderId = rowsData?.tempOrderId;
        updateData.source = rowsData?.source;
        setUpdatePayload({ ...updateData });

        let rows: any = [
          {
            "contact Name": capitalizeFirstLetter(
              rowsData?.pickupAddress?.contact?.name
            ),
            "Mobile No": rowsData?.pickupAddress?.contact?.mobileNo,
            "Email Id": capitalizeFirstLetter(
              rowsData?.pickupAddress?.contact?.emailId
            ),
            "contact Type": capitalizeFirstLetter(
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
            "contact Name": capitalizeFirstLetter(
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
          // console.log("descriptionBookedOrder", elem?.description);
          statusObj = {
            ...statusObj,
            [`AWB No ${index + 1}`]: orderData?.awb,
            [`Current Status ${index + 1}`]: capitalizeFirstLetter(
              elem?.currentStatus
            ),
            // [`Description ${index + 1}`]: capitalizeFirstLetter(
            //   elem?.description
            // ),
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
      // for (let key in productDetails[0].Products[0]) {
      //   // console.log("key", key);
      //   if (productDetails[0].Products[0].hasOwnProperty(key)) {
      //     for (
      //       let i = 0;
      //       i < data?.data[0]?.data[0]?.boxInfo[0]?.products?.length;
      //       i++
      //     ) {
      //       productDetails[0].Products[0][key] =
      //         data?.data[0]?.data[0]?.boxInfo[0]?.products[i][key];

      //       console.log(
      //         "data?.data[0]?.data[0]?.boxInfo[0]?.products?.length",
      //         data?.data[0]?.data[0]?.boxInfo[0]?.products?.length,
      //         i
      //       );
      //     }
      //   }
      // }
    } catch (error) {
      setIsLoading(false);
      return [];
    }
  };

  // console.log("ProA", productAccordian);

  return (
    <div className="overflow-auto h-[100%] pb-[2rem]">
      {isLoading ? (
        <div className="flex w-full justify-center items-center h-[80%]">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="w-[100%] p-[1rem] items-start overflow-auto">
            {orderDetails.length > 0 &&
              orderDetails?.map((item: any, index: any) => {
                console.log("item", item);
                // if (item?.title === "Services") {
                //   console.log("servicessss");
                // }

                return (
                  item?.title && (
                    <div
                      className="flex flex-col mb-3 cursor-pointer"
                      key={index}
                    >
                      <div
                        className={`flex flex-col select-none gap-y-[1rem] justify-between p-3 h-[52px] border-[1px] border-[#E8E8E8] ${
                          openIndex === index
                            ? "bg-[black] text-[white] rounded-tr-lg rounded-tl-lg rounded-b-none "
                            : "bg-[white] text-[black] rounded-lg "
                        }`}
                        onClick={(e: any) =>
                          handleItemClick(index, e.target.textContent)
                        }
                      >
                        {item?.title}
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
                                      // onClick={() => handleProductsDetails(index)}
                                    >
                                      {/* {productAccordian} */}
                                      {/* {boxProductDetails?.boxInfo?.[0]?.products.map( */}
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
                                                      // setAccordian(true)
                                                      let temp = [
                                                        ...productAccordian,
                                                      ];

                                                      if (
                                                        eachProduct.isCollapse ===
                                                        true
                                                      ) {
                                                        eachProduct.isCollapse =
                                                          false;
                                                        setproductAccordian(
                                                          temp
                                                        );
                                                      } else {
                                                        eachProduct.isCollapse =
                                                          false;
                                                        setproductAccordian(
                                                          temp
                                                        );
                                                      }
                                                      hanldeProducts(
                                                        index,
                                                        eachProduct
                                                      );
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
                                                        <img
                                                          src={DownwardArrow}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {true && (
                                                    <div className="border-b-2 border-l-2 border-r-2 border-black-600 pt-4 pb-2 rounded-md">
                                                      <div className="flex justify-between w-[100%] gap-x-[2rem] px-[1rem]">
                                                        <InputBox
                                                          label="Dead Weight (Kg)"
                                                          // value={
                                                          //   eachProduct?.deadWeight
                                                          // }
                                                          defaultValue={
                                                            eachProduct?.deadWeight
                                                          }
                                                          name="deadWeight"
                                                          inputType="text"
                                                          inputMode="numeric"
                                                          onChange={(
                                                            e: any
                                                          ) => {
                                                            handleInputUpdation(
                                                              index,
                                                              e.target.value,
                                                              "deadWeight"
                                                            );
                                                          }}
                                                        />

                                                        <InputBox
                                                          label="Volumetric Weight"
                                                          // value={
                                                          //   productDetails[0]
                                                          //     ?.Products[0]
                                                          //     ?.volumetricWeight
                                                          // }
                                                          defaultValue={
                                                            eachProduct?.volumetricWeight
                                                          }
                                                          name="volumetricWeight"
                                                          inputType="number"
                                                          // onChange={(e: any) => {
                                                          //   let temp =
                                                          //     productDetails;
                                                          //   temp.products.volumetricWeight =
                                                          //     e.target.value;
                                                          //   setProductDetails({
                                                          //     ...temp,
                                                          //   });
                                                          // }}
                                                          onChange={(
                                                            e: any
                                                          ) => {
                                                            handleInputUpdation(
                                                              index,
                                                              e.target.value,
                                                              "volumetricWeight"
                                                            );
                                                          }}
                                                        />
                                                      </div>
                                                      <div className="flex justify-between  w-[100%] gap-x-[2rem] px-[1rem]  mt-2">
                                                        <div className="w-[50%]">
                                                          <CustomDropDown
                                                            onChange={() => {}}
                                                            options={
                                                              measureUnits
                                                            }
                                                          />
                                                        </div>
                                                        <div className="flex w-[50%] gap-x-4">
                                                          <InputBox
                                                            label="L"
                                                            inputType="text"
                                                            inputMode="numeric"
                                                            name="length"
                                                            // value={
                                                            //   productDetails[0]
                                                            //     ?.Products[0]
                                                            //     ?.length
                                                            // }
                                                            defaultValue={
                                                              eachProduct?.length
                                                            }
                                                            // onChange={(
                                                            //   e: any
                                                            // ) => {
                                                            //   let temp =
                                                            //     productDetails;
                                                            //   temp.products.length =
                                                            //     e.target.value;
                                                            //   setProductDetails({
                                                            //     ...temp,
                                                            //   });
                                                            // }}
                                                            onChange={(
                                                              e: any
                                                            ) => {
                                                              handleInputUpdation(
                                                                index,
                                                                e.target.value,
                                                                "length"
                                                              );
                                                            }}
                                                          />
                                                          <InputBox
                                                            label="B"
                                                            // value={
                                                            //   productDetails[0]
                                                            //     ?.Products[0]
                                                            //     ?.breadth
                                                            // }
                                                            defaultValue={
                                                              eachProduct?.breadth
                                                            }
                                                            name="breadth"
                                                            inputType="text"
                                                            inputMode="numeric"
                                                            // onChange={(
                                                            //   e: any
                                                            // ) => {
                                                            //   let temp =
                                                            //     productDetails;
                                                            //   temp.products.breadth =
                                                            //     e.target.value;
                                                            //   setProductDetails({
                                                            //     ...temp,
                                                            //   });
                                                            // }}
                                                            onChange={(
                                                              e: any
                                                            ) => {
                                                              handleInputUpdation(
                                                                index,
                                                                e.target.value,
                                                                "breadth"
                                                              );
                                                            }}
                                                          />
                                                          <InputBox
                                                            label="H"
                                                            // value={
                                                            //   // eachProduct?.height
                                                            //   productDetails[0]
                                                            //     ?.Products[0]
                                                            //     ?.height
                                                            // }
                                                            defaultValue={
                                                              eachProduct?.breadth
                                                            }
                                                            name="height"
                                                            inputType="text"
                                                            inputMode="numeric"
                                                            // onChange={(
                                                            //   e: any
                                                            // ) => {
                                                            //   let temp =
                                                            //     productDetails;
                                                            //   temp.products.height =
                                                            //     e.target.value;
                                                            //   setProductDetails({
                                                            //     ...temp,
                                                            //   });
                                                            // }}
                                                            onChange={(
                                                              e: any
                                                            ) => {
                                                              handleInputUpdation(
                                                                index,
                                                                e.target.value,
                                                                "height"
                                                              );
                                                            }}
                                                          />
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
                                          console.log("log", eachBox);
                                          return (
                                            <div className="w-full">
                                              <div className="w-full">
                                                <div
                                                  className="border-2  border-black-600 p-2 flex justify-between w-full rounded-md"
                                                  onClick={() =>
                                                    setBoxAccordian(
                                                      !boxAccordian
                                                    )
                                                  }
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
                                                    <img src={DownwardArrow} />
                                                  </div>
                                                </div>
                                                {boxAccordian && (
                                                  <div className="border-b-2 border-l-2 border-r-2 border-black-600 pt-4 pb-2 rounded-md">
                                                    <div className="flex justify-between w-[100%] gap-x-[2rem] px-[1rem]">
                                                      <InputBox
                                                        label="Dead Weight (Kg)"
                                                        // value={
                                                        //   eachBox?.deadWeight
                                                        // }
                                                        defaultValue={
                                                          eachBox?.breadth
                                                        }
                                                        name="deadWeight"
                                                        inputType="text"
                                                        inputMode="numeric"
                                                        // onChange={(e: any) => {
                                                        //   if (
                                                        //     !isNaN(
                                                        //       e.target.value
                                                        //     )
                                                        //   ) {
                                                        //     // onChaneDimensionHandler(e);
                                                        //   }
                                                        // }}
                                                        onChange={(e: any) =>
                                                          handleBoxInputUpdation(
                                                            index,
                                                            e.target.value,
                                                            "deadWeight"
                                                          )
                                                        }
                                                      />
                                                      <InputBox
                                                        label="Volumetric Weight"
                                                        // value={
                                                        //   eachBox?.volumetricWeight
                                                        // }
                                                        defaultValue={
                                                          eachBox?.volumetricWeight
                                                        }
                                                        name="volumetricWeight"
                                                        inputType="number"
                                                        // isDisabled={true}
                                                        onChange={(e: any) => {
                                                          handleBoxInputUpdation(
                                                            index,
                                                            e.target.value,
                                                            "volumetricWeight"
                                                          );
                                                        }}
                                                      />
                                                    </div>
                                                    <div className="flex justify-between w-[100%] gap-x-[2rem] px-[1rem] mt-2">
                                                      <div className="w-[50%]">
                                                        <CustomDropDown
                                                          onChange={() => {}}
                                                          options={measureUnits}
                                                        />
                                                      </div>
                                                      <div className="flex w-[50%] gap-x-4">
                                                        <InputBox
                                                          label="L"
                                                          inputType="text"
                                                          inputMode="numeric"
                                                          name="length"
                                                          // value={
                                                          //   eachBox?.length
                                                          // }
                                                          defaultValue={
                                                            eachBox?.length
                                                          }
                                                          // onChange={(
                                                          //   e: any
                                                          // ) => {
                                                          //   if (
                                                          //     !isNaN(
                                                          //       e.target.value
                                                          //     )
                                                          //   ) {
                                                          //     // onChaneDimensionHandler(e);
                                                          //   }
                                                          // }}
                                                          onChange={(
                                                            e: any
                                                          ) => {
                                                            handleBoxInputUpdation(
                                                              index,
                                                              e.target.value,
                                                              "length"
                                                            );
                                                          }}
                                                        />
                                                        <InputBox
                                                          label="B"
                                                          // value={
                                                          //   eachBox?.breadth
                                                          // }
                                                          defaultValue={
                                                            eachBox?.breadth
                                                          }
                                                          name="breadth"
                                                          inputType="text"
                                                          inputMode="numeric"
                                                          // onChange={(
                                                          //   e: any
                                                          // ) => {
                                                          //   if (
                                                          //     !isNaN(
                                                          //       e.target.value
                                                          //     )
                                                          //   ) {
                                                          //     // onChaneDimensionHandler(e);
                                                          //   }
                                                          // }}
                                                          onChange={(
                                                            e: any
                                                          ) => {
                                                            handleBoxInputUpdation(
                                                              index,
                                                              e.target.value,
                                                              "breadth"
                                                            );
                                                          }}
                                                        />
                                                        <InputBox
                                                          label="H"
                                                          // value={
                                                          //   eachBox?.height
                                                          // }
                                                          defaultValue={
                                                            eachBox.height
                                                          }
                                                          name="height"
                                                          inputType="text"
                                                          inputMode="numeric"
                                                          // onChange={(
                                                          //   e: any
                                                          // ) => {
                                                          //   if (
                                                          //     !isNaN(
                                                          //       e.target.value
                                                          //     )
                                                          //   ) {
                                                          //     // onChaneDimensionHandler(e);
                                                          //   }
                                                          // }}
                                                          onChange={(
                                                            e: any
                                                          ) => {
                                                            handleBoxInputUpdation(
                                                              index,
                                                              e.target.value,
                                                              "height"
                                                            );
                                                          }}
                                                        />
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
                                    // <div className="flex">
                                    //   {index < 2 && (
                                    //     <div className=" mt-1 w-[30%] py-[0.5rem] px-[1rem] border-2 border-b-0"></div>
                                    //   )}
                                    //   {index === 5 && (
                                    //     <div className=" mt-1 w-[30%] py-[0.5rem] px-[1rem] border-2 border-b-0 border-t-0">
                                    //       Products 1
                                    //     </div>
                                    //   )}
                                    //   {index < 9 && index > 1 && index != 5 && (
                                    //     <div className=" mt-1 w-[30%] py-[0.5rem] px-[1rem] border-r-2 border-l-2"></div>
                                    //   )}
                                    //   <div
                                    //     className={`flex w-[100%] mt-1 border-2 py-[0.5rem] ${
                                    //       index % 2 === 0 ? "bg-[#F9FBFC]" : "bg-white"
                                    //     }`}
                                    //     key={key}
                                    //   >
                                    //     <div className=" w-[35%] px-[1rem] border-r-2">
                                    //       <strong>{key}:</strong>
                                    //     </div>
                                    //     <div className="px-[1rem] ">{value}</div>
                                    //   </div>
                                    // </div>

                                    <>
                                      <div>
                                        {item.title === "Other Details" &&
                                          index === 5 && (
                                            <>
                                              {
                                                <div>
                                                  {Object.entries(
                                                    orderDetails[5]
                                                  ).map(
                                                    (
                                                      eachService: any,
                                                      index: any
                                                    ) => {
                                                      console.log(
                                                        "eachService",
                                                        eachService
                                                      );
                                                      return (
                                                        index === 4 && (
                                                          <div>
                                                            <p className="open-sans">
                                                              {eachService[1]}
                                                            </p>
                                                          </div>
                                                        )
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              }
                                            </>
                                          )}
                                      </div>
                                      <div>
                                        {item.title === "Services" &&
                                          index === 3 && (
                                            <>
                                              <div className="flex justify-between">
                                                <div className="flex gap-x-2">
                                                  <div>
                                                    {Object.entries(
                                                      boxProductDetails
                                                        ?.boxInfo[0].service
                                                    ).map(
                                                      (
                                                        eachService: any,
                                                        index: any
                                                      ) => {
                                                        console.log(
                                                          "eachService",
                                                          eachService
                                                        );
                                                        return (
                                                          index === 4 && (
                                                            <div>
                                                              <p className="open-sans">
                                                                {eachService[1]}
                                                              </p>
                                                            </div>
                                                          )
                                                        );
                                                      }
                                                    )}
                                                  </div>
                                                  <div>
                                                    {Object.entries(
                                                      boxProductDetails
                                                        ?.boxInfo[0].service
                                                    ).map(
                                                      (
                                                        eachService: any,
                                                        index: any
                                                      ) => {
                                                        console.log(
                                                          "eachService",
                                                          eachService
                                                        );
                                                        return (
                                                          index === 3 && (
                                                            <div>
                                                              <p className="text-[#3B3535] open-sans">
                                                                {eachService[1]}
                                                              </p>
                                                            </div>
                                                          )
                                                        );
                                                      }
                                                    )}
                                                  </div>
                                                  <div>
                                                    {Object.entries(
                                                      boxProductDetails
                                                        ?.boxInfo[0].service
                                                    ).map(
                                                      (
                                                        eachService: any,
                                                        index: any
                                                      ) => {
                                                        console.log(
                                                          "eachService",
                                                          eachService
                                                        );
                                                        return (
                                                          index === 5 && (
                                                            <div>
                                                              <p className="text-[#AFA8A8] open-sans">
                                                                {eachService[1]}
                                                              </p>
                                                            </div>
                                                          )
                                                        );
                                                      }
                                                    )}
                                                  </div>
                                                </div>
                                                <div>
                                                  {Object.entries(
                                                    boxProductDetails
                                                      ?.boxInfo[0].service
                                                  ).map(
                                                    (
                                                      eachService: any,
                                                      index: any
                                                    ) => {
                                                      console.log(
                                                        "eachService",
                                                        eachService
                                                      );
                                                      return (
                                                        index === 15 && (
                                                          <div>
                                                            <p className="text-[#AFA8A8] open-sans">
                                                              {eachService[1]}
                                                            </p>
                                                          </div>
                                                        )
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              </div>
                                            </>
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
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.contact.contactName =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                />
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
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.contact.mobileNo =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                />
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
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.contact.emailId =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getPickAddressData;
                                                    temp.pickUpAddress.pincode =
                                                      e.target.value;
                                                    setGetPickUpAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                />
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
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          )}
                                        {/* {
                                          getPickAddressData?.pickUpAddress
                                            ?.pickupDate
                                        } */}
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
                                                  }}
                                                />
                                              </div>
                                              <div className="xl:w-[274px]">
                                                <CustomInputBox
                                                  label={
                                                    Object.keys(item)[index]
                                                  }
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress?.contact
                                                      ?.mobileNo
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.contact.mobileNo =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                />
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
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.contact.emailId =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                  value={
                                                    getDeliveryAddressData
                                                      ?.deliveryAddress.pincode
                                                  }
                                                  onChange={(e: any) => {
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.pincode =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                />
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
                                                  }}
                                                />
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
                                                    let temp =
                                                      getDeliveryAddressData;
                                                    temp.deliveryAddress.gstNumber =
                                                      e.target.value;
                                                    setGetDeliveryAddressData({
                                                      ...temp,
                                                    });
                                                  }}
                                                />
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
