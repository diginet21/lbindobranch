"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[133],{6133:(a,e,l)=>{l.r(e),l.d(e,{default:()=>U});var t=l(3673),n=l(8880),s=l(1959),d=l(3617);const r={class:"q-py-sm"},i=(0,t._)("div",{class:"row items-center q-gutter-x-md"},[(0,t._)("div",{class:"title"},"Add Services")],-1),o={class:"row form-container"},c={class:"col q-pa-sm"},u={class:"card-box block-container"},m={class:"q-gutter-y-md"},p={class:"submit-block"},b={setup(a){const e=(0,d.oR)(),l=(0,s.Fl)((()=>e.state.loading)),b=(0,s.Fl)((()=>e.getters["layanan/getMasterOptions"])),v=(0,s.Fl)((()=>e.state.layanan.main_data)),_=(0,s.Fl)((()=>e.state.layanan.master_data));(0,t.bv)((()=>{v.value.data.length||e.dispatch("layanan/getIndex"),_.value.length||e.dispatch("layanan/getMaster")}));const y=(0,s.qj)({layanan_id:"",sell_price:""}),g=()=>{e.dispatch("layanan/store",y)},S=a=>{let e=_.value.find((e=>e.id==a));e&&(y.sell_price=e.price)};return(a,e)=>{const d=(0,t.up)("q-breadcrumbs-el"),v=(0,t.up)("q-breadcrumbs"),_=(0,t.up)("q-select"),f=(0,t.up)("money-formatter"),h=(0,t.up)("q-btn"),q=(0,t.up)("q-form"),w=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(w,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",r,[i,(0,t.Wm)(v,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(d,{label:"Dashboard"}),(0,t.Wm)(d,{label:"Parts"}),(0,t.Wm)(d,{label:"New"})])),_:1})]),(0,t.Wm)(q,{onSubmit:(0,n.iM)(g,["prevent"])},{default:(0,t.w5)((()=>[(0,t._)("div",o,[(0,t._)("div",c,[(0,t._)("div",u,[(0,t._)("div",m,[(0,t.Wm)(_,{filled:"",modelValue:(0,s.SU)(y).layanan_id,"onUpdate:modelValue":[e[0]||(e[0]=a=>(0,s.SU)(y).layanan_id=a),S],options:(0,s.SU)(b),label:"Select Services","map-options":"","emit-value":""},null,8,["modelValue","options"]),(0,t.Wm)(f,{modelValue:(0,s.SU)(y).sell_price,"onUpdate:modelValue":e[1]||(e[1]=a=>(0,s.SU)(y).sell_price=a),label:"Sell Price"},null,8,["modelValue"])]),(0,t._)("div",p,[(0,t.Wm)(h,{disable:(0,s.SU)(l),label:"Cancel",color:"primary",flat:"",to:{name:"LayananIndex"}},null,8,["disable"]),(0,t.Wm)(h,{loading:(0,s.SU)(l),type:"submit",label:"Submit",color:"primary",unelevated:""},null,8,["loading"])])])])])])),_:1},8,["onSubmit"])])),_:1})}}};var v=l(4379),_=l(1481),y=l(5926),g=l(5269),S=l(9396),f=l(2165),h=l(7518),q=l.n(h);const w=b,U=w;q()(b,"components",{QPage:v.Z,QBreadcrumbs:_.Z,QBreadcrumbsEl:y.Z,QForm:g.Z,QSelect:S.Z,QBtn:f.Z})}}]);