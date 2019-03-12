import  React from "react";
const dropdown = ({sorte}) => {
    return <div className="dropdown">
    <button onClick={(e) => { document.getElementById('sortDropdown').classList.toggle('show'); }} className="dropbtn" id="sortDropdownBtn"><i className="fas fa-arrows-alt-v"></i> On</button>
    <div id="sortDropdown" className="dropdown-content">
        <button data-value="desc" onClick={sorte}>Price - HIGH TO LOW </button>
        <button data-value="asc" onClick={sorte}>Discount(%) - LOW TO HIGH </button>
    </div>
  </div>;
}

export default dropdown;