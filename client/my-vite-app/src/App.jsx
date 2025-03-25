import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PartnershipTable from './components/PartnershipTable';
import PartnerDetailsSection from './components/PartnerDetailsSection';
import CommentsSection from './components/CommentsSection';
import './App.css';

function App() {
  //state for filter criteria – may fetch data from Flask based on these
  const [filters, setFilters] = useState({ county: '', partnerType: '' });
  
  //selected partner from the table; ideally fetched in more detail from Flask
  const [selectedPartner, setSelectedPartner] = useState(null);
  
  //toggle to show comments vs. partner details
  const [showComments, setShowComments] = useState(false);

  //called when filter values change in Sidebar; consider calling Flask API here
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    //TODO: integrate with Flask to fetch filtered partner data
  };

  //called when a partner row is clicked; optionally, fetch detailed data from Flask
  const handlePartnerSelect = (partner) => {
    setSelectedPartner(partner);
    setShowComments(false);
  };

  //close partner details
  const handleCloseDetails = () => {
    setSelectedPartner(null);
  };

  //open the comments for the selected partner; you might fetch comments here
  const handleOpenComments = () => {
    setShowComments(true);
    // TODO: Fetch comments for the partner from Flask if needed
  };

  //close the comments modal and clear the selection
  const handleCloseComments = () => {
    setShowComments(false);
    setSelectedPartner(null);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar onFilterChange={handleFilterChange} />
        <PartnershipTable filters={filters} onPartnerSelect={handlePartnerSelect} />
      </div>
      {selectedPartner && !showComments && (
        <PartnerDetailsSection 
          partner={selectedPartner} 
          onClose={handleCloseDetails} 
          onComments={handleOpenComments}
        />
      )}
      {selectedPartner && showComments && (
        <CommentsSection 
          partner={selectedPartner} 
          onClose={handleCloseComments} 
        />
      )}
    </div>
  );
}

export default App;
