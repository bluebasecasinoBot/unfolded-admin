import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js";
import { fetchOrders, fetchProducts } from "../utils/routes.js";
import { closeMainView, openMainView } from "../utils/appends.js";
import { updateState } from "../utils/stateAssets.js";
function toggleSideNav()
{
    updateState({name:"sideNav",prop:"shift",value:__p(["sideNav","shift"],false)?false:true});
}


__SYD.sideNav = () =>{
    return $(
        "div",
        {
            style:__sC["sideNav"]({method:"add",style:{background:SYD_VAR.tab_bg.get(),minWidth:__p(["sideNav","width"],"200px")}}) + __sC["thinBorder"]({method:'add',style:{
                            borderBottom:"unset",
                            borderTop:"unset",
                            marginTop:(__p(["sideNav","width"],"200px")==="70px"||__p(["sideNav","shift"],false))?"unset":"70px",
                            position:(__p(["sideNav","width"],"200px")==="70px"||__p(["sideNav","shift"],false))?"absolute":"static",
                            transform:__p(["sideNav","shift"],false)?"translateX(-100%)":"translateX(0%)",transition:"unset",
                            paddingTop:__p(["sideNav","width"],"200px") === "70px"?"30px":"90px",
                            // paddingRight:__p(["sideNav","width"],"200px")==="70px"?"10px":"15px",
                            gap:"20px",
                            zIndex:"1000"
                        }})+__sC[`col-${__p(["sideNav","width"],"200px")==="70px"?"center":"start"}`]()
        },
        [
            __SYD.sideMenu(),
            __SYD.uploadProduct(),
            __SYD.customerOrder(),
            __SYD.uploadSide(),
        ],
        {
            createState:{
                stateName:"sideNav",
                state:{width:"200px",shift:false,currentTab:0}
            },
            mediaQuery:{
                query:[{size:"<900px",prop:{width:"70px",shift:true}}],
                defState:{width:"200px" , shift:false}
            }
        }
    )
}

__SYD.sideMenu = function()
{
    return $(
        "div",
        {style:__sC["box"]({method:"add",style:{width:__p(["sideNav","width"],"200px") === "200px"?__p(["sideNav","shift"],false)?"fit-content":__p(["sideNav","shift"],false)?"60px":"calc(100% - 20px)":"fit-content",height:__p(["sideNav","width"],"200px") === "70px"&&__p(["sideNav","shift"],false)&&__p(["adminMain","currentTab"],0) === 0 ? "40px" : "fit-content",padding:"15px",background:SYD_VAR.themeClr.get(),boxShadow:__p(["sideNav","width"],"200px") === "70px"&&__p(["sideNav","shift"],false)&&__p(["adminMain","currentTab"],0) === 0?"unset":"1px 1px 3px #2323237f"}})+__sC["row-start"]({method:"add",style:{gap:"10px",cursor:"pointer",position:__p(["sideNav","width"],"200px") === "70px"?__p(["sideNav","shift"],false)?"absolute":"static":"absolute",top:__p(["sideNav","width"],"200px") === "70px"&&__p(["sideNav","shift"],false)&&__p(["adminMain","currentTab"],0) === 0?"10px":"15px",right:__p(["sideNav","shift"],false)?__p(["adminMain","currentTab"],0) === 1?"-10px":"0px":"10px",transform:__p(["sideNav","shift"],false)?`translateX(calc(100% + ${__p(["sideNav","shift"],false)?"0px":"8px"}))`:"translateX(0px)"}})+`${__p(["sideNav","width"],"200px") === "70px"&&__p(["sideNav","shift"],false)&&__p(["adminMain","currentTab"],0) === 0?"unset":__sC['br-1']()}`},
        [
            $(
                "span",
                {class:"highlight_icon",style:"background-image:url(./assets/images/menu.svg);height:25px;width:25px;"},[],{genericStyle:["bg_fit"]}
            ),
            $("p",{style:`display:${__p(["sideNav","width"],"200px") === "70px"?"none":__p(["sideNav","shift"],false)?"none":"block"};font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},["Menu"])
        ],{events:{onclick:toggleSideNav}}
    )
}



__SYD.uploadProduct = function()
{
    return $(
        "div",
        {style:__sC["box"]({method:"add",style:{padding:"15px",width:"100%",transition:"all linear .3s"}})+__sC["row-start"]({method:"add",style:{gap:"10px",cursor:"pointer" , boxShadow:__p(["sideNav" , "currentTab"],0) === 0?"1px 1px 3px #2323237f":"unset"}})+__sC["br-1"]()},
        [
            $(
                "span",
                {class:"highlight_icon",style:"background-image:url(./assets/images/fabric.svg);height:25px;width:25px;"},[],{genericStyle:["bg_fit"]}
            ),
            $("p",{style:`display:${__p(["sideNav","width"],"200px") === "70px"?"none":"block"};font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},["Products"])
        ],{
            events:{
                onclick:()=>{
                    updateState({name:"adminMain",prop:"currentTab",value:0})
                    updateState({name:"sideNav",prop:"currentTab",value:0});

                    if(!__p(["adminProductView","hasLoaded"]))
                    {
                        //call the load
                        updateState({name:"adminProductView", prop:"isLoading",value:true});
                        fetchProducts();
                    }

                    //check if is loading it true or false
                    const isLoad = __p(["adminProductView","isLoading"]);
                    if(isLoad)
                    {
                        closeMainView("loading products")
                    }else openMainView();

                    if(__p(["sideNav","width"],"200px") === "70px") toggleSideNav();
                },
                onmouseenter:e=>{
                    if(__p(["sideNav" , "currentTab"])!== 0)
                    {
                        if(e.target === e.currentTarget)
                        {
                            e.target.style.boxShadow = "1px 1px 3px #2323237f";
                        }
                    }
                },
                onmouseleave:e=>{
                    if(__p(["sideNav" , "currentTab"])!== 0)
                    {
                        if(e.target === e.currentTarget)
                        {
                            e.target.style.boxShadow = "unset";
                        }
                    }
                }
            }
        }
    )
}

__SYD.customerOrder = function()
{
    return $(
        "div",
        {style:__sC["box"]({method:"add",style:{padding:"15px",width:"100%",transition:"all linear .3s"}})+__sC["row-start"]({method:"add",style:{gap:"10px",cursor:"pointer" , boxShadow:__p(["sideNav" , "currentTab"],0) === 1?"1px 1px 3px #2323237f":"unset"}})+__sC["br-1"]()},
        [
            $(
                "span",
                {class:"highlight_icon",style:"background-image:url(./assets/images/orders.svg);height:25px;width:25px;"},[],{genericStyle:["bg_fit"]}
            ),
            $("p",{style:`display:${__p(["sideNav","width"],"200px") === "70px"?"none":"block"};font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},["customer Orders"])
        ],{
            events:{
                onclick:()=>{
                    updateState({name:"adminMain",prop:"currentTab",value:1})
                    updateState({name:"sideNav",prop:"currentTab",value:1});

                    if(!__p(["orderMain","hasLoaded"]))
                    {
                        //call the load
                        updateState({name:"orderMain", prop:"isLoading",value:true});
                        fetchOrders();
                    }

                    //check if is loading it true or false
                    const isLoad = __p(["orderMain","isLoading"]);
                    if(isLoad)
                    {
                        closeMainView("loading Orders")
                    }else openMainView();

                    if(__p(["sideNav","width"],"200px") === "70px") toggleSideNav();
                },
                onmouseenter:e=>{
                    if(__p(["sideNav" , "currentTab"])!== 1)
                    {
                        if(e.target === e.currentTarget)
                        {
                            e.target.style.boxShadow = "1px 1px 3px #2323237f";
                        }
                    }
                    
                },
                onmouseleave:e=>{
                    if(__p(["sideNav" , "currentTab"])!== 1)
                    {
                        if(e.target === e.currentTarget)
                        {
                            e.target.style.boxShadow = "unset";
                        }
                    }
                }
            }
        }
    )
}

__SYD.uploadSide = function()
{
    return $(
        "div",
        {target:"blank",style:__sC["box"]({method:"add",style:{padding:"15px",width:"100%",transition:"all linear .3s"}})+__sC["row-start"]({method:"add",style:{gap:"10px",cursor:"pointer" , boxShadow:__p(["sideNav" , "currentTab"],0) === 2?"1px 1px 3px #2323237f":"unset"}})+__sC["br-1"]()},
        [
            $(
                "span",
                {class:"highlight_icon",style:"background-image:url(./assets/images/upload.svg);height:25px;width:25px;"},[],{genericStyle:["bg_fit"]}
            ),
            $("p",{style:`display:${__p(["sideNav","width"],"200px") === "70px"?"none":"block"};font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},["upload file"])
        ],
        {
            events:{
                onclick:e =>{
                    updateState({name:"adminMain",prop:"currentTab",value:2})
                    updateState({name:"sideNav",prop:"currentTab",value:2});

                    if(__p(["sideNav","width"],"200px") === "70px") toggleSideNav();
                },
                onmouseenter:e=>{
                    if(__p(["sideNav" , "currentTab"])!== 2)
                    {
                        if(e.target === e.currentTarget)
                        {
                            e.target.style.boxShadow = "1px 1px 3px #2323237f";
                        }
                    }
                },
                onmouseleave:e=>{
                    if(__p(["sideNav" , "currentTab"])!== 2)
                    {
                        if(e.target === e.currentTarget)
                        {
                            e.target.style.boxShadow = "unset";
                        }
                    }
                }
            }
        }
    )
}