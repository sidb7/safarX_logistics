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

import SelectAddress from "../screens/Onboarding/Kyc/SelectAddress/index";
import SelectAddressBilling from "../screens/Onboarding/Kyc/SelectAddress/billing";
import SelectAddressPickUp from "../screens/Onboarding/Kyc/SelectAddress/pickup";

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

const MyRoutes: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/swiper" element={<DummySwiperScreen />} />
          <Route path="/" element={<BootScreen />} />
          <Route path="/auth/login" element={<LogInScreen />} />
          {/* <Route path="/auth/signUp" element={<SignUpScreen />} /> */}
          {/* <Route path="/auth/sendOtp" element={<SendOTPScreen />} />
          <Route path="/auth/verifyOtp" element={<VerifyOTPScreen />} />
          <Route path="/auth/offers" element={<OffersScreen />} />
          <Route path="/auth/getStarted" element={<GetStartedScreen />} /> */}
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

          {/* onboarding routes  */}

          <Route path="onboarding" element={<AccountLayoutScreen />}>
            <Route path="signup" element={<SignUpScreen />} />
            <Route path="sendotp" element={<SendOTPScreen />} />
            <Route path="verifyotp" element={<VerifyOTPScreen />} />
            <Route path="offers" element={<OffersScreen />} />
            <Route path="getStarted" element={<GetStartedScreen />} />
            <Route
              path="questionnaire/question1"
              element={<QuestionComponent1 />}
            />
            <Route
              path="questionnaire/question2"
              element={<QuestionComponent2 />}
            />
            <Route
              path="questionnaire/question3"
              element={<QuestionComponent3 />}
            />
            <Route
              path="questionnaire/question4"
              element={<QuestionComponent4 />}
            />
            <Route
              path="questionnaire/question5"
              element={<QuestionComponent5 />}
            />
            <Route path="kyc-type" element={<KycBusinessTypeScreen />} />
            <Route
              path="kyc-photo"
              element={<KycPhotoIdentificationScreen />}
            />

            <Route path="kyc-otp-form" element={<KycSendOtpFormScreen />} />
            <Route
              path="select-address-billing"
              element={<SelectAddressBilling />}
            />
            <Route
              path="select-address-pickup"
              element={<SelectAddressPickUp />}
            />
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
            <Route path="kyc-aadhar-form" element={<KycAadharForm />} />
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
            path="/neworder/channel-integration/addproduct"
            element={<AddProduct />}
          />
          <Route
            path="/neworder/channel-integration/addcombo"
            element={<AddCombo />}
          />
          <Route
            path="/neworder/channel-integration/addcomboproduct"
            element={<AddComboProduct />}
          />
          <Route
            path="/neworder/box-catalogue"
            element={<CatalogueBoxCatalogueScreen />}
          />
          {/* order/service - suresh */}
          <Route path="/order/service" element={<Service />} />
          <Route path="/order/summary" element={<Summary />} />
          <Route path="/order/payment" element={<Payment />} />

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
