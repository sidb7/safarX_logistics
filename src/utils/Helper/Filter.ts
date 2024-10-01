import MappingFilter from "../../utils/Helper/MappingFilter.json";
import { GET } from "../../utils/webService";

// Custom validation function to ensure input is not empty
const validateInputData = (inputData: string) => {
  return inputData && inputData.trim().length > 0;
};

// Custom regex for input box filtration
export const inputRegexFilter = async (inputData: any, path: any) => {
  const filteredInput = inputData.replace(/[\s,]+/g, ",").trim();
  const mapper: any = MappingFilter;

  // Perform input validation
  const isValid = validateInputData(filteredInput);
  if (!isValid) {
    return "Please Enter Tracking ID";
  }

  // Read JSON file
  const reqObj = mapper[path];
  const reqType = reqObj["req_type"];
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
    default:
      console.log("Unsupported request type");
  }
};
