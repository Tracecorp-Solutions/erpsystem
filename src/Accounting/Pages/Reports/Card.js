import React from 'react';

const Cards = () => {
  return (
    <div className="flex" style={{ justifyContent: "start", border: "2px solid red" }}>
      <div style={{ border: "2px solid red", marginRight: "10px" }}>
        <div className="bg-white border border-gray-300 rounded shadow p-4" style={{ width: '150px' }}>
          Card content 1
        </div>
      </div>
      <div style={{ border: "2px solid red", marginRight: "10px", marginLeft: "10px" }}>
        <div className="bg-white border border-gray-300 rounded shadow p-4" style={{ width: '150px' }}>
          Card content 2
        </div>
      </div>
      <div style={{ marginRight: "10px", marginLeft: "10px" }}>
        <div className="bg-white border border-gray-300 rounded shadow p-4" style={{ width: '150px' }}>
          Card content 3
        </div>
      </div>
      <div style={{ marginRight: "10px" }}>
        <div className="bg-white border border-gray-300 rounded shadow p-4" style={{ width: '150px' }}>
          Card content 4
        </div>
      </div>
    </div>
  );
}

export default Cards;
