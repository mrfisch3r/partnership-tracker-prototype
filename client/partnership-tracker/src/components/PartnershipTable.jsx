import React, {useEffect, useState} from 'react';

//dummy data for prototyping.
//TODO: replace this hardcoded dummyData with a fetch call to Flask API endpoint
let dummyData = [
  { 
    id: 1, 
    name: 'Community Partner A', 
    county: 'County1', 
    status: 'current', 
    lastUpdated: '2025-01-10',
    contacts: [
      { name: 'Alice Johnson', address: '123 Main St, CityA', phone: '555-1234', email: 'alice@example.com' },
      { name: 'Bob Smith', address: '123 Main St, CityA', phone: '555-5678', email: 'bob@example.com' }
    ]
  },
  { 
    id: 2, 
    name: 'Community Partner B', 
    county: 'County2', 
    status: 'seasonal', 
    lastUpdated: '2025-01-08',
    contacts: [
      { name: 'Charlie Brown', address: '456 Elm St, CityB', phone: '555-9876', email: 'charlie@example.com' }
    ]
  },
  { 
    id: 3, 
    name: 'Community Partner C', 
    county: 'County1', 
    status: 'wavering', 
    lastUpdated: '2025-01-12',
    contacts: [
      { name: 'Dana White', address: '789 Oak St, CityC', phone: '555-0000', email: 'dana@example.com' },
      { name: 'Evan Davis', address: '789 Oak St, CityC', phone: '555-1111', email: 'evan@example.com' }
    ]
  },
];

async function GetData()
{
  try {
    const res = await fetch('http://127.0.0.1:5000/api/data');
    const dummyData = await res.json();
    document.getElementById('response').innerText = dummyData.message;
    console.log(dummyData)
  } catch (err) {
    console.error('Error:', err);
  }

}


const PartnershipTable = ({ filters, onPartnerSelect }) => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [dummyData, setPartners] = useState([])


    const GetData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/partners');
        const data = await res.json();
        setPartners(data); // ✅ store in state
        console.log(data)
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

  useEffect(() => {
    GetData();
  }, []);


  //filter the dummy data based on selected filters.
  const filteredData = dummyData.filter((partner) => {
    const matchesCounty = filters.county ? partner.county === filters.county : true;
    const matchesStatus = filters.partnerType ? partner.status === filters.partnerType : true;
    return matchesCounty && matchesStatus;
  });

  //sort the data by recency (lastUpdated)
  const sortedData = [...filteredData].sort((a, b) => {
    return sortOrder === 'desc'
      ? new Date(b.lastUpdated) - new Date(a.lastUpdated)
      : new Date(a.lastUpdated) - new Date(b.lastUpdated);
  });

  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="partnership-table">
      <h2>Community Partners</h2>
      <button onClick={toggleSort}>
        Sort by Recency ({sortOrder === 'desc' ? 'Newest First' : 'Oldest First'})
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>County</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((partner) => (
            <tr key={partner.id} onClick={() => onPartnerSelect(partner)} style={{ cursor: 'pointer' }}>
              <td>{partner.name}</td>
              <td>{partner.county}</td>
              <td>{partner.status}</td>
              <td>{partner.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnershipTable;
