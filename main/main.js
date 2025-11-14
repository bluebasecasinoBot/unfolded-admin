import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js";
import "./products/mainScript.js";
import "./orders/mainScript.js";
import "./uploads/upload.js"
import "./sideTab/sideTab.js"
import "./products/view/productPreview.js"
import { updateState, updateState__bulk } from "../utils/stateAssets.js";

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
            __SYD.isLoading(),
            __SYD.notification()
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
            style:`position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);height:fit-content;min-width:fit-content;padding:15px 20px;background:#ffffff;text-transform:capitalize;box-shadow:1px 1px 3px #2323237f;z-index:11000;`+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"5px",alignItems:"center",display:__p(["isLoading","isActive"],false)?"flex":"none"}})
        },
        [   
            $(
                "div",
                {
                    style:"min-height:20px;height:20px;min-width:20px;width:20px;background-image:url(./assets/images/loading.svg);",
                    class:"rotate"
                },[],{genericStyle:["bg_cover"]}
            ),
            $(
                "p",
                {
                    style:"height:fit-content;min-width:fit-content;"
                },
                [
                    __p(["isLoading","mode"],"loading")
                ]
            )
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


__SYD.notification = () =>{
    return $(
        "div",
        {
            style:__sC["dashboard"]({method:"add",style:{display:__p(["notification" , "display"],false) ? "flex" : "none" , position:"absolute",top:"0px",zIndex:"100000",pointerEvents:"none",maxWidth:"inherit",fontFamily:"font1"}}),
            class:"base__tabs"
        },
        [
            __SYD.notification_main()
        ],
        {
            createState:{
                stateName:"notification",
                state:{
                    display:false,
                    title:"",
                    msg:"",
                    mode:"success",
                    interval:null,
                    show:({title , msg , mode})=>{
                        if(__p(["notification","interval"],null)!==null)
                        {
                            clearTimeout(__p(["notification","interval"],null))
                        }

                        updateState__bulk({name:"notification",task:s=>{
                            s.title = title;
                            s.msg = msg;
                            s.mode = mode;
                            s.display = true;
                            return s;
                        }});

                        let timer = setTimeout(() => {
                            updateState({name:"notification",prop:"display",value:false});
                        }, 3000);
                        updateState({name:"notification",prop:"interval",value:timer});
                    }
                }
            }
        }
    )
}

__SYD.notification_main = () =>{
    return $(
        "div",
        {
            style:__sC["notification"]({method:"add",style:{background:"#ffffff",boxShadow:"1px 1px 3px #2323237f"}}),
            class:"tab-side-entry"
        },
        [
            $("span" , {style:__sC["mobileMenu"]({method:"add",style:{height:"18px",width:"18px" , transform:"unset" ,pointerEvents:"auto" , fontSize:"18px",position:"absolute",top:"10px",right:"10px" , zIndex:"200" , backgroundImage:"url(./assets/images/close.svg)"}})},[],{
                genericStyle:["bg_fit"],
                events:{
                    onclick:()=>{
                        updateState__bulk({name:"notification",task:s=>{
                            s.display = false;
                            return s;
                        }})
                    }
                }
            }),
            $(
                "div",
                {
                    style:"display:flex;gap:10px;align-items:center;"
                },
                [
                    $("span",{style:`height:30px;width:30px;min-height:30px;min-width:30px;background-image:url(./assets/images/unfoldedLogo.png);display:inline-block;`},[],{genericStyle:["bg_fit"]}),
                    $(
                        "p",
                        {
                            style:`height:fit-content;width:fit-content;color:${__p(["notification","mode"],"success") === "success" ? SYD_VAR.themeClr.get() : SYD_VAR.err.get()};font-size:${__p(["container" , "genRefFont_small"],"14px")};font-weight:900;text-transform:capitalize;`
                        },
                        [
                            __p(["notification" , "title"],"")
                        ]
                    )

                ]
            ),
            $(
                "p",
                {
                    style:`height:fit-content;width:fit-content;color:${SYD_VAR.baseGreyTxt.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};`
                },
                [
                    __p(["notification" , "msg"],"")
                ]
            )
        ]
    )

}