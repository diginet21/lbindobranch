"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[419],{3419:(e,l,t)=>{t.r(l),t.d(l,{default:()=>M});var a=t(3673),d=t(8880),s=t(1959),n=t(2323),r=t(3617);t(1525);const o={class:"q-py-sm"},i=(0,a._)("div",{class:"row items-center q-gutter-x-md"},[(0,a._)("div",{class:"title"},"Orders")],-1),u={class:"row q-gutter-x-sm q-mt-sm"},c={class:"col"},m={class:"col"},p={class:"col"},_={class:"col"},b={class:"card-column"},v={class:"table-responsive"},q={class:"table striped"},g=(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",null,"#Invoice"),(0,a._)("th",null,"Created"),(0,a._)("th",null,"Customer"),(0,a._)("th",null,"Total"),(0,a._)("th",null,"Type"),(0,a._)("th",null,"Status"),(0,a._)("th",null,"Action")])],-1),S={key:0},k={class:"text-uppercase"},h={class:"q-gutter-sm"},w={key:0},U=(0,a._)("td",{colspan:"6"},[(0,a._)("div",{class:"text-center q-pa-xs"},"No data found")],-1),y=[U],f={key:0,class:"text-center q-py-md"},W={key:0,class:"q-pa-md text-center"},V={setup(e){const l=(0,r.oR)(),t=(0,s.Fl)((()=>l.state.order.main_data));(0,a.bv)((()=>{t.value.data.length||U()}));const U=()=>{l.dispatch("order/getOrders",z)},V=(0,s.Fl)((()=>l.state.loading)),z=(0,s.qj)({branch_id:"",limit:5,start:"",end:"",status:""}),D=()=>{let e={skip:t.value.data.length,limit:t.value.limit};e={...e,...z},l.dispatch("order/paginateData",e)},Q=()=>{l.dispatch("order/filterData",z)},Z=()=>{z.branch_id="",z.start="",z.end="",z.limit=5,z.status="",U()},x=(0,s.Fl)((()=>l.state.order.order_status));return(e,l)=>{const r=(0,a.up)("q-breadcrumbs-el"),U=(0,a.up)("q-breadcrumbs"),C=(0,a.up)("q-input"),F=(0,a.up)("q-select"),O=(0,a.up)("q-btn"),I=(0,a.up)("q-form"),j=(0,a.up)("q-spinner-facebook"),B=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(B,{padding:""},{default:(0,a.w5)((()=>[(0,a._)("div",o,[i,(0,a.Wm)(U,{class:"text-grey","active-color":"secondary"},{default:(0,a.w5)((()=>[(0,a.Wm)(r,{label:"Dashboard"}),(0,a.Wm)(r,{label:"Orders"})])),_:1})]),(0,a.Wm)(I,{class:"col",onSubmit:(0,d.iM)(Q,["prevent"])},{default:(0,a.w5)((()=>[(0,a._)("div",u,[(0,a._)("div",c,[(0,a.Wm)(C,{"stack-label":"",label:"Start",filled:"",square:"",dense:"",type:"date",modelValue:(0,s.SU)(z).start,"onUpdate:modelValue":l[0]||(l[0]=e=>(0,s.SU)(z).start=e)},null,8,["modelValue"])]),(0,a._)("div",m,[(0,a.Wm)(C,{"stack-label":"",label:"End",filled:"",square:"",dense:"",type:"date",modelValue:(0,s.SU)(z).end,"onUpdate:modelValue":l[1]||(l[1]=e=>(0,s.SU)(z).end=e)},null,8,["modelValue"])]),(0,a._)("div",p,[(0,a.Wm)(F,{required:"",filled:"","stack-label":"",square:"",dense:"",label:"Showing",options:[5,10,20,50,100],modelValue:(0,s.SU)(z).limit,"onUpdate:modelValue":l[2]||(l[2]=e=>(0,s.SU)(z).limit=e)},null,8,["modelValue"])]),(0,a._)("div",_,[(0,a.Wm)(F,{required:"",filled:"","stack-label":"",square:"",dense:"",label:"Order Status",options:(0,s.SU)(x),modelValue:(0,s.SU)(z).status,"onUpdate:modelValue":l[3]||(l[3]=e=>(0,s.SU)(z).status=e)},null,8,["options","modelValue"])]),(0,a.Wm)(O,{type:"submit",label:"Filter",unelevated:"",color:"dark",loading:(0,s.SU)(V)},null,8,["loading"]),(0,a.Wm)(O,{type:"button",label:"Reset",unelevated:"",color:"dark",disable:(0,s.SU)(V),onClick:(0,d.iM)(Z,["prevent"])},null,8,["disable","onClick"])])])),_:1},8,["onSubmit"]),(0,a._)("div",b,[(0,a._)("div",v,[(0,a._)("table",q,[g,(0,s.SU)(t).ready?((0,a.wg)(),(0,a.iD)("tbody",S,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,s.SU)(t).data,((l,t)=>((0,a.wg)(),(0,a.iD)("tr",{key:t},[(0,a._)("td",null,[(0,a._)("div",null,(0,n.zw)(l.invoice_id),1)]),(0,a._)("td",null,(0,n.zw)(l.created_at),1),(0,a._)("td",null,[(0,a._)("div",null,(0,n.zw)(l.customer_name),1),(0,a._)("div",null,(0,n.zw)(l.customer_phone),1)]),(0,a._)("td",null,(0,n.zw)(e.$moneyIdr(l.order_total)),1),(0,a._)("td",null,[(0,a._)("div",k,(0,n.zw)(l.order_type.split("_").join(" ")),1)]),(0,a._)("td",null,(0,n.zw)(l.order_status),1),(0,a._)("td",null,[(0,a._)("div",h,[(0,a.Wm)(O,{round:"",icon:"edit",size:"sm",color:"blue",unelevated:"",to:{name:"OrderEdit",params:{id:l.id}}},null,8,["to"])])])])))),128)),(0,s.SU)(t).available?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("tr",w,y))])):(0,a.kq)("",!0)])]),(0,s.SU)(t).ready?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",f,[(0,a.Wm)(j,{size:"2em"})]))]),(0,s.SU)(t).count>(0,s.SU)(t).data.length?((0,a.wg)(),(0,a.iD)("div",W,[(0,a.Wm)(O,{loading:(0,s.SU)(t).loading,label:"Loadmore..",outline:"",size:"md",color:"primary","no-caps":"",onClick:D},null,8,["loading"])])):(0,a.kq)("",!0)])),_:1})}}};var z=t(4379),D=t(2165),Q=t(4554),Z=t(1481),x=t(5926),C=t(5269),F=t(4842),O=t(9396),I=t(8719),j=t(7518),B=t.n(j);const E=V,M=E;B()(V,"components",{QPage:z.Z,QBtn:D.Z,QIcon:Q.Z,QBreadcrumbs:Z.Z,QBreadcrumbsEl:x.Z,QForm:C.Z,QInput:F.Z,QSelect:O.Z,QSpinnerFacebook:I.Z})}}]);