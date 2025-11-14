import { $, __p, __sC, __SYD, SYD_VAR } from "../../sydneyDom_v3.js";
import { deleteOrder, fetchOrders } from "../../utils/routes.js";
import { updateState } from "../../utils/stateAssets.js";

//import preview
import "./orderFinalDesign.js"

function closeviewOrder()
{
    updateState({name:"viewOrder",prop:"isActive",value:false})
}

__SYD.viewOrder = function()
{
    return $(
        "div",
        {
            style:`height:100%;width:100%;background:rgba(255,255,255,.8);position:absolute;left:0px;top:0px;z-index:100000;display:${__p(["viewOrder","isActive"],false)?"flex":"none"};align-items:center;justify-content:center;backdrop-filter:blur(3px);padding:15px;`
        },
        [
            __SYD.viewOrder_main()
        ],
        {
            createState:{
                stateName:"viewOrder",
                state:{
                    isActive:false,
                    isOrder:false,
                    product:{},
                    isMobile:false,
                    isDeleting:false
                }
            },
            mediaQuery:{
                query:[{size:"<600px",prop:{isMobile:true}}],
                defState:{isMobile:false}
            }
        }
    )
}

__SYD.viewOrder_main = function()
{
    return $(
        "div",
        {
            style:"height:100%;width:100%;max-width:700px;background:#ffffff;box-shadow:1px 1px 3px rgba(35, 35, 35, 0.3);padding:20px 10px;position:relative;padding-bottom:80px;overflow:hidden;"+__sC["br-1"]() + __sC["col-start"]({method:"add",style:{gap:"15px"}})
        },
        [
            //header name
            $(
                "div",
                {
                    style:"height:fit-content;width:100%;margin-bottom:15px;"+__sC["row-center"]()
                },
                [
                    $(
                        "p",
                        {
                            style:`font-weight:600;font-size:${__p(["subContainer" , "fontTitle"],"22px")};`
                        },
                        [
                            "Order Preview"
                        ]
                    )
                ]
            ),
            //header name
            $(
                "div",
                {
                    style:__sC["box"]({method:"add",style:{width:"100%"}})+__sC["col-start"]({method:"add",style:{gap:"inherit",overflow:"scroll"}})
                },
                [
                    __SYD.viewOrder_formEl({name:"Client Name" , type:"client_name" , placeholder:"Name"}),
                    __SYD.viewOrder_formEl({name:"Client Email" , type:"client_email", iType:"email" , placeholder:"client@gmail.com"}),
                    __SYD.viewOrder_formEl({name:"Contact Number" , type:"client_phone" , iType:"number" , placeholder:"+234 xxx xxx xxxx"}),
                    __SYD.viewOrder_formEl_txtArea({name:"Additional Details(Optional)" , type:"clientDetails" , placeholder:"Additional information"}),
                ]
            ),
            __SYD.viewOrder_preview(),
            __SYD.viewOrder_submit(),
            __SYD.viewOrder_deleteOrder(),
            __SYD.viewOrder_close(),
            __SYD.viewOrder_Finalpreview()
        ]
    )
}

__SYD.viewOrder_formEl = function({name , type , placeholder="" , iType = "text"})
{
    let value = "";
    if(__p(["viewOrder","isActive"],false))
    {
        value = __p(["viewOrder","product",type],"")
    }

    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"15px",padding:"0px 0px",width:"100%"}})
        },
        [
            $(
                "p",
                {
                    style:`font-family:font1;font-size:${__p(["subContainer","fontHeader"],"15px")};font-weight:600;color:${SYD_VAR.baseGreyTxt.get()};`
                },
                [
                    `${name}`
                ]
            ),
            $(
                "div",
                {
                    style:`outline:none;border:none;height:50px;width:100%;padding:0px 15px;font-family:font1;font-size:${__p(["subContainer","fontSmall"],"13px")};font-weight:600;color:${SYD_VAR.baseGreyTxt.get()};`+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{alignItems:"Center"}})+__sC["thinBorder"](),
                    type:iType,
                    name:name,
                    id:name,
                    placeholder
                },
                [
                    `${value}`
                ]
            )
        ]
    )
}

__SYD.viewOrder_formEl_txtArea = function({name , type , placeholder="" , iType = "text"})
{
    let value = "";
    if(__p(["viewOrder","isActive"],false))
    {
        value = __p(["viewOrder","product",type],"")
    }

    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"15px",padding:"0px 0px",width:"100%",display:value.length === 0 ? "none" : "flex"}})
        },
        [
            $(
                "p",
                {
                    style:`font-family:font1;font-size:${__p(["subContainer","fontHeader"],"15px")};font-weight:600;color:${SYD_VAR.baseGreyTxt.get()};`
                },
                [
                    `${name}`
                ]
            ),
            $(
                "div",
                {
                    style:`outline:none;border:none;height:fit-content;width:100%;padding:15px;font-family:font1;resize:none;font-size:${__p(["subContainer","fontSmall"],"13px")};font-weight:600;color:${value.length === 0 ?"grey":SYD_VAR.baseGreyTxt.get()};`+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{alignItems:"flex-start",minHeight:"100px"}})+__sC["thinBorder"](),
                    type:iType,
                    name:name,
                    id:name,
                    placeholder
                },[
                    `${value.length === 0 ? "No response available" : value}`
                ]
            )
        ]
    )
}

__SYD.viewOrder_submit = function()
{
    return $(
        "div",
        {
            style:`height:50px;width:fit-content;position:absolute;right:10px;bottom:20px;background:${SYD_VAR.themeClr.get()};border-radius:inherit;font-size:${__p(["subContainer","fontHeader"],"15px")};color:${SYD_VAR.baseGreyTxt.get()};box-shadow:1px 1px 3px #2323237f;padding:10px 15px;color:#ffffff;`+__sC["row-center"]({method:"add",style:{gap:"5px"}}),
            class:"hover"
        },
        [
            $(
                "div",
                {
                    style:`height:20px;width:20px;background-image:url(./assets/images/preview_download.svg);`,
                    class:`hover`
                },[],{genericStyle:["bg_cover"],events:{onclick:e=>changeTabDisplay("grid")}}
            ),
            `${__p(["viewOrder","isMobile"],false) ? "Download" : "Download Final Designs"}`
        ],
        {
            events:{
                onclick:async e=>{
                    if(__p(["viewOrder","isActive"],false))
                    {
                        const {product} = __p(["viewOrder"]);

                        for(let i = 0; i < product.finalDesign.length; i++)
                        {
                            try {
                                const response = await fetch(product.finalDesign[i].url);
                                const blob = await response.blob();
                                const blobUrl = URL.createObjectURL(blob);
                                
                                const link = document.createElement("a");
                                link.href = blobUrl;
                                link.download = `${product.orderID}_finalDesign_${i+1}.png`;
                                link.click();
                                
                                // Clean up the blob URL
                                URL.revokeObjectURL(blobUrl);
                            } catch (error) {
                                console.error('Download failed:', error);
                                // Fallback: open in new tab
                                window.open(imageUrl, '_blank');
                            }
                        }
                    }
                }
            }
        }
    )
}

__SYD.viewOrder_preview = function()
{
    return $(
        "div",
        {
            style:`height:50px;width:100%;background:${SYD_VAR.themeClr.get()};border-radius:inherit;font-size:${__p(["subContainer","fontHeader"],"15px")};color:${SYD_VAR.baseGreyTxt.get()};box-shadow:1px 1px 3px #2323237f;padding:10px 15px;transform:scale(1);color:#ffffff;`+__sC["row-center"]({method:"add",style:{gap:"5px"}}),
            class:"hover"
        },
        [
            $(
                "div",
                {
                    style:`height:20px;width:20px;background-image:url(./assets/images/preview.svg);`,
                    class:`hover`
                },[],{genericStyle:["bg_cover"],events:{onclick:e=>changeTabDisplay("grid")}}
            ),
            `${__p(["viewOrder","isMobile"],false) ? "Preview" : "Preview Designs"}`
        ],
        {
            events:{
                onclick:async e=>{
                    if(__p(["viewOrder","isActive"],false))
                    {
                        updateState({name:"viewOrder_Finalpreview",prop:"display",value:true})
                    }
                }
            }
        }
    )
}


__SYD.viewOrder_deleteOrder = function()
{
    return $(
        "div",
        {
            style:`height:50px;width:fit-content;position:absolute;left:10px;bottom:20px;background:${SYD_VAR.err.get()};border-radius:inherit;font-size:${__p(["subContainer","fontHeader"],"15px")};color:${"#ffffff"};box-shadow:1px 1px 3px #2323237f;padding:10px 15px;color:#ffffff;`+__sC["row-center"]({method:"add",style:{gap:"5px"}}),
            class:"hover"
        },
        [
            $(
                "div",
                {
                    style:`height:20px;width:20px;background-image:url(./assets/images/${__p(["viewOrder","isDeleting"],false) ? "loading_w" : "delete_w"}.svg);`,
                    class:`hover ${__p(["viewOrder","isDeleting"],false) ? "rotate" : ""}`
                },[],{genericStyle:["bg_cover"],events:{onclick:e=>changeTabDisplay("grid")}}
            ),
            `${__p(["viewOrder","isMobile"],false) ? "Delete" : "Delete Order"}`
        ],
        {
            events:{
                onclick:async e=>{
                    const {product} = __p(["viewOrder"]);
                    if(product)
                    {
                        const {orderID , finalDesign} = product;
                        const payload = {orderID , publicIds:[]};

                        for(let i = 0; i < finalDesign.length; i++)
                        {
                            payload.publicIds.push(finalDesign[i].id)
                        }

                        updateState({name:"viewOrder",prop:"isDeleting",value:true});
                        
                        await deleteOrder(payload);

                        updateState({name:"viewOrder",prop:"isDeleting",value:false});

                        //close the product preview tab
                        closeviewOrder()
                        //close the product preview tab
    
                        //refresh the product tab
                        await fetchOrders();
                        //refresh the product tab
                    }
                }
            }
        }
    )
}


__SYD.viewOrder_close = function()
{
    return $(
        "div",
        {
            style:"height:30px;width:30px;position:absolute;top:10px;right:10px;background-image:url(./assets/images/close.svg);",
            class:"hover"
        },[],{
            genericStyle:["bg_cover"],
            events:{onclick:closeviewOrder}
        }
    )
}