import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PickUpScreen from "../screens/NewOrder/PickUp";
import PickupLocationUpdatedUI from "../screens/NewOrder/NewPickupCopyForNewUI";
import DeliveryScreen from "../screens/NewOrder/Delivery";
// import ProductScreen from "../screens/NewOrder/Product";
import AddProductOrder from "../screens/NewOrder/Product/AddProduct";
import ProductPackage from "../screens/NewOrder/Product/ProductPackage";
import ServiceScreen from "../screens/NewOrder/Service/index";
import PaymentScreen from "../screens/NewOrder/Payment";
import SummaryScreen from "../screens/NewOrder/Summary";
import StandardServiceScreen from "../screens/NewOrder/Service/StandardService";
import InsuranceScreen from "../screens/NewOrder/Insurance";
import PostPaymentScreen from "../screens/NewOrder/Payment/postPayment";
// import ProductPage from "../screens/NewOrder/Product/productPage";
// import ProductFilled from "../screens/NewOrder/Product/ProductFilled";
// import Package from "../screens/NewOrder/Product/package";
import Map from "../screens/NewOrder/Map/index";
import LabelScreen from "../screens/NewOrder/Label";
import BulkOrder from "../screens/NewOrder/BulkOrder";
import FilterScreen from "../screens/NewOrder/Filter";
import BootScreen from "../screens/BootScreen/index";
import LogInScreen from "../screens/Auth/LogIn";
import SignUpScreen from "../screens/Onboarding/Signup/index";
import SendOTPScreen from "../screens/Onboarding/Signup/mobileVerification";
import VerifyOTPScreen from "../screens/Onboarding/Signup/verifyOtp";
import OffersScreen from "../screens/Onboarding/Signup/offerScreen";
import GetStartedScreen from "../screens/Onboarding/Signup/getStarted";
import Order from "../screens/Order/index";
import OrderLayout from "../layout/OrderLayout";
import KycBusinessTypeScreen from "../screens/Onboarding/Kyc/BusinessType";
import AccountLayoutScreen from "../layout/accountLayout";
import KycPhotoIdentificationScreen from "../screens/Onboarding/Kyc/PhotoIdentification";
import KycSendOtpFormScreen from "../screens/Onboarding/Kyc/SendOtpForm";
import KycMobileVerificationScreen from "../screens/Onboarding/Kyc/MobileVerification";
import { GSTComponent } from "../screens/Onboarding/Kyc/TermsAndAgreement/gstComponent";
import { ServiceComponent } from "../screens/Onboarding/Kyc/TermsAndAgreement/index";
import KycCompanyDetailsScreen from "../screens/Onboarding/Kyc/CompanyDetails";
import KycModalScreen from "../screens/Onboarding/Kyc/TermsAndAgreement/Modal";
import KycAadharForm from "../screens/Onboarding/Kyc/AadharForm";
import BulkProducts from "../screens/NewOrder/NewCatalogue/ProductCatalogue/BulkProducts";
import SelectAddress from "../screens/Onboarding/Kyc/SelectAddress/index";
import SelectAddressBilling from "../screens/Onboarding/Kyc/SelectAddress/billing";
import SelectAddressPickUp from "../screens/Onboarding/Kyc/SelectAddress/pickup";

import TransactionLayout from "../layout/TransactionLayout";
// import WalletRecharge from "../screens/NewOrder/WalletRecharge";
// import OnBoundingWalletRecharge from "../screens/Onboarding/WalletRecharge";
import RechargePayment from "../screens/NewOrder/WalletRecharge/rechargePayment";
import ProfileLayout from "../layout/ProfileLayout";
import ReturningUserPickup from "../screens/NewOrder/ReturningUser/PickUp";
import ReturningDelivery from "../screens/NewOrder/ReturningUser/Delivery";
import ReturningLabel from "../screens/NewOrder/ReturningUser/Label/index";
import ReturningSummary from "../screens/NewOrder/ReturningUser/Summary/index";
import ReturningService from "../screens/NewOrder/ReturningUser/Service/index";
import ReturningProduct from "../screens/NewOrder/ReturningUser/Product";
import TransactionFilterScreen from "../screens/Transaction/filter";

import SearchFilterProduct from "../screens/NewOrder/ReturningUser/SearchFilterProduct";
import AddressBook from "../screens/NewOrder/Catalogue/addressBook";
import ProductCatalogueAddCambo from "../screens/NewOrder/Catalogue/productCatalogueAddCambo";
import ProductAddCombo from "../screens/NewOrder/Catalogue/ProductAddCombo/productAddCombo";
import SignupModal from "../screens/SignupModal";

import DummySwiperScreen from "../screens/dummySwiperScreen";
import CatalogueChannelIntegrationScreen from "../screens/NewOrder/Catalogue/ChannelIntegration";
import CatalogueBoxCatalogueScreen from "../screens/NewOrder/Catalogue/BoxCatalogue";
import { EditProfileKyc } from "../screens/Profile/Kyc/editKyc";
import { KycLayout } from "../layout/kycLayout";
import { EditProfileBank } from "../screens/Profile/Bank/bankKyc";
import { BankLayout } from "../layout/bankLayout";
import { NotificationLayout } from "../layout/notificationLayout";
import { ProfileNotificationTab } from "../screens/Profile/Notification/notificationTab";
import { ReferLayout } from "../layout/ReferLayout";
import { ReferTab } from "../screens/Profile/ReferEarn/referTab";
import { SettingLayout } from "../layout/SettingLayout";
import { SettingTab } from "../screens/Profile/Settings/settingTab";
import { ChangePassword } from "../screens/Profile/Settings/changePassword";
import { ChangePasswordLayout } from "../layout/ChangePasswordLayout";
import { EditProfileLayout } from "../layout/EditProfileLayout";
import { EditProfile } from "../screens/Profile/Settings/editProfile";
import AddProduct from "../screens/NewOrder/Catalogue/AddProducts/addProduct";
import AddCombo from "../screens/NewOrder/Catalogue/AddCombo/addCombo";
import AddComboProduct from "../screens/NewOrder/Catalogue/AddCombo/addComboProduct";
import { QuestionComponent1 } from "../screens/Onboarding/Questionnaire/question1";
import { QuestionComponent2 } from "../screens/Onboarding/Questionnaire/question2";
import { QuestionComponent3 } from "../screens/Onboarding/Questionnaire/question3";
import { QuestionComponent4 } from "../screens/Onboarding/Questionnaire/question4";
import { WelcomeKyc } from "../screens/Onboarding/Questionnaire/welcomeKyc";

//order/service - suresh
import Service from "../screens/Order/Service";
import Summary from "../screens/Order/Summary";
import Payment from "../screens/Order/Payment";
import WalletRecharge from "../screens/Order/WalletRecharge";
import WalletMain from "../../src/screens/Onboarding/WalletRecharge/walletMain";
import WalletDetails from "../../src/screens/Onboarding/WalletRecharge/walletDetails";
import WalletPayment from "../screens/Onboarding/WalletRecharge/walletPayment";

// import Layout from "../layout";
// import { CommonLayout } from "../layout/layout";

import AddNewProduct from "../screens/NewOrder/Product/AddProduct";
// import ProductPackage from "../screens/NewOrder/Product/ProductPackage";
import { ProfileSetting } from "../screens/Profile/Settings/setting";
import RoleManagement from "../screens/Profile/Settings/roleManagement/roleManagement";
import Catalogue from "../screens/NewOrder/NewCatalogue";
import AddComboScreen from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addCombo";
import AddProductScreen from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addProduct";

import CommonLayout from "../layout";
import EditAddress from "../screens/NewOrder/NewCatalogue/AddressBook/editAddress";
import AddAddress from "../screens/NewOrder/NewCatalogue/AddressBook/addAddress";
import ProtectedRoute from "../components/ProtectedRoutes";

import CatalogueAddProduct from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addProduct";
import { Transaction } from "../screens/Transaction";
import NotFound from "../components/404NotFound/NotFound";
import { Profile } from "../screens/Profile";
import PlanDetails from "../screens/Plan/planDetails";
import NewUserPlanScreen from "../screens/Plan";
import ComparePlans from "../screens/Plan/comparePlans";
import AddRole from "../screens/Profile/Settings/roleManagement/addRole";
import UpdateRole from "../screens/Profile/Settings/roleManagement/updateRole";
import UserManagement from "../screens/Profile/Settings/userManagement";
import AddUser from "../screens/Profile/Settings/userManagement/addUser";
import UpdateUser from "../screens/Profile/Settings/userManagement/updateUser";
import UsersList from "../screens/Profile/Settings/roleManagement/usersList";
import { Home } from "../screens/Home";
import Tracking from "../screens/NewOrder/Tracking/tracking";
import ClientTracking from "../screens/NewOrder/Tracking/clientTracking";
import PickupLocationNew from "../screens/NewOrder/NewPickup/index";
import Notifications from "../screens/Notification/notifications";
import HelpScreen from "../screens/Help";
import OrdersScreen from "../screens/Billing/orders";
import Invoice from "../screens/NewOrder/Billing/invoice";
import WeightFreeze from "../screens/WeightManagement";
import SystemLog from "../screens/SystemLog";
import DeliveryLocation from "../screens/NewOrder/NewDelivery";
import BulkUpload from "../screens/Order/BulkUpload/BulkUpload";
import ViewAllTickets from "../screens/Help/Tickets/viewAllTickets";
import ViewTicketDetails from "../screens/Help/Tickets/viewTicketDetails";
import Reports from "../screens/NewOrder/Reports";
import AddBox from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addBox";

//feedBack
import AddFeedBack from "../screens/FeedBack/addFeedback";
import FeedBack from "../screens/FeedBack/feedback";
import KycProtectedRoute from "../components/ProtectedRoutes/KycProtected";
import BankProtected from "../components/ProtectedRoutes/BankProtected";

//Public
//PublicTracking
import PublicTracking from "../screens/PublicScreens/PublicTracking";
import InvoicePdf from "../screens/Invoice";

const MyRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LogInScreen />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BootScreen />
            </ProtectedRoute>
          }
        />

        <Route>
          <Route path="/shipyaari-tracking" element={<ClientTracking />} />
        </Route>

        {/* onboarding routes  */}
        <Route>
          <Route path="/onboarding/signup" element={<SignUpScreen />} />
          <Route path="/onboarding/sendotp" element={<SendOTPScreen />} />
          <Route path="/onboarding/verifyotp" element={<VerifyOTPScreen />} />
          <Route
            path="/onboarding/offers"
            element={
              <KycProtectedRoute>
                <OffersScreen />
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/get-started"
            element={
              <KycProtectedRoute>
                <GetStartedScreen />
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/questionnaire/question1"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <QuestionComponent1 />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/questionnaire/question2"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <QuestionComponent2 />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/questionnaire/question3"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <QuestionComponent3 />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/questionnaire/question4"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <QuestionComponent4 />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/kyc-welcome"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <WelcomeKyc />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/kyc-type"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <KycBusinessTypeScreen />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/kyc-photo"
            element={
              <KycProtectedRoute>
                <KycPhotoIdentificationScreen />
              </KycProtectedRoute>
            }
          />

          <Route
            path="/onboarding/kyc-form"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <KycSendOtpFormScreen />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/select-address-billing"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <SelectAddressBilling />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/select-address-pickup"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <SelectAddressPickUp />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/kyc-mobile-verify"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <KycMobileVerificationScreen />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/kyc-terms/gst-agreement"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <GSTComponent />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/kyc-terms/service-agreement"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <ServiceComponent />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />

          <Route
            path="/onboarding/kyc"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <KycModalScreen />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/select-address"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <SelectAddress />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />
          <Route
            path="/onboarding/kyc-aadhar-form"
            element={
              <KycProtectedRoute>
                {/* <ProtectedRoute> */}
                <KycAadharForm />
                {/* </ProtectedRoute> */}
              </KycProtectedRoute>
            }
          />

          {/**wallet recharge main page */}
          <Route
            path="/onboarding/wallet-main"
            element={
              <BankProtected>
                <WalletMain />
              </BankProtected>
            }
          />
          {/**wallet details page */}
          <Route
            path="/onboarding/wallet-details"
            element={
              <BankProtected>
                <WalletDetails />
              </BankProtected>
            }
          />
          {/**wallet payment page */}

          <Route
            path="/onboarding/wallet-payment"
            element={
              <BankProtected>
                <WalletPayment />
              </BankProtected>
            }
          />

          {/* <Route
              path="/onboarding/wallet-recharge"
              element={
                <BankProtected>
                  <OnBoundingWalletRecharge />
                </BankProtected>
              }
            /> */}

          <Route
            path="/onboarding/recharge-payment"
            element={
              <BankProtected>
                <RechargePayment />
              </BankProtected>
            }
          />
        </Route>

        {/* Root Routes */}
        <Route path="/" element={<CommonLayout />}>
          {/* Order Routes */}
          <Route>
            {/* home page i.e , overview, orders, exception, sy-performance */}
            <Route
              path="dashboard/overview"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard/orders"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard/exception"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard/sy-performance"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* End here */}

            <Route
              path="orders/view-orders"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />

            <Route
              path="orders/add-bulk"
              element={
                <ProtectedRoute>
                  <BulkUpload />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders/add-order/pickup"
              element={
                <ProtectedRoute>
                  <PickupLocationNew />
                  {/* <PickupLocationUpdatedUI /> */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/add-order/delivery"
              element={
                <ProtectedRoute>
                  <DeliveryLocation />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders/add-order/add-product"
              element={
                <ProtectedRoute>
                  <AddProductOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/add-order/product-package"
              element={
                <ProtectedRoute>
                  <ProductPackage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/add-order/service"
              element={
                <ProtectedRoute>
                  <ServiceScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/add-order/summary"
              element={
                <ProtectedRoute>
                  <SummaryScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/add-order/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wallet/view-wallet"
              element={
                <ProtectedRoute>
                  <WalletRecharge />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* billing details Routes */}
          <Route>
            {/* <Route
                path="/billing/orders"
                element={
                  <ProtectedRoute>
                    <OrdersScreen />
                  </ProtectedRoute>
                }
              /> */}

            <Route
              path="/billing/invoices"
              element={
                <ProtectedRoute>
                  <Invoice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing/invoice/:id"
              element={
                <ProtectedRoute>
                  <InvoicePdf />
                </ProtectedRoute>
              }
            />

            <Route
              path="/billing/credit-notes"
              element={
                <ProtectedRoute>
                  <Invoice />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* User Profile Routes */}
          <Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/notification"
              element={
                <ProtectedRoute>
                  <ProfileNotificationTab />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit-bank"
              element={
                <ProtectedRoute>
                  <EditProfileBank />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit-kyc"
              element={
                <ProtectedRoute>
                  <EditProfileKyc />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingTab />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/role-management"
              element={
                <ProtectedRoute>
                  <RoleManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/role-management/add-role"
              element={
                <ProtectedRoute>
                  <AddRole />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/role-management/update-role"
              element={
                <ProtectedRoute>
                  <UpdateRole />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/user-management"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/user-management/add-user"
              element={
                <ProtectedRoute>
                  <AddUser />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/user-management/update-user"
              element={
                <ProtectedRoute>
                  <UpdateUser />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/role-management/userslist"
              element={
                <ProtectedRoute>
                  <UsersList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/system-logs"
              element={
                <ProtectedRoute>
                  <SystemLog />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/refer-earn"
              element={
                <ProtectedRoute>
                  <ReferTab />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* User Profile Routes */}
          <Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/notification"
              element={
                <ProtectedRoute>
                  <ProfileNotificationTab />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit-bank"
              element={
                <ProtectedRoute>
                  <EditProfileBank />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit-kyc"
              element={
                <ProtectedRoute>
                  <EditProfileKyc />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingTab />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/role-management"
              element={
                <ProtectedRoute>
                  <RoleManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/role-management/add-role"
              element={
                <ProtectedRoute>
                  <AddRole />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/role-management/update-role"
              element={
                <ProtectedRoute>
                  <UpdateRole />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/user-management"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/user-management/add-user"
              element={
                <ProtectedRoute>
                  <AddUser />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/user-management/update-user"
              element={
                <ProtectedRoute>
                  <UpdateUser />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/role-management/userslist"
              element={
                <ProtectedRoute>
                  <UsersList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/system-logs"
              element={
                <ProtectedRoute>
                  <SystemLog />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/refer-earn"
              element={
                <ProtectedRoute>
                  <ReferTab />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Catalogue Routes */}
          <Route>
            <Route
              path="/catalogues/channel-integration"
              element={
                <ProtectedRoute>
                  <Catalogue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/address-book"
              element={
                <ProtectedRoute>
                  <Catalogue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/product-catalogue"
              element={
                <ProtectedRoute>
                  <Catalogue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/box-catalogue"
              element={
                <ProtectedRoute>
                  <Catalogue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-combo"
              element={
                <ProtectedRoute>
                  <AddComboScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-product"
              element={
                <ProtectedRoute>
                  <AddProductScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-box"
              element={
                <ProtectedRoute>
                  <AddBox />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-bulk-product/"
              element={
                <ProtectedRoute>
                  <BulkProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/edit-address"
              element={
                <ProtectedRoute>
                  <EditAddress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-address"
              element={
                <ProtectedRoute>
                  <AddAddress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-product"
              element={
                <ProtectedRoute>
                  <CatalogueAddProduct />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Wallet Routes */}
          <Route>
            <Route
              path="wallet/transaction-history"
              element={
                <ProtectedRoute>
                  <Transaction />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* Plan Routes */}
          <Route>
            <Route
              path="/plans"
              element={
                <ProtectedRoute>
                  <NewUserPlanScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/plans/plan-details"
              element={
                <ProtectedRoute>
                  <PlanDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/plans/compare-plans"
              element={
                <ProtectedRoute>
                  <ComparePlans />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route>
            <Route
              path="/tracking"
              element={
                <ProtectedRoute>
                  <Tracking />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/tracking/shipyaari" element={<Tracking />} /> */}
            <Route
              path="/tracking/clientTracking"
              element={
                <ProtectedRoute>
                  <ClientTracking />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route>
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Help Screen Routes */}

          <Route path="/help/faqs" element={<HelpScreen />} />
          <Route path="/help/ticket" element={<HelpScreen />} />
          <Route path="/help/agreements" element={<HelpScreen />} />
          <Route path="/help/ticket/view-all" element={<ViewAllTickets />} />
          {/* Catalogue Routes */}
          <Route>
            <Route
              path="/catalogues/channel-integration"
              element={
                <ProtectedRoute>
                  <Catalogue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/address-book"
              element={
                <ProtectedRoute>
                  <Catalogue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/product-catalogue"
              element={
                <ProtectedRoute>
                  <Catalogue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/box-catalogue"
              element={
                <ProtectedRoute>
                  <Catalogue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-combo"
              element={
                <ProtectedRoute>
                  <AddComboScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-product"
              element={
                <ProtectedRoute>
                  <AddProductScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-box"
              element={
                <ProtectedRoute>
                  <AddBox />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-bulk-product/"
              element={
                <ProtectedRoute>
                  <BulkProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/edit-address"
              element={
                <ProtectedRoute>
                  <EditAddress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-address"
              element={
                <ProtectedRoute>
                  <AddAddress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/catalogues/catalogue/add-product"
              element={
                <ProtectedRoute>
                  <CatalogueAddProduct />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Wallet Routes */}
          <Route>
            <Route
              path="wallet/transaction-history"
              element={
                <ProtectedRoute>
                  <Transaction />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* Plan Routes */}
          <Route>
            <Route
              path="/plans"
              element={
                <ProtectedRoute>
                  <NewUserPlanScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/plans/plan-details"
              element={
                <ProtectedRoute>
                  <PlanDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/plans/compare-plans"
              element={
                <ProtectedRoute>
                  <ComparePlans />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route>
            <Route
              path="/tracking"
              element={
                <ProtectedRoute>
                  <Tracking />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/tracking/shipyaari" element={<Tracking />} /> */}
            <Route
              path="/tracking/clientTracking"
              element={
                <ProtectedRoute>
                  <ClientTracking />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route>
            <Route
              path="notifications/notifications"
              element={<Notifications />}
            />
          </Route>

          {/* Help Screen Routes */}

          <Route path="/help/faqs" element={<HelpScreen />} />
          <Route path="/help/ticket" element={<HelpScreen />} />
          <Route path="/help/agreements" element={<HelpScreen />} />
          <Route path="/help/ticket/view-all" element={<ViewAllTickets />} />
          <Route
            path="/help/ticket/view-details"
            element={<ViewTicketDetails />}
          />

          {/* Weight Management */}
          <Route
            path="/weight-management/weight-freeze"
            element={
              <ProtectedRoute>
                <WeightFreeze />
              </ProtectedRoute>
            }
          />

          <Route
            path="/weight-management/new-discrepancy"
            element={
              <ProtectedRoute>
                <WeightFreeze />
              </ProtectedRoute>
            }
          />

          <Route
            path="/weight-management/pending-dispute"
            element={
              <ProtectedRoute>
                <WeightFreeze />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weight-management/completed"
            element={
              <ProtectedRoute>
                <WeightFreeze />
              </ProtectedRoute>
            }
          />

          <Route
            path="/feedback/add-feedback"
            element={
              <ProtectedRoute>
                <AddFeedBack />
              </ProtectedRoute>
            }
          />

          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <FeedBack />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
