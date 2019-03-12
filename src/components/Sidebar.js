import React from 'react';

const Sidebar = ({update}) => { 
    return  (<section className="sidebar">
                <h4 className="sidebar-nav--header">Views</h4>
                 <ul className="sidebar-nav--list">
                   <li className="sidebar-nav--menu">
                      <a role="button" href="#none" onClick={update} data-view="all_products">All Matched Products</a>
                   </li>
                   <li className="sidebar-nav--menu">
                      <a role="button" href="#none" onClick={update} data-view="increase_opportunity">Main Gain Opportunities</a>
                   </li>
                   
                 </ul>
              </section>);
 };

 export default Sidebar;