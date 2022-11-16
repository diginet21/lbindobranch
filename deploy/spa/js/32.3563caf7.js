"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[32],{5032:(e,l,a)=>{a.r(l),a.d(l,{default:()=>A});a(9544);var t=a(3673),d=a(2323),i=a(8880),u=a(1959),o=a(3617),s=a(9582),n=a(6249),m=a(5474),r=a(2535);const c={class:"q-py-sm"},p={class:"q-pt-md"},v={class:"card-box"},b={class:"q-gutter-y-md"},h=(0,t._)("div",{class:"text-label text-grey-8"},"Coordinate",-1),w={class:"row q-gutter-x-sm"},_={key:0,class:""},g={key:1},y={class:"relative"},f={class:"absolute bg-white z-50 full-width scroll",style:{"max-height":"200px"}},U={class:"card-box",style:{"min-height":"200px"}},V={class:"flex justify-between items-center q-mb-md"},S=(0,t._)("div",{class:"text-md"},"Social Media",-1),W={key:0,class:"text-center q-pt-lg"},k={class:"q-my-lg"},q={setup(e){const l=(0,o.oR)(),a=((0,s.yj)(),(0,u.Fl)((()=>l.state.loading)),(0,u.Fl)((()=>l.state.branch))),q=(0,u.Fl)((()=>l.state.cities));(0,t.wF)((()=>{q.value.length||l.dispatch("getCities"),a.value?Q(a.value):(0,m.Api)().get("getMyBranch").then((e=>{200==e.status&&(l.commit("SET_BRANCH",e.data.data),Q(e.data.data))}))}));const x=(0,u.Fl)((()=>q.value.map((e=>({value:e.id,label:e.type+" "+e.city_name,...e}))))),Z="Branch Setting",C=(0,u.qj)({id:"",name:"",phone:"",email:"",address:"",warehouse:"",latitude:"",longitude:"",social_media:[]}),Q=e=>{var l,a;C.id=e.id,C.name=e.name,C.phone=e.phone,C.email=e.email,C.address=e.address,C.warehouse=e.warehouse,C.latitude=null!==(l=e.latitude)&&void 0!==l?l:"",C.longitude=null!==(a=e.longitude)&&void 0!==a?a:"",C.social_media=e.social_media?e.social_media.map((e=>({type:e.type,username:e.username,url:e.url}))):[],H.value=`${e.warehouse.subdistrict_name} ${e.warehouse.type}  ${e.warehouse.city} - ${e.warehouse.province}`},B=()=>{n.Z.show(),l.dispatch("config/updateBranch",C).then((e=>{200==e.status&&l.commit("SET_BRANCH",e.data.data)})).finally((()=>n.Z.hide()))},z=(0,u.iH)(""),D=((0,u.Fl)((()=>z.value.length?x.value.filter((e=>e.city_name.toLowerCase().indexOf(z.value)>-1)):x.value)),(0,u.iH)("")),F=(0,u.iH)([]),H=(0,u.iH)(""),$=()=>{D.value.length>=3&&l.dispatch("branch/findSubdistrict",D.value).then((e=>{F.value=e.data.results}))},j=e=>{C.warehouse=e,H.value=`${e.warehouse.subdistrict_name} ${e.warehouse.type}  ${e.warehouse.city} - ${e.warehouse.province}`,F.value=[],D.value=""},T=[{value:"whatsapp",label:"Whatsapp"},{value:"facebook",label:"Facebook"},{value:"twitter",label:"Twitter"},{value:"instagram",label:"Instagram"},{value:"linkedin",label:"Linkedin"}],I=()=>{C.social_media.push({type:"whatsapp",username:"",url:""})},L=e=>{C.social_media.splice(e,1)};return(e,l)=>{const a=(0,t.up)("q-breadcrumbs-el"),o=(0,t.up)("q-breadcrumbs"),s=(0,t.up)("q-input"),n=(0,t.up)("q-icon"),m=(0,t.up)("q-item-section"),q=(0,t.up)("q-item"),x=(0,t.up)("q-list"),Q=(0,t.up)("q-btn"),z=(0,t.up)("q-select"),A=(0,t.up)("q-form"),E=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(E,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",c,[(0,t._)("div",{class:"row items-center q-gutter-x-md"},[(0,t._)("div",{class:"title"},(0,d.zw)(Z))]),(0,t.Wm)(o,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(a,{label:"Dashboard"}),(0,t.Wm)(a,{label:Z})])),_:1})]),(0,t._)("div",p,[(0,t.Wm)(r.Z)]),(0,t.Wm)(A,{onSubmit:(0,i.iM)(B,["prevent"])},{default:(0,t.w5)((()=>[(0,t._)("div",null,[(0,t._)("div",v,[(0,t._)("div",b,[(0,t.Wm)(s,{filled:"",modelValue:(0,u.SU)(C).name,"onUpdate:modelValue":l[0]||(l[0]=e=>(0,u.SU)(C).name=e),label:"Name"},null,8,["modelValue"]),(0,t.Wm)(s,{filled:"",modelValue:(0,u.SU)(C).phone,"onUpdate:modelValue":l[1]||(l[1]=e=>(0,u.SU)(C).phone=e),label:"Phone"},null,8,["modelValue"]),(0,t._)("div",null,[h,(0,t._)("div",w,[(0,t.Wm)(s,{filled:"",class:"col",label:"Latitude",modelValue:(0,u.SU)(C).latitude,"onUpdate:modelValue":l[2]||(l[2]=e=>(0,u.SU)(C).latitude=e)},null,8,["modelValue"]),(0,t.Wm)(s,{filled:"",class:"col",label:"Longitude",modelValue:(0,u.SU)(C).longitude,"onUpdate:modelValue":l[3]||(l[3]=e=>(0,u.SU)(C).longitude=e)},null,8,["modelValue"])])]),(0,t.Wm)(s,{filled:"",modelValue:(0,u.SU)(C).email,"onUpdate:modelValue":l[4]||(l[4]=e=>(0,u.SU)(C).email=e),label:"Email"},null,8,["modelValue"]),(0,t.Wm)(s,{filled:"",type:"textarea",modelValue:(0,u.SU)(C).address,"onUpdate:modelValue":l[5]||(l[5]=e=>(0,u.SU)(C).address=e),label:"Address"},null,8,["modelValue"]),(0,t._)("div",null,[(0,u.SU)(C).warehouse?((0,t.wg)(),(0,t.iD)("div",_,[(0,t.Wm)(s,{modelValue:H.value,"onUpdate:modelValue":l[7]||(l[7]=e=>H.value=e),label:"Warehouse",filled:"",readonly:""},(0,t.Nv)({_:2},[H.value?{name:"append",fn:(0,t.w5)((()=>[(0,t.Wm)(n,{name:"close",onClick:l[6]||(l[6]=e=>(0,u.SU)(C).warehouse=""),class:"cursor-pointer"})]))}:void 0]),1032,["modelValue"])])):((0,t.wg)(),(0,t.iD)("div",g,[(0,t.Wm)(s,{placeholder:"Ketik kecamatan",label:"Warehouse",filled:"",options:F.value,"use-input":"",modelValue:D.value,"onUpdate:modelValue":[l[8]||(l[8]=e=>D.value=e),$]},null,8,["options","modelValue"]),(0,t._)("div",y,[(0,t._)("div",f,[(0,t.Wm)(x,null,{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(F.value,(e=>((0,t.wg)(),(0,t.j4)(q,{key:e.id,onClick:l=>j(e),clickable:""},{default:(0,t.w5)((()=>[(0,t.Wm)(m,null,{default:(0,t.w5)((()=>[(0,t.Uk)((0,d.zw)(e.subdistrict_name)+" "+(0,d.zw)(e.type)+" "+(0,d.zw)(e.city)+" - "+(0,d.zw)(e.province),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])])]))])])]),(0,t._)("div",U,[(0,t._)("div",V,[S,(0,t.Wm)(Q,{label:"Add Socmed",color:"primary",size:"12px",onClick:I})]),(0,t._)("div",null,[(0,t.Wm)(x,null,{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,u.SU)(C).social_media,((e,l)=>((0,t.wg)(),(0,t.j4)(q,{key:l,class:"q-px-xs"},{default:(0,t.w5)((()=>[(0,t.Wm)(m,{style:{"max-width":"200px"}},{default:(0,t.w5)((()=>[(0,t.Wm)(z,{required:"",filled:"",options:T,"emit-value":"","map-options":"",modelValue:(0,u.SU)(C).social_media[l].type,"onUpdate:modelValue":e=>(0,u.SU)(C).social_media[l].type=e,label:"Type"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024),(0,t.Wm)(m,{style:{"max-width":"250px"}},{default:(0,t.w5)((()=>[(0,t.Wm)(s,{required:"",filled:"",modelValue:(0,u.SU)(C).social_media[l].username,"onUpdate:modelValue":e=>(0,u.SU)(C).social_media[l].username=e,label:"Username / ID"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024),(0,t.Wm)(m,null,{default:(0,t.w5)((()=>[(0,t.Wm)(s,{required:"",filled:"",modelValue:(0,u.SU)(C).social_media[l].url,"onUpdate:modelValue":e=>(0,u.SU)(C).social_media[l].url=e,label:"Link Url"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024),(0,t.Wm)(m,{side:""},{default:(0,t.w5)((()=>[(0,t.Wm)(Q,{icon:"delete",round:"",onClick:e=>L(l),color:"red",unelevated:"",size:"sm"},null,8,["onClick"])])),_:2},1024)])),_:2},1024)))),128))])),_:1}),(0,u.SU)(C).social_media.length?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("div",W,"Tidak ada data"))])])]),(0,t._)("div",k,[(0,t.Wm)(Q,{label:"Update Data",type:"submit",unelevated:"",color:"primary"})])])),_:1},8,["onSubmit"])])),_:1})}}};var x=a(4379),Z=a(1481),C=a(5926),Q=a(5269),B=a(4842),z=a(4554),D=a(7011),F=a(3414),H=a(2035),$=a(2165),j=a(9396),T=a(7518),I=a.n(T);const L=q,A=L;I()(q,"components",{QPage:x.Z,QBreadcrumbs:Z.Z,QBreadcrumbsEl:C.Z,QForm:Q.Z,QInput:B.Z,QIcon:z.Z,QList:D.Z,QItem:F.Z,QItemSection:H.Z,QBtn:$.Z,QSelect:j.Z})},2535:(e,l,a)=>{a.d(l,{Z:()=>c});var t=a(3673);function d(e,l){const a=(0,t.up)("q-route-tab"),d=(0,t.up)("q-tabs");return(0,t.wg)(),(0,t.j4)(d,{align:"left","active-color":"primary","active-bg-color":"green-1","content-class":"bg-grey-2",dark:""},{default:(0,t.w5)((()=>[(0,t.Wm)(a,{label:"Branch Setting",to:{name:"BranchConfig"}}),(0,t.Wm)(a,{label:"Paygate Setting",to:{name:"PaygateConfig"}})])),_:1})}var i=a(4260),u=a(7547),o=a(208),s=a(7518),n=a.n(s);const m={},r=(0,i.Z)(m,[["render",d]]),c=r;n()(m,"components",{QTabs:u.Z,QRouteTab:o.Z})}}]);