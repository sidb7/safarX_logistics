import React, { useState, useEffect } from 'react';
import AccordianUp from "../../../../assets/AccordionUp.svg";
import Checkbox from "../../../../components/CheckBox";

// Define menu item type
interface FilterMenuItem {
  name: string;
  value: string | boolean;
  isActive: boolean;
}

// Define filter state type
interface FilterState {
  name: string;
  menu: FilterMenuItem[];
  label: string;
  isCollapse: boolean;
}

// Define component props
interface LostDamagedFilterProps {
  filterState: FilterState;
  setFilterState: (state: FilterState) => void;
  onReset?: () => void;
  onApply?: () => void;
  isLoading?: boolean;
}

const LostDamagedFilter: React.FC<LostDamagedFilterProps> = ({ 
  filterState, 
  setFilterState, 
  isLoading 
}) => {
  const [isCurrentTagOpen, setIsCurrentTagOpen] = useState(true);
  const [isActionsOpen, setIsActionsOpen] = useState(true);

  // Current Tag checkboxes state
  const [currentTagChecks, setCurrentTagChecks] = useState({
    lostDamaged: false,
    lost: false,
    damaged: false
  });

  // Actions checkboxes state
  const [actionsChecks, setActionsChecks] = useState({
    claimRaised: false,
    claimPending: false
  });

  // Update local checkbox states when filterState changes
  useEffect(() => {
    // First check if we're receiving a Current Tag filter update
    if (filterState?.name === "Current Tag" && filterState?.menu?.length > 0) {
      setCurrentTagChecks({
        lostDamaged: filterState.menu.some(item => item.value === "LOST/DAMAGE" && item.isActive),
        lost: filterState.menu.some(item => item.value === "LOST" && item.isActive),
        damaged: filterState.menu.some(item => item.value === "DAMAGE" && item.isActive)
      });
    } 
    // Then check if we're receiving an Actions filter update
    else if (filterState?.name === "Actions" && filterState?.menu?.length > 0) {
      setActionsChecks({
        claimRaised: filterState.menu.some(item => item.value === true && item.isActive),
        claimPending: filterState.menu.some(item => item.value === false && item.isActive)
      });
    }
  }, [filterState]);

  // Handle Current Tag checkbox changes
  const handleCurrentTagChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecks = {
      ...currentTagChecks,
      [name]: e.target.checked
    };
    setCurrentTagChecks(updatedChecks);
    
    // Send the updated filter state back to parent
    const tagsMenu = [];
    if (updatedChecks.lostDamaged) {
      tagsMenu.push({ name: "Lost/Damaged", value: "LOST/DAMAGE", isActive: true });
    }
    if (updatedChecks.lost) {
      tagsMenu.push({ name: "Lost", value: "LOST", isActive: true });
    }
    if (updatedChecks.damaged) {
      tagsMenu.push({ name: "Damaged", value: "DAMAGE", isActive: true });
    }
    
    setFilterState({
      name: "Current Tag",
      menu: tagsMenu,
      label: "ldStatus",
      isCollapse: false,
    });
  };

  // Handle Actions checkbox changes
  const handleActionsChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecks = {
      ...actionsChecks,
      [name]: e.target.checked
    };
    setActionsChecks(updatedChecks);
    
    // Send the updated filter state back to parent
    const actionsMenu = [];
    if (updatedChecks.claimRaised) {
      actionsMenu.push({ name: "Claim Raised", value: true, isActive: true });
    }
    if (updatedChecks.claimPending) {
      actionsMenu.push({ name: "Claim Pending", value: false, isActive: true });
    }
    
    setFilterState({
      name: "Actions",
      menu: actionsMenu,
      label: "isClaimed",
      isCollapse: false,
    });
  };

  // Calculate total number of active filters
  const getActiveFiltersCount = () => {
    return Object.values(currentTagChecks).filter(Boolean).length + 
           Object.values(actionsChecks).filter(Boolean).length;
  };

  return (
    <div className="w-full bg-white rounded-lg h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* Current Tag Section */}
        <div className={`mb-3 border rounded-lg ${isCurrentTagOpen ? 'border-[#E8E8E8]' : 'border-gray-200'}`}>
          <button
            onClick={() => setIsCurrentTagOpen(!isCurrentTagOpen)}
            className={`w-full flex items-center justify-between p-3 ${isCurrentTagOpen ? 'bg-[#F6F6F6]' : 'bg-white'} rounded-lg`}
          >
            <span className="font-Open font-semibold text-[16px] leading-[22px]">Current Tag</span>
            <img 
              src={AccordianUp} 
              alt="toggle" 
              className={`w-5 h-5 transition-transform duration-200 ${
                !isCurrentTagOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {isCurrentTagOpen && (
            <div className="p-3 pt-0">
              <div className="space-y-3 pt-3">
                <div className="flex items-center">
                  <Checkbox
                    checked={currentTagChecks.lostDamaged}
                    onChange={handleCurrentTagChange('lostDamaged')}
                  />
                  <span className="ml-2 text-sm text-gray-700">Lost/Damaged</span>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    checked={currentTagChecks.lost}
                    onChange={handleCurrentTagChange('lost')}
                  />
                  <span className="ml-2 text-sm text-gray-700">Lost</span>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    checked={currentTagChecks.damaged}
                    onChange={handleCurrentTagChange('damaged')}
                  />
                  <span className="ml-2 text-sm text-gray-700">Damaged</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions Section */}
        <div className={`mb-3 border rounded-lg ${isActionsOpen ? 'border-[#E8E8E8]' : 'border-gray-200'}`}>
          <button
            onClick={() => setIsActionsOpen(!isActionsOpen)}
            className={`w-full flex items-center justify-between p-3 ${isActionsOpen ? 'bg-[#F6F6F6]' : 'bg-white'} rounded-lg`}
          >
            <span className="font-Open font-semibold text-[16px] leading-[22px]">Actions</span>
            <img 
              src={AccordianUp} 
              alt="toggle" 
              className={`w-5 h-5 transition-transform duration-200 ${
                !isActionsOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {isActionsOpen && (
            <div className="p-3 pt-0">
              <div className="space-y-3 pt-3">
                <div className="flex items-center">
                  <Checkbox
                    checked={actionsChecks.claimRaised}
                    onChange={handleActionsChange('claimRaised')}
                  />
                  <span className="ml-2 text-sm text-gray-700">Claim Raised</span>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    checked={actionsChecks.claimPending}
                    onChange={handleActionsChange('claimPending')}
                  />
                  <span className="ml-2 text-sm text-gray-700">Claim Pending</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Count Badge */}
      <div className="mt-4 mb-4 flex justify-center">
        {getActiveFiltersCount() > 0 && (
          <div className="bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm">
            {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} applied
          </div>
        )}
      </div>
    </div>
  );
};

export default LostDamagedFilter;