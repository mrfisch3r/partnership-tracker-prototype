import React from 'react';

const PartnerDetailsSection = ({ partner, onClose, onComments }) => {
 
  //TODO: if needed, replace these details with data from Flask API response
  return (
    <div className="partner-details">
      <button className="close-button" onClick={onClose}>X</button>
      <h3>Details for {partner.name}</h3>
      <p><strong>County:</strong> {partner.county}</p>
      <p><strong>Status:</strong> {partner.status}</p>
      <p><strong>Last Updated:</strong> {partner.lastUpdated}</p>
      <h4>Contact Information</h4>
      <table>
        <thead>
          <tr>
            <th>Contact Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {partner.contacts && partner.contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.address}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onComments}>Comments</button>
    </div>
  );
};

export default PartnerDetailsSection;
