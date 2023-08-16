import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PickUpScreen from "../screens/NewOrder/PickUp";
import DeliveryScreen from "../screens/NewOrder/Delivery";
import ProductScreen from "../screens/NewOrder/Product";
import ServiceScreen from "../screens/NewOrder/Service";
import PaymentScreen from "../screens/NewOrder/Payment";
import NewOrderLayout from "../layout";
import SummaryScreen from "../screens/NewOrder/Summary";
import StandardServiceScreen from "../screens/NewOrder/Service/StandardService";
import InsuranceScreen from "../screens/NewOrder/Insurance";
import PostPaymentScreen from "../screens/NewOrder/Payment/postPayment";
import ProductPage from "../screens/NewOrder/Product/productPage";
import ProductFilled from "../screens/NewOrder/Product/ProductFilled";
import Package from "../screens/NewOrder/Product/package";
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
import OrderLayout from "../layout/OrderLayout";
import KycBusinessTypeScreen from "../screens/AccountSetUp/KYC/BusinessType";
import AccountLayoutScreen from "../layout/accountLayout";
import KycPhotoIdentificationScreen from "../screens/AccountSetUp/KYC/PhotoIdentification";
import KycSendOtpFormScreen from "../screens/AccountSetUp/KYC/SendOtpForm";
import KycMobileVerificationScreen from "../screens/AccountSetUp/KYC/MobileVerification";
import { GSTComponent } from "../screens/AccountSetUp/KYC/TermsAndAgreement/gstComponent";
import { ServiceComponent } from "../screens/AccountSetUp/KYC/TermsAndAgreement/index";
import KycCompanyDetailsScreen from "../screens/AccountSetUp/KYC/CompanyDetails";
import KycModalScreen from "../screens/AccountSetUp/KYC/TermsAndAgreement/Modal";
import KycAadharForm from "../screens/AccountSetUp/KYC/AadharForm";

import SelectAddress from "../screens/AccountSetUp/KYC/SelectAddress/index";
import TransactionLayout from "../layout/TransactionLayout";
import WalletRecharge from "../screens/NewOrder/WalletRecharge";
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
import { AccountQuestion } from "../screens/Onboarding/Questionnaire";
import AddProduct from "../screens/NewOrder/Catalogue/AddProducts/addProduct";
import AddCombo from "../screens/NewOrder/Catalogue/AddCombo/addCombo";
import AddComboProduct from "../screens/NewOrder/Catalogue/AddCombo/addComboProduct";
import { QuestionComponent1 } from "../screens/Onboarding/Questionnaire/question1";
import { QuestionComponent2 } from "../screens/Onboarding/Questionnaire/question2";
import { QuestionComponent3 } from "../screens/Onboarding/Questionnaire/question3";
import { QuestionComponent4 } from "../screens/Onboarding/Questionnaire/question4";
import { QuestionComponent5 } from "../screens/Onboarding/Questionnaire/question5";

//order/service - suresh
import Service from "../screens/Order/Service";
import Summary from "../screens/Order/Summary";
import Payment from "../screens/Order/Payment";
import Layout from "../layout";

const ProtectedRoute = [
  {
    url: "/order/service",
    component: <Service />,
  },
  {
    url: "/order/summary",
    component: <Summary />,
  },
  {
    url: "/order/payment",
    component: <Payment />,
  },
];

const MyRoutes: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            {ProtectedRoute.map((el, i) => (
              <Route path={el?.url} element={el?.component} />
            ))}
          </Route>
          <Route
            path="*"
            element={
              <>
                <div>
                  <h1>Not Found</h1>
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MyRoutes;
