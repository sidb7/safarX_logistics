// const AdvanceRuleEngine = () => {
//   return (
//     <div className="flex justify-center items-center h-64 mt-4">
//       <h2 className="text-lg font-bold text-gray-500">Coming Soon</h2>
//     </div>
//   );
// };

import React, { useState } from "react";
// import QueryBuilder from "react-querybuilder";

const fields = [
  { name: "paymentMode", label: "Payment Mode" },
  { name: "appliedWeight", label: "Applied Weight" },
];

const AdvanceRuleEngine = () => {
  const [query, setQuery] = useState({ combinator: "and", rules: [] });

  const handleQueryChange = (query: any) => {
    setQuery(query);
  };

  const handleExecuteAction = () => {
    console.log("Executing action for query:", query);
    // Define the action logic here
    // For example, set courier service based on conditions
  };

  return (
    <div>
      <h1>Rule Engine</h1>
      <div className="query-builder">
        {/* <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={handleQueryChange}
        /> */}
      </div>
      <button onClick={handleExecuteAction}>Execute Action</button>
    </div>
  );
};

export default AdvanceRuleEngine;
