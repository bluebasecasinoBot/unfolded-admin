const visualTreeParams = {
    ws:null,
    mounted:false,
    sent:false,
    root:'container'
}

let MEDIA_QUERY = new Object();

export const mediaFunction = new Array();

const mountFunc = new Object();

export const SYD_VAR = {};

const mainIterator = {
    domPath:{},
    generation:{
        maxCount:0
    },
    resizeAnimator_int__:new Date(),
    minFrameTime:50
};

export const clearDomParams = () =>{
    mainIterator.domPath = new Object();
    MEDIA_QUERY = new Object()
}

export class SYD_VAR_constructor
{
    constructor({value})
    {
        this.value = value;
        this.change = (value)=>this.value = value;
        this.update = ({branch = 'container' , value}) =>{
            const state = __g(branch);
            this.value = value;
            __u(branch , {type:"a" , value:state})
        }//USE CASE : SYD_VAR.varName.update({value:"variable new value"})
        this.get = () =>{
            return this.value
        }
    }
}

let prevX = 0;

const GENERIC_DOM = {
    bg_cover:{
        parent:{backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'},
        child:{}
    },
    bg_fit:{
        parent:{backgroundSize:'contain',backgroundPosition:'center',backgroundRepeat:'no-repeat'},
        child:{}
    },
    flex_col:{
        parent:{display:'flex',flexDirection:'column',alignItems:'center'},
        child:{}
    },
    fl_el:{
        parent:{position:'relative'},
        child:{position:'absolute',top:'0',left:'0',height:'100%',width:'100%'}
    }
}

// window.onload = () =>{
//     // manage_mediaQuery(600);
//     manage_mediaQuery(window.innerWidth)
// }

// window.onresize = () =>{    
//     manage_mediaQuery(window.innerWidth);
//     mediaFunction.forEach(func=>func());
// }

// window.onfocus = () =>{
//     manage_mediaQuery(600);

//     manage_mediaQuery(window.innerWidth)

// }

// window.onblur = () =>{
//     manage_mediaQuery(600);

//     manage_mediaQuery(window.innerWidth)

// }

// window.onbeforeunload = () =>{
//     manage_mediaQuery(600);

//     manage_mediaQuery(window.innerWidth)

// }

export const manage_mediaQuery = (width) =>{
    const type = Object.keys(MEDIA_QUERY);
    const patch = new Array();
    const idtNodes = new Array(); //uppermost independent Nodes

    //get independent nodes
    getRootParent();
    //get independent nodes

    for(let i = 0; i < type.length; i++)
    {
        const query = MEDIA_QUERY[type[i]];
        const allValid = new Array();
        const statePatch = [];

        for(let j = 0; j < query.query.length; j++)
        {
            const props = query.query[j].prop;
            const {id:sizeId , value:sizeVal} = getSizeIdentity(query.query[j].size);
            let valid = false;

            switch(sizeId)
            {
                case "<":
                    if(width < sizeVal) valid = true;
                break;
                case "<=":
                    if(width <= sizeVal) valid = true;
                break;
                case ">":
                    if(width > sizeVal) valid = true;
                break;
                case ">=":
                    if(width >= sizeVal) valid = true;
            }

            allValid.push(valid);

            if(valid)
            {
                //attach patch operation
                Object.keys(props).forEach(prop =>{
                    statePatch.push(
                        (s)=>{
                            s[prop] = props[prop];
                            return s;
                        }
                    )
                })
                //attach patch operation
            }
        }

        if(!allValid.some(val => val === true)){
            Object.keys(query.defState).forEach(prop =>{
                statePatch.push(
                    (s)=>{
                        s[prop] = query.defState[prop];
                        return s;
                    }
                )
            })
        }

        patch.push(
            () =>{
                let state = __g(type[i]);
                statePatch.forEach(funcs =>{state = funcs(state)});
                __u(type[i] , {type:"a",value:state} , {isDiff:idtNodes.includes(type[i])})
            }
        );
    }

    function getSizeIdentity(querySize)
    {   
        const value = /\d+(\.\d+)?/.exec(querySize)[0];
        const id = querySize.split(value)[0];

        return {value , id}
    }

    function getRootParent()
    {
        const allTypes = type;
        //find the lowest level unrelated parents to carry rendering
        for(let i = 0; i < allTypes.length; i++)
        {
            const some = new Array();
            for(let j = 0; j < allTypes.length; j++)
            {
                if(j !== i)
                {
                    some.push(mainIterator.domPath[allTypes[i]].join("'").includes(mainIterator.domPath[allTypes[j]].join("'")))
                }
            }
            if(some.every(val => !val))idtNodes.push(allTypes[i]);
        }
        //find the lowest level unrelated parents to carry rendering
    }
    

    patch.forEach(val=>val());
}

class addStyleComponent{
    constructor(style)
    {
        this.defaultStyle = style;
        this.capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const refineX = (x) =>{
            let dummy = x;
            for(let index in dummy)
            {
               if(this.capitals.includes(dummy[index]))
               {
                    let idNum = dummy.indexOf(dummy[index]);
                    dummy = dummy.slice(0,idNum)+`-${dummy[index].toLowerCase()}`+dummy.slice(idNum+1,dummy.length)
               }
            }
            return dummy;
        }
        this.merge = (useObj) =>{
            let string = new String();
            for(let [x,y] of Object.entries(useObj))
            {
                x = refineX(x);
                let styleEntity = `${x}: ${y}; `
                string += styleEntity;
            }
            return string;
        }
        this.mergedStyle = this.merge(this.defaultStyle);

        this.update = (cmd = {}) =>{
            let returnable;
            let newStyle = new Object;
            Object.assign(newStyle,this.defaultStyle);
            
            const operation = (obj = {}) =>{
                let {method,style} = obj;
                switch(true)
                {
                    case method === 'remove':
                        style = style === undefined ? [] : style;
                        for(let x of style)
                        {
                            if(x in newStyle)
                            {
                                delete newStyle[x];
                            }
                        }
                        returnable = this.merge(newStyle);
                    break;
                    case method === 'add':
                        style = style === undefined ? {} : style;
                        for(let [y,z = ''] of Object.entries(style))
                        {
                            newStyle[y] = z;
                        }
                        returnable = this.merge(newStyle);
                    break;
                    case method === 'use':
                        style = style === undefined ? [] : style;
                        const newStylePatch = new Object();
                        for(let x of style)
                        {
                            if(x in newStyle)
                            {
                                newStylePatch[x] = newStyle[x]
                            }
                        };
                        newStyle = newStylePatch
                        // console.log(newStyle,newStylePatch)
                        returnable = this.merge(newStylePatch)
                    break;
                    default:
                        returnable = this.mergedStyle;
                }
            }

            try{
                cmd.forEach(val =>{
                    operation(val)
                })
            }
            catch(err)
            {
                operation(cmd)
            }
            return returnable;
        }
    }
}
export const sydDOM = new Object();
export const __SYD = sydDOM;
export const virtualDom = new Object();
export const __v = virtualDom;
export const DomType = new Object();
export const styleComponent = new Object();
export const __sC = styleComponent
export const setStyle = (styleArray = []) =>{
    let returnable = []
    const run = ({nameTag,style = {}}) =>{
        if(nameTag === undefined)
        {
            console.error("please enter a style name for reference")
        }else{
            styleComponent[nameTag] = new addStyleComponent(style).update;
            returnable.push(styleComponent[nameTag]());
        }
    }
    switch(true)
    {
        case styleArray.length !== undefined:
            // styleArray.style = styleArray.style === undefined ? {} : styleArray.style;
            for(let elem of styleArray)
            {
                run(elem)
            }
        break;
        default:
            styleArray.style = styleArray.style === undefined ? {} : styleArray.style;
            run(styleArray)
    }
   return returnable.length === 1 ? returnable[0] : returnable;
}
export const __sS = setStyle
//RENDER SECTION

const refineSrc_Url = (val , value) =>{
    let refinedValue = value;
    if(val === "src")
    {        
        if(value.slice(0,2).includes("./") || value.slice(0,2).includes("/") || !value.slice(value.split(".")[0].length).includes("http"))
        {
            const url = value.split("/").slice(1 , value.split("/").length);
            refinedValue = `${SYD_VAR.accel_domain.get()}${url.join("/")}`;
        }
    }else
    {
        if(`${value}`.includes("url"))
        {
            const regex = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
            const match = regex.exec(value);
            
            let updated = value.replace(regex, (match, p1) => {
                let current = regex.exec(match)[2]
                if(current.slice(0,2).includes("./") || current.slice(0,2).includes("/") || !current.slice(current.split(".")[0].length).includes("http"))
                {
                    const url = current.split("/").slice(1 , current.split("/").length);
                    current = `${SYD_VAR.accel_domain.get()}${url.join("/")}`;
                }
                return `url(${current}) `;
            });
            refinedValue = updated
        }
    }
    
    return refinedValue
}

const createDomIterator = function createIterator({obj = {} , gen = [] , type})
{
    for(let i = 0; i < obj.children.length; i++)
    {
        mainIterator.domPath[type].push([...gen , i]);

        if([...gen , i].length > mainIterator.generation.maxCount)mainIterator.generation.maxCount = [...gen , i].length;
        if(typeof obj.children[i] !== "string")
        {
            if(obj.children[i].children)
            {
                createIterator({obj:obj.children[i] , gen:[...gen , i] , type})
            }
        }
    }
}

class creator{
    constructor({tagname,attribute,children,Dom,createState,eventListener , innerHTML} , gen)
    {
        this.element = document.createElement(tagname);
        switch(true)
        {
            case Dom !== null:  
                virtualDom[Dom] = this.element;
                DomType[Dom] = Dom;
        }
        Object.keys(attribute).forEach((val,id,array)=>{
            this.element.setAttribute(val,attribute[val]);
        })
        this.addEventListeners = () =>
        {
            for(let j = 0; j < Object.keys(eventListener).length; j++)
            {
                const val = Object.keys(eventListener)[j]
                switch(true)
                {
                    case /^on/.test(val):
                        this.element[val] = eventListener[val]
                    break;
                }
            }
        }
        this.addEventListeners();

        this.addInnerHtml = () =>{
            innerHTML.forEach(val =>{
                this.element.innerHTML = val
            })
        }

        this.addInnerHtml()

        children.forEach((val , i) =>{
            const child = render(val , [...gen , i]);
            this.element.appendChild(child);
        })
    }
}

export const render = (vapp , gen = [0]) =>{
    if([...gen].length > mainIterator.generation.maxCount)mainIterator.generation.maxCount = [...gen].length;

    mainIterator.domPath[`${vapp.Dom&&vapp.Dom!==null?vapp.Dom:[...gen].join("'")}`] = [...gen];

    if(typeof vapp === 'string') 
    {
        return document.createTextNode(vapp)
    }else {
        return new creator(vapp , gen).element;
    }
}

//MOUNT SECTION

export const mount = (VDom , func=()=>{}) =>{
    console.time("mount")
    const Dom = render(VDom);
        
    document.getElementById('root').replaceWith(Dom);

    visualTreeParams.mounted = true;
    if(visualTreeParams['ws'] !== null)
    {
        visualTreeParams['ws'].addEventListener('open', e =>{
            console.log(visualTreeParams['root'])
            visualTreeParams['ws'].send(JSON.stringify({header:'visualTree',data:sydDOM[visualTreeParams['root']]()}));
        })
        visualTreeParams.sent = true;
    }

    mountFunc["fnct"] = func;
    mountFunc["fnct"]();

    const observer = new ResizeObserver(entries => {
        for(let entry of entries) {
            if(new Date() - mainIterator.resizeAnimator_int__ > mainIterator.minFrameTime)
            {
                manage_mediaQuery(window.innerWidth);
                mediaFunction.forEach(func=>func());
                mainIterator.resizeAnimator_int__ = new Date();
            }
        }
    });

    observer.observe(document.body);
    console.timeEnd("mount")
    return Dom
}

export const __m = mount


// DIFFING ALGORITHM

class diffAlgo{
    constructor(type,oldVApp,newVApp)
    {
        this.oldVApp = oldVApp;
        this.newVApp = newVApp;
        this.$dom = virtualDom[type];
        this.Ndom = [];
        this.patches = new Array();
        this.type = type;

        this.attr_diff = (nattr , oattr , element) =>{
            //This will return the extra or overflow attribute
            const repo = new Array();
            for(let i = 0;i < Object.keys(nattr).length; i++)
            {
                if(oattr[Object.keys(nattr)[i]])
                {
                    if(nattr[Object.keys(nattr)[i]] !== oattr[Object.keys(nattr)[i]])
                    {
                        repo.push({name:Object.keys(nattr)[i] , task:"add"})
                    }
                }else
                {
                    repo.push({name:Object.keys(nattr)[i] , task:"add"})
                }
            }
            //remove any leftover that might come from oldvapp
            const illicit = Object.keys(oattr).filter(key => !Object.keys(nattr).includes(key)).map(key=>{return {name:key , task:"remove"}});
            repo.push(...illicit);
            //remove any leftover that might come from oldvapp
    
            return repo.map(obj => {
                if(obj.task === "add") return [element , (element)=>{element.setAttribute(obj.name , nattr[obj.name])}]
                else if(obj.task === "remove") return [element , (element)=>{element.removeAttribute(obj.name)}]
            })
        }

        this.event_diff = (nev , oev , element) =>{
            //This will return the extra or overflow events
            const repo = new Array();
            for(let i = 0;i < Object.keys(nev).length; i++)
            { //Perform proper function comparison here
                // if(oev[Object.keys(nev)[i]])
                // {
                //     if(nev[Object.keys(nev)[i]].toString() !== oev[Object.keys(nev)[i]].toString())
                //     {
                        repo.push({name:Object.keys(nev)[i] , task:"add"})
                //     }
                // }else
                // {
                //     repo.push({name:Object.keys(nev)[i] , task:"add"})
                // }
            }
            //remove any leftover that might come from oldvapp
            const illicit = Object.keys(oev).filter(key => !Object.keys(nev).includes(key)).map(key=>{return {name:key , task:"remove" , payload:oev[key]}});
            repo.push(...illicit);
            //remove any leftover that might come from oldvapp
    
            return repo.map(obj => {
                if(obj.task === "add") return [element , (element)=>{element[obj.name] = nev[obj.name]}]
                else if(obj.task === "remove") return [element , (element)=>{element[obj.name] = null}]
            })
        }
        diffAlgo.startDiffing(this)
    }
    static startDiffing(params)
    {
        console.time("diff");
        const {oldVApp:oldApp , newVApp:newApp , $dom , type , attr_diff , event_diff } = params;

        const patch = new Array();
        
        function main(oapp , napp , element , gen)
        {
            mainIterator.domPath[`${oapp.Dom?oapp.Dom:[...gen].join("'")}`] = [...gen];
            switch(typeof napp)
            {
                case "string":
                    if(typeof oapp !== "string")
                    {
                        patch.push([element , (element)=>{element.replaceWith(document.createTextNode(napp))}])
                    }else
                    {
                        if(napp !== oapp) patch.push([element , (element)=>{element.nodeValue = napp}]);
                    }
                break;
                default:
                    if(oapp.tagname !== napp.tagname)
                    {
                        patch.push([element , (element)=>{element.replaceWith(render(napp))}])
                    }else
                    {
                        //check its attr and generate patches
                        patch.push(...attr_diff(napp.attribute , oapp.attribute , element));
                        //check its attr and generate patches

                        //check its events and generate patches
                        patch.push(...event_diff(napp.eventListener , oapp.eventListener , element));
                        //check its events and generate patches

                        //loop children and recall main
                        patch.push(...childProcess(oapp , napp , element , gen))
                        //loop children and recall main
                    }
            }
        }

        function childProcess(oapp , napp , element , gen) //gen is the iterator array for easy Dom manipulation
        { //Possible suspected problem is state race, fix tomorrow
            //This will return the extra or overflow children
            let repo = new Array();

            //remove any leftover that might come from oldvapp
            if(oapp.children.length > napp.children.length)
            {
                const illicit = oapp.children.map((val , id)=> id).filter(id => id >= napp.children.length).reverse().map(id => {return {name:id , task:"remove"}});
                repo.push(...illicit)
            }
            //remove any leftover that might come from oldvapp

            for(let i = 0;i < napp.children.length; i++)
            {
                if(oapp.children[i] === undefined)
                {
                    repo.push({name:i , task:"add"});   
                }else
                {
                    //recall main here for child comparison
                    main(oapp.children[i] , napp.children[i] , element.childNodes[i] , [...gen,i])
                }
            }
            //This will return the extra or overflow children

            return repo.map(obj => {
                if(obj.task === "add") return [element , (element)=>{
                    if(element.childNodes[obj.name]) element.replaceChild(render(napp.children[obj.name],gen) , element.childNodes[obj.name])
                    else element.appendChild(render(napp.children[obj.name],gen))
                }]
                else if(obj.task === "remove") return [element , (element)=>{
                    if(element.childNodes[obj.name]) element.removeChild(element.childNodes[obj.name]);
                }]
            })
        }

        //check if iterator exist before diffing , this is as a result of running the Mount callback and it contains a state that wasnt rendered , thus has no iterator
        if(mainIterator.domPath[type])
        {
            main(oldApp , newApp , __v[type] , mainIterator.domPath[type]);
        }

        patch.forEach(task => task[1](task[0]));
        console.timeEnd("diff");
    }
}

export const sydDiff = ({type, oldVApp, newVApp}) =>{
    new diffAlgo(type,oldVApp,newVApp);
}
// export default diffAlgo;

//CREATE ELEMENT SECTION

const appendGenericStyle = (vapp) =>{
    vapp.genericStyle.forEach(val =>{
        vapp.attribute.style  = vapp.attribute.style === undefined ? '' : vapp.attribute.style;
        switch(true)
        {
            case !val.includes('[_c]'):
                const style_parent = new addStyleComponent(GENERIC_DOM[val].parent).update()
                vapp.attribute.style += vapp.attribute.style[vapp.attribute.style.length-1] !== ';' ? `;${style_parent}` : `${style_parent}`
        }
    })
    // console.log(vapp)
    sydDOM[`${vapp.Dom}`] = vapp;
    return vapp
}

class createElementClass{
    constructor(tagname,attribute,children,type,createState,mediaQuery,events,genericStyle,innerHTML , legacyName)
    {
        this.mainObj = new Object;
        this.mainObj.tagname = tagname;
        this.mainObj.attribute = attribute;
        this.mainObj.legacy = legacyName;
        if(SYD_VAR.accel_domain)
        {
            Object.keys(this.mainObj.attribute).forEach(prop =>{
                this.mainObj.attribute[prop] = this.mainObj.attribute[prop];//refineSrc_Url(prop , this.mainObj.attribute[prop])  //temporarily paused cause we can use the base url to protect all relative url and src automatically
            })
        }
        
        this.mainObj.children = children;
        this.mainObj.Dom = type;
        this.mainObj.createState = createState
        this.mainObj.mediaQuery = mediaQuery;
        this.mainObj.eventListener = events;
        this.mainObj.genericStyle = genericStyle;
        this.mainObj.innerHTML = (() =>{
            let innerHTML_array = new Array()
            try{
                innerHTML.forEach(val =>{

                });

                innerHTML_array = innerHTML
            }catch(err){
                innerHTML_array = [innerHTML]
            }

            return innerHTML_array
        })()

        // console.log(this.mainObj.innerHTML)

        this.mainObj.removeAttr = (attrArray) =>{
            for(let attrName of attrArray)
            {
                if(attrName in this.mainObj.attribute)
                {
                    delete this.mainObj.attribute[attrName];
                }
            }
            return this.mainObj;
        }

        this.addStateDom = () =>{
            if(Object.keys(createState).length > 0)
            {   
                this.mainObj.Dom = createState.stateName;
                if(GlobalState[createState.stateName] === undefined)
                {
                    setState(
                        createState
                    )
                }
            }
        }
        this.addStateDom()

        this.addMediaQuery = () =>{
            switch(Object.keys(this.mainObj.mediaQuery).length > 0 && this.mainObj.Dom !== undefined)
            {
                case true:
                    MEDIA_QUERY[this.mainObj.Dom] = this.mainObj.mediaQuery;
                    MEDIA_QUERY[this.mainObj.Dom].stateCount = 0;
            }
        }
        this.addMediaQuery();

        this.addGenericStyle = () =>{
            this.mainObj.genericStyle.forEach(val =>{
                this.mainObj.attribute.style  = this.mainObj.attribute.style === undefined ? '' : this.mainObj.attribute.style;
                switch(val.includes('[_c]'))
                {
                    case false:
                        const style_parent = new addStyleComponent(GENERIC_DOM[val].parent).update();
                        this.mainObj.attribute.style = `${style_parent}${this.mainObj.attribute.style}`

                        this.mainObj.children.forEach((child,cid) =>{
                            switch(true)
                            {
                                case this.mainObj.children[cid].attribute !== undefined && child.genericStyle.every(param =>{return !param.includes(val)}):
                                    // console.log(child.genericStyle)
                                    this.mainObj.children[cid].attribute.style = this.mainObj.children[cid].attribute.style === undefined ? '' : this.mainObj.children[cid].attribute.style

                                    const style_child = new addStyleComponent(GENERIC_DOM[val].child).update();
                                    this.mainObj.children[cid].attribute.style = `${style_child}${this.mainObj.children[cid].attribute.style}`
                            }
                        })
                    break;
                    case true:
                        const getGene = GENERIC_DOM[val.split('[_c]')[0]].child
                        const style_child = new addStyleComponent(getGene === undefined ? {} : getGene).update();
                        this.mainObj.attribute.style = `${style_child}${this.mainObj.attribute.style}`
                }

            })
        }
        this.addGenericStyle()

        this.mainObj.addAttr = (objectAttr = {}) =>{
            Object.entries(objectAttr).forEach(val =>{
                let [x,y] = val;
                y = y === null ? "" : y;
                this.mainObj.attribute[x] = y;
            })
            return this.mainObj;
        }

        this.mainObj.removeChild = (index = this.mainObj.children.length-1) =>{
            let array = true;
            try{
                index.forEach(val =>{})
            }catch(err)
            {
                array = false
            }
            const mainOperation = (index) =>{
                switch(true)
                {
                    case this.mainObj.children[index] !== undefined:
                        this.mainObj.children.splice(index,1);
                    break;
                    default:
                        console.warn('the specified index does not exist')
                }
            }
            switch(true)
            {
                case array:
                    index.forEach((val,idx) =>{
                        mainOperation(val);
                        switch(true)
                        {
                            case index[idx+1] !== undefined:
                                index[idx+1]--;
                        }
                    });
                break;
                default:
                    mainOperation(index)
            }
            return this.mainObj
        }

        this.mainObj.inherit = (array) =>{
            let temporal = this.mainObj;
            for(let i = 0; i < array.length; i++)
            {
                if(temporal[array[i]] !== undefined)
                {
                    temporal = temporal[array[i]];
                }else{
                    break;
                }
            }
            return temporal
        }


        const elementalUpdate = (position,element) =>{
            switch(true)
            {
                case element !== undefined:
                    switch(true)
                    {
                        case position === 'end':
                            this.mainObj.children.push(element);
                        break;
                        case position === 'start':
                            this.mainObj.children.unshift(element)
                        break;
                        default:
                            if(!isNaN(Number(position)))
                            {
                                switch(true)
                                {
                                    case position < this.mainObj.children.length:
                                        this.mainObj.children = [...this.mainObj.children.slice(0,position),element,...this.mainObj.children.slice(position,this.mainObj.children.length)]
                                    break;
                                    default:
                                        console.warn('invalid position parameter!')
                                }
                            }else console.warn('please enter a valid position argument')
                    }
                break;
                default:
                    console.warn('please enter a valid element to add')
            }
        }
        this.mainObj.addChild = ({position = 'end', element = undefined} = {}) =>{
            elementalUpdate(position,element)
            return this.mainObj;
        }

        this.mainObj.replaceChild = ({position,element}) =>{
            if(position === undefined || element === undefined )
            {
                console.warn('please enter a valid argument for position and element')
            }else{
                this.mainObj.children[position] = element;
            }
            return this.mainObj;
        }
    }
}

export const createElement = (tagname = 'div', attribute = {}, children = [],{type = null,createState = {},mediaQuery = {} , innerHTML = [''],events = {}, genericStyle = [] , legacyName = null} = {}) =>{
   return new createElementClass(tagname,attribute,children,type,createState,mediaQuery,events,genericStyle , innerHTML , legacyName).mainObj
}

export const __c = createElement;
export const $ = createElement;

// STATES SECTION

class createState{
    constructor(name,newstate,tenary,tenaryOptions)
    {
        this.object = new Object();
        this.object.stateName = name;
        this.object.count = 0;
        this.object.new = newstate;
        this.object.old = 0;
        this.object.tenary = tenary;
        this.tenaryOptions = tenaryOptions;
        this.object.oldAppDiff = {};
        this.newAppDiff = {};
        // console.log(newstate,oldstate)
        this.loadTenary = () =>{
            if(tenary)
            {
                this.object.old = this.tenaryOptions[0];
                this.object.new = this.tenaryOptions[1];
            }
        }
        this.loadTenary();

        const commenceDiffAlgorithm = () =>{
            const oldapp = {};
            Object.assign(oldapp , this.object.oldAppDiff);
            const newapp = {};
            Object.assign(newapp , sydDOM[this.object.stateName]());

            sydDiff(
                {
                    type:this.object.stateName,
                    oldVApp:oldapp,
                    newVApp:newapp
                }
            );

            Object.assign(this.object.oldAppDiff , newapp);
            //sigma🗿🫰🗿 fixed this bug on 10 / 08 / 25
        }
        
        this.object.update = (type,value,isDiff) =>{
            switch(true)
            {
                case this.object.tenary:
                    if(isDiff) commenceDiffAlgorithm()
                    this.object.old = this.object.new;
                    this.object.new = this.object.new === this.tenaryOptions[0] ? this.tenaryOptions[1] : this.tenaryOptions[0];
                break;
                case type === 'i' || type === 'increment':
                    if(!isNaN(Number(this.object.new)))
                    {
                        this.object.old = this.object.new;
                        this.object.new += value;
                        if(isDiff) commenceDiffAlgorithm()
                    }else console.warn(`cannot increment a state of type ${typeof this.object.new}`)
                break;
                case type === 'a' || type === 'assign':
                    this.object.old = this.object.new;
                    this.object.new = value;
                    if(isDiff) commenceDiffAlgorithm()
                break;
                case type === 'd'|| type === 'decrement':
                    if(!isNaN(Number(this.object.new))){
                        if(this.object.new > 0)
                        {
                            this.object.old = this.object.new;
                            this.object.new -= value;
                        }else{
                            this.object.old = this.object.new;
                            this.object.new = 0;
                        }
                        if(isDiff) commenceDiffAlgorithm()
                    }else console.warn(`cannot decrement a state of type ${typeof this.object.new}`);
                break;
            }

            return this.object
        }
    }
}

const GlobalState = new Object();
//{newstate = 0,tenary = false, tenaryOptions = [false,true], state}
export const setState = ({stateName,state = 0, tenary = false, tenaryOptions = [false,true]}) =>{
    let newstate = state;
    switch(true)
    {
        case stateName !== undefined:
            GlobalState[stateName] = new createState(stateName,newstate,tenary,tenaryOptions).object;
            GlobalState[stateName].oldAppDiff = sydDOM[stateName]();
        break;
        default: console.error('Enter a name for the addState')
    }
}

export const getState = (stateName) =>{
    let object = new Object
    let returnable = undefined;
    if(GlobalState[stateName] !== undefined)
    {
        for(let [n,v] of Object.entries(GlobalState[stateName].new))
        {
            object[n] = v;
        }
        // if(Object.keys(GlobalState[stateName].oldAppDiff).length === 0)
        // {
        //     GlobalState[stateName].oldAppDiff = sydDOM[stateName]()
        // }
        returnable = object;
    }

    // console.log(GlobalState[stateName].oldAppDiff);

    return returnable;
}

export const __g = getState

export const useState = (name,{type = 'i',value = 1,} = {} , {isDiff = true} = {}) =>{
    switch(true)
    {
        case GlobalState[name] !== undefined && type !== undefined:
            return GlobalState[name].update(type,value,isDiff);
            //[version]
        break;
        default:
            // console.error('State Does Not Exist');
            return GlobalState[name];
    }
}

export const __u = useState;

export const visualTree = ({visual = false,port = 9090,root = 'container'}) =>{
    switch(true)
    {
        case visual:
            visualTreeParams['ws'] = new WebSocket(`ws://localhost:${port}`);
            visualTreeParams['root'] = root
                visualTreeParams['ws'].addEventListener('open', e =>{
                    if(visualTreeParams.mounted && !visualTreeParams.sent && Object.keys(sydDOM).length > 0)
                    {
                        //Send function names and templates
                        const funcs = Object.keys(sydDOM).map((dom,i) => {
                            return {raw:sydDOM[dom].toString() , name:dom}
                        });
                        //Send function names and templates

                        //Send style names and templates
                        const sCNames = [];
                        const sC = Object.keys(__sC).map(s => {
                            sCNames.push(s);
                            return __sC[s]()
                        });
                        //Send style names and templates

                        //Send variable names and templates
                        const varNames = [];
                        const sydvar = Object.keys(SYD_VAR).map(v =>{
                            varNames.push(v);
                            return SYD_VAR[v].get().toString();
                        })
                        //Send variable names and templates

                        const cssLinks = Array.from(document.querySelectorAll(`link[rel="stylesheet"]`)).map(cssLinks =>cssLinks.href)

                        visualTreeParams['ws'].send(JSON.stringify({header:'visualTree',data:{funcRaw:funcs,root,sC,sCNames,sydvar,varNames,mountFunc:mountFunc["fnct"].toString(),domain:location.href , cssLinks}}));
                    }
                })  
    }
}

export const preState = (acessNames,defaultState) =>{
    let arrayBool = true;
    let stateName = ''
    try{
        acessNames.forEach(val =>{})
    }catch(err){
        arrayBool = false
    }
    stateName = arrayBool ? acessNames[0] : acessNames
    let resolve;
    if(GlobalState[stateName] !== undefined)
    {
        resolve = GlobalState[stateName].new;
        if(arrayBool)
        {
            for(let i = 1; i < acessNames.length; i++)
            {
                if(resolve[acessNames[i]] !== undefined)
                {
                    resolve = resolve[acessNames[i]];
                }else{
                    resolve = defaultState
                }
            }
        }
    }else
    {
        resolve = defaultState
    }
    return resolve
}

export const __p = preState