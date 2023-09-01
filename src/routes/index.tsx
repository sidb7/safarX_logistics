import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PickUpScreen from "../screens/NewOrder/PickUp";
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
import { WelcomeKyc } from "../screens/Onboarding/Questionnaire/welcomeKyc";

//order/service - suresh
import Service from "../screens/Order/Service";
import Summary from "../screens/Order/Summary";
import Payment from "../screens/Order/Payment";
// import Layout from "../layout";
// import { CommonLayout } from "../layout/layout";

import AddNewProduct from "../screens/NewOrder/Product/AddProduct";
// import ProductPackage from "../screens/NewOrder/Product/ProductPackage";
import { ProfileSetting } from "../screens/Profile/Settings/setting";
import Catalogue from "../screens/NewOrder/NewCatalogue";
import AddComboScreen from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addCombo";
import AddProductScreen from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addProduct";

import CommonLayout from "../layout";
import EditAddress from "../screens/NewOrder/NewCatalogue/AddressBook/editAddress";
import AddAddress from "../screens/NewOrder/NewCatalogue/AddressBook/addAddress";
import ProtectedRoute from "../components/ProtectedRoutes";

//Plan Screens
import NewUserPlanScreen from "../screens/Plan";
import PlanDetails from "../screens/Plan/planDetails";

import CatalogueAddProduct from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addProduct";
import Overview from "../screens/Home/Overview/Overview";
import { Transaction } from "../screens/Transaction";
import NotFound from "../components/404NotFound/NotFound";

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
          </Route>
          {/* <Route path="/auth/signUp" element={<SignUpScreen />} /> */}
          {/* <Route path="/auth/sendOtp" element={<SendOTPScreen />} />
          <Route path="/auth/verifyOtp" element={<VerifyOTPScreen />} />
          <Route path="/auth/offers" element={<OffersScreen />} />
          <Route path="/auth/getStarted" element={<GetStartedScreen />} /> */}
          <Route path="/neworder" element={<CommonLayout />}>
            <Route path="pickup" element={<PickUpScreen />} />
            <Route path="delivery" element={<DeliveryScreen />} />
            <Route path="add-product" element={<AddProductOrder />} />
            <Route path="product-package" element={<ProductPackage />} />
            {/* <Route
              path="transaction"
              element={
                <ProtectedRoute>
                  <TransactionLayout />
                </ProtectedRoute>
              }
            ></Route> */}
            <Route path="service" element={<ServiceScreen />} />
            {/* <Route path="payment" element={<PaymentScreen />} /> */}
            <Route path="summary" element={<SummaryScreen />} />
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
            {/* <Route
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
            /> */}
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
            <Route path="insurance" element={<InsuranceScreen />} />
            <Route path="post-payment" element={<PostPaymentScreen />} />
            {/* <Route path="productpage" element={<ProductPage />} />
            <Route path="productfilled" element={<ProductFilled />} /> */}
            {/* <Route path="package" element={<Package />} /> */}
            <Route path="map" element={<Map />} />
            <Route path="label" element={<LabelScreen />} />
            <Route path="filter" element={<FilterScreen />} />
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
          <Route path="onboarding/verifyotp" element={<VerifyOTPScreen />} />
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
                <WelcomeKyc />
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
            path="onboarding/kyc-terms/gst-agreement"
            element={
              <ProtectedRoute>
                <GSTComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/kyc-terms/service-agreement"
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
            path="onboarding/kyc"
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
              path="orders/view-orders"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            >
              <Route path="order-details" />
            </Route>
            <Route
              path="home/overview"
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              }
            ></Route>
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
              path="/orders/add-order/pickup"
              element={
                <ProtectedRoute>
                  <PickUpScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/add-order/delivery"
              element={
                <ProtectedRoute>
                  <DeliveryScreen />
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
                  <Summary />
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

            {/* <Route
              path="add-product"
              element={
                <ProtectedRoute>
                  <AddProductOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="product-package"
              element={
                <ProtectedRoute>
                  <AddProductOrder />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route path="/orders/add-order/service" element={<Service />} />
            <Route path="/order/summary" element={<Summary />} />
            <Route path="/order/payment" element={<Payment />} /> */}
            {/* <Route path="newOrder/addnewproduct" element={<AddNewProduct />} /> */}
            {/* <Route
              path="newOrder/productpackage"
              element={<ProductPackage />}
            /> */}

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

            {/* Plan */}

            <Route path="/plan" element={<NewUserPlanScreen />} />
            <Route path="/plan-details" element={<PlanDetails />} />
            <Route
              path="catalogue/add-product"
              element={<CatalogueAddProduct />}
            />

            {/*Removed transactionlayout and added direct transaction file*/}
            <Route
              path="/wallet/transactions"
              element={
                <ProtectedRoute>
                  <Transaction />
                </ProtectedRoute>
              }
            ></Route>
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

          {/* <Route
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
          /> */}
          {/* <Route
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
          /> */}
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
          {/* <Route path="/" element={<CommonLayout />}>
            <Route path="/plan" element={<NewUserPlanScreen />} />
          </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MyRoutes;
