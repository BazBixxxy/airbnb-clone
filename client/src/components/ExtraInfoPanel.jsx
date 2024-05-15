import React from "react";

const ExtraInfoPanel = ({ place }) => {
  return (
    <div className="mt-3">
      <h3 className="ml-2 font-medium">Extra Information</h3>
      <div className="border p-3 rounded-lg">
        <p>{place.extraInfo}</p>
      </div>
    </div>
  );
};

export default ExtraInfoPanel;
