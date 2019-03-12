import React, { Fragment } from 'react';
import './App.scss';
import { getApiData, getProductData } from './api/Api';
import Sidebar from './components/Sidebar';
import '@fortawesome/fontawesome-free/css/all.css';
import Card from './components/Card';
import uuid from 'uuid/v4';
import Information from './components/Information';
import Dropdown from './components/dropdown';
import SortBtn from './components/sortButton';
import config from './config/config';


class App extends React.Component {
  constructor(props){
    super(props);
     this.update = this.update.bind(this) ;

  
  }

  state = { 
    products : [],
    start : 0,
    total : 0,
    current_product : {},
    params : {
      filters : {
        search : '',
      },
      Sort_on : '',
      Sort_by : '',
      base_view : 'all_products'
    }
  };

   show  = (e) => { 
     let id = e.currentTarget.dataset.id;
     getProductData(id).then(response => {
       this.setState({
         current_product : {...response.data.data,bundle_id : id}
       });
      }).catch(err => {
      throw err;
     });
   }

   updateList= (list) => { 
     if(!list.data.data[0]) {
       this.setState({products : []});
      return;
     }

       getProductData(list.data.data[0].bundle_id).then((response) => {  
        this.setState((state,props) => {
          let data = state.products;
          return {
            products : data.concat(list.data.data),
            start : list.data.parameters.start,
            total : list.data.count || 0,
            current_product : {...response.data.data, bundle_id : list.data.data[0].bundle_id }
            }; }
            );
        }).catch(error => {
          throw error;
       });
 
   }

   componentDidMount = () => {
     this.fetchList();
   }

   fetchList = () => {
    getApiData(this.state.params).then(response => {
      this.updateList(response);
    }).catch(err => {
        throw err;
    });
   }

    getProducts = () => {
      if(this.state.products.length === 0){
       return null;
      }
      let productsList = [];
      this.state.products.forEach(data => {
           let temp = <Card key={uuid()}
                        price={data.available_price}
                        name={data.bundle_name} 
                        sku={data.sku} 
                        priceIncreaseBy={data.price_opportunity_increase_by}
                        priceIncreaseInPercent={data.price_opportunity_increase_by_percentage}
                        priceOpportunityDays={data.price_opportunity_days}
                        productImage={data.thumbnail}
                        validity={data.is_valid} 
                        outOfStockDays={data.out_of_stock_seed_days} 
                        stock={data.stock}
                        id={data.bundle_id}
                        show={this.show}
                        current={this.state.current_product.bundle_id || 1}
                      />;
           productsList.push(temp);
      });
       return productsList;
    }

    loadMore = () => {
      let data = JSON.parse(JSON.stringify(this.state.params));
      data.start = this.state.start + config.limit;
     
      getApiData(data).then(response => { 
        if(response.data.data !== [])
          {     
               this.updateList(response);
          } 
       }).catch(err => {
         throw err;
      });
    }

    update = (e) => {
       let data = JSON.parse(JSON.stringify(this.state.params));
       data.base_view = e.target.dataset.view;
        this.setState({
          products : [],
          start : 0,
          total : 0,
          current_product : {},
          params : data,
        },() => {
          this.fetchList();
         });
             
    }
   
    search = (e) => {
       let data = JSON.parse(JSON.stringify(this.state.params));
       data.filters = {search : e.target.value};
      let {params} = this.state;
      params.filters.search = e.target.value;
        this.setState({products : [],
          start : 0,
          total : 0,
          current_product : {},params},() => { 
          this.fetchList();
         });
    }  

    sortBy = (e) => {
      document.getElementById('myDropdown').classList.toggle('show');
      let data = JSON.parse(JSON.stringify(this.state.params));
      data.Sort_by = e.target.dataset.value;
        this.setState({ params: data},() => { 
           this.fetchList();
         });
       return true;
    }

    sortOn = (e) => {
      document.getElementById('sortDropdown').classList.toggle('show');
       let data = JSON.parse(JSON.stringify(this.state.params));
        data.Sort_on = e.target.dataset.value;
        this.setState({params : data},() => { 
          this.fetchList();
        });
       return true;
    }
    render() {
      let count = parseInt(this.state.total) -  parseInt(this.state.products.length);
     
      return  <Fragment>
                <Sidebar update={this.update}/>
                <section className="products">
                  <div className="filters-holder">
                    <div className="filters-holder--search">
                         <input type="text" onChange={this.search} placeholder="Search"/>
                    </div>
                    <Dropdown sorte={this.sortBy} />
                    <SortBtn sorte={this.sortOn} />
                  </div>
                  <div className="products-list" id="products-list">
                  {this.getProducts()}
                  <center> <button className="btn" onClick={this.loadMore} disabled={ count === 0 ? true : false } > {count} Product(s) More</button> </center>
                  </div>
                </section>
                <section className="details">
                    <Information info={this.state.current_product}/>
                </section>
            </Fragment>;
    }

    componentDidUpdate = (prevProps,prevState) => {
      if(this.state.current_product.bundle_id){
        if(prevState.products !== this.state.products){
           let target = document.getElementById(this.state.current_product.bundle_id);
           if(target !== null){
             target.scrollIntoView();
           }
        }
      }
    }
}

export default App;
