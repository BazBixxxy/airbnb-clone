import React from "react";

const DescriptionPanel = ({place}) => {
  return (
    <div className="mt-3">
      <h3 className="ml-2 font-medium">Description</h3>
      <div className="border p-3 rounded-lg">
        <p>
          {place.description}
        </p>
      </div>
    </div>
  );
};

export default DescriptionPanel;
