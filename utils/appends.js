import { updateState__bulk } from "./stateAssets.js";

export const closeMainView = function(value = "loading products")
{
    updateState__bulk({name:"isLoading",task:s=>{
        s.isActive = true;
        s.mode = value
        return s;
    }});

    updateState__bulk({name:"adminMain_loadOverlay",task:s=>{
        s.isActive = true;
        return s;
    }});
}

export const openMainView = function()
{
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