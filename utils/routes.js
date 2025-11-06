import { SYD_VAR } from "../sydneyDom_v3.js";
import { updateState, updateState__bulk } from "./stateAssets.js";

export const fetchProducts = async function()
{
    // send to backend
    const res = await fetch(`${SYD_VAR.dev.get()}/products/products`, {
        method: "GET",
    });

    const response = await res.json();

    if(res.status === 200)
    {
        //append products
        let categoryList = [];
        let productsList = {};
        response.documents.forEach(doc => {
            if(!categoryList.includes(doc.product_type))categoryList.push(doc.product_type);
            if(!productsList[doc.product_type]) productsList[doc.product_type] = new Array();
            productsList[doc.product_type].push(doc);
        });
        //append products

        if(Object.keys(productsList).length === 0)
        {
            productsList = {default:[]};
            
        }

        updateState({name:"adminProductView_popularCat_tab_dd",prop:"elements",value:categoryList,isDiff:false});
        
        updateState__bulk({name:"adminProductView",task:s=>{
            s.products = productsList;
            s.currentCategory = categoryList[0]?categoryList[0]:"default";
            s.hasLoaded = true;
            s.isLoading = false;
            return s;
        }})
    }

    updateState__bulk({name:"isLoading",task:s=>{
        s.isActive = false;
        s.mode = "loading products"
        return s;
    }});

    updateState__bulk({name:"adminMain_loadOverlay",task:s=>{
        s.isActive = false;
        return s;
    }});
}

export const fetchOrders = async function()
{
    // send to backend
    const res = await fetch(`${SYD_VAR.dev.get()}/orders/orders`, {
        method: "GET",
    });

    const response = await res.json();

    if(res.status === 200)
    {
        console.log(response)

        //remember to set hasLoaded to true


        updateState__bulk({name:"orderMain",task:s=>{
            s.orders = response.documents;
            s.hasLoaded = true;
            s.isLoading = false;

            console.log(s.orders)
            return s;
        }})
    }

    updateState__bulk({name:"isLoading",task:s=>{
        s.isActive = false;
        s.mode = "loading products"
        return s;
    }});

    updateState__bulk({name:"adminMain_loadOverlay",task:s=>{
        s.isActive = false;
        return s;
    }});
}