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
import SignUpScreen from "../screens/Auth/SignUp";
import SendOTPScreen from "../screens/Auth/SignUp/mobileVerification";
import VerifyOTPScreen from "../screens/Auth/SignUp/verifyOtp";
import OffersScreen from "../screens/Auth/SignUp/offerScreen";
import GetStartedScreen from "../screens/Auth/SignUp/getStarted";
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
import { AccountQuestion } from "../screens/Question";
import { QuestionComponent1 } from "../screens/Question/question1";
import { QuestionComponent2 } from "../screens/Question/question2";
import { QuestionComponent3 } from "../screens/Question/question3";
import { QuestionComponent4 } from "../screens/Question/question4";
import { QuestionComponent5 } from "../screens/Question/question5";

const MyRoutes: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/swiper" element={<DummySwiperScreen />} />
          <Route path="/" element={<BootScreen />} />
          <Route path="/auth/login" element={<LogInScreen />} />
          <Route path="/auth/signUp" element={<SignUpScreen />} />
          <Route path="/auth/sendOtp" element={<SendOTPScreen />} />
          <Route path="/auth/verifyOtp" element={<VerifyOTPScreen />} />
          <Route path="/auth/offers" element={<OffersScreen />} />
          <Route path="/auth/getStarted" element={<GetStartedScreen />} />
          <Route path="question" element={<AccountQuestion />} />
          <Route path="/neworder" element={<NewOrderLayout />}>
            <Route path="pickup" element={<PickUpScreen />} />
            <Route path="delivery" element={<DeliveryScreen />} />
            <Route path="product" element={<ProductScreen />} />
            <Route path="service" element={<ServiceScreen />} />
            {/* <Route path="payment" element={<PaymentScreen />} /> */}
            <Route path="summary" element={<SummaryScreen />} />
            <Route
              path="standard-service"
              element={<StandardServiceScreen />}
            />
            <Route path="insurance" element={<InsuranceScreen />} />
            <Route path="post-payment" element={<PostPaymentScreen />} />
            <Route path="productpage" element={<ProductPage />} />
            <Route path="productfilled" element={<ProductFilled />} />
            <Route path="package" element={<Package />} />
            <Route path="map" element={<Map />} />
            <Route path="label" element={<LabelScreen />} />
            <Route path="filter" element={<FilterScreen />} />
            <Route
              path="returninguserpickup"
              element={<ReturningUserPickup />}
            />
            <Route
              path="returninguserdelivery"
              element={<ReturningDelivery />}
            />
            <Route path="returningservice" element={<ReturningService />} />
            <Route path="returningproduct" element={<ReturningProduct />} />
            <Route path="signupmodal" element={<SignupModal />} />
          </Route>

          <Route path="account" element={<AccountLayoutScreen />}>
            <Route path="question1" element={<QuestionComponent1 />} />
            <Route path="question2" element={<QuestionComponent2 />} />
            <Route path="question3" element={<QuestionComponent3 />} />
            <Route path="question4" element={<QuestionComponent4 />} />
            <Route path="question5" element={<QuestionComponent5 />} />
            <Route path="kyc-type" element={<KycBusinessTypeScreen />} />
            <Route
              path="kyc-photo"
              element={<KycPhotoIdentificationScreen />}
            />

            <Route path="kyc-otp-form" element={<KycSendOtpFormScreen />} />
            <Route
              path="kyc-mobile-verify"
              element={<KycMobileVerificationScreen />}
            />
            <Route path="kyc-terms/GSTComponent" element={<GSTComponent />} />
            <Route
              path="kyc-terms/ServiceComponent"
              element={<ServiceComponent />}
            />
            <Route path="kyc-company" element={<KycCompanyDetailsScreen />} />
            <Route path="kyc-modal" element={<KycModalScreen />} />
            <Route path="select-address" element={<SelectAddress />} />
          </Route>

          <Route path="order" element={<OrderLayout />}>
            <Route path="order-details" element />
          </Route>
          <Route path="transaction" element={<TransactionLayout />}></Route>
          <Route
            path="transaction/filter"
            element={<TransactionFilterScreen />}
          ></Route>
          <Route path="profile" element={<ProfileLayout />}></Route>
          <Route path="profile" element={<KycLayout />}>
            <Route path="profileEdit-kyc" element={<EditProfileKyc />} />
          </Route>
          <Route path="profile" element={<BankLayout />}>
            <Route path="profileEdit-bank" element={<EditProfileBank />} />
          </Route>
          <Route path="profile" element={<NotificationLayout />}>
            <Route
              path="profile-notification"
              element={<ProfileNotificationTab />}
            />
          </Route>
          <Route path="profile" element={<ReferLayout />}>
            <Route path="profile-refer-earn" element={<ReferTab />} />
          </Route>
          <Route path="profile" element={<SettingLayout />}>
            <Route path="profile-setting" element={<SettingTab />} />
          </Route>
          <Route path="profile" element={<ChangePasswordLayout />}>
            <Route
              path="profile-setting-change-password"
              element={<ChangePassword />}
            />
          </Route>
          <Route path="profile" element={<EditProfileLayout />}>
            <Route
              path="profile-setting-edit-profile"
              element={<EditProfile />}
            />
          </Route>

          <Route path="/neworder/payment" element={<PaymentScreen />} />
          <Route path="/neworder/bulkorder" element={<BulkOrder />} />
          <Route path="/neworder/walletrecharge" element={<WalletRecharge />} />
          <Route path="/neworder/returningLabel" element={<ReturningLabel />} />
          <Route
            path="/neworder/returningsummary"
            element={<ReturningSummary />}
          />

          <Route path="/neworder/returningLabel" element={<ReturningLabel />} />
          <Route
            path="/neworder/returningsummary"
            element={<ReturningSummary />}
          />
          <Route
            path="/neworder/searchfilterproduct"
            element={<SearchFilterProduct />}
          />

          <Route path="/neworder/addressbook" element={<AddressBook />} />
          <Route
            path="/neworder/productcatalogueaddcambo"
            element={<ProductCatalogueAddCambo />}
          />
          <Route path="/neworder/returningLabel" element={<ReturningLabel />} />
          <Route
            path="/neworder/returningsummary"
            element={<ReturningSummary />}
          />
          <Route
            path="/neworder/searchfilterproduct"
            element={<SearchFilterProduct />}
          />
          <Route path="/neworder/addressbook" element={<AddressBook />} />
          <Route
            path="/neworder/productcatalogueaddcambo"
            element={<ProductCatalogueAddCambo />}
          />
          <Route
            path="/neworder/ProductAddCombo"
            element={<ProductAddCombo />}
          />
          <Route
            path="/neworder/rechargepayment"
            element={<RechargePayment />}
          />
          <Route
            path="/neworder/channel-integration"
            element={<CatalogueChannelIntegrationScreen />}
          />
          <Route
            path="/neworder/box-catalogue"
            element={<CatalogueBoxCatalogueScreen />}
          />
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
