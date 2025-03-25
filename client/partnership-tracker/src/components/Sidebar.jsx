import React, { useState } from 'react';

const Sidebar = ({ onFilterChange }) => {
  const [county, setCounty] = useState('');
  const [partnerType, setPartnerType] = useState('');

  //update county filter and notify parent component
  const handleCountyChange = (e) => {
    const newCounty = e.target.value;
    setCounty(newCounty);
    
    //TODO: optionally, update filters based on backend data if needed
    onFilterChange({ county: newCounty, partnerType });
  };

  //update partner type filter and notify parent component
  const handlePartnerTypeChange = (e) => {
    const newPartnerType = e.target.value;
    setPartnerType(newPartnerType);
    onFilterChange({ county, partnerType: newPartnerType });
  };

  return (
    <aside className="sidebar">
      <h2>Filters</h2>
      <div>
        <label>County:</label>
        <select value={county} onChange={handleCountyChange}>
          <option value="">All Counties</option>
          <option value="County1">County 1</option>
          <option value="County2">County 2</option>
          <option value="County3">County 3</option>
          
          {/*TODO: Consider fetching counties from Flask backend */}
        </select>
      </div>
      <div>
        <label>Partner Status:</label>
        <select value={partnerType} onChange={handlePartnerTypeChange}>
          <option value="">All</option>
          <option value="current">Current Partner</option>
          <option value="seasonal">Seasonal Partner</option>
          <option value="wavering">Wavering</option>
          <option value="notInterested">Absolutely Not</option>
        </select>
      </div>
      <button onClick={() => alert('Print functionality not implemented')}>
        Print
      </button>
      <button onClick={() => alert('Export functionality not implemented')}>
        Download PDF
      </button>
    </aside>
  );
};

export default Sidebar;
