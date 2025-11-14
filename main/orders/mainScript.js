import { updateState, updateState__bulk } from "../../utils/stateAssets.js";
import { $, __p, __sC, __SYD, __v, SYD_VAR } from "../../sydneyDom_v3.js";

//import viewOrder page
import "./viewOrders.js"
//import viewOrder page

__SYD.orderMain = () =>{
    return $(
        "div",
        {
            style:"height:100%;width:100%;background: #ffffff ;position:relative;"+__sC["col-start"]({method:"add",style:{
                display:__p(["adminMain","currentTab"],0) === 1?"flex":"none"
            }})
        },
        [
            __SYD.orderMain_searchUtil(),
            $(
                "div",
                {
                    style:__sC["row-start"]({method:"add",style:{justifyContent:"space-between",alignItems:"center",width:"100%" , flexWrap:"wrap",paddingBottom:"10px"}})
                },
                [
                    __SYD.orderMain_popularCat(),
                    ...(__p(["orderMain_tabDisplayStyle","mobile"],false)?[]:[__SYD.orderMain_tabDisplayStyle()])
                ]
            ),
            __SYD.orderMain_main(),
            __SYD.orderMain_main_nxt_prev(),
            __SYD.viewOrder()
        ],
        {
            createState:{
                stateName:"orderMain",
                state:{
                    currentFilter:"",
                    renderLimit:30,
                    step:0,
                    togSearch:false,
                    isLoading:false,
                    hasLoaded:false,
                    orders:[]
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
    updateState({name:"orderMain_searchUtil",prop:"expand",value:false})
}

function paginate(mode)
{
    let {step , currentCategory , renderLimit} = __p(["canvasMain_viewDesigns"]);
    switch(mode)
    {
        case "prev":{
            if(step > 0) step--;
        }
        break;
        case "nxt":{
            const length = cat_data[currentCategory].data.length;
            if((step+1)*renderLimit < length) step++
        }
    }
    updateState({name:"canvasMain_viewDesigns",prop:"step",value:step})
}

function loadMainDesign(category , index)
{
    updateState__bulk({name:"orderMain_popularCat_tab",task:s =>{
        s.currentOption = index;
        return s;
    }});

    __v["orderMain_popularCat_tab"].blur()
}   

function changeTabDisplay(mode)
{
    updateState({name:"orderMain_main",prop:"tabType",value:mode})
}

__SYD.orderMain_main_nxt_prev = function()
{
    let isPrev = false;
    let isNext = true;
    if(__p(["orderMain"]))
    {
        let {step , currentCategory , renderLimit} = __p(["orderMain"]);
        // const length = cat_data[currentCategory].data.length;
        // isNext = ((step+1)*renderLimit < length);
        // isPrev = step > 0;
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

__SYD.orderMain_searchUtil = function()
{
    return $(
        "div",
        {
            style:`height:fit-content;width:100%;padding:0px 15px;position:relative;margin-bottom:20px;padding-left:${__p(["orderMain","togSearch"],false)?"70px":"15px"};`
        },
        [
            //input container
            $(
                "div",
                {
                    style:"height:fit-content;width:100%;padding:5px;"+__sC["col-start"]({method:"add",style:{gap:__p(["orderMain_searchUtil","expand"],false)?"10px":"0px"}})
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
                                    id:"orderMain_searchUtil_input",
                                    placeholder:"Search customer orders"
                                }
                            ),
                            $(
                                "span",
                                {
                                    style:`position:absolute;top:50%;transform:translateY(-50%);right:10px;height:20px;width:20px;background-image:url(./assets/images/exit.svg);display:${__p(["orderMain_searchUtil","expand"],false)?"block":"none"};`,
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
                    __SYD.orderMain_srchRes()
                    //search related results
                ]
            )
            //input container
        ],
        {
            createState:{
                stateName:"orderMain_searchUtil",
                state:{
                    searchRes__key:[],
                    expand:false
                }
            }
        }
    )
}


__SYD.orderMain_srchRes = function()
{
    return $(
        "div",
        {
            style:`background-color:#ffffff;position:absolute;top:100%;left:50%;transform:translateX(-50%);height:${__p(["orderMain_searchUtil","expand"],false)?"fit-content":"0px"};width:calc(100% - 40px);box-shadow:1px 1px 3px #2323237f;max-height:300px;overflow-y:scroll;transition:all linear .3s;z-index:999;`+__sC["br-.5"]()
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
                                __SYD.orderMain_srchRes_el(data[i])
                            )
                        }
                        return el;
                    })()
                ]
            )
        ]
    )
}

__SYD.orderMain_srchRes_el = function({value = "" , action = ()=>{} , index} = {})
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
                    action(value , index)
                }
            }
        }
    )
}

__SYD.orderMain_popularCat = function()
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
                    "View Orders"
                ]
            ),
            __SYD.orderMain_popularCat_tab()
        ]
    )
}

__SYD.orderMain_tabDisplayStyle = function()
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
                            style:"height:fit-content;width:fit-content;padding:10px;background:#ffffff;box-shadow:1px 1px 3px #2323237f;"+__sC["row-center"]({method:"add",style:{gap:"10px",display:__p(["orderMain_tabDisplayStyle","mobile"],false)?"none":"flex"}})+__sC["br-1"]()
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
                stateName:"orderMain_tabDisplayStyle",
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

__SYD.orderMain_popularCat_tab = function()
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
                    __p(["orderMain_popularCat_tab","sortByOptio"],["All","Size","Date Created"])[__p(["orderMain_popularCat_tab","currentOption"],0)]
                ]
            ),
            __SYD.orderMain_popularCat_tab_dd()
        ],
        {
            createState:{
                stateName:"orderMain_popularCat_tab",
                state:{
                    dd:false,
                    currentOption:0,
                    sortByOptio:["All","Size","Date Created"]
                }
            },
            events:{
                onfocus:e =>{
                    updateState({name:"orderMain_popularCat_tab" , prop:"dd" , value:true})
                },
                onblur:e =>{
                    updateState({name:"orderMain_popularCat_tab" , prop:"dd" , value:false})
                }
            }
        }
    )
}


__SYD.orderMain_popularCat_tab_dd = function()
{
    return $(
        "div",
        {
            style:"padding:10px;position:absolute;top:100%;left:0px;z-index:100;height:fit-content;max-height:400px;overflow-y:scroll;width:100%;background:#ffffff;box-shadow:1px 1px 3px #2323237f;"+__sC["br-1"]({method:"add",style:{borderTopLeftRadius:"unset"}})+__sC["thinBorder"]()+__sC["col-start"]({method:"add",style:{display:__p(["orderMain_popularCat_tab" , "dd"],false)?"flex":"none" , gap:"10px"}})
        },
        [
            ...(()=>{
                const el = new Array();
                const data = __p(["orderMain_popularCat_tab","sortByOptio"],["All","Size","Date Created"]);

                for(let i = 0; i < data.length; i++)
                {
                    el.push(
                        __SYD.orderMain_srchRes_el({value:data[i] , action:loadMainDesign , index:i})
                    )
                }
                return el;
            })()
        ]
    )
}


__SYD.orderMain_main = function()
{
    const {step = 0 , renderLimit = 30} = __p(["orderMain"],{step:undefined , renderLimit:undefined});

    return $(
        "div",
        {
            style:"height:100%;width:100%;max-height:100%;overflow-y:scroll;"+__sC["row-center"]({
                method:"add",
                style:{
                    gap:"15px",
                    flexWrap:"wrap",
                    alignItems:"flex-start",
                    padding:"20px",
                    justifyContent:__p(["orderMain_main","tabType"],"grid") === "grid"?"center":"flex-start",
                    flexDirection:__p(["orderMain_main","tabType"],"grid") === "grid"?"row":"column"
                }
            })+__sC["thinBorder"]({method:"add",style:{borderBottom:"unset",borderLeft:"unset",borderRight:"unset"}})
        },
        [
            ...(()=>{
                const el = new Array();
                const start = step*renderLimit;
                const end = (step+1)*renderLimit;
                const main = __p(["orderMain"]);

                if(main)
                {
                    const {currentCategory="All" , orders = []} = main;

                    const data = orders;
                
                    for(let i = start; i < end; i++)
                    {

                        if(data[i])
                        {
                            el.push(
                                __SYD[__p(["orderMain_main","tabType"],"grid") === "grid"?"orderMain_main_el":"orderMain_main_el_tabType"]({data:data[i]})
                            );
                        }else break;
                    }
                }

                return el;
            })()
        ],
        {
            createState:{
                stateName:"orderMain_main",
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

__SYD.orderMain_main_el = function({data})
{
    const addon = "https://images.weserv.nl/?url=";
    const modifiedUrl = `${addon}${data.finalDesign[0].url}&w=500&h=500`;
    const sizeMode = `${__p(["orderMain_main","sizeMode"],0)}`;
    const sizeModeObj = {"0":"350px","1":"200px","2":"150px"}

    return $(
        "div",
        {
            style:`transition:all linear .2s;height:${sizeModeObj[sizeMode]};width:${sizeModeObj[sizeMode]};min-width:200px;background-color:#ffffff;box-shadow:1px 1px 3px #2323237f;overflow:hidden;`+__sC["thinBorder"]()+__sC["br-1"]()+__sC["col-start"](),
            class:"hoverMinTab"
        },[
            //Image holder
            $(
                "div",
                {
                    style:`height:100%;width:100%;background-image:url("${modifiedUrl}");`+__sC["br-1"]()
                },[],{genericStyle:["bg_fit"]}
            ),
            //Image holder
            $(
                "div",
                {
                    style:"min-height:50px;width:100%;background-color:inherit;padding:0px 10px;"+__sC["row-start"]()+__sC["thinBorder"]({method:"add",style:{borderBottom:"unset",borderLeft:"unset",borderRight:"unset"}})
                },
                [
                    $("p",{style:`overflow:hidden;max-width:90%;text-overflow:ellipsis;white-space:nowrap;font-weight:600;font-size:${__p(["subContainer","fontSmall"],"13px")};`},[
                        "OrderID: ",$("span",{style:"font-weight:300;"},[data.orderID])
                    ])
                ]
            )
        ],
        {
            genericStyle:["bg_fit"],
            events:{
                onclick:e =>{
                    console.log(data);
                    updateState__bulk({name:"viewOrder",task:s=>{
                        s.product = data;
                        s.isActive = true;
                        return s;
                    }});
                }
            }
        }
    )
}

__SYD.orderMain_main_el_tabType = function({data})
{
    const addon = "https://images.weserv.nl/?url=";
    const modifiedUrl = `${addon}${data.finalDesign[0].url}&w=500&h=500`;
    const sizeMode = `${__p(["orderMain_main","sizeMode"],0)}`;
    const sizeModeObj = {"0":"350px","1":"200px","2":"150px"}

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
                    style:`height:50px;min-width:50px;background-image:url("${modifiedUrl}");`+__sC["br-1"]()
                },[],{genericStyle:["bg_cover"]}
            ),
            //Image holder
            $(
                "div",
                {
                    style:"min-height:50px;width:100%;padding:0px 10px;"+__sC["row-start"]()
                },
                [
                    $("p",{style:`overflow:hidden;max-width:80%;text-overflow:ellipsis;white-space:nowrap;font-weight:600;font-size:${__p(["subContainer","fontSmall"],"13px")};`},[
                        "OrderID: ",$("span",{style:"font-weight:300;"},[data.orderID])
                    ])
                ]
            )
        ],
        {
            genericStyle:["bg_fit"],
            events:{
                onclick:e =>{
                    updateState__bulk({name:"viewOrder",task:s=>{
                        s.product = data;
                        s.isActive = true;
                        return s;
                    }});
                }
            }
        }
    )
}