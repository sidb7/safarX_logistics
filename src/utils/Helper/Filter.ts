import MappingFilter from "../../utils/Helper/MappingFilter.json";
import { GET, POST } from "../../utils/webService";

// Custom validation function to ensure input is not empty
const validateInputData = (inputData: string) => {
  return inputData && inputData.trim().length > 0;
};

// Custom regex for input box filtration
export const inputRegexFilter = async (
  inputData: any,
  path: any,
  payload?: any
) => {
  // console.log("🚀 ~ inputData:", inputData, path, payload);
  const filteredInput = inputData.replace(/[\s,]+/g, ",").trim();
  const mapper: any = MappingFilter;

  // Perform input validation
  const isValid = validateInputData(filteredInput);
  if (!isValid && inputData?.length !== 0) {
    return "Please Enter Tracking ID";
  }

  // Read JSON file
  const reqObj = mapper[path];
  // console.log("🚀 ~ reqObj:");
  const reqType = reqObj["req_type"];
  // console.log("🚀 ~ reqType:", reqType);
  const responseKey = reqObj["response_key"];

  switch (reqType) {
    case "GET":
      try {
        const apiUrlWithParams = `${reqObj["api"]}?${reqObj["query_key"]}=${filteredInput}`;
        const apiCall = await GET(apiUrlWithParams);
        if (apiCall?.data?.success) {
          const result = apiCall?.data;
          return result;
        } else {
          return apiCall?.data?.message;
        }
      } catch (error: any) {
        console.log("Error during API call:", error.message);
      }
      break;
    case "POST":
      try {
        const apiUrl = `${reqObj["api"]}`;
        const searchKey = reqObj["query_key"];
        let mappingPayload: any = { ...payload };

        const apiCall = await POST(apiUrl, mappingPayload);
        if (apiCall?.data?.success || apiCall?.data?.status) {
          const result = apiCall;
          return result;
        } else {
          return apiCall?.data?.message;
        }
      } catch (error: any) {
        console.log("Error during API call:", error.message);
      }
      break;
    default:
      console.log("Unsupported request type");
  }
};
