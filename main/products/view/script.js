import { updateState, updateState__bulk, updateState__push } from "../../../utils/stateAssets.js";
import { $, __p, __sC, __SYD, SYD_VAR } from "../../../sydneyDom_v3.js";

__SYD.adminProductView = () =>{
    return $(
        "div",
        {
            style:"height:100%;width:100%;background: #ffffff ;position:relative;"+__sC["col-start"]({method:"add",style:{
                display:__p(["productsMain","currentTab"],0) === 0?"flex":"none"
            }})
        },
        [
            __SYD.adminProductView_searchUtil(),
            $(
                "div",
                {
                    style:__sC["row-start"]({method:"add",style:{justifyContent:"space-between",alignItems:"center",width:"100%" , flexWrap:"wrap",paddingBottom:"10px"}})
                },
                [
                    __SYD.adminProductView_popularCat(),
                    ...(__p(["adminProductView_tabDisplayStyle","mobile"],false)?[]:[__SYD.adminProductView_tabDisplayStyle()])
                ]
            ),
            __SYD.adminProductView_main(),
            __SYD.adminProductView_main_nxt_prev(),
            __SYD.productPreview()
        ],
        {
            createState:{
                stateName:"adminProductView",
                state:{
                    currentFilter:"",
                    renderLimit:30,
                    step:0,
                    togSearch:false,
                    products:{"default":[]},
                    currentCategory:"default",
                    isLoading:false,
                    hasLoaded:false
                    // get endIndex(){return this.renderLimit}
                }
            },
            mediaQuery:{
                query:[{size:"<900px" , prop:{togSearch:true}}],
                defState:{togSearch:false}
            }
        }
    )
}
function closeSrchRes()
{
    updateState({name:"adminProductView_searchUtil",prop:"expand",value:false})
}

function paginate(mode)
{
    let {step , currentCategory = "default" , renderLimit , products = {"default":[]}} = __p(["adminProductView"]);
    switch(mode)
    {
        case "prev":{
            if(step > 0) step--;
        }
        break;
        case "nxt":{
            const length = products[currentCategory].length;
            if((step+1)*renderLimit < length) step++
        }
    }
    updateState({name:"canvasMain_viewDesigns",prop:"step",value:step})
}

function loadMainDesign(category)
{
    //reset step
    updateState__bulk({name:"adminProductView",task:s =>{
        s.step = 0;
        s.currentCategory = category;
        return s;
    }})
}   

function changeTabDisplay(mode)
{
    updateState({name:"adminProductView_main",prop:"tabType",value:mode})
}

__SYD.adminProductView_main_nxt_prev = function()
{
    let isPrev = false;
    let isNext = true;
    if(__p(["adminProductView"]))
    {
        let {step , currentCategory="default" , renderLimit , products = {"default":[]}} = __p(["adminProductView"]);
        const length = products[currentCategory].length;
        isNext = ((step+1)*renderLimit < length);
        isPrev = step > 0;
    }
    

    return $(
        "div",
        {
            style:"font-family:font1;font-weight:500;height:fit-content;width:fit-content;position:absolute;bottom:10px;left:50%;transform:translateX(-50%);z-index:999;"+__sC["row-start"]({method:"add",style:{gap:"10px"}})
        },
        [
            $(
                "div",
                {
                    style:`height:fit-content;padding:10px 15px;width:fit-content;background:#ffffff;box-shadow:1px 1px 3px #2323237f;font-size:14px;opacity:${isPrev?"1":".4"};pointer-events:${isPrev?"auto":"none"};`+__sC["br-1"]({method:"add",style:{borderTopRightRadius:"unset",borderBottomRightRadius:"unset",}}),
                    class:"hover"
                },
                [
                    "Prev"
                ],
                {
                    events:{onclick:e=>{
                        paginate("prev")
                    }}
                }
            ),
            $(
                "div",
                {
                    style:`height:fit-content;padding:10px 15px;width:fit-content;background:#ffffff;box-shadow:1px 1px 3px #2323237f;font-size:14px;opacity:${isNext?"1":".4"};pointer-events:${isNext?"auto":"none"};`+__sC["br-1"]({method:"add",style:{borderTopLeftRadius:"unset",borderBottomLeftRadius:"unset",}}),
                    class:"hover"
                },
                [
                    "Next"
                ],
                {
                    events:{onclick:e=>{
                        // paginate("nxt")
                    }}
                }
            )
        ]
    )
}

__SYD.adminProductView_searchUtil = function()
{
    return $(
        "div",
        {
            style:`height:fit-content;width:100%;padding:0px 15px;position:relative;margin-bottom:20px;padding-left:${__p(["adminProductView","togSearch"],false)?"30px":"15px"};`
        },
        [
            //input container
            $(
                "div",
                {
                    style:"height:fit-content;width:100%;padding:5px;"+__sC["col-start"]({method:"add",style:{gap:__p(["adminProductView_searchUtil","expand"],false)?"10px":"0px"}})
                },
                [
                    $(
                        "div",
                        {
                            style:"height:fit-content;width:100%;position:relative;"
                        },
                        [
                            $(
                                "input",
                                {
                                    style:"height:50px;width:100%;padding:0px 10px;padding-right:40px;font-family:font1;font-weight:500;"+__sC["thinBorder"]()+__sC["br-1"](),
                                    type:"text",
                                    id:"adminProductView_searchUtil_input",
                                    placeholder:"Search uploaded products"
                                }
                            ),
                            $(
                                "span",
                                {
                                    style:`position:absolute;top:50%;transform:translateY(-50%);right:10px;height:20px;width:20px;background-image:url(./assets/images/exit.svg);display:${__p(["adminProductView_searchUtil","expand"],false)?"block":"none"};`,
                                    class:"hover"
                                },[],{
                                    genericStyle:["bg_cover"],
                                    events:{
                                        onclick:closeSrchRes
                                    }
                                }
                            )
                        ]
                    ),
                    //search related results
                    __SYD.adminProductView_srchRes()
                    //search related results
                ]
            )
            //input container
        ],
        {
            createState:{
                stateName:"adminProductView_searchUtil",
                state:{
                    searchRes__key:[],
                    expand:false
                }
            }
        }
    )
}


__SYD.adminProductView_srchRes = function()
{
    return $(
        "div",
        {
            style:`background-color:#ffffff;position:absolute;top:100%;left:50%;transform:translateX(-50%);height:${__p(["adminProductView_searchUtil","expand"],false)?"fit-content":"0px"};width:calc(100% - 40px);box-shadow:1px 1px 3px #2323237f;max-height:300px;overflow-y:scroll;transition:all linear .3s;z-index:999;`+__sC["br-.5"]()
        },
        [
            $(
                "div",
                {
                    style:"height:fit-content;width:100%;padding:10px;"+__sC["col-start"]({method:"add",style:{gap:"7px"}})
                },
                [
                    ...(() =>{
                        const el = new Array();
                        const data = ["","",""];//__p(["canvasMain_viewDesigns_searchUtil","searchRes__key"],[]);
                        for(let i = 0; i < data.length; i++)
                        {
                            el.push(
                                __SYD.adminProductView_srchRes_el(data[i])
                            )
                        }
                        return el;
                    })()
                ]
            )
        ]
    )
}

__SYD.adminProductView_srchRes_el = function({value = "" , action = ()=>{}} = {})
{
    return $(
        "div",
        {
            style:`height:fit-content;width:100%;padding:15px;cursor:pointer;font-weight:600;font-size:${__p(["subContainer","fontSmall"],"13px")};`+__sC["col-start"]({method:"add",style:{justifyContent:"center"}})+__sC["br-.5"]()+__sC["thinBorder"]()
        },
        [
            value
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
                onclick:e =>{
                    action(value)
                }
            }
        }
    )
}

__SYD.adminProductView_popularCat = function()
{
    return $(
        "div",
        {
            style:"min-height:40px;width:fit-content;padding:0px 20px;"+__sC["row-start"]({method:"add",style:{gap:"10px"}})
        },
        [
            $(
                "p",
                {
                    style:`font-weight:600;font-size:${__p(["subContainer","fontSmall"],"13px")};height:100%;width:fit-content;`+__sC["row-center"]()
                },
                [
                    "Product Type"
                ]
            ),
            __SYD.adminProductView_popularCat_tab()
        ]
    )
}

__SYD.adminProductView_tabDisplayStyle = function()
{
    return $(
        "div",
        {
            style:"min-height:40px;width:fit-content;padding:0px 20px;"+__sC["row-start"]({method:"add",style:{gap:"10px"}})
        },
        [
            $(
                "p",
                {
                    style:`font-weight:600;font-size:${__p(["subContainer","fontSmall"],"13px")};height:100%;width:fit-content;`+__sC["row-center"]()
                },
                [
                    $(
                        "div",
                        {
                            style:"height:fit-content;width:fit-content;padding:10px;background:#ffffff;box-shadow:1px 1px 3px #2323237f;"+__sC["row-center"]({method:"add",style:{gap:"10px",display:__p(["adminProductView_tabDisplayStyle","mobile"],false)?"none":"flex"}})+__sC["br-1"]()
                        },
                        [
                            //Grid Icon
                            $(
                                "div",
                                {
                                    style:"height:20px;width:20px;background-image:url(./assets/images/grid.svg);",
                                    class:"hover"
                                },[],{genericStyle:["bg_cover"],events:{onclick:e=>changeTabDisplay("grid")}}
                            ),                   
                            //Grid Icon
                            //Grid Icon
                            $(
                                "div",
                                {
                                    style:"height:20px;width:20px;background-image:url(./assets/images/list.svg);",
                                    class:"hover"
                                },[],{genericStyle:["bg_cover"],events:{onclick:e=>changeTabDisplay("list")}}
                            )                            
                            //Grid Icon

                        ]
                    )
                ]
            ),
        ],
        {
            createState:{
                stateName:"adminProductView_tabDisplayStyle",
                state:{
                    mobile:false
                }
            },
            mediaQuery:{
                query:[{size:"<400px",prop:{mobile:true}}],
                defState:{mobile:false}
            }
        }
    )
}

__SYD.adminProductView_popularCat_tab = function()
{
    return $(
        "div",
        {
            style:"height:30px;width:200px;position:relative;"+__sC["thinBorder"](),
            tabindex:"0"
        },
        [
            $(
                "p",
                {
                    style:`padding:10px;font-weight:600;font-size:${__p(["subContainer","fontSmall"],"13px")};height:100%;width:100%;transform:scale(1);`+__sC["row-center"]({method:"add",style:{justifyContent:"flex-start"}}),
                    class:"hoverMinTab"
                },
                [
                    __p(["adminProductView","currentCategory"],"default")
                ]
            ),
            __SYD.adminProductView_popularCat_tab_dd()
        ],
        {
            createState:{
                stateName:"adminProductView_popularCat_tab",
                state:{
                    dd:false
                }
            },
            events:{
                onfocus:e =>{
                    updateState({name:"adminProductView_popularCat_tab" , prop:"dd" , value:true})
                },
                onblur:e =>{
                    updateState({name:"adminProductView_popularCat_tab" , prop:"dd" , value:false})
                }
            }
        }
    )
}


__SYD.adminProductView_popularCat_tab_dd = function()
{
    return $(
        "div",
        {
            style:"padding:10px;position:absolute;top:100%;left:0px;z-index:100;height:fit-content;max-height:400px;overflow-y:scroll;width:100%;background:#ffffff;box-shadow:1px 1px 3px #2323237f;"+__sC["br-1"]({method:"add",style:{borderTopLeftRadius:"unset"}})+__sC["thinBorder"]()+__sC["col-start"]({method:"add",style:{display:__p(["adminProductView_popularCat_tab" , "dd"],false)?"flex":"none" , gap:"10px"}})
        },
        [
            ...(()=>{
                const el = new Array();
                const data = __p(["adminProductView_popularCat_tab_dd","elements"],[]);
                for(let i = 0; i < data.length; i++)
                {
                    el.push(
                        __SYD.adminProductView_srchRes_el({value:data[i] , action:loadMainDesign})
                    )
                }
                return el;
            })()
        ],
        {
            createState:{
                stateName:"adminProductView_popularCat_tab_dd",
                state:{
                    elements:[]
                }
            }
        }
    )
}


__SYD.adminProductView_main = function()
{
    const {step = 0 , renderLimit = 30} = __p(["adminProductView"],{step:undefined , renderLimit:undefined});

    const elements = (()=>{
        const el = new Array();
        const start = step*renderLimit;
        const end = (step+1)*renderLimit;
        const main = __p(["adminProductView"]);
        if(main)
        {
            const {currentCategory="default" , products = {"default":[]}} = main;

            const data = products[currentCategory];
            console.log(data)
        
            for(let i = start; i < end; i++)
            {

                if(data[i])
                {
                    el.push(
                        __SYD[__p(["adminProductView_main","tabType"],"grid") === "grid"?"adminProductView_main_el":"adminProductView_main_el_tabType"]({data:data[i]})
                    );
                }else break;
            }
        }
        return el;
    })()

    return $(
        "div",
        {
            style:"height:100%;width:100%;max-height:400px;position:relative;"+__sC["thinBorder"]({method:"add",style:{borderBottom:"unset",borderLeft:"unset",borderRight:"unset"}})
        },
        [
            $(
                "div",
                {
                    style:"height:100%;width:100%;overflow-y:scroll;"+__sC["row-center"]({
                        method:"add",
                        style:{
                            gap:"15px",
                            flexWrap:"wrap",
                            alignItems:"flex-start",
                            padding:"20px",
                            justifyContent:__p(["adminProductView_main","tabType"],"grid") === "grid"?"center":"flex-start",
                            flexDirection:__p(["adminProductView_main","tabType"],"grid") === "grid"?"row":"column"
                        }
                    })
                },
                [
                    ...elements
                ]
            ),
            ...(()=>{
                //check if el is empty to append empty placeholder
                if(elements.length === 0)
                {
                    return [
                        $(
                            "div",
                            {
                                style:`height:100%;width:100%;position:absolute;top:0px;left:0px;color:${SYD_VAR.baseGrey.get()};font-size:20px;font-weight:700;`+__sC["row-center"]()
                            },["No Products Uploaded"]
                        )
                    ]
                }else return [];
                //check if el is empty to append empty placeholder
            })()
        ],
        {
            createState:{
                stateName:"adminProductView_main",
                state:{
                    sizeMode:0,
                    tabType:"grid"
                }
            },
            mediaQuery:{
                query:[{size:"<900px",prop:{sizeMode:1}},{size:"<400px",prop:{sizeMode:2,tabType:"list"}}],
                defState:{sizeMode:0,tabType:"grid"}
            }
        }
    )
}

__SYD.adminProductView_main_el = function({data})
{
    const addon = "https://images.weserv.nl/?url=";
    const modifiedUrl = ``;
    const sizeMode = `${__p(["adminProductView_main","sizeMode"],0)}`;
    const sizeModeObj = {"0":"350px","1":"200px","2":"150px"};

    const colors = data.uploads.map(val => val.color);
    const fronts = data.uploads.map(val => val.front?.url);
    const backs = data.uploads.map(val => val.back?.url);
    const sides = data.uploads.map(val => val.side?.url);

    return $(
        "div",
        {
            style:`padding:5px;transition:all linear .2s;height:${sizeModeObj[sizeMode]};width:${sizeModeObj[sizeMode]};min-width:200px;background-color:#ffffff;box-shadow:1px 1px 3px #2323237f;overflow:hidden;`+__sC["thinBorder"]()+__sC["br-1"]()+__sC["col-start"](),
            class:"hover"
        },[
            //Image holder
            $(
                "div",
                {
                    style:`height:100%;width:100%;background-image:url("${addon}${fronts[0]}&w=500&h=500");`+__sC["br-1"]()
                },[],{genericStyle:["bg_fit"]}
            ),
            //Image holder
            $(
                "div",
                {
                    style:"position:relative;min-height:50px;width:100%;background-color:inherit;padding:0px 10px;"+__sC["row-start"]()
                },
                [
                    //colors
                    $(
                        "div",
                        {
                            style:"height:fit-content;width:fit-content;padding:8px 12px;position:absolute;top:0px;transform:translateY(-100%);left:0px;overflow-x:scroll;"+__sC["row-center"]({method:"add",style:{gap:"10px"}})
                        },
                        [
                            ...(()=>{
                                const el = [];
                                colors.forEach(value => {
                                    el.push(
                                        $(
                                            "div",
                                            {
                                                style:`height:17px;min-width:17px;border-radius:50%;padding:2px;border:1px solid #000000;`+__sC["row-center"](),
                                            },[
                                                $(
                                                    "span",
                                                    {
                                                        style:`height:100%;width:100%;background-color:${value};border-radius:inherit;`
                                                    }
                                                )
                                            ]
                                        )
                                    )
                                });
                                return el;
                            })()
                        ]
                    ),
                    $("p",{style:`font-weight:600;font-size:${__p(["subContainer","fontSmall"],"13px")};`},[`${data.product_name}`])
                ]
            )
        ],
        {
            genericStyle:["bg_fit"],
            events:{
                onclick:e =>{
                    updateState__bulk({name:"productPreview",task:s=>{
                        s.display = true;
                        s.currentProduct = data;
                        return s;
                    }})
                }
            }
        }
    )
}

__SYD.adminProductView_main_el_tabType = function({data})
{
    const addon = "https://images.weserv.nl/?url=";

    const colors = data.uploads.map(val => val.color);
    const fronts = data.uploads.map(val => val.front?.url);
    const backs = data.uploads.map(val => val.back?.url);
    const sides = data.uploads.map(val => val.side?.url);

    return $(
        "div",
        {
            style:`transition:all linear .2s;height:70px;width:100%;background:#ffffff;padding:10px;transform:unset;overflow:hidden;`+__sC["row-start"]({method:"add",style:{gap:"10px",alignItems:"center"}})+__sC["br-1"]()+__sC["thinBorder"](),
            class:"hoverMinTab"
        },[
            //Image holder
            $(
                "div",
                {
                    style:`height:50px;min-width:50px;background-image:url("${addon}${fronts[0]}&w=500&h=500");`+__sC["br-1"]()
                },[],{genericStyle:["bg_cover"]}
            ),
            //Image holder
            $(
                "div",
                {
                    style:"min-height:50px;width:100%;padding:0px 10px;"+__sC["row-start"]()
                },
                [
                    $("p",{style:`font-weight:600;font-size:${__p(["subContainer","fontSmall"],"13px")};`},[`${data.product_name}`])
                ]
            )
        ],
        {
            events:{
                onclick:e =>{
                    updateState__bulk({name:"productPreview",task:s=>{
                        s.display = true;
                        s.currentProduct = data;
                        return s;
                    }})
                }
            }
        }
    )
}