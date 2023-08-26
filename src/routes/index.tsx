import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PickUpScreen from "../screens/NewOrder/PickUp";
import DeliveryScreen from "../screens/NewOrder/Delivery";
import ProductScreen from "../screens/NewOrder/Product";
import ServiceScreen from "../screens/NewOrder/Service";
import PaymentScreen from "../screens/NewOrder/Payment";
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

import SelectAddress from "../screens/Onboarding/Kyc/SelectAddress/index";
import SelectAddressBilling from "../screens/Onboarding/Kyc/SelectAddress/billing";
import SelectAddressPickUp from "../screens/Onboarding/Kyc/SelectAddress/pickup";

import TransactionLayout from "../layout/TransactionLayout";
import WalletRecharge from "../screens/NewOrder/WalletRecharge";
import OnBoundingWalletRecharge from "../screens/Onboarding/WalletRecharge";
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
import { QuestionComponent5 } from "../screens/Onboarding/Questionnaire/question5";

//order/service - suresh
import Service from "../screens/Order/Service";
import Summary from "../screens/Order/Summary";
import Payment from "../screens/Order/Payment";
// import Layout from "../layout";
// import { CommonLayout } from "../layout/layout";

import AddNewProduct from "../screens/Order/Product/AddProduct";
import ProductPackage from "../screens/Order/Product/ProductPackage";
import { ProfileSetting } from "../screens/Profile/Settings/setting";
import Catalogue from "../screens/NewOrder/NewCatalogue";
import AddComboScreen from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addCombo";
import AddProductScreen from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addProduct";

import CommonLayout from "../layout";
import EditAddress from "../screens/NewOrder/NewCatalogue/AddressBook/editAddress";
import AddAddress from "../screens/NewOrder/NewCatalogue/AddressBook/addAddress";
import ProtectedRoute from "../components/ProtectedRoutes";

import CatalogueAddProduct from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addProduct";
const MyRoutes: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/swiper"
            element={
              <ProtectedRoute>
                <DummySwiperScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <BootScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<LogInScreen />} />
          {/* <Route path="/auth/signUp" element={<ProtectedRoute><SignUpScreen /></ProtectedRoute> } /> */}
          {/* <Route path="/auth/sendOtp" element={<ProtectedRoute><SendOTPScreen /></ProtectedRoute> } />
          <Route path="/auth/verifyOtp" element={<ProtectedRoute><VerifyOTPScreen /></ProtectedRoute> } />
          <Route path="/auth/offers" element={<ProtectedRoute><OffersScreen /></ProtectedRoute> } />
          <Route path="/auth/getStarted" element={<ProtectedRoute><GetStartedScreen /></ProtectedRoute> } /> */}
          <Route
            path="/neworder"
            element={
              <ProtectedRoute>
                <CommonLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="pickup"
              element={
                <ProtectedRoute>
                  <PickUpScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="delivery"
              element={
                <ProtectedRoute>
                  <DeliveryScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="product"
              element={
                <ProtectedRoute>
                  <ProductScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="service"
              element={
                <ProtectedRoute>
                  <ServiceScreen />
                </ProtectedRoute>
              }
            />
            {/* <Route path="payment" element={<ProtectedRoute><PaymentScreen /></ProtectedRoute> } /> */}
            <Route
              path="summary"
              element={
                <ProtectedRoute>
                  <SummaryScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="standard-service"
              element={
                <ProtectedRoute>
                  <StandardServiceScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="insurance"
              element={
                <ProtectedRoute>
                  <InsuranceScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="post-payment"
              element={
                <ProtectedRoute>
                  <PostPaymentScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="productpage"
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="productfilled"
              element={
                <ProtectedRoute>
                  <ProductFilled />
                </ProtectedRoute>
              }
            />
            <Route
              path="package"
              element={
                <ProtectedRoute>
                  <Package />
                </ProtectedRoute>
              }
            />
            <Route
              path="map"
              element={
                <ProtectedRoute>
                  <Map />
                </ProtectedRoute>
              }
            />
            <Route
              path="label"
              element={
                <ProtectedRoute>
                  <LabelScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="filter"
              element={
                <ProtectedRoute>
                  <FilterScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="returninguserpickup"
              element={
                <ProtectedRoute>
                  <ReturningUserPickup />
                </ProtectedRoute>
              }
            />
            <Route
              path="returninguserdelivery"
              element={
                <ProtectedRoute>
                  <ReturningDelivery />
                </ProtectedRoute>
              }
            />
            <Route
              path="returningservice"
              element={
                <ProtectedRoute>
                  <ReturningService />
                </ProtectedRoute>
              }
            />
            <Route
              path="returningproduct"
              element={
                <ProtectedRoute>
                  <ReturningProduct />
                </ProtectedRoute>
              }
            />
            <Route path="signupmodal" element={<SignupModal />} />
          </Route>

          {/* onboarding routes  */}

          <Route path="onboarding/signup" element={<SignUpScreen />} />
          <Route path="onboarding/sendotp" element={<SendOTPScreen />} />
          <Route
            path="onboarding/verifyotp"
            element={
              <ProtectedRoute>
                <VerifyOTPScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/offers"
            element={
              <ProtectedRoute>
                <OffersScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/getStarted"
            element={
              <ProtectedRoute>
                <GetStartedScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/questionnaire/question1"
            element={
              <ProtectedRoute>
                <QuestionComponent1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/questionnaire/question2"
            element={
              <ProtectedRoute>
                <QuestionComponent2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/questionnaire/question3"
            element={
              <ProtectedRoute>
                <QuestionComponent3 />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/questionnaire/question4"
            element={
              <ProtectedRoute>
                <QuestionComponent4 />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/questionnaire/question5"
            element={
              <ProtectedRoute>
                <QuestionComponent5 />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/kyc-type"
            element={
              <ProtectedRoute>
                <KycBusinessTypeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/kyc-photo"
            element={
              <ProtectedRoute>
                <KycPhotoIdentificationScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path="onboarding/kyc-otp-form"
            element={
              <ProtectedRoute>
                <KycSendOtpFormScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/select-address-billing"
            element={
              <ProtectedRoute>
                <SelectAddressBilling />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/select-address-pickup"
            element={
              <ProtectedRoute>
                <SelectAddressPickUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/kyc-mobile-verify"
            element={
              <ProtectedRoute>
                <KycMobileVerificationScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/kyc-terms/GSTComponent"
            element={
              <ProtectedRoute>
                <GSTComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/kyc-terms/ServiceComponent"
            element={
              <ProtectedRoute>
                <ServiceComponent />
              </ProtectedRoute>
            }
          />

          {/* commented it as it is not there in the new screen */}

          {/* <Route
            path="onboarding/kyc-company"
            element={<ProtectedRoute><KycCompanyDetailsScreen /></ProtectedRoute> }
          /> */}

          <Route
            path="onboarding/kyc-modal"
            element={
              <ProtectedRoute>
                <KycModalScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/select-address"
            element={
              <ProtectedRoute>
                <SelectAddress />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/kyc-aadhar-form"
            element={
              <ProtectedRoute>
                <KycAadharForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="onboarding/walletrecharge"
            element={
              <ProtectedRoute>
                <OnBoundingWalletRecharge />
              </ProtectedRoute>
            }
          />

          <Route
            path="onboarding/rechargepayment"
            element={
              <ProtectedRoute>
                <RechargePayment />
              </ProtectedRoute>
            }
          />

          <Route
            path="transaction"
            element={
              <ProtectedRoute>
                <TransactionLayout />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="transaction/filter"
            element={
              <ProtectedRoute>
                <TransactionFilterScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/" element={<CommonLayout />}>
            <Route
              path="order"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            >
              <Route path="order-details" />
            </Route>
            <Route
              path="profile/profile-notification"
              element={
                <ProtectedRoute>
                  <ProfileNotificationTab />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/profileEdit-bank"
              element={
                <ProtectedRoute>
                  <EditProfileBank />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/profileEdit-kyc"
              element={
                <ProtectedRoute>
                  <EditProfileKyc />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/profile-setting-edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/profile-setting"
              element={
                <ProtectedRoute>
                  <SettingTab />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/profile-refer-earn"
              element={
                <ProtectedRoute>
                  <ReferTab />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/profile-setting-change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/neworder/pickup"
              element={
                <ProtectedRoute>
                  <PickUpScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/neworder/pickup" />
            {/* order/service - suresh */}
            <Route
              path="/neworder/service"
              element={
                <ProtectedRoute>
                  <Service />
                </ProtectedRoute>
              }
            />
            <Route
              path="/neworder/summary"
              element={
                <ProtectedRoute>
                  <Summary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/neworder/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="newOrder/addnewproduct"
              element={
                <ProtectedRoute>
                  <AddNewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="newOrder/productpackage"
              element={
                <ProtectedRoute>
                  <ProductPackage />
                </ProtectedRoute>
              }
            />

            {/* Catalogue */}
            <Route
              path="catalogue"
              element={
                <ProtectedRoute>
                  <Catalogue />
                </ProtectedRoute>
              }
            />
            <Route
              path="catalogue/add-combo"
              element={
                <ProtectedRoute>
                  <AddComboScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="catalogue/add-product"
              element={
                <ProtectedRoute>
                  <AddProductScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="catalogue/edit-address"
              element={
                <ProtectedRoute>
                  <EditAddress />
                </ProtectedRoute>
              }
            />
            <Route
              path="catalogue/add-address"
              element={
                <ProtectedRoute>
                  <AddAddress />
                </ProtectedRoute>
              }
            />
            <Route path="catalogue/edit-address" element={<EditAddress />} />
            <Route path="catalogue/add-address" element={<AddAddress />} />
            <Route
              path="catalogue/add-product"
              element={<CatalogueAddProduct />}
            />
          </Route>
          {/* <Route path="/neworder/payment" element={<ProtectedRoute><PaymentScreen /></ProtectedRoute> } /> */}
          <Route
            path="/neworder/bulkorder"
            element={
              <ProtectedRoute>
                <BulkOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/walletrecharge"
            element={
              <ProtectedRoute>
                <WalletRecharge />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/returningLabel"
            element={
              <ProtectedRoute>
                <ReturningLabel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/returningsummary"
            element={
              <ProtectedRoute>
                <ReturningSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/returningLabel"
            element={
              <ProtectedRoute>
                <ReturningLabel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/returningsummary"
            element={
              <ProtectedRoute>
                <ReturningSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/searchfilterproduct"
            element={
              <ProtectedRoute>
                <SearchFilterProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/addressbook"
            element={
              <ProtectedRoute>
                <AddressBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/productcatalogueaddcambo"
            element={
              <ProtectedRoute>
                <ProductCatalogueAddCambo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/returningLabel"
            element={
              <ProtectedRoute>
                <ReturningLabel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/returningsummary"
            element={
              <ProtectedRoute>
                <ReturningSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/searchfilterproduct"
            element={
              <ProtectedRoute>
                <SearchFilterProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/addressbook"
            element={
              <ProtectedRoute>
                <AddressBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/productcatalogueaddcambo"
            element={
              <ProtectedRoute>
                <ProductCatalogueAddCambo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/ProductAddCombo"
            element={
              <ProtectedRoute>
                <ProductAddCombo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/rechargepayment"
            element={
              <ProtectedRoute>
                <RechargePayment />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/neworder/channel-integration"
            element={<ProtectedRoute><CatalogueChannelIntegrationScreen /></ProtectedRoute> }
          /> */}
          {/* <Route
            path="/neworder/channel-integration/addproduct"
            element={<ProtectedRoute><AddProduct /></ProtectedRoute> }
          /> */}
          {/* <Route
            path="/neworder/channel-integration/addcombo"
            element={<ProtectedRoute><AddCombo /></ProtectedRoute> }
          /> */}
          <Route
            path="/neworder/channel-integration/addcomboproduct"
            element={
              <ProtectedRoute>
                <AddComboProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder/box-catalogue"
            element={
              <ProtectedRoute>
                <CatalogueBoxCatalogueScreen />
              </ProtectedRoute>
            }
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
