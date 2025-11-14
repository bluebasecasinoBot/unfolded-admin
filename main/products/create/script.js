import { $, __p, __sC, __SYD, __v, SYD_VAR } from "../../../sydneyDom_v3.js";
import { fetchProducts } from "../../../utils/routes.js";
import { updateState, updateState__bulk, updateState__push } from "../../../utils/stateAssets.js";
import { updateScreen } from "../mainScript.js";

class newUpload
{
    constructor()
    {
        this.color = "#000";
        this.front = null;
        this.back = null;
        this.side = null;
    }
}

function removeEl(index)
{
    updateState__bulk({name:"adminProductCreate",task:s=>{
        s.uploads.splice(index,1);
        return s;
    }});

    updateState__bulk({name:"adminProductCreate_main",task:s=>{
        s.childCount--;
        return s;
    }});
}

__SYD.adminProductCreate = () =>{
    return $(
        "div",
        {
            style:"height:fit-content;width:100%;background:#ffffff;"+__sC["col-start"]({method:"add",style:{
                display:__p(["productsMain","currentTab"],0) === 1?"flex":"none",
                gap:"20px"
            }})
        },
        [
            __SYD.adminProductCreate_header(),
            __SYD.adminProductCreate_formEl({name:"Product Name",type:"product_name"}),
            __SYD.adminProductCreate_formEl({name:"Product Type",type:"product_type"}),
            __SYD.adminProductCreate_main(),
            __SYD.adminProductCreate_save()
        ],
        {
            createState:{
                stateName:"adminProductCreate",
                state:{
                    product_name:"",
                    product_type:"",
                    uploads:[]
                }
            }
        }
    )
}

__SYD.adminProductCreate_header = function()
{
    return $(
        "p",
        {
            style:`font-family:font1;font-size:${__p(["subContainer","fontTitle"],"22px")};font-weight:400;color:${SYD_VAR.baseGreyTxt.get()};padding:20px;text-decoration:underline;`
        },
        [
            "Create New Product"
        ]
    )
}

__SYD.adminProductCreate_formEl = function({name , type})
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"15px",padding:"0px 20px",width:"100%"}})
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
                "input",
                {
                    style:"outline:none;border:none;height:50px;width:100%;padding:0px 15px;font-family:font1;"+__sC["thinBorder"]()+__sC["br-.5"](),
                    type:"text",
                    name:name,
                    id:name
                },[],
                {
                    events:{
                        oninput:e=>{
                            updateState({name:"adminProductCreate",prop:type,value:e.target.value})
                        }
                    }
                }
            )
        ]
    )
}

__SYD.adminProductCreate_formEl_clr = function({name , type , index})
{
    let prop = __p(["adminProductCreate","uploads"])[index];
    let clr = "";
    if(prop)
    {
        clr = prop.color?prop.color:"";
    }

    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"15px",width:"100%"}})
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
                "input",
                {
                    style:"outline:none;border:none;height:50px;width:70px;padding:5px;font-family:font1;"+__sC["thinBorder"]()+__sC["br-.5"](),
                    type:"color",
                    name:name,
                    id:name,
                    value:clr
                },[],{
                    events:{
                        onchange:e=>{
                            const color = e.target.value;
                            updateState__bulk({name:"adminProductCreate",task:s=>{
                                s.uploads[index].color = color;
                                return s;
                            }})
                        }
                    }
                }
            )
        ]
    )
}

__SYD.adminProductCreate_main = function()
{
    return $(
        "div",
        {
            style:"height:fit-content;width:100%;padding:20px;"+__sC["col-start"]({method:"add",style:{gap:"20px",flexDirection:"column"}})
        },
        [
            $(
                "div",
                {
                    style:"height:fit-content;width:100%;"+__sC["col-start"]({method:"add",style:{gap:"20px",flexDirection:"column"}})
                },
                [
                    ...(()=>{
                        const el = new Array();
                        for(let i = 0; i < __p(["adminProductCreate_main","childCount"],0); i++)
                        {
                            el.push(
                                __SYD.adminProductCreate_main_el({index:i})
                            )
                        }
                        return el;
                    })()
                ]
            ),
            __SYD.adminProductCreate_main_add(),
        ],
        {
            createState:{
                stateName:"adminProductCreate_main",
                state:{
                    childCount:0,
                }
            },
        }
    )
}

__SYD.adminProductCreate_main_add = () =>{
    return $(
        "div",
        {
            style:`height:300px;width:100%;border:3px dashed ${SYD_VAR.baseGreyTxt.get()};cursor:pointer;`+__sC["br-1"]()+__sC["row-center"]({method:"add",style:{}})
        },
        [
            "Click to add new uploads"
        ],
        {
            events:{
                onclick:e=>{
                    updateState__bulk({name:"adminProductCreate_main",task:s=>{
                        s.childCount++;
                        updateState__push({name:"adminProductCreate",prop:["uploads"],value:new newUpload})
                        return s;
                    }});

                    document.querySelector(`.adminProductCreate_main_el${__p(["adminProductCreate_main","childCount"])-1}`).scrollIntoView();
                }
            }
        }
    )
}

__SYD.adminProductCreate_main_el = ({index}) =>{
    return $(
        "div",
        {
            style:`height:fit-content;width:100%;border:2px solid ${SYD_VAR.baseGreyTxt.get()};position:relative;`+__sC["col-start"]({method:"add",style:{
                gap:"20px",
                padding:"20px"
            }})+__sC["br-1"](),
            class:`adminProductCreate_main_el${index}`
        },
        [
            //remove util
            $(
                "div",
                {
                    style:`height:fit-content;width:fit-content;position:absolute;top:20px;right:20px;transform:unset;color:${SYD_VAR.err.get()};`+__sC["row-start"]({method:"add",style:{gap:"10px"}}),
                    class:"hover"
                },
                [
                    $(
                        "div",
                        {
                            style:"height:20px;width:20px;background-image:url(./assets/images/remove.svg);"+__sC["no-txt"](),
                            class:"hover"
                        },[],{genericStyle:["bg_cover"]}
                    ),
                    $(
                        "p",
                        {
                            style:`font-family:font1;font-size:${__p(["subContainer","fontHeader"],"15px")};font-weight:600;color:${SYD_VAR.baseGreyTxt.get()};`+__sC["no-txt"]()
                        },
                        [
                            `${"Remove"}`
                        ]
                    ),
                ],
                {
                    events:{
                        onclick:e=>{
                            removeEl(index)
                        }
                    }
                }
            ),
            //remove util
            __SYD.adminProductCreate_formEl_clr({name:"Product Color" , type:"product_clr" , index}),
            __SYD.adminProductCreate_main_el_uploads({index})
        ]
    )
}

__SYD.adminProductCreate_main_el_uploads = function({index})
{
    return $(
        "div",
        {
            style:`height:fit-content;width:100%;`+__sC["col-start"]({method:"add",style:{gap:"10px"}})
        },
        [
            $(
                "p",
                {
                    style:`font-family:font1;font-size:${__p(["subContainer","fontHeader"],"15px")};font-weight:600;color:${SYD_VAR.baseGreyTxt.get()};`
                },
                [
                    `${"Upload Images"}`
                ]
            ),
            $(
                "div",
                {
                    style:"height:fit-content;width:100%;"+__sC["row-center"]({method:"add",style:{gap:"10px",flexWrap:"wrap"}})
                },
                [
                    __SYD.adminProductCreate_main_el_uploads_el({name:"Front Image Upload",type:"front",index}),
                    __SYD.adminProductCreate_main_el_uploads_el({name:"Back Image Upload",type:"back",index}),
                    __SYD.adminProductCreate_main_el_uploads_el({name:"Side Image Upload",type:"side",index})
                ]
            )
        ]
    )
}

__SYD.adminProductCreate_main_el_uploads_el = function({name, type, index})
{
    let prop = __p(["adminProductCreate","uploads"])[index];
    let img = "";
    if(prop)
    {
        img = prop[`${type}`]?prop[`${type}`].src:""
    }

    return $(
        "div",
        {
            style:`height:200px;width:200px;border:2px dashed ${SYD_VAR.baseGreyTxt.get()};background-image:url(${img});color:#ffffff;`+__sC["br-1"]()+__sC["row-center"](),
            class:"hoverMinTab"
        },
        [   
            `${name}`
        ],
        {
            genericStyle:["bg_cover"],
            events:{
                onclick:e=>{
                    updateState__bulk({name:"sideTab",task:s=>{
                        s.display = true;
                        s.currentTab = type;
                        s.currentIndex = index;
                        return s;
                    }})
                }
            }
        }
    )
}

__SYD.adminProductCreate_save = function()
{
    return $(
        "div",
        {
            style:"height:fit-content;width:fit-content;padding:20px;background:#ffffff;position:fixed;bottom:10px;right:10px;box-shadow:1px 1px 3px #2323237f;overflow:hidden;"+__sC["br-1"]()+__sC["row-start"]({method:"add",style:{gap:"5px"}}),
            class:"hoverTab"
        },
        [
            $(
                "div",
                {
                    style:"height:20px;width:20px;background-image:url(./assets/images/save.svg);",
                    class:"hover"
                },[],{genericStyle:["bg_cover"],events:{}}
            ),
            "save product"
        ],
        {
            events:{
                onclick:e=>{
                    const productInfo = __p(["adminProductCreate"]);

                    productInfo.uploads.forEach(element => {
                        Object.keys(element).forEach(key =>{
                            if(key !== "color")
                            {
                                if(element[key]) element[key] = element[key].src
                            }
                        })
                    });
                    uploadProduct(productInfo)
                }
            }
        }
    )
}

async function uploadProduct(productData)
{
    updateState__bulk({name:"isLoading",task:s=>{
        s.isActive = true;
        s.mode = "saving"
        return s;
    }});

    updateState__bulk({name:"adminMain_loadOverlay",task:s=>{
        s.isActive = true;
        return s;
    }});

    // prepare form data
    const formData = new FormData();
    formData.append("data", JSON.stringify(productData));

    // send to backend
    const res = await fetch(`${SYD_VAR.dev.get()}/products/upload`, {
        method: "POST",
        body: formData,
    });

    const response = await res.json();

    if(res.status === 200)
    {
        //notify the user on success
        __p(["notification","show"])({title:"Product Creation" , msg:"Products Created successfully" , mode:"success"});
        //notify the user on success
    }else
    {
        //notify the user on failed
        __p(["notification","show"])({title:"Product Creation" , msg:"Failed to Create Product" , mode:"fail"});
        //notify the user on failed
    }

    //clear create parcel
    updateState__bulk({name:"adminProductCreate",task:s=>{
        s.product_name = "";
        s.product_type = "";
        s.uploads = [];
        return s;
    },isDiff:false})
    //clear create parcel

    updateState__bulk({name:"isLoading",task:s=>{
        s.isActive = false;
        s.mode = "saving"
        return s;
    }});

    updateState__bulk({name:"adminMain_loadOverlay",task:s=>{
        s.isActive = false;
        return s;
    }});

    //switch to view panel

    //click the view button to switch
    updateScreen("view");
    //click the view button to switch

    //reload the products page
    fetchProducts();
    //reload the products page
}