import React from "react";

const PerksPanel = ({ place }) => {
  return (
    <div className="mt-5">
      <h5 className="font-medium">Perks/Amenities</h5>
      <div className="table gap-1">
        {place.perks.map((perk) => (
          <div className="border rounded-sm p-1" key={perk}>
            {perk}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerksPanel;
