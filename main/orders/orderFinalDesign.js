import { $, __p, __sC, __SYD, SYD_VAR } from "../../sydneyDom_v3.js";
import { updateState, updateState__bulk } from "../../utils/stateAssets.js";

__SYD.viewOrder_Finalpreview = function()
{
    return $(
        "div",
        {
            style:"height:100%;width:100%;position:absolute;top:0px;left:0px;background:#ffffff;padding:inherit;overflow:scroll;"+__sC["col-start"]({method:"add",style:{gap:"30px" , display:__p(["viewOrder_Finalpreview","display"],false)?"flex":"none"}})
        },
        [
            __SYD.viewOrder_Finalpreview_back(),
            ...(()=>{
                const elements = new Array();
                if(__p(["viewOrder","product"]))
                {
                    if(Object.keys(__p(["viewOrder","product"])).length > 0)
                    {
                        const {product:productData} = __p(["viewOrder"]);
                        const {products , designs , finalDesign} = productData;
                        const samplesLength = finalDesign.length;

                        for(let i = 0; i < samplesLength; i++)
                        {
                            //push title placeholder
                            elements.push(
                                $(
                                    "div",
                                    {
                                        style:`height:50px;width:100%;margin:20px 0px;font-size:${__p["subContainer","fontNormHeader"],"18px"};color:${SYD_VAR.baseGreyTxt.get()};font-weight:600;`+__sC["row-center"]()
                                    },
                                    [   
                                        `Preview ${i+1}`
                                    ]
                                )
                            )
                            //push title placeholder

                            //push products parcel
                            if(products[i])elements.push(__SYD.viewOrder_Finalpreview_template({data:products[i] , index:i+1 , type:"Products"}))
                            //push products parcel

                            //push designs parcel
                            if(designs[i])elements.push(__SYD.viewOrder_Finalpreview_template({data:designs[i] , index:i+1 , type:"Designs"}))
                            //push designs parcel

                            //push finalDesign parcel
                            if(finalDesign[i])elements.push(__SYD.viewOrder_Finalpreview_template({data:finalDesign[i] , index:i+1 , type:"Final Design"}))
                            //push finalDesign parcel
                        }
                    }
                }


                return elements;
            })()
        ],
        {
            createState:{
                stateName:"viewOrder_Finalpreview",
                state:{
                    currentId:null,
                    display:false
                }
            }
        }
    )
}

__SYD.viewOrder_Finalpreview_back = () =>{
    return $(
        "div",
        {
            style:"height:60px;width:100%;position:sticky;top:0px;left:0px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;z-index:900;background-color:#ffffff;box-shadow:1px 1px 3px #2323237f;"+__sC["row-center"]({method:"add",style:{justifyContent:"space-between"}})+__sC["br-1"]()
        },
        [
            $(
                "div",
                {
                    style:"height:40px;width:40px;background-image:url(./assets/images/back.svg);background-size:70%;background-color:#ffffff;box-shadow:1px 1px 3px #2323237f;"+__sC["br-1"](),
                    class:"hover"
                },[],
                {
                    genericStyle:["bg_fit"],
                    events:{
                        onclick:e=>{
                            updateState({name:"viewOrder_Finalpreview",prop:"display",value:false})
                        }
                    }
                }
            ),
            $(
                "div",
                {
                    style:`font-weight:600;font-size:${__p(["subContainer" , "fontTitle"],"22px")};min-width:max-content;color:${SYD_VAR.baseGreyTxt.get()};`
                },
                [
                    "Designs Preview"
                ]
            ),
        ]
    )
}

__SYD.viewOrder_Finalpreview_template = function({data , index , type} = {})
{
    return $(
        "div",
        {
            style:"height:fit-content;width:100%;background:#ffffff;box-shadow:1px 1px 3px #2323237f;min-height:fit-content;padding:20px;padding-top:70px;position:relative;"+__sC["br-1"]()+__sC["col-start"]({method:"add",style:{gap:"20px"}})
        },
        [
            //header
            $(
                "div",
                {
                    style:`position:absolute;top:20px;left:20px;height:30px;width:fit-content;`+__sC["row-start"]({method:"add",style:{gap:"10px"}})
                },
                [
                    $(
                        "div",
                        {
                            style:`height:100%;width:fit-content;padding:0px 20px;box-shadow:1px 1px 3px #2323237f;background-color:${SYD_VAR.themeClr.get()};color:#ffffff;font-weight:400;font-size:14px;`+__sC["row-center"]()+__sC["br-1"]()
                        },
                        [
                            `Preview ${index}`
                        ]
                    ),
                    $(
                        "div",
                        {
                            style:`height:100%;width:fit-content;padding:0px 20px;box-shadow:1px 1px 3px #2323237f;background-color:${SYD_VAR.themeClr.get()};color:#ffffff;font-weight:400;font-size:14px;`+__sC["row-center"]()+__sC["br-1"]()
                        },
                        [
                            `${type}`
                        ]
                    )
                ]
            ),
            //header

            //Main Body
            $(
                "div",
                {
                    style:"height:100%;width:100%;"+__sC["col-start"]({method:"add",style:{gap:"20px"}})
                },
                [
                    ...(()=>{
                        let elements = [];
                        if(type === "Final Design" || type === "Products")
                        {
                            elements = [__SYD.viewOrder_Finalpreview_template_el({data , index:1 , type , typei:index})]
                        }else 
                        {
                            for(let i = 0; i < data.length; i++)
                            {
                                elements.push(__SYD.viewOrder_Finalpreview_template_el({data:data[i] , index:i+1 , type , typei:index}))
                            }
                        }
                        return elements;
                    })()
                ]
            )
            //Main Body
        ]
    )
}

__SYD.viewOrder_Finalpreview_template_el = function({data , index , type , typei})
{
    let mode = "text";
    let link = "";
    if(data.src)
    {
        mode = "img";
        link = data.src
    }
    else if(data.url)
    {   
        mode = "img";
        link = data.url
    }

    const getRenderable = () =>{
        let renderable = {}
        if(type === "Final Design")
        {
            const {id} = data;
            const {canvasHeight , canvasWidth} = __p(["viewOrder","product"]);
            renderable = {id , canvasHeight:`${canvasHeight}px` , canvasWidth:`${canvasWidth}px`}
        }else if(type === "Designs")
        {
            if(mode === "img")
            {
                const {height , width , x , y , rotate} = data;
                renderable = {height:`${height.toFixed(2)}px` , width:`${width.toFixed()}px` , x:`${x.toFixed()}px` , y:`${y.toFixed()}px` , rotate:`${rotate.toFixed()}°`} 
            }else
            {
                const {height , width , x , y , rotate , color , fontFamily , fontSize , text} = data;
                renderable = {height:`${height.toFixed(2)}px` , width:`${width.toFixed()}px` , x:`${x.toFixed()}px` , y:`${y.toFixed()}px` , rotate:`${rotate.toFixed()}°` , color , fontFamily , fontSize , text}
            }
        }
        else if(type === "Products")
        {
            const {height , width , x , y , rotate} = data;
            renderable = {height:`${height.toFixed(2)}px` , width:`${width.toFixed()}px` , x:`${x.toFixed()}px` , y:`${y.toFixed()}px`} 
        }

        return renderable
    }

    const render_implementation = function()
    {
        const elements = [];
        let renderable = {}
        
        renderable = getRenderable();

        for(let i = 0; i < Object.keys(renderable).length; i++)
        {
            elements.push(
                $(
                    "p",
                    {
                        style:`color:${SYD_VAR.baseGreyTxt.get()};font-weight:700;font-size:${__p(["subContainer","fontSmall"],"13px")};`
                    },
                    [
                        `${Object.keys(renderable)[i]} -> `,
                        $("span",{style:`font-weight:500;`},[`${renderable[Object.keys(renderable)[i]]}`])
                    ]
                )
            )
        }

        return elements;
    }

    return $(
        "div",
        {
            style:`height:${__p(["viewOrder_Finalpreview","currentId"],null) === `${type}_${typei}_${index}` ? "fit-content" : "70px"};width:100%;background:#ffffff;color:${SYD_VAR.baseGrey.get()};transition:.3s linear;overflow:hidden;padding:10px;`+__sC["br-1"]()+__sC["thinBorder"](),
            class:__p(["viewOrder_Finalpreview","currentId"],null) === `${type}_${typei}_${index}` ?"":"hoverTab"
        },
        [
            //header
            $(
                "div",
                {
                    style:"height:50px;width:100%;background-color:#ffffff;box-shadow:1px 1px 3px #2323237f;"+__sC["row-start"]({method:"add",style:{alignItems:"center",justifyContent:"flex-start" , gap:"10px"}})+__sC["br-1"]()
                },
                [
                    $(
                        "p",
                        {
                            style:__sC["ellipse_text"]({method:"add",style:{maxWidth:"200px",fontSize:__p(["subContainer","fontHeader"],"15px"),paddingLeft:"20px"}})
                        },
                        [   
                            `${type} ${index}`
                        ]
                    ),
                    ...(type === "Designs" ? [$(
                        "div",
                        {
                            style:`height:fit-content;width:fit-content;padding:5px 10px;box-shadow:1px 1px 3px #2323237f;background-color:${SYD_VAR.themeClr.get()};color:#ffffff;font-weight:900;font-size:10px;`+__sC["row-center"]()+__sC["br-.5"]()
                        },
                        [
                            `${mode}`
                        ]
                    )] : [])
                ],
                {
                    events:{
                        onclick:e =>{
                            updateState__bulk({name:"viewOrder_Finalpreview",task:s=>{
                                s.currentId = s.currentId === `${type}_${typei}_${index}` ? null : `${type}_${typei}_${index}`;
                                return s;
                            }})
                        }
                    }
                }
            ),
            //header

            //Holder
            $(
                "div",
                {
                    style:"height:fit-content;padding:20px;width:100%;"+__sC["row-center"]({method:"add",style:{gap:"20px",flexWrap:"wrap"}})
                },
                [
                    //holder image section
                    $(
                        "div",
                        {
                            style:`position:relative;font-size:${__p(["subContainer","fontHeader"],"15px")};font-weight:900;color:rgba(0 , 0 , 0 , .2);height:200px;width:200px;min-width:200px;background-color:${SYD_VAR.bgWhite_t_5.get()};${mode === "img" ? `background-image:url(https://images.weserv.nl/?url=${link}&w=500&h=500);`:""}`+__sC["row-center"]()+__sC["br-1"]()
                        },
                        [
                            `${mode === "img" ? "" : "No Image Available"}`,
                            ...(mode === "img" ? [$(
                                "div",
                                {
                                    style:`position:absolute;top:10px;right:10px;height:30px;width:30px;background-color:#ffffff;box-shadow:1px 1px 3px #2323237f;background-size:70%;background-image:url(./assets/images/preview_download.svg);align-self:flex-end;`+__sC["br-.5"](),
                                    class:"hover"
                                },[],
                                {
                                    genericStyle:["bg_fit"],
                                    events:{
                                        onclick:async e=>{
                                            const response = await fetch(link);
                                            const blob = await response.blob();
                                            const blobUrl = URL.createObjectURL(blob);
                                            
                                            const link_a = document.createElement("a");
                                            link_a.href = blobUrl;
                                            link_a.download = `${type} ${index}.png`;
                                            link_a.click();
                                            
                                            // Clean up the blob URL
                                            URL.revokeObjectURL(blobUrl);
                                        }
                                    }
                                }
                            )]:[])
                        ],{genericStyle:['bg_fit']}
                    ),
                    //holder image section

                    //Holder information
                    $(
                        "div",
                        {
                            style:`height:-webkit-fill-available;width:fit-content;min-width:200px;padding:10px;background-color:${SYD_VAR.bgWhite_t_5.get()};`+__sC["col-start"]({method:"add",style:{gap:"15px",justifyContent:"flex-start",fontSize:__p(["subContainer","fontHeader"],"15px")}})+__sC["br-1"]()
                        },
                        [
                            $(
                                "div",
                                {
                                    style:"height:fit-content;width:100%;margin-bottom:5px;"+__sC["row-center"]()
                                },
                                [
                                    $(
                                        "div",
                                        {
                                            style:`height:100%;width:fit-content;padding:10px 20px;box-shadow:1px 1px 3px #2323237f;background-color:${SYD_VAR.themeClr.get()};color:#ffffff;font-weight:400;font-size:14px;`+__sC["row-center"]()+__sC["br-1"]()
                                        },
                                        [
                                            "Implementation"
                                        ]
                                    )
                                ]
                            ),
                            $(
                                "div",
                                {
                                    style:`height:fit-content;width:fit-content;`+__sC["col-start"]({method:"add",style:{gap:"15px",justifyContent:"flex-start"}})
                                },
                                [
                                    ...render_implementation()
                                ]
                            ),
                            $(
                                "div",
                                {
                                    style:`height:30px;width:30px;background-color:#ffffff;box-shadow:1px 1px 3px #2323237f;background-size:70%;background-image:url(./assets/images/copy.svg);align-self:flex-end;`+__sC["br-.5"](),
                                    class:"hover"
                                },[],
                                {
                                    genericStyle:["bg_fit"],
                                    events:{
                                        onclick:e=>{
                                            const value = getRenderable();
                                            let string = "";
                                            Object.keys(value).forEach(key =>{
                                                string += `${key} : ${value[key]}\n`
                                            });
                                            
                                            navigator.clipboard.writeText(string)
                                            .then(() => {
                                                console.log("Copied to clipboard!");
                                            })
                                            .catch(err => {
                                                console.error("Failed to copy: ", err);
                                            });
                                        }
                                    }
                                }
                            )
                        ]
                    )
                    //Holder information
                ]
            )
            //Holder
        ]
    )
}