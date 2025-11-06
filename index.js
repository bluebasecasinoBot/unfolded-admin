import { $, __SYD, __sC, SYD_VAR, __m, manage_mediaQuery } from "./sydneyDom_v3.js";
import "./variable.js"
import "./nav/sideNav.js"
import "./nav/topNav.js"

//import style components
import "./styles/main.js";
import "./styles/styleComponents.js";
//import style components

//admin main screen components
import "./main/main.js";
import {initFileInput} from "./main/uploads/uploadUtils.js"
//admin main screen components

//import paths
import "./paths.js"
import { fetchProducts } from "./utils/routes.js";
import { closeMainView } from "./utils/appends.js";
//import paths

__SYD.container = function()
{
    return $(
        "div",
        {
            style:__sC["container"]({method:"add",style:{backgroundColor:SYD_VAR.container_bg.get()}})
        },
        [
            __SYD.subContainer()
        ]
    )
}

__SYD.subContainer = function()
{
    return $(
        "section",
        {
            style:__sC["subContainer"]() + __sC["br-1"]() + __sC["thinBorder"]() + __sC["row-start"]()
        },
        [
            __SYD.topNav(),
            __SYD.sideNav(),
            __SYD.adminMain()
        ],
        {
            createState:{
                stateName:"subContainer",
                state:{
                    fontTitle:"22px",
                    fontHeader:"15px",
                    fontSmall:"13px",
                    fontNormHeader:"18px",
                    fontBigTitle:"30px",
                    accessToken:""
                }
            }
        }
    )
}

__m(__SYD.container() , async () =>{
    //Run initiating code here
    initFileInput();

    manage_mediaQuery(window.innerWidth);
    //Run initiating code here

    closeMainView("loading products");
    //run the products
    fetchProducts();
})