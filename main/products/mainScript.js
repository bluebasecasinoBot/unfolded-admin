import { $, __p, __sC, __SYD } from "../../sydneyDom_v3.js";
import { updateState } from "../../utils/stateAssets.js";
import "./create/script.js";
import "./view/script.js";

function updateScreen(mode)
{
    updateState({name:"productsMain",prop:"currentTab",value:mode === "view"?0:1})
}

__SYD.productsMain = () =>{
    return $(
        "div",
        {
            style:`height:100%;width:100%;position:relative;overflow:scroll;`+__sC["col-start"]({method:"add",style:{display:__p(["adminMain","currentTab"],0) === 0?"flex":"none",paddingTop:"0px"}})
        },
        [
            __SYD.productsMain_topTab(),
            __SYD.adminProductView(),
            __SYD.adminProductCreate(),
            __SYD.sideTab(),
        ],
        {
            createState:{
                stateName:"productsMain",
                state:{
                    currentTab:0,
                    mobile:false
                }
            },
            mediaQuery:{
                query:[{size:"<900px" , prop:{mobile:true}}],
                defState:{mobile:false}
            }
        }
    )
}

__SYD.productsMain_topTab = () =>{
    return $(
        "div",
        {
            style:"position:sticky;top:0px;left:0px;height:40px;width:100%;background:#ffffff;z-index:999;"+__sC["thinBorder"]({method:"add",style:{borderTop:"unset",borderLeft:"unset",borderRight:"unset" , paddingLeft:__p(["productsMain","mobile"],false)?"50px":"0px"}})+__sC["row-start"]()
        },
        [
            __SYD.productsMain_topTab_el({value:"View",mode:"view"}),
            __SYD.productsMain_topTab_el({value:"Create",mode:"create"}),
        ]
    )
}

__SYD.productsMain_topTab_el = ({value = "" , mode}={}) =>{
    const mapp = {"0":"view","1":"create"}
    return $(
        "div",
        {
            style:`height:100%;width:fit-content;padding:15px 30px;font-weight:700;font-size:${__p(["subContainer","fontSmall"],"13px")};transform:unset;background:${mapp[`${__p(["productsMain","currentTab"],0)}`] == mode?"rgba(0,0,0,.15)":"#ffffff"};`+__sC["row-center"]({method:"add",style:{gap:"5px"}})+__sC["thinBorder"]({method:"add",style:{borderTop:"unset",borderLeft:"unset",borderBottom:"unset"}}),
            class:"hoverMinTab"
        },
        [   
            $("span",{style:`height:25px;width:25px;background-image:url(./assets/images/${mode}.svg);`},[],{genericStyle:["bg_cover"]}),
            `${value}`
        ],
        {
            events:{
                onclick:e=>{
                    updateScreen(mode)
                }
            }
        }
    )
}