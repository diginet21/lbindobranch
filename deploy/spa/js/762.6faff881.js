"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[762],{1762:(e,l,a)=>{a.r(l),a.d(l,{default:()=>y});var t=a(3673),r=a(8880),s=a(1959),o=a(3617);const i={class:"q-py-sm"},d=(0,t._)("div",{class:"row items-center q-gutter-x-md"},[(0,t._)("div",{class:"title"},"Add Spareparts")],-1),n={class:"row form-container"},p={class:"col q-pa-sm"},u={class:"card-box block-container"},c={class:"q-gutter-y-md"},m={class:"submit-block"},b=(0,t.Uk)("> "),_={setup(e){const l=(0,o.oR)(),a=(0,s.Fl)((()=>l.state.loading)),_=(0,s.Fl)((()=>l.getters["part/getAllPartOptions"]));(0,t.bv)((()=>{_.value.length<2&&l.dispatch("part/getAll")}));const v=(0,s.qj)({sparepart_id:"",sell_price:0}),S=()=>{l.dispatch("part/partStore",v)};(0,s.iH)([]);return(e,l)=>{const o=(0,t.up)("q-breadcrumbs-el"),g=(0,t.up)("q-breadcrumbs"),q=(0,t.up)("q-select"),f=(0,t.up)("q-input"),h=(0,t.up)("q-btn"),U=(0,t.up)("q-form"),w=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(w,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",i,[d,(0,t.Wm)(g,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(o,{label:"Dashboard"}),(0,t.Wm)(o,{label:"Parts"}),(0,t.Wm)(o,{label:"New"})])),_:1})]),(0,t.Wm)(U,{onSubmit:(0,r.iM)(S,["prevent"])},{default:(0,t.w5)((()=>[(0,t._)("div",n,[(0,t._)("div",p,[(0,t._)("div",u,[(0,t._)("div",c,[(0,t.Wm)(q,{outlined:"",modelValue:(0,s.SU)(v).sparepart_id,"onUpdate:modelValue":l[0]||(l[0]=e=>(0,s.SU)(v).sparepart_id=e),options:(0,s.SU)(_),label:"Pilih Sparepart","map-options":"","emit-value":""},null,8,["modelValue","options"]),(0,t.Wm)(f,{mask:"###########",outlined:"",modelValue:(0,s.SU)(v).sell_price,"onUpdate:modelValue":l[1]||(l[1]=e=>(0,s.SU)(v).sell_price=e),label:"Sell Price",prefix:"Rp"},null,8,["modelValue"])]),(0,t._)("div",m,[(0,t.Wm)(h,{disable:(0,s.SU)(a),label:"Cancel",color:"primary",flat:"",to:{name:"PartIndex"}},null,8,["disable"]),(0,t.Wm)(h,{loading:(0,s.SU)(a),type:"submit",label:"Submit",color:"primary",unelevated:""},null,8,["loading"])])])]),b])])),_:1},8,["onSubmit"])])),_:1})}}};var v=a(4379),S=a(1481),g=a(5926),q=a(5269),f=a(1935),h=a(4842),U=a(2165),w=a(7518),W=a.n(w);const k=_,y=k;W()(_,"components",{QPage:v.Z,QBreadcrumbs:S.Z,QBreadcrumbsEl:g.Z,QForm:q.Z,QSelect:f.Z,QInput:h.Z,QBtn:U.Z})}}]);