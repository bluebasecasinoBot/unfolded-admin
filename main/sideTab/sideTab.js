import { $, __p, __sC, __SYD, SYD_VAR } from "../../sydneyDom_v3.js";
import { updateState, updateState__bulk } from "../../utils/stateAssets.js";

const extImgMap = {
    png:"png.svg",
    jpeg:"jpg.svg",
    svg:"svg.svg",
    jpg:"jpg.svg"
}

__SYD.sideTab = function()
{
    return $(
        "div",
        {
            style:`height:100%;width:30%;max-width:400px;min-width:300px;position:fixed;right:0px;top:0px;background:#ffffff;box-shadow:1px 1px 3px #2323237f;z-index:1002;padding:20px;padding-top:80px;padding-bottom:70px;display:${__p(["sideTab","display"],false)?"block":"none"};`
        },
        [
            $(
                "p",
                {
                    style:`padding:10px 0px;font-family:header;font-size:18px;width:100%;border-bottom:2px solid ${SYD_VAR.bgWhite_t_5.get()}`
                },
                [
                    "Select uploaded files"
                ]
            ),
            $(
                "div",
                {
                    style:__sC["col-start"]({method:"add",style:{gap:"10px",width:"100%",overflowY:"scroll",padding:"15px 0px",height:"100%",paddingTop:"20px",paddingBottom:"70px"}})
                },
                [
                    ...(() =>{
                        const data = __p(["canvasMain_uploads","assets"],[]);
                        const el = new Array()
                        for(let i = 0; i < data.length; i++)
                        {
                            el.push(
                                __SYD.sideTab_el(i)
                            )
                        }
                        return el;
                    })()
                ]
            ),
            $(
                "div",
                {
                    style:"height:50px;width:calc(100% - 20px);position:absolute;bottom:10px;left:50%;transform:translateX(-50%);background:#ffffff;box-shadow:1px 1px 3px #2323237f;"+__sC["row-center"]({method:"add",style:{alignItems:"center"}})+__sC["br-1"](),
                    class:"hover"
                },
                [
                    "Close"
                ],
                {
                    events:{
                        onclick:e=>{
                            updateState__bulk({name:"sideTab",task:s=>{
                                s.display = false;
                                s.currentTab = null;
                                s.currentIndex = null;
                                return s;
                            }})
                        }
                    }
                }
            )
        ],
        {
            createState:{
                stateName:"sideTab",
                state:{
                    display:false,
                    currentTab:null,
                    currentIndex:null
                }
            }
        }
    )
}

__SYD.sideTab_el = function(index)
{
    const {name , percentComplete , ext , image} = __p(["canvasMain_uploads","assets"],[])[index];

    return $(
        "div",
        {
            style:__sC["row-start"]({method:"add",style:{alignItems:"center",gap:"10px",width:"100%",minHeight:"fit-content" , background:"#ffffff" , transition:"all linear .3s" , cursor:"pointer",padding:"10px"}}) + __sC["br-1"]() + __sC["thinBorder"](),
            title:name
        },
        [
            $(
                "div",
                {
                    style:`height:40px;min-width:40px;max-height:40px;max-width:40px;background-image:url(./assets/images/${extImgMap[ext]});`
                },
                [],
                {
                    genericStyle:["bg_cover"]
                }
            ),
            $(
                "div",
                {
                    style:__sC["col-start"]({method:"add",style:{gap:"15px",height:"fit-content",width:"100%"}})
                },
                [
                    $(
                        "p",
                        {
                            style:"font-size:13px;font-weight:600;font-family:font1;max-width:200px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;"
                        },
                        [
                            name?name:"file_name"
                        ]
                    ),
                ]
            )
        ],
        {
            events:{
                onmouseenter:e=>{
                    if(e.target === e.currentTarget)
                    {
                        e.target.style.background = SYD_VAR.bgWhite_t_5.get()
                    }
                },
                onmouseleave:e=>{
                    if(e.target === e.currentTarget)
                    {
                        e.target.style.background = "#ffffff"
                    }
                },
                onclick:e=>{
                    const {currentIndex , currentTab} = __p(["sideTab"]);
                    if(currentIndex !== null && currentTab !== null)
                    {
                        updateState__bulk({name:"adminProductCreate",task:s=>{
                            s.uploads[currentIndex][currentTab] = image;
                            return s;   
                        }});

                        console.log(image.height , image.width)
                    }
                }
            }
        }
    )
}