import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js";
import { updateState, updateState__bulk } from "../utils/stateAssets.js";

const navOptionStyle = function()
{
    const mobile = __p(["topNav","mobile"],false);
    const mobileTog = __p(["topNav","mobileTog"],false);
    
    
    return "width:100%;padding:0px 10px;position:relative;height:100%;"+__sC["row-start"]({method:"add",style:{gap:"32px"}})//+ __sC["thinBorder"]()
}

const toggleNav = function(e)
{
    if(__p(["topNav","mobile"],false))
    {
        updateState({name:"topNav",prop:"mobileTog",value:__p(["topNav","mobileTog"],false)?false:true});
        e.target.style.transform = !__p(["topNav","mobileTog"],false) ? "translateY(-50%) rotate(0deg)" : "translateY(-50%) rotate(-180deg)"
    }
}

__SYD.topNav = function(){
    return $(
        "div",
        {style:__sC["topNav"]() + __sC["row-start"]({method:"add",style:{background:SYD_VAR.tab_bg.get(),gap:"0px" , overflow:"visible",zIndex:"1100"}})+__sC["thinBorder"]({method:"add",style:{borderTop:"unset",borderLeft:"unset"}})},
        [
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{gap:"10px" , minWidth:"200px" , height:"100%",padding:"10px"}})},
                [
                    $(
                        "div",
                        {style:"height:40px;width:40px;background-image:url(./assets/images/unfoldedLogo.png);"},[],{genericStyle:["bg_fit"]}
                    ),
                    $(
                        "div",
                        {style:`font-size:${__p(["subContainer","fontTitle"],"22px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()+__sC["row-start"]({method:"add",style:{gap:"5px",alignItems:"flex-end"}})},
                        [
                            "Unfolded",
                            $("p",{style:"font-size:14px;"},["admin"])
                        ]
                    )
                ]
            ),
            $(
                "ul",
                {style:navOptionStyle()+`background-color:${__p(["topNav","mobile"],false)?SYD_VAR.container_bg.get():"transparent"};`},
                []
            ),
            $(
                "div",
                {style:__sC["mobileMenu"]({method:"add",style:{display:__p(["topNav","mobile"],false) ? "flex" : "none",backgroundImage:"url(./assets/images/toggle.svg)",transform:!__p(["topNav","mobileTog"],false)? "translateY(-50%) rotate(0deg)" : "translateY(-50%) rotate(-180deg)"}})},[],{genericStyle:["bg_fit"],events:{onclick:toggleNav}}
            )
        ],
        {
            createState:{
                stateName:"topNav",
                state:{
                    hLeft:"0px",
                    hWidth:"0px",
                    hTop:"0px",
                    hHeight:"0px",
                    mobile:false,
                    navOption:"live",
                    mobileTog:false,
                    swtch:{wallet:"walletDashboard",analytic:"walletAnalytics",scan:"contract",token:"insight",trend:"trend" , live:"live"}
                }
            },
            mediaQuery:{
                query:[{size:"<900px",prop:{mobile:true}}],
                defState:{mobile:false}
            }
        }
    )
}

__SYD.navBtn = function({text,icon,id}={})
{
    return $(
        "div",
        {style:`opacity:${id === __p(["topNav","navOption"],"live") ? "1" : ".5"};font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]({method:"add",style:{cursor:"pointer"}})+__sC["row-start"]({method:"add",style:{gap:"8px",height:"fit-content",padding:"10px 0px",width:"100%"}})},
        [
            $("span",{style:`background-image:url(./assets/images/${icon}.svg);`+__sC["n-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})+__sC["no-txt"]()},[],{genericStyle:["bg_fit"]}),$("p",{style:__sC["no-txt"]()},[text])
        ],
        {
            type:id,
            events:{
                onclick:function(e){}
            }
        }
    )
}