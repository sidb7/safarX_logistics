interface SellerData {
  token?: string;
  [key: string]: any;
}

const sessionManager = (sellerData: SellerData) => {
  // Get or Create tabId for current tab
  let tabId = sessionStorage.getItem("tabId");
  if (!tabId) {
    tabId = `${Date.now()}-${Math.random()}`;
    sessionStorage.setItem("tabId", tabId);
  }

  // Get existing seller data from sessionStorage
  const existingDataRaw = sessionStorage.getItem(`sellerSession_${tabId}`);
  const existingData: SellerData = existingDataRaw
    ? JSON.parse(existingDataRaw)
    : {};

  // Merge new sellerData with existingData if token is present
  if (
    (existingData.token && existingData.name) ||
    (sellerData.token && sellerData.name) ||
    sellerData?.email
    // true
  ) {
    const updatedData = { ...existingData, ...sellerData };
    sessionStorage.setItem(
      `sellerSession_${tabId}`,
      JSON.stringify(updatedData)
    );
  }

  // Get current session data
  const sessionData = JSON.parse(
    sessionStorage.getItem(`sellerSession_${tabId}`) || "{}"
  );

  // Sync sessionData to localStorage if not empty
  if (Object.keys(sessionData).length !== 0) {
    const existingLocalData = JSON.parse(
      localStorage.getItem(`sellerSession`) || "{}"
    );
    localStorage.setItem(
      `sellerSession`,
      JSON.stringify({ ...existingLocalData, ...sessionData })
    );
  }

  // Get merged data from localStorage
  const localSellerData = JSON.parse(
    localStorage.getItem("sellerSession") || "{}"
  );

  // Return data based on sessionData and localSellerData availability
  if (
    Object.keys(sessionData).length === 0 &&
    Object.keys(localSellerData).length !== 0
  ) {
    return { sessionId: tabId, sellerInfo: localSellerData };
  }
  return { sessionId: tabId, sellerInfo: sessionData };
};

export default sessionManager;
