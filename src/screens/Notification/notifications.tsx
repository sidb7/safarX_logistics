import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import NotificationCard from "./notificationCard";
// import AccessDenied from "../../components/AccessDenied";
// import { checkPageAuthorized } from "../../redux/reducers/role";
import OnePagination from "../../components/OnePagination/OnePagination";
import { POST } from "../../utils/webService";
import { GET_NOTIFICATIONS } from "../../utils/ApiUrls";
import toast from "react-hot-toast";
import { Spinner } from "../../components/Spinner";

interface INotificationsProps {}

const Notifications: React.FunctionComponent<INotificationsProps> = (props) => {
  const [totalItemCount, setTotalItemCount] = useState<any>();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsData, setNotificationsData] = useState<any>([]);

  const fetchNotifications = async () => {
    let payload = {
      skip: 0,
      limit: itemsPerPage,
      pageNo: 1,
    };
    try {
      setIsLoading(true);
      const { data } = await POST(GET_NOTIFICATIONS, payload);
      if (data?.success) {
        setIsLoading(false);

        setNotificationsData(data?.data || []);
        setTotalItemCount(data?.totalNotifications);
      } else {
        toast.error(data?.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //on page change index
  const onPageIndexChange = async (pageIndex: any) => {
    const { data } = await POST(GET_NOTIFICATIONS, {
      pageNo: pageIndex?.currentPage,
      limit: pageIndex?.itemsPerPage,
    });
    if (data?.success) {
      setIsLoading(false);

      setNotificationsData(data?.data || []);
    } else {
      toast.error(data?.message);
      setIsLoading(false);
    }
  };

  // on per page item change
  const onPerPageItemChange = async (ItemChange: any) => {
    const { data } = await POST(GET_NOTIFICATIONS, {
      pageNo: ItemChange?.currentPage,
      limit: ItemChange?.itemsPerPage,
    });
    if (data?.success) {
      setIsLoading(false);

      setNotificationsData(data?.data || []);
      setTotalItemCount(data?.totalNotifications);
    } else {
      toast.error(data?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // useEffect(() => {
  //   setIsActive(checkPageAuthorized("Notifications"));
  // }, []);

  return (
    <>
      <div>
        <Breadcrum label="Notifications" />
        {isLoading ? (
          <div className="flex justify-center w-[100%] h-[40vh] items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div
              className="flex-1 overflow-y-auto px-5 "
              style={{ maxHeight: "calc(100vh - 280px)" }}
            >
              <div className="flex flex-col gap-y-[18px]">
                {notificationsData?.length === 0 && !isLoading ? (
                  <>
                    <div className="w-full h-96 bg-[#f7f7f7] hover:bg-[#e9e9e9] flex rounded-lg justify-center items-center font-Open text-base font-semibold leading-6">
                      No Data Found
                    </div>
                  </>
                ) : (
                  <>
                    {notificationsData?.map((data: any, index: any) => {
                      return (
                        //commented as statics data is passing and showing no data found
                        <NotificationCard
                          label={data?.title}
                          description={data?.description}
                          time={data?.dateTime}
                          media={data?.media}
                          key={index}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <div className="">
              {totalItemCount > 0 && (
                <OnePagination
                  totalItems={totalItemCount}
                  itemsPerPageOptions={[
                    10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000,
                  ]}
                  onPageChange={onPageIndexChange}
                  onItemsPerPageChange={onPerPageItemChange}
                  initialItemsPerPage={itemsPerPage}
                  className="!mb-0"
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Notifications;
