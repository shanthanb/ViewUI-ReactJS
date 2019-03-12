import  React from "react";
const dropdown = ({sorte}) => {
    return <div className="dropdown">
    <button onClick={(e) => { document.getElementById('myDropdown').classList.toggle('show'); }} className="dropbtn" id="myDropdownBtn"><i className="fas fa-arrows-alt-v"></i>BY</button>
    <div id="myDropdown" className="dropdown-content">
        <button data-value="available_price"  onClick={sorte}>Price - HIGH TO LOW </button>
        <button data-value="discount" onClick={sorte}>Discount(%) - HIGH TO LOW </button>
        <button data-value="price_opportunity_increase_by_percentage" onClick={sorte}>INCREASE(%) - HIGH TO LOW </button>
        <button data-value="not_lowest_decrease_by_percentage" onClick={sorte}>DECREASE(%) - HIGH TO LOW </button>
    </div>
  </div>;
}

export default dropdown;