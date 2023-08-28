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
import { QuestionComponent5 } from "../screens/Onboarding/Questionnaire/question5";

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

import CatalogueAddProduct from "../screens/NewOrder/NewCatalogue/ProductCatalogue/addProduct";
import Overview from "../screens/Home/Overview/Overview";
import { Transaction } from "../screens/Transaction";
import NotFound from "../components/404NotFound/NotFound";
import { Profile } from "../screens/Profile";
import PlanDetails from "../screens/Plan/planDetails";
import NewUserPlanScreen from "../screens/Plan";

const MyRoutes: React.FC = () => {
  return (
    <div>
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

          {/* onboarding routes  */}
          <Route>
            <Route path="/onboarding/signup" element={<SignUpScreen />} />
            <Route path="/onboarding/sendotp" element={<SendOTPScreen />} />
            <Route path="/onboarding/verifyotp" element={<VerifyOTPScreen />} />
            <Route
              path="/onboarding/offers"
              element={
                <ProtectedRoute>
                  <OffersScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/getStarted"
              element={
                <ProtectedRoute>
                  <GetStartedScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/questionnaire/question1"
              element={
                <ProtectedRoute>
                  <QuestionComponent1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/questionnaire/question2"
              element={
                <ProtectedRoute>
                  <QuestionComponent2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/questionnaire/question3"
              element={
                <ProtectedRoute>
                  <QuestionComponent3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/questionnaire/question4"
              element={
                <ProtectedRoute>
                  <QuestionComponent4 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/questionnaire/question5"
              element={
                <ProtectedRoute>
                  <QuestionComponent5 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/kyc-type"
              element={
                <ProtectedRoute>
                  <KycBusinessTypeScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/kyc-photo"
              element={
                <ProtectedRoute>
                  <KycPhotoIdentificationScreen />
                </ProtectedRoute>
              }
            />

            <Route
              path="/onboarding/kyc-otp-form"
              element={
                <ProtectedRoute>
                  <KycSendOtpFormScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/select-address-billing"
              element={
                <ProtectedRoute>
                  <SelectAddressBilling />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/select-address-pickup"
              element={
                <ProtectedRoute>
                  <SelectAddressPickUp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/kyc-mobile-verify"
              element={
                <ProtectedRoute>
                  <KycMobileVerificationScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/kyc-terms/GSTComponent"
              element={
                <ProtectedRoute>
                  <GSTComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/kyc-terms/ServiceComponent"
              element={
                <ProtectedRoute>
                  <ServiceComponent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/onboarding/kyc-modal"
              element={
                <ProtectedRoute>
                  <KycModalScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/select-address"
              element={
                <ProtectedRoute>
                  <SelectAddress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/kyc-aadhar-form"
              element={
                <ProtectedRoute>
                  <KycAadharForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/walletrecharge"
              element={
                <ProtectedRoute>
                  <OnBoundingWalletRecharge />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/rechargepayment"
              element={
                <ProtectedRoute>
                  <RechargePayment />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Root Routes */}
          <Route path="/" element={<CommonLayout />}>
            {/* Order Routes */}
            <Route>
              <Route
                path="home/overview"
                element={
                  <ProtectedRoute>
                    <Overview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders/view-orders"
                element={
                  <ProtectedRoute>
                    <Order />
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
                path="/profile/settings"
                element={
                  <ProtectedRoute>
                    <SettingTab />
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
                path="/catalogues/catalogue"
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
                element={<CatalogueAddProduct />}
              />
            </Route>

            {/* Wallet Routes */}
            <Route>
              <Route
                path="wallet/transactions"
                element={
                  <ProtectedRoute>
                    <Transaction />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route>
              <Route path="/plan" element={<NewUserPlanScreen />} />
              <Route path="/plan-details" element={<PlanDetails />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MyRoutes;
