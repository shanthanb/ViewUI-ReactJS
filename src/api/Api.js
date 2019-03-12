import config from "../config/config";
import axios from "axios";

export function getApiData(data) {
    let params = {
      api_key : config.api_key,
      start : 0,
      limit : config.limit,
    };

    let queryParams = {...params,...data};
    return axios.get(config.api_url + 'bundles/', {
        params : queryParams
    });
}

export function getProductData(id) {
    return axios.get(config.api_url + 'bundle_overview/',{
        params: { 
            api_key : config.api_key,
            base_view : 'all_products',
            bundle_id : id
         }
    });
}