import React, { useState } from "react";
import CustomInputBox from "../../components/Input";
import Checkbox from "../../components/CheckBox";
// import Checkbox from "../../../components/CheckBox";

interface IFeatureRateCardProps {}

const FeatureRateCard: React.FunctionComponent<IFeatureRateCardProps> = (
  props
) => {
  const [featureRateCardData, setFeatureRateCardData] = useState<any>({
    companyId: "",
    createdBy: "",
    created_At: "",
    updatedBy: "",
    updated_At: "",
    featureRateCard: [
      {
        featureTitle: "Pre-Shipment",
        isActive: false,
        featureSubMenu: [
          {
            featureSubTitle: "Catalog Management",
            isActive: true,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "AI based Carrier allocation",
            isActive: true,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Marketplace Channel Integrations",
            isActive: true,
            type: "checkbox",
            submenu: [
              {
                name: "Woocommerce",
                type: "checkbox",
                isActive: true,
              },
              {
                name: "Shopify",
                type: "checkbox",
                isActive: true,
              },
              {
                name: "Amazon",
                type: "checkbox",
                isActive: true,
              },
              {
                name: "Unicommerce",
                type: "checkbox",
                isActive: false,
              },
              {
                name: "Easycom",
                type: "checkbox",
                isActive: false,
              },
              {
                name: "Clickpost",
                type: "checkbox",
                isActive: false,
              },
              {
                name: "Vinculum",
                type: "checkbox",
                isActive: false,
              },
            ],
            module: ["a", "ab"],
          },
        ],
      },
      {
        featureTitle: "Order Creation",
        isActive: false,
        featureSubMenu: [
          {
            featureSubTitle: "Single dashboard for all orders",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Real-time serviceability check",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Bulk orders creation",
            isActive: false,
            type: "input",
            value: 0,
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Multi Carrier Integration",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Carrier EDD integrations",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Manifestation and Labels",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Cancellation of orders",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Customised labels",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
        ],
      },
      {
        featureTitle: "Tracking",
        isActive: false,
        featureSubMenu: [
          {
            featureSubTitle: "Standardized tracking statuses",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Real time shipment tracking dashboard",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Order tracking dashboard",
            isActive: false,
            type: "input",
            value: 0,
            module: ["a", "ab"],
          },
        ],
      },
      {
        featureTitle: "Post-delivery Management",
        isActive: false,
        featureSubMenu: [
          {
            featureSubTitle: "View and track COD remittances",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
        ],
      },
      {
        featureTitle: "Return",
        isActive: false,
        featureSubMenu: [
          {
            featureSubTitle: "Return carrier recommendation",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Real-time tracking of RTO",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
        ],
      },
      {
        featureTitle: "Analytics",
        isActive: false,
        featureSubMenu: [
          {
            featureSubTitle: "Shipment reports",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Analytics on dashboard",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
        ],
      },
      {
        featureTitle: "Support",
        isActive: false,
        featureSubMenu: [
          {
            featureSubTitle: "Self-service help center",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
          {
            featureSubTitle: "Priority Support",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
        ],
      },
      {
        featureTitle: "Organization management",
        isActive: false,
        featureSubMenu: [
          {
            featureSubTitle: "Default member roles and permissions",
            isActive: false,
            type: "checkbox",
            module: ["a", "ab"],
          },
        ],
      },
    ],
    menu: [
      {
        id: "a",
        name: "Dashboard",
        pages: [],
        menu: [
          {
            id: "ab",
            name: "Overview",
            pages: [
              {
                id: "abc",
                name: "Overview",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/dashboard/overview",
            isActive: true,
          },
          {
            id: "abcd",
            name: "Orders",
            pages: [
              {
                id: "abcde",
                name: "Orders",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/dashboard/orders",
            isActive: true,
          },
          {
            id: "abcdef",
            name: "Exception",
            pages: [
              {
                id: "abcdefg",
                name: "Exception",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/dashboard/exception",
            isActive: true,
          },
          {
            id: "abcdefgh",
            name: "SY Performance",
            pages: [
              {
                id: "abcdefghi",
                name: "SY Performance",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/dashboard/sy-performance",
            isActive: true,
          },
        ],
        icon: "Dashboard",
        isActive: true,
        sequence: 0,
      },
      {
        id: "b",
        name: "Orders",
        pages: [],
        menu: [
          {
            id: "bc",
            name: "View Orders",
            pages: [
              {
                id: "bcd",
                name: "View Orders",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/orders/view-orders?activeTab=draft",
            isActive: true,
          },
          {
            id: "bcde",
            name: "Add Order",
            pages: [
              {
                id: "bcdef",
                name: "Pickup",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
              {
                id: "bcdefg",
                name: "Delivery",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
              {
                id: "bcdefgh",
                name: "Product",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
              {
                id: "bcdefghi",
                name: "Service",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
              {
                id: "bcdefghij",
                name: "Summary",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
              {
                id: "bcdefghijk",
                name: "Payment",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/orders/add-order/pickup",
            isActive: true,
          },
          {
            id: "bcdefghijkl",
            name: "Add Bulk",
            pages: [
              {
                id: "bcdefghijklm",
                name: "Add Bulk",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/orders/add-bulk",
            isActive: true,
          },
          {
            id: "bcdefghijklmn",
            name: "Rule Engine",
            pages: [
              {
                id: "bcdefghijklmno",
                name: "Rule Engine",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/orders/rule-engine",
            isActive: true,
          },
        ],
        icon: "Orders",
        isActive: true,
        sequence: 1,
      },
      {
        id: "l",
        name: "Tracking",
        pages: [],
        menu: [
          {
            id: "lm",
            name: "Tracking",
            pages: [
              {
                id: "lmn",
                name: "Tracking",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/tracking",
            isActive: true,
          },
        ],
        icon: "Tracking",
        isActive: true,
        sequence: 2,
      },
      {
        id: "c",
        name: "Wallet",
        pages: [],
        menu: [
          {
            id: "cd",
            name: "View Wallet",
            pages: [
              {
                id: "cde",
                name: "View Wallet",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/wallet/view-wallet",
            isActive: true,
          },
          {
            id: "cdef",
            name: "Transaction History",
            pages: [
              {
                id: "cdefg",
                name: "Transaction History",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/wallet/transaction-history",
            isActive: true,
          },
        ],
        icon: "Wallet",
        isActive: true,
        sequence: 4,
      },
      {
        id: "f",
        name: "Weight Management",
        pages: [],
        menu: [
          {
            id: "fghi",
            name: "New Discrepancy",
            pages: [
              {
                id: "fghij",
                name: "New Discrepancy",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/weight-management/new-discrepancy",
            isActive: true,
          },
          {
            id: "fghijk",
            name: "Raise Dispute",
            pages: [
              {
                id: "fghijkl",
                name: "Raise Dispute",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/weight-management/raise-dispute",
            isActive: true,
          },
          {
            id: "fghijklm",
            name: "Dispute Closed",
            pages: [
              {
                id: "fghijklmn",
                name: "Dispute Closed",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/weight-management/dispute-closed",
            isActive: true,
          },
        ],
        icon: "WeightManagement",
        isActive: true,
        sequence: 5,
      },
      {
        id: "e",
        name: "Catalogues",
        pages: [],
        menu: [
          {
            id: "ef",
            name: "Channel Integration",
            pages: [
              {
                id: "efg",
                name: "Channel Integration",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/catalogues/channel-integration",
            isActive: true,
          },
          {
            id: "efgh",
            name: "Address Book",
            pages: [
              {
                id: "efghi",
                name: "Address Book",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/catalogues/address-book",
            isActive: true,
          },
          {
            id: "efghij",
            name: "Product Catalogue",
            pages: [
              {
                id: "efghijk",
                name: "Product Catalogue",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/catalogues/product-catalogue",
            isActive: true,
          },
          {
            id: "efghijkl",
            name: "Box Catalogue",
            pages: [
              {
                id: "efghijklm",
                name: "Box Catalogue",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/catalogues/box-catalogue",
            isActive: true,
          },
          {
            id: "efghijklmn",
            name: "Channel Inventory",
            pages: [
              {
                id: "efghijklmno",
                name: "Channel Inventory",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/catalogues/channel-inventory",
            isActive: true,
          },
        ],
        icon: "Catalogues",
        isActive: true,
        sequence: 6,
      },
      {
        id: "g",
        name: "Reports",
        pages: [],
        menu: [
          {
            id: "gh",
            name: "Reports",
            pages: [
              {
                id: "ghi",
                name: "Reports",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/reports",
            isActive: true,
          },
        ],
        icon: "Reports",
        isActive: true,
        sequence: 7,
      },
      {
        id: "d",
        name: "Subscription",
        pages: [],
        menu: [
          {
            id: "de",
            name: "Plans",
            pages: [
              {
                id: "def",
                name: "Plans",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/subscription/plans",
            isActive: true,
          },
          {
            id: "defg",
            name: "Plan Details",
            pages: [
              {
                id: "defgh",
                name: "Plan Details",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/subscription/plan-details",
            isActive: true,
          },
        ],
        icon: "Plans",
        isActive: true,
        sequence: 8,
      },
      {
        id: "m",
        name: "Billing",
        pages: [],
        menu: [
          {
            id: "mn",
            name: "Orders",
            pages: [
              {
                id: "mno",
                name: "Orders",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/billing/orders",
            isActive: true,
          },
          {
            id: "mnop",
            name: "Invoices",
            pages: [
              {
                id: "mnopq",
                name: "Invoices",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/billing/invoices",
            isActive: true,
          },
          {
            id: "mnopqr",
            name: "Credit Notes",
            pages: [
              {
                id: "mnopqrs",
                name: "Credit Notes",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/billing/credit-notes",
            isActive: true,
          },
          {
            id: "mnopqrst",
            name: "COD",
            pages: [
              {
                id: "mnopqrstu",
                name: "COD",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/billing/cod",
            isActive: true,
          },
        ],
        icon: "Billing",
        isActive: true,
        sequence: 9,
      },
      {
        id: "i",
        name: "Notifications",
        pages: [],
        menu: [
          {
            id: "ij",
            name: "Notifications",
            pages: [
              {
                id: "ijk",
                name: "Notifications",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/notifications",
            isActive: true,
          },
        ],
        icon: "Notification",
        isActive: true,
        sequence: 10,
      },
      {
        id: "j",
        name: "Feedback",
        pages: [],
        menu: [
          {
            id: "jk",
            name: "Feedback",
            pages: [
              {
                id: "jkl",
                name: "Feedback",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/feedback",
            isActive: true,
          },
        ],
        icon: "Feedback",
        isActive: true,
        sequence: 11,
      },
      {
        id: "k",
        name: "Help",
        pages: [],
        menu: [
          {
            id: "kl",
            name: "FAQs",
            pages: [
              {
                id: "klm",
                name: "FAQs",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/help/faqs",
            isActive: true,
          },
          {
            id: "klmn",
            name: "Ticket",
            pages: [
              {
                id: "klmno",
                name: "Ticket",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/help/ticket",
            isActive: true,
          },
        ],
        icon: "Help",
        isActive: true,
        sequence: 12,
      },
      {
        id: "h",
        name: "Settings",
        pages: [],
        menu: [
          {
            id: "hi",
            name: "Settings",
            pages: [
              {
                id: "hij",
                name: "Change Password",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
              {
                id: "hijk",
                name: "Role Management",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
              {
                id: "hijkl",
                name: "User Management",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
              {
                id: "hijklm",
                name: "System Log",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
              {
                id: "hijklmn",
                name: "Custom Label",
                isActive: true,
                permissions: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
                  download: true,
                  upload: true,
                },
              },
            ],
            menu: [],
            path: "/settings",
            isActive: true,
          },
        ],
        icon: "Settings",
        isActive: true,
        sequence: 13,
      },
    ],
    rateCardName: "",
    rateCardType: "FEATURE_RATE_CARD",
  });

  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<number | null>(null);
  const [isActiveItemAccordionOpen, setIsActiveItemAccordionOpen] =
    useState(false);

  const toggleAccordion = (index: number) => {
    if (activeItem === index) {
      setActiveItem(null); // Close the accordion if it's already open
      setIsActiveItemAccordionOpen(!isActiveItemAccordionOpen);
    } else {
      setActiveItem(index); // Open the accordion
      setIsActiveItemAccordionOpen(true);
    }
  };

  const toggleSubAccordion = (index: number) => {
    setActiveSubItem(activeSubItem === index ? null : index);
  };
  return (
    <>
      <div className="flex flex-col gap-y-4 overflow-auto custromScroll mx-5 mb-5">
        {featureRateCardData?.featureRateCard?.map(
          (roleData: any, index: number) => (
            <div key={roleData?.id} className="accordionContainerBoxStyle">
              <div
                className={`cursor-pointer px-4 py-3 flex justify-between items-center rounded-lg
              ${
                isActiveItemAccordionOpen && activeItem === index
                  ? "bg-[#F6F6F6] rounded-none rounded-t-lg"
                  : "bg-white"
              }
            `}
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex basis-[90%] items-center gap-x-2">
                  <div className="text-[20px] font-Lato font-semibold">
                    {roleData.featureTitle}
                    <span> ({roleData?.featureSubMenu?.length})</span>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 transform ${
                    activeItem === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {activeItem === index && isActiveItemAccordionOpen && (
                <div>
                  {roleData?.featureSubMenu?.map(
                    (menuData: any, index2: number) => (
                      <div
                        key={index2}
                        className="accordionNestedContainerBoxStyle border border-[#e8e8e8]"
                      >
                        <div
                          className="cursor-pointer px-4 py-3 flex justify-between items-center"
                          onClick={
                            menuData?.submenu?.length
                              ? () => toggleSubAccordion(index2)
                              : undefined
                          }
                        >
                          <div className="flex items-center gap-x-3">
                            {menuData?.type !== "input" && (
                              // <Checkbox
                              //   checked={menuData?.isActive}
                              //   onChange={
                              //     () => {}
                              //     //   handle_Level_2_Pages(
                              //     //     index,
                              //     //     index2,
                              //     //     !menuData?.isActive
                              //     //   )
                              //   }
                              //   style={{ accentColor: "black" }}
                              //   disabled={true}
                              // />
                              <Checkbox
                                key={index}
                                showCase={true}
                                checked={menuData?.isActive}
                                onChange={() => {}}
                                name={menuData.featureSubTitle}
                                label={menuData.featureSubTitle}
                                style={{ accentColor: "black" }}
                                checkboxClassName="gap-2 mt-1"
                                labelClassName="mt-1 !text-[18px] !text-[#1C1C1C] !font-Lato !font-semibold !leading-7"
                              />
                            )}
                            {/* <div className="text-[18px] font-Lato font-semibold">
                              {menuData?.featureSubTitle}
                            </div> */}
                            {menuData?.type === "input" && (
                              <>
                                <div className="text-[18px] font-Lato font-semibold">
                                  {menuData?.featureSubTitle}
                                </div>
                                <CustomInputBox
                                  label="Order"
                                  // containerClass="w-full"
                                  className="!h-[40px]"
                                  value={menuData?.value}
                                  onChange={(e) =>
                                    //   handle_Level_2_Pages(
                                    //     index,
                                    //     index2,
                                    //     true,
                                    //     e.target.value
                                    //   )
                                    {}
                                  }
                                  isDisabled={true}
                                />
                              </>
                            )}
                          </div>
                          {menuData?.submenu?.length && (
                            <svg
                              className={`w-5 h-5 transform ${
                                activeSubItem === index2 ? "rotate-180" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )}
                        </div>
                        {activeSubItem === index2 && (
                          <div className="cursor-pointer px-10 py-3 flex gap-2">
                            {menuData?.submenu?.map(
                              (submenuData: any, index3: number) => (
                                console.log("menu screen", submenuData),
                                (
                                  <div
                                    key={index3}
                                    className="flex items-center gap-x-2"
                                  >
                                    {/* <Checkbox
                                      checked={submenuData?.isActive}
                                      onChange={() =>
                                        //   handle_Level_3_Pages(
                                        //     index,
                                        //     index2,
                                        //     index3,
                                        //     !submenuData?.isActive
                                        //   )
                                        {}
                                      }
                                    /> */}
                                    <Checkbox
                                      key={index}
                                      checked={submenuData?.isActive}
                                      showCase={true}
                                      onChange={() => {}}
                                      name={submenuData.name}
                                      label={submenuData.name}
                                      style={{ accentColor: "black" }}
                                      checkboxClassName="gap-2 mt-1"
                                      labelClassName="mt-1 !text-[18px] !text-[#1C1C1C] !font-Lato !font-semibold !leading-7"
                                    />

                                    {/* <div className="text-[18px] font-Lato font-semibold">
                                      {submenuData?.name}
                                    </div> */}
                                  </div>
                                )
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default FeatureRateCard;
