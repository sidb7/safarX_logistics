import React from 'react'
import TotalNdrDash from "./TotalNdrDash"
import NDRCommunication from "./NDRCommunication"
import PartnerWiseException from "./PartnerWiseException"
import SellerResponse from "./SellerResponse"
import AdminResponse from "./AdminResponse"
import PartnerWiseRto from "./PartnerWiseRto"
import CourierAndAttempts from "./CourierAndAttempts"
import TopRtoCustomer from "./TopRtoCustomer"
import RtoCityPincode from "./RtoCityPincode"

export default function ExceptionDashboard() {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        {/* TotalNdrDash - Full width always */}
        <div className="w-full">
          <TotalNdrDash />
        </div>

        {/* NDR Communication and PartnerWiseException section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          <div className="lg:col-span-1">
            <NDRCommunication />
          </div>
          <div className="lg:col-span-2">
            <PartnerWiseException />
          </div>
        </div>

        {/* Remaining components - Stack on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SellerResponse />
          <AdminResponse />
          <PartnerWiseRto />
          <CourierAndAttempts />
          <TopRtoCustomer />
          <RtoCityPincode />
        </div>
      </div>
    </div>
  )
}
