import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  markAllAsRead,
  markAsRead,
  clearAll,
  removeNotification,
} from "../../redux/reducers/notificationReducer";
import bellIcon from "../../assets/Navbar/notification.svg";
import { useEffect, useRef, useState } from "react";
import OneButton from "../../components/Button/OneButton";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  title?: string;
}

export default function NotificationBell() {
  const dispatch = useDispatch();
  const { unreadCount, notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(
    (notification: Notification) => {
      switch (activeTab) {
        case "unread":
          return !notification.read;
        case "read":
          return notification.read;
        default:
          return true;
      }
    }
  );

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const handleNotificationClick = (notificationId: string) => {
    dispatch(markAsRead(notificationId));
  };

  const handleRemoveNotification = (
    notificationId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    dispatch(removeNotification(notificationId));
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Bell Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          // className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <img
            src={bellIcon}
            alt="Notifications"
            className="w-5 h-5 text-gray-600 mt-[2px]"
          />

          {/* Notification Badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-[18px] h-[18px] text-[11px] flex items-center justify-center font-medium animate-pulse">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-Open font-semibold text-gray-900 leading-4">
                  Notifications
                </h3>
                <div className="flex">
                  <button
                    onClick={() => dispatch(markAllAsRead())}
                    className="text-[14px] text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-100 px-3 py-2 font-Open font-semibold transition-colors"
                  >
                    Mark all as read
                  </button>
                  <button
                    onClick={() => dispatch(clearAll())}
                    className="text-[14px] text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-200 px-3 py-2 font-semibold transition-colors font-Open"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="flex justify-between">
                <div className="space-x-1">
                  {(["all", "unread", "read"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                        activeTab === tab
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {tab}
                      {tab === "unread" && unreadCount > 0 && (
                        <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <OneButton
                  onClick={() => {
                    navigate("notifications/notifications");
                    setIsOpen(false);
                  }}
                  text={"View All"}
                  variant="tertiary"
                  className="!text-xs !font-Open !font-semibold !leading-5"
                />
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5-5-5h5v-6h5v6z"
                    />
                  </svg>
                  <p className="font-Open text-[15px] font-semibold leading-5">
                    No notifications to show
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification: Notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors group ${
                      !notification.read
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Simple notification icon */}
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        {notification.title && (
                          <p
                            className={`text-[15px] font-Open leading-[22px] font-semibold text-gray-900 mb-1 ${
                              !notification.read ? "font-bold" : ""
                            }`}
                          >
                            {notification.title}
                          </p>
                        )}
                        <p
                          className={`text-sm font-Open font-normal leading-5 text-gray-600 ${
                            !notification.read ? "font-medium" : ""
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 font-Open font-normal leading-4 mt-1">
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <div
                            className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"
                            title="Mark as Read"
                          ></div>
                        )}
                        <button
                          onClick={(e) =>
                            handleRemoveNotification(notification.id, e)
                          }
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-red-100 transition-all duration-200"
                          title="Remove notification"
                        >
                          <svg
                            className="w-4 h-4 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
