"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[762],{1762:(e,a,l)=>{l.r(a),l.d(a,{default:()=>W});l(5363);var t=l(3673),r=l(8880),s=l(1959),d=l(3617);const o={class:"q-py-sm"},p=(0,t._)("div",{class:"row items-center q-gutter-x-md"},[(0,t._)("div",{class:"title"},"Add Spareparts")],-1),n={class:"row form-container"},i={class:"col q-pa-sm"},c={class:"card-box block-container"},u={class:"q-gutter-y-md"},m={class:"submit-block"},b={setup(e){const a=(0,d.oR)(),l=(0,s.Fl)((()=>a.state.loading)),b=(0,s.Fl)((()=>a.getters["part/getAllPartOptions"])),_=(0,s.Fl)((()=>a.state.part.main_data)),v=(0,s.Fl)((()=>a.state.part.parts_master));(0,t.bv)((()=>{_.value.data.length||a.dispatch("part/getIndex"),v.value.length||a.dispatch("part/getAll")}));const S=(0,s.qj)({sparepart_id:"",sell_price:""}),g=()=>{a.dispatch("part/partStore",S)};(0,s.iH)([]);return(e,a)=>{const d=(0,t.up)("q-breadcrumbs-el"),_=(0,t.up)("q-breadcrumbs"),v=(0,t.up)("q-select"),f=(0,t.up)("money-formatter"),h=(0,t.up)("q-btn"),q=(0,t.up)("q-form"),w=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(w,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",o,[p,(0,t.Wm)(_,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(d,{label:"Dashboard"}),(0,t.Wm)(d,{label:"Spareparts"}),(0,t.Wm)(d,{label:"New"})])),_:1})]),(0,t.Wm)(q,{onSubmit:(0,r.iM)(g,["prevent"])},{default:(0,t.w5)((()=>[(0,t._)("div",n,[(0,t._)("div",i,[(0,t._)("div",c,[(0,t._)("div",u,[(0,t.Wm)(v,{filled:"",modelValue:(0,s.SU)(S).sparepart_id,"onUpdate:modelValue":a[0]||(a[0]=e=>(0,s.SU)(S).sparepart_id=e),options:(0,s.SU)(b),label:"Select Sparepart","map-options":"","emit-value":""},null,8,["modelValue","options"]),(0,t.Wm)(f,{modelValue:(0,s.SU)(S).sell_price,"onUpdate:modelValue":a[1]||(a[1]=e=>(0,s.SU)(S).sell_price=e),label:"Sell Price"},null,8,["modelValue"])]),(0,t._)("div",m,[(0,t.Wm)(h,{disable:(0,s.SU)(l),label:"Cancel",color:"primary",flat:"",to:{name:"PartIndex"}},null,8,["disable"]),(0,t.Wm)(h,{loading:(0,s.SU)(l),type:"submit",label:"Submit",color:"primary",unelevated:""},null,8,["loading"])])])])])])),_:1},8,["onSubmit"])])),_:1})}}};var _=l(4379),v=l(1481),S=l(5926),g=l(5269),f=l(9396),h=l(2165),q=l(7518),w=l.n(q);const U=b,W=U;w()(b,"components",{QPage:_.Z,QBreadcrumbs:v.Z,QBreadcrumbsEl:S.Z,QForm:g.Z,QSelect:f.Z,QBtn:h.Z})}}]);