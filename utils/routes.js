import { __p, SYD_VAR } from "../sydneyDom_v3.js";
import { closeMainView } from "./appends.js";
import { updateState, updateState__bulk } from "./stateAssets.js";

export const fetchProducts = async function()
{
    closeMainView("loading products");

    try
    {
        // send to backend
        const res = await fetch(`${SYD_VAR.dev.get()}/products/products`, {
            method: "GET",
        });

        const response = await res.json();

        if(res.status === 200)
        {
            //notify the user on success
            __p(["notification","show"])({title:"Product Load" , msg:"Products loaded successfully" , mode:"success"});
            //notify the user on success

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
        }else 
        {
            //notify the user on success
            __p(["notification","show"])({title:"Product Load" , msg:"Failed to Load Products" , mode:"fail"});
            //notify the user on success
        }
    }catch(err)
    {
        //notify the user on success
        __p(["notification","show"])({title:"Product Load" , msg:"Failed to Load Products" , mode:"fail"});
        //notify the user on success
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
    try
    {
        // send to backend
        const res = await fetch(`${SYD_VAR.dev.get()}/orders/orders`, {
            method: "GET",
        });

        const response = await res.json();

        if(res.status === 200)
        {
            //remember to set hasLoaded to true
            //notify the user on success
            __p(["notification","show"])({title:"Customer's Order Load" , msg:"Orders loaded successfully" , mode:"success"});
            //notify the user on success

            updateState__bulk({name:"orderMain",task:s=>{
                s.orders = response.documents;
                s.hasLoaded = true;
                s.isLoading = false;

                return s;
            }})
        }else
        {
            //notify the user on failure
            __p(["notification","show"])({title:"Customer's Order Load" , msg:"Failed to Load Orders" , mode:"fail"});
            //notify the user on failure
        }
    }catch(err)
    {
        //notify the user on failure
        __p(["notification","show"])({title:"Customer's Order Load" , msg:"Failed to Load Orders" , mode:"fail"});
        //notify the user on failure
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

export const deleteProduct = async function(payload)
{
    try
    {
        const res = await fetch(`${SYD_VAR.dev.get()}/products/delete`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const response = await res.json();

        if(res.status === 200)
        {
            //notify the user on success
            __p(["notification","show"])({title:"Product Delete" , msg:"Products Deleted successfully" , mode:"success"});
            //notify the user on success
        }else 
        {
            //notify the user on failure
            __p(["notification","show"])({title:"Product Delete" , msg:"Failed to Delete Product" , mode:"fail"});
            //notify the user on failure
        }
    }catch(err)
    {
        //notify the user on failure
        __p(["notification","show"])({title:"Product Delete" , msg:"Failed to Delete Product" , mode:"fail"});
        //notify the user on failure
    }
}

export const deleteOrder = async function(payload)
{
    try
    {
        const res = await fetch(`${SYD_VAR.dev.get()}/orders/delete`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const response = await res.json();

        if(res.status === 200)
        {
            //notify the user on success
            __p(["notification","show"])({title:"Order Delete" , msg:"Order Deleted successfully" , mode:"success"});
            //notify the user on success
        }else 
        {
            //notify the user on failure
            __p(["notification","show"])({title:"Order Delete" , msg:"Failed to Delete Customer's Order" , mode:"fail"});
            //notify the user on failure
        }
    }catch(err)
    {
        //notify the user on failure
        __p(["notification","show"])({title:"Order Delete" , msg:"Failed to Delete Customer's Order" , mode:"fail"});
        //notify the user on failure
    }
}