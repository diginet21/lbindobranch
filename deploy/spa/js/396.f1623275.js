"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[396],{4396:(e,a,l)=>{l.r(a),l.d(a,{default:()=>P});var t=l(3673),r=l(8880),s=l(1959),d=l(3617),p=l(9582);const i={class:"q-py-sm"},o=(0,t._)("div",{class:"row items-center q-gutter-x-md"},[(0,t._)("div",{class:"title"},"Add Spareparts")],-1),n={class:"row form-container"},u={class:"col q-pa-sm"},c={class:"card-box block-container"},m={class:"q-gutter-y-md"},b={class:"submit-block"},_=(0,t.Uk)("> "),v={setup(e){const a=(0,d.oR)(),l=(0,p.yj)(),v=(0,s.iH)(null),g=(0,s.Fl)((()=>a.state.loading));(0,t.bv)((()=>{a.dispatch("part/getPartById",l.params.part).then((e=>{v.value=e.data.data,q()}))}));const S=(0,s.Fl)((()=>a.getters["part/getAllPartOptions"]));(0,t.bv)((()=>{S.value.length<2&&a.dispatch("part/getAll")}));const h=(0,s.qj)({id:"",_method:"PUT",sparepart_id:"",sell_price:0}),q=()=>{h.id=v.value.id,h.sparepart_id=v.value.sparepart_id,h.sell_price=v.value.sell_price},U=()=>{a.dispatch("part/partUpdate",h)};(0,s.iH)([]);return(e,a)=>{const l=(0,t.up)("q-breadcrumbs-el"),d=(0,t.up)("q-breadcrumbs"),p=(0,t.up)("q-select"),v=(0,t.up)("q-input"),q=(0,t.up)("q-btn"),f=(0,t.up)("q-form"),w=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(w,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",i,[o,(0,t.Wm)(d,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(l,{label:"Dashboard"}),(0,t.Wm)(l,{label:"Parts"}),(0,t.Wm)(l,{label:"New"})])),_:1})]),(0,t.Wm)(f,{onSubmit:(0,r.iM)(U,["prevent"])},{default:(0,t.w5)((()=>[(0,t._)("div",n,[(0,t._)("div",u,[(0,t._)("div",c,[(0,t._)("div",m,[(0,t.Wm)(p,{outlined:"",modelValue:(0,s.SU)(h).sparepart_id,"onUpdate:modelValue":a[0]||(a[0]=e=>(0,s.SU)(h).sparepart_id=e),options:(0,s.SU)(S),label:"Pilih Sparepart","map-options":"","emit-value":""},null,8,["modelValue","options"]),(0,t.Wm)(v,{mask:"###########",outlined:"",modelValue:(0,s.SU)(h).sell_price,"onUpdate:modelValue":a[1]||(a[1]=e=>(0,s.SU)(h).sell_price=e),label:"Sell Price",prefix:"Rp"},null,8,["modelValue"])]),(0,t._)("div",b,[(0,t.Wm)(q,{disable:(0,s.SU)(g),label:"Cancel",color:"primary",flat:"",to:{name:"PartIndex"}},null,8,["disable"]),(0,t.Wm)(q,{loading:(0,s.SU)(g),type:"submit",label:"Submit",color:"primary",unelevated:""},null,8,["loading"])])])]),_])])),_:1},8,["onSubmit"])])),_:1})}}};var g=l(4379),S=l(1481),h=l(5926),q=l(5269),U=l(1935),f=l(4842),w=l(2165),y=l(7518),W=l.n(y);const k=v,P=k;W()(v,"components",{QPage:g.Z,QBreadcrumbs:S.Z,QBreadcrumbsEl:h.Z,QForm:q.Z,QSelect:U.Z,QInput:f.Z,QBtn:w.Z})}}]);