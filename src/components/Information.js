import React from 'react';

const rupees = (data) => {
    if(data === 'NA'){
           return "--";
    }

    return <span><i className="fas fa-rupee-sign"></i>{data}</span>;       

}

const percent = (data) => {
   if(data === 'NA'){
       return "--";
   }

   return <span>{data}<i className="fas fa-fa-percentage"></i></span>;       

}
const Information = ({info}) => {
    if(info === {}){
   return null;    
    }
    return (
        <div className="information-card">
        <div className="information-card--header">
           <span>{info.stock}</span>
          <h4>{info.bundle_name}</h4>
          <span>{info.sku}</span>
          <div className="info-body">
             <div className="col-1">
              <img src={info.bundle_image}/>
             </div>
             <div className="col-2">
                <div className="grid-container">
                    <div>
                        <p>Your price:</p>
                        {rupees(info.your_price)}
                    </div> 
                    <div>
                    <p>Lowest price:</p>
                    {rupees(info.lowest_price_value)}
                    </div> 
                    <div>
                    <p>Highest price:</p>
                    {rupees(info.highest_price_value)}
                    </div>
                
                </div>
             
             
             </div>
          </div>
        </div>
        </div>
    );
} 


export default Information;
