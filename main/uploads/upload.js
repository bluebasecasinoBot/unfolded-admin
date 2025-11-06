import { $, __p, __sC, __SYD, SYD_VAR } from "../../sydneyDom_v3.js"
import { updateState__bulk } from "../../utils/stateAssets.js"

const extImgMap = {
    png:"png.svg",
    jpeg:"jpg.svg",
    svg:"svg.svg",
    jpg:"jpg.svg"
}

__SYD.canvasMain_uploads = function()
{
    return $(
        "div",
        {
            style:__sC[`${__p(["canvasMain_uploads","isMobile"],false)?"col":"row"}-start`]({method:"add",style:{gap:"20px"}})+`padding:10px;height:100%;width:100%;display:${__p(["adminMain","currentTab"],0) === 2 ? "flex":"none"};`
        },
        [
            __SYD.canvasMain_uploads_el1(),
            __SYD.canvasMain_uploads_el2(),
            __SYD.uploadFileInput()
        ],
        {
            createState:{
                stateName:"canvasMain_uploads",
                state:{
                    isUpload:false,
                    isMobile:false,
                    assets:[],
                }
            },
            mediaQuery:{
                query:[{size:"<800px",prop:{isMobile:true}}],
                defState:{isMobile:false}
            }
        }
    )
}

__SYD.canvasMain_uploads_el1 = function()
{
    return $(
        "div",
        {
            style:`height:${__p(["canvasMain_uploads","isMobile"],false)?"40%":"100%"};min-height:40%;width:100%;`+__sC["col-center"]({method:"add",style:{gap:"15px",alignItems:"center",justifyContent:"center",border:`3px dashed ${SYD_VAR.themeClr.get()}`,borderRadius:"30px"}})
        },
        [
            //add upload image here
            $(
                "div",
                {
                    style:"height:50%;width:100%;background-image:url(./assets/images/upload.png);"
                },
                [],{genericStyle:["bg_fit"]}
            ),
            //add upload image here

            //upload button here
            $(
                "label",
                {
                    style:"height:fit-content;width:fit-content;",
                    for:"upload_file"
                },
                [
                    $(
                        "div",
                        {
                            style:`font-family:font1;font-weight:700;height:fit-content;width:fit-content;padding:20px 30px;background:${SYD_VAR.themeClr.get()};`+__sC["thinBorder"]()+__sC["br-1"](),
                            class:"hover"
                        },
                        [
                            "Upload Image"
                        ]
                    )
                ]
            )
            //upload button here
        ]
    )
}

__SYD.canvasMain_uploads_el2 = function()
{
    return $(
        "div",
        {
            style:`padding:10px;height:${__p(["canvasMain_uploads","isMobile"],false)?"60%":"100%"};width:${__p(["canvasMain_uploads","isMobile"],false)?"100%":"400px"};min-width:${__p(["canvasMain_uploads","isMobile"],false)?"unset":"400px"};`+__sC["col-start"]({method:"add",style:{gap:"30px",display:__p(["canvasMain_uploads","isUpload"],false)?"flex":"flex"}})
        },
        [
            $(
                "p",
                {
                    style:`padding:10px 0px;font-family:header;font-size:18px;width:100%;border-bottom:2px solid ${SYD_VAR.bgWhite_t_5.get()}`
                },
                [
                    "Uploaded Files"
                ]
            ),
            $(
                "div",
                {
                    style:__sC["col-start"]({method:"add",style:{gap:"15px",overflowY:"scroll",width:"100%",paddingBottom:"100px"}})
                },
                [
                    ...(() =>{
                        const data = __p(["canvasMain_uploads","assets"],[]);
                        const el = new Array()
                        for(let i = 0; i < data.length; i++)
                        {
                            el.push(
                                __SYD.canvasMain_uploads_el2_el(i)
                            )
                        }
                        return el;
                    })()
                ]
            )
        ]
    )
}

__SYD.canvasMain_uploads_el2_el = function(index)
{
    const {name , percentComplete , ext , image} = __p(["canvasMain_uploads","assets"],[])[index];

    return $(
        "div",
        {
            style:__sC["row-start"]({method:"add",style:{alignItems:"center",gap:"10px",width:"100%",minHeight:"fit-content" , background:"#ffffff" , transition:"all linear .3s" , cursor:"pointer",padding:"15px 10px"}}) + __sC["br-1"]() + __sC["thinBorder"]()
        },
        [
            $(
                "div",
                {
                    style:`height:50px;min-width:50px;max-height:50px;max-width:50px;background-image:url(./assets/images/${extImgMap[ext]});`
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
                            style:"font-size:13px;font-weight:600;font-family:font1;max-width:90%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;"
                        },
                        [
                            name?name:"file_name"
                        ]
                    ),
                    $(
                        "div",
                        {
                            style:"height:10px;width:90%;position:relative;border-radius:5px;padding:1px;"+__sC["row-start"]({method:"add",style:{alignItems:"center"}})+__sC["thinBorder"]()
                        },
                        [   
                            $(
                                "div",
                                {
                                    style:`transition:all linear .3s;height:100%;width:${percentComplete}%;background:${SYD_VAR.themeClr.get()};border-radius:inherit;`
                                }
                            ),
                            $(
                                "span",
                                {
                                    style:"position:absolute;right:0px;bottom:calc(100% + 3px);height:15px;width:15px;background-image:url(./assets/images/delete.svg);",
                                    class:"hover"
                                },[],{
                                    genericStyle:["bg_cover"],
                                    events:{
                                        onclick:e =>{
                                            updateState__bulk({name:"canvasMain_uploads",task:s =>{
                                                s.assets.splice(index , 1);
                                                return s;
                                            }})
                                        }
                                    }
                                }
                            )
                        ]
                    )
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
                }
            }
        }
    )
}

__SYD.uploadFileInput = function()
{
    return $(
        "input",
        {
            id:"upload_file",
            style:"visibilty:hidden;pointer-events:none;display:none;",
            type:"file",
            accept:"image/*",
            multiple:true
        },[],
        {
            type:"uploadFileInput"
        }
    )
}