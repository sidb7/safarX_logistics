
import React from 'react';
import bookedIcon from "../../assets/TrackingStatusLable/booked.svg";
import calcelledIcon from "../../assets/TrackingStatusLable/Cancelled.svg";
import errorIcon from "../../assets/TrackingStatusLable/error.svg";
import inTransitIcon from "../../assets/TrackingStatusLable/In Transit.svg";
import notPickedIcon from "../../assets/TrackingStatusLable/Not Picked.svg";
import rtoIcon from "../../assets/TrackingStatusLable/RTO IT.svg";

// Status type definitions
export type BookedStatus = 
  | 'BOOKED' 
  | 'NOT_PICKED' 
  | 'PICKED_UP' 
  | 'REACHED_DESTINATION'
  | 'OUT_FOR_DELIVERY' 
  | 'OUT_FOR_DELIVEREY' 
  | 'DELIVERED';

export type ExceptionStatus = 
  | 'EXCEPTION' 
  | 'LOST_DAMAGE' 
  | 'LOST' 
  | 'DAMAGE' 
  | 'LOST/DAMAGE'
  | 'CANCEL_REQUESTED'
  | 'CANCELLED' 
  | 'NULL';

export type TransitStatus = 
  | 'IN_TRANSIT' 
  | 'RTO_IN_TRANSIT';

export type RTOStatus = 
  | 'RTO_NOT_PICKED' 
  | 'RTO_REACHED_DESTINATION' 
  | 'RTO_OUT_FOR_DELIVERY'
  | 'RTO_DELIVERED' 
  | 'RTO_EXCEPTION' 
  | 'REVERSE_IN_TRANSIT';

export type StatusType = 
  | BookedStatus 
  | ExceptionStatus 
  | TransitStatus 
  | RTOStatus;

export interface TrackingStatusLabelProps {
  status: StatusType | string;
  className?: string;
}

// Type guards
const isBookedStatus = (status: string): status is BookedStatus => {
  return [
    'BOOKED', 'PICKED_UP', 'REACHED_DESTINATION',
    'OUT_FOR_DELIVERY', 'OUT_FOR_DELIVEREY', 'DELIVERED'
  ].includes(status);
};

const isNotPickedStatus = (status: string): boolean => {
  return status === 'NOT_PICKED';
};

const isCancelledStatus = (status: string): boolean => {
  return status === 'CANCELLED';
};

const isExceptionStatus = (status: string): status is ExceptionStatus => {
  return [
    'EXCEPTION', 'LOST_DAMAGE', 'LOST', 'DAMAGE',
    'CANCEL_REQUESTED', 'NULL','LOST/DAMAGE'
  ].includes(status);
};

const isTransitStatus = (status: string): status is TransitStatus => {
  return ['IN_TRANSIT', 'RTO_IN_TRANSIT'].includes(status);
};

const isRTOStatus = (status: string): status is RTOStatus => {
  return [
    'RTO_NOT_PICKED', 'RTO_REACHED_DESTINATION', 'RTO_OUT_FOR_DELIVERY',
    'RTO_DELIVERED', 'RTO_EXCEPTION', 'REVERSE_IN_TRANSIT'
  ].includes(status);
};

const getStatusIcon = (status: string): string => {
  const normalizedStatus = status.toUpperCase().replace(/ /g, '_');
  
  if (isNotPickedStatus(normalizedStatus)) {
    return notPickedIcon;
  }
  
  if (isCancelledStatus(normalizedStatus)) {
    return calcelledIcon;
  }
  
  if (isBookedStatus(normalizedStatus)) {
    return bookedIcon;
  }
  
  if (isExceptionStatus(normalizedStatus)) {
    return errorIcon;
  }
  
  if (isTransitStatus(normalizedStatus)) {
    return inTransitIcon;
  }
  
  if (isRTOStatus(normalizedStatus)) {
    return rtoIcon;
  }
  
  return errorIcon; // Default fallback
};

const getStatusStyles = (status: string): string => {
  const normalizedStatus = status.toUpperCase().replace(/ /g, '_');
  
  if (isBookedStatus(normalizedStatus) || isNotPickedStatus(normalizedStatus)) {
    return 'border-[#7CCA62] bg-[#F2FAEF] text-[#7CCA62]';
  }
  
  if (isExceptionStatus(normalizedStatus) || isCancelledStatus(normalizedStatus)) {
    return 'border-[#F35838] bg-[#FEEEEB] text-[#F35838]';
  }
  
  if (isTransitStatus(normalizedStatus)) {
    return 'border-[#FD7E14] bg-[#FFF6EB] text-[#FD7E14]';
  }
  
  if (isRTOStatus(normalizedStatus)) {
    return 'border-[#228BE6] bg-[#D0EBFF] text-[#228BE6]';
  }
  
  return 'border-gray-400 bg-gray-100 text-gray-600';
};

export const TrackingStatusLabel: React.FC<TrackingStatusLabelProps> = ({ 
  status, 
  className = '' 
}) => {
  const formattedStatus = status.replace(/_/g, ' ');
  const iconSrc = getStatusIcon(status);
  
  return (
    <div 
      className={`
        inline-flex items-center gap-2
        px-2.5 py-1.5
        border rounded-2xl
        font-Open font-medium text-xs leading-4
        ${getStatusStyles(status)}
        ${className}
      `}
    >
      <img src={iconSrc} alt="" className="w-4 h-4" />
      <span>{formattedStatus}</span>
    </div>
  );
};

export default TrackingStatusLabel;