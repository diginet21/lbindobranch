"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[762],{1762:(e,a,l)=>{l.r(a),l.d(a,{default:()=>k});var t=l(3673),r=l(8880),s=l(1959),p=l(3617);const d={class:"q-py-sm"},i=(0,t._)("div",{class:"row items-center q-gutter-x-md"},[(0,t._)("div",{class:"title"},"Add Spareparts")],-1),n={class:"row form-container"},o={class:"col q-pa-sm"},u={class:"card-box block-container"},c={class:"q-gutter-y-md"},m={class:"submit-block"},b={setup(e){const a=(0,p.oR)(),l=(0,s.Fl)((()=>a.state.loading)),b=(0,s.Fl)((()=>a.getters["part/getAllPartOptions"])),_=(0,s.Fl)((()=>a.state.part.main_data)),v=(0,s.Fl)((()=>a.state.part.parts_master));(0,t.bv)((()=>{_.value.data.length||a.dispatch("part/getIndex"),v.value.length||a.dispatch("part/getAll")}));const g=(0,s.qj)({sparepart_id:"",sell_price:0}),S=()=>{a.dispatch("part/partStore",g)};(0,s.iH)([]);return(e,a)=>{const p=(0,t.up)("q-breadcrumbs-el"),_=(0,t.up)("q-breadcrumbs"),v=(0,t.up)("q-select"),h=(0,t.up)("q-input"),q=(0,t.up)("q-btn"),f=(0,t.up)("q-form"),w=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(w,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",d,[i,(0,t.Wm)(_,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(p,{label:"Dashboard"}),(0,t.Wm)(p,{label:"Spareparts"}),(0,t.Wm)(p,{label:"New"})])),_:1})]),(0,t.Wm)(f,{onSubmit:(0,r.iM)(S,["prevent"])},{default:(0,t.w5)((()=>[(0,t._)("div",n,[(0,t._)("div",o,[(0,t._)("div",u,[(0,t._)("div",c,[(0,t.Wm)(v,{outlined:"",modelValue:(0,s.SU)(g).sparepart_id,"onUpdate:modelValue":a[0]||(a[0]=e=>(0,s.SU)(g).sparepart_id=e),options:(0,s.SU)(b),label:"Pilih Sparepart","map-options":"","emit-value":""},null,8,["modelValue","options"]),(0,t.Wm)(h,{mask:"###########",outlined:"",modelValue:(0,s.SU)(g).sell_price,"onUpdate:modelValue":a[1]||(a[1]=e=>(0,s.SU)(g).sell_price=e),label:"Sell Price",prefix:"Rp"},null,8,["modelValue"])]),(0,t._)("div",m,[(0,t.Wm)(q,{disable:(0,s.SU)(l),label:"Cancel",color:"primary",flat:"",to:{name:"PartIndex"}},null,8,["disable"]),(0,t.Wm)(q,{loading:(0,s.SU)(l),type:"submit",label:"Submit",color:"primary",unelevated:""},null,8,["loading"])])])])])])),_:1},8,["onSubmit"])])),_:1})}}};var _=l(4379),v=l(1481),g=l(5926),S=l(5269),h=l(9396),q=l(4842),f=l(2165),w=l(7518),U=l.n(w);const W=b,k=W;U()(b,"components",{QPage:_.Z,QBreadcrumbs:v.Z,QBreadcrumbsEl:g.Z,QForm:S.Z,QSelect:h.Z,QInput:q.Z,QBtn:f.Z})}}]);