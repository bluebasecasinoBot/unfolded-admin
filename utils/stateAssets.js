import { __g, __p, __u } from "../sydneyDom_v3.js";

//Update states function
export const updateState = ({name , prop , value , isDiff = true}) =>{
    const state = __g(name);
    state[`${prop}`] = value;
    __u(name , {type:"a" , value:state} , isDiff);
}
//Update states function

//Update states function multi-route
export const updateState__ = ({name , prop = [] , value}) =>{
    const state = __g(name);
    let copy = state
    for(let i = 0; i < prop.length; i++)
    {
        if(i === prop.length-1)
        {
            copy[prop[i]] = value;
        }else copy = copy[prop[i]]
    }
    __u(name , {type:"a" , value:state})
}
//Update states function multi-route

//Update states function multi-route
export const updateState__push = ({name , prop = [] , value}) =>{
    const state = __g(name);
    let copy = state
    for(let i = 0; i < prop.length; i++)
    {
        if(i === prop.length-1)
        {
            copy[prop[i]].push(value);
        }else copy = copy[prop[i]]
    }
    __u(name , {type:"a" , value:state})
}
//Update states function multi-route

//bulk state update
export const updateState__bulk = ({name , task = ()=>{} , isDiff = true}) =>{
    __u(name , {type:"a" , value:task(__g(name))} , isDiff);
}
//bulk state update

export function trimVal(text,ellipsis=false,size=7)
{
    let text_ = `${text}`;
    if(`${text_}`.length > size)
    {
        text_ = text_.slice(0,size);
    }
    return `${text_}${ellipsis?"...":""}`;
}

export function centerVal(text,size=7)
{
    let text_ = `${text}`;
    const temp = [];
    temp[0] = text_.slice(0 , Math.round(size/2));
    temp[1] = text_.slice(text_.length-1-Math.round(size/2) , text_.length-1);
    return `${temp[0]}...${temp[1]}`;
}

export function copyText(text)
{
    navigator.clipboard.writeText(text)
    .then(() => {
        
    })
    .catch(err => console.error("Failed to copy", err));
}

export const checkAdxAvailable = () =>{
    if(__p(["walletDashboard","adx"]).length === 0)
    {
        updateState({name:"addWalletPage",prop:"mainDisplay",value:true});
        updateState({name:"addWalletPage_A",prop:"mainDisplay",value:true})
    }

    if(__p(["insight","tokenId"]).length === 0)
    {
        updateState({name:"inspectToken_I",prop:"mainDisplay",value:true})
    }
}