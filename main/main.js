import { $, __p, __sC, __SYD } from "../sydneyDom_v3.js";
import "./products/mainScript.js";
import "./orders/mainScript.js";
import "./uploads/upload.js"
import "./sideTab/sideTab.js"
import "./products/view/productPreview.js"

__SYD.adminMain = () =>{
    return $(
        "div",
        {
            style:"height:100%;width:100%;padding-top:80px;position:relative;overflow:hidden;"
        },
        [
            __SYD.productsMain(),
            __SYD.orderMain(),
            __SYD.canvasMain_uploads(),
            __SYD.adminMain_loadOverlay(),
            __SYD.isLoading()
        ],
        {
            createState:{
                stateName:"adminMain",
                state:{
                    currentTab:0
                }
            }
        }
    )
}

//loading overlay util
__SYD.isLoading = function()
{
    return $(
        "div",
        {
            style:`position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);height:fit-content;width:fit-content;padding:15px 20px;background:#ffffff;text-transform:capitalize;box-shadow:1px 1px 3px #2323237f;z-index:11000;`+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"5px",alignItems:"center",display:__p(["isLoading","isActive"],false)?"flex":"none"}})
        },
        [   
            $(
                "div",
                {
                    style:"height:20px;width:20px;background-image:url(./assets/images/loading.svg);",
                    class:"rotate"
                },[],{genericStyle:["bg_cover"],events:{onclick:e=>changeTabDisplay("grid")}}
            ),
            __p(["isLoading","mode"],"loading")
        ],
        {
            createState:{
                stateName:"isLoading",
                state:{
                    isActive:false,
                    mode:"loading"
                }
            }
        }
    )
}

__SYD.adminMain_loadOverlay = function()
{
    return $(
        "div",
        {
            style:`height:100%;width:100%;background:rgba(255,255,255,.8);position:absolute;left:0px;top:0px;z-index:10000;display:${__p(["adminMain_loadOverlay","isActive"],false)?"flex":"none"};`
        },[]
        ,
        {
            createState:{
                stateName:"adminMain_loadOverlay",
                state:{
                    isActive:false
                }
            }
        }
    )
}