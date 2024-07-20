import React, { useEffect, useState } from "react";
import { FETCH_ZONE_MATRIX } from "../../utils/ApiUrls";
import toast from "react-hot-toast";
import { POST } from "../../utils/webService";

function ZoneMappingModal({ type }: any) {
  const [zoneMappingData, setZoneMappingData] = useState({});
  const [zoneMappingNameList, setZoneMappingNameList] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchZoneMappingData = async () => {
    setIsloading(true);
    const { data }: any = await POST(FETCH_ZONE_MATRIX, { type: type });

    if (data?.success) {
      setIsloading(false);
      const zoneMatrixData = data?.data?.[0]?.zoneMatrixData?.["From/To"];
      setZoneMappingData(zoneMatrixData);
      const keyListOfZoneMatrixData: any = Object.keys(zoneMatrixData);
      setZoneMappingNameList(keyListOfZoneMatrixData);
    } else {
      toast.error(data?.message);
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchZoneMappingData();
  }, []);

  return (
    <div className="h-full w-full">
      <div className="font-bold text-[24px] flex justify-center my-4  items-center">
        ZONE MAPPING {"("}
        {type}
        {")"}
      </div>
      <div className="h-[85%] overflow-auto show-scrollbar-page">
        <table border={1}>
          <thead>
            <tr>
              <th></th>
              {zoneMappingNameList.map((city) => (
                <th key={city} className="text-[10px] max-w-[90px] border">
                  {city}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {zoneMappingNameList.map((city) => (
              <tr key={city}>
                <td className="text-[10px] font-bold border">{city}</td>
                {zoneMappingNameList.map((innerCity) => (
                  <td
                    key={innerCity}
                    className="text-[10px] min-w-[90px] border"
                  >
                    {zoneMappingData[city][innerCity] || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ZoneMappingModal;
