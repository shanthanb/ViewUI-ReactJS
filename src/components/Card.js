import React from 'react';
import uuid from 'uuid/v4';
const Card = ({price, name, sku, priceIncreaseBy,priceIncreaseInPercent, priceOpportunityDays, productImage, validity, outOfStockDays, stock, id, show, current}) => {
    return  (<div className={"products-card " + (id === current ? "active" : " ")} key={uuid()} data-id={id} onClick={show.bind(this)} id={id} >
       <div className="products-card--body" key={uuid()}>
            { stock === "in stock" ? <span className="products-card--price" key={uuid()}><i key={uuid()} className="fas fa-rupee-sign"></i> {price}</span> : ''}
            <h4 className="products-card--bodyTitle" key={uuid()}>{name}</h4> 
            <span className="products-card--bodySku" key={uuid()}>{sku}</span>
            { stock === "in stock" ? <p key={uuid()} >Increase upto <i key={uuid()} className="fas fa-rupee-sign"></i> {priceIncreaseBy} ( {priceIncreaseInPercent} %), Opportunity exist from last {priceOpportunityDays} days</p> :  getMessage(validity,outOfStockDays) }

            </div>
       <div className="products-card--img" key={uuid()}>
       <img src={productImage} alt="productImage" key={uuid()}/>
       </div>
    </div>);
 };

 const getMessage = (validity,outOfStockDays) => {
      if(validity === 0)  {
        return <p key={uuid()}>Product Not available</p>;
      } else {  
          return <p key={uuid()}>Out of stock for {outOfStockDays} day(s)</p>;
      }

  }

 export default Card;

