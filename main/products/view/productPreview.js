import { $, __p, __sC, __SYD, SYD_VAR } from "../../../sydneyDom_v3.js";
import { deleteProduct, fetchProducts } from "../../../utils/routes.js";
import { updateState, updateState__bulk } from "../../../utils/stateAssets.js";

function closeProductPreview()
{
    updateState({name:"productPreview",prop:"display",value:false})
}

__SYD.productPreview = function()
{
    return $(
        "div",
        {
            style:`position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);height:100%;width:100%;background: rgba(255, 255, 255, 0.7) ;backdrop-filter:blur(3px);display:${__p(["productPreview","display"],false)?"flex":"none"};font-family:font1;z-index:1000;`
        },
        [
            __SYD.productPreview_sub()
        ],
        {
            createState:{
                stateName:"productPreview",
                state:{
                    isMobile:false,
                    display:false,
                    currentProduct:{},
                    currentClrIndex:0,
                    currentClothIndex:0,
                    isDeleting:false
                }
            },
            mediaQuery:{
                query:[{size:"<500px",prop:{isMobile:true}}],
                defState:{isMobile:false}
            }
        }
    )
}

__SYD.productPreview_sub = function()
{
    return $(
        "div",
        {
            style:`position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);height:100%;width:100%;${__p(["productPreview","isMobile"],false)?"max-height:unset;max-width:unset;":"max-height:500px;max-width:500px;"}background:#ffffff;box-shadow:1px 1px 3px #2323237f;padding:15px;padding-top:40px;`+__sC["col-start"]({method:"add",style:{gap:"15px"}})+__sC["br-1"]()
        },
        [
            ...(__p(["productPreview","display"],false) ? [__SYD.productPreview_close(),
            __SYD.productPreview_availableClrs(),
            __SYD.productPreview_images(),
            __SYD.productPreview_deleteBtn()] : [])
        ]
    )
}

__SYD.productPreview_close = function()
{
    return $(
        "div",
        {
            style:"height:30px;width:30px;position:absolute;top:10px;right:10px;background-image:url(./assets/images/close.svg);",
            class:"hover"
        },[],{
            genericStyle:["bg_cover"],
            events:{onclick:closeProductPreview}
        }
    )
}

__SYD.productPreview_availableClrs = function()
{
    return $(
        "div",
        {
            style:`height:fit-content;width:100%;`+__sC["col-start"]({method:"add",style:{gap:"10px;"}})
        },
        [
            //header for available cloth colors
            $(
                "div",
                {
                    style:`font-size:${__p(["subContainer","fontHeader"],"15px")};color:${SYD_VAR.baseGreyTxt.get()};`
                },
                [
                    $("p",{},["Available Colors"])
                ]
            ),
            //display array of available colors
            $(
                "div",
                {
                    style:"height:fit-content;width:100%;padding:5px;"+__sC["row-center"]({method:"add",style:{gap:"10px",flexWrap:"wrap",justifyContent:"flex-start"}})
                },
                [
                    ...(()=>{
                        const el = [];
                        const colors = __p(["productPreview","currentProduct"]).uploads.map(val => val.color);
                        colors.forEach((value,id) => {
                            el.push(
                                $(
                                    "div",
                                    {
                                        style:`height:30px;min-width:30px;border-radius:50%;padding:2px;border:1px solid #000000;`+__sC["row-center"](),
                                        class:"hover"
                                    },[
                                        $(
                                            "span",
                                            {
                                                style:`height:100%;width:100%;background-color:${value};border-radius:inherit;`
                                            }
                                        )
                                    ],
                                    {
                                        events:{
                                            onclick:e=>{
                                                updateState({name:"productPreview",prop:"currentClrIndex",value:id});
                                            }
                                        }
                                    }
                                )
                            )
                        });
                        return el;
                    })()
                ]
            ),
        ]
    )
}

__SYD.productPreview_images = function()
{
    const {currentProduct , currentClrIndex , currentClothIndex} = __p(["productPreview"]);

    const fronts = currentProduct.uploads.map(val => val.front?.url);
    const backs = currentProduct.uploads.map(val => val.back?.url);
    const sides = currentProduct.uploads.map(val => val.side?.url);

    const features = [fronts , backs , sides];

    return $(
        "div",
        {
            style:"height:100%;width:100%;"+__sC["col-start"]({method:"add",style:{gap:"10px",alignItems:"center"}})
        },
        [
            //main display element
            $(
                "div",
                {
                    style:`height:calc(100% - 120px);width:100%;background-image:url("https://images.weserv.nl/?url=${features[currentClothIndex][currentClrIndex]}&w=500&h=500");`
                },[],{genericStyle:["bg_fit"]}
            ),
            //main display element
            //array display of other image types
            $(
                "div",
                {
                    style:"height:fit-content;width:100%;"+__sC["row-center"]({method:"add",style:{gap:"10px"}})
                },
                [
                    ...(()=>{
                        const el = new Array();
                        for(let i = 0; i < features.length; i++)
                        {
                            el.push(
                                __SYD.productPreview_images_box({url:`https://images.weserv.nl/?url=${features[i][currentClrIndex]}&w=500&h=500` , id:i})
                            )
                        }
                        return el;
                    })()
                ]
            )
            //array display of other image types
        ]
    )
}

__SYD.productPreview_images_box = function({url , id})
{
    const {currentClothIndex} = __p(["productPreview"]);

    return $(
        "div",
        {
            style:`height:fit-content;width:fit-content;padding:3px;outline:2px solid ${currentClothIndex === id ? SYD_VAR.baseGreyTxt.get() : "transparent"};`,
            class:"hover"
        },
        [
            $(
                "div",
                {
                    style:`height:50px;width:50px;background-image:url("${url}");`
                },[],
                {
                    genericStyle:["bg_cover"],
                }
            )
        ],
        {
            events:{
                onclick:e=>{
                    updateState({name:"productPreview",prop:"currentClothIndex",value:id});
                }
            }
        }
    )
}

__SYD.productPreview_deleteBtn = function()
{
    return $(
        "div",
        {
            style:`height:50px;width:calc(100% - 20px);position:absolute;left:50%;transform:translateX(-50%);bottom:10px;background:${SYD_VAR.err.get()};border-radius:inherit;font-weight:400;font-size:${__p(["subContainer","fontHeader"],"15px")};color:${"#ffffff"};box-shadow:1px 1px 3px #2323237f;`+__sC["row-center"]({method:"add",style:{gap:"5px"}}),
            class:"hover"
        },
        [
            $(
                "div",
                {
                    style:`height:20px;width:20px;background-image:url(./assets/images/${__p(["productPreview","isDeleting"],false) ? "loading_w" : "delete_w"}.svg);`,
                    class:`hover ${__p(["productPreview","isDeleting"],false)?"rotate":""}`
                },[],{genericStyle:["bg_cover"],events:{onclick:e=>changeTabDisplay("grid")}}
            ),
            "Delete Product"
        ],
        {
            events:{
                onclick:async e=>{
                    //fetch info
                    const {currentProduct} = __p(["productPreview"]);
                    const {product_id} = currentProduct;
                    const payload = {product_id , publicIds:[]};

                    for(let i = 0; i < currentProduct.uploads.length; i++)
                    {
                        if(currentProduct.uploads[i].front)payload.publicIds.push(currentProduct.uploads[i].front.id);
                        if(currentProduct.uploads[i].back)payload.publicIds.push(currentProduct.uploads[i].back.id);
                        if(currentProduct.uploads[i].side)payload.publicIds.push(currentProduct.uploads[i].side.id);
                    }
                    
                    //fetch info

                    updateState({name:"productPreview",prop:"isDeleting",value:true});

                    await deleteProduct(payload);

                    updateState({name:"productPreview",prop:"isDeleting",value:false});

                    //close the product preview tab
                    closeProductPreview()
                    //close the product preview tab

                    //refresh the product tab
                    await fetchProducts();
                    //refresh the product tab
                }
            }
        }
    )
}