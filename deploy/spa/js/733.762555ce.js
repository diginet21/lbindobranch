"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[733],{6733:(e,t,l)=>{l.r(t),l.d(t,{default:()=>U});var a=l(3673),n=l(1959),d=l(2323),s=l(3617),i=l(6611);const r={class:"q-py-sm"},u={class:"row items-center q-gutter-x-md"},c=(0,a._)("div",{class:"title"},"Events",-1),o=(0,a._)("span",null,"New Event",-1),_={class:"card-column"},p={class:"table-responsive"},m={class:"table striped"},v=(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",null,"#"),(0,a._)("th",null,"Image"),(0,a._)("th",null,"Title"),(0,a._)("th",null,"Time"),(0,a._)("th",null,"Approved"),(0,a._)("th",null,"Category"),(0,a._)("th",{align:"right"},"Action")])],-1),g={key:0},b=(0,a._)("td",null,"Start :",-1),h=(0,a._)("td",null,"End :",-1),k={align:"right"},w={class:"q-gutter-sm"},y={key:0,class:"text-center q-py-md"},q={key:1,class:"text-center full-width q-pa-md"},f={setup(e){const t=(0,s.oR)(),l=(0,n.Fl)((()=>t.state.event.events));(0,a.bv)((()=>{l.value.length||t.dispatch("event/getAllEvent")}));const f=e=>{i.Z.create({title:"Yakin Akan menghapus data?",message:"Data yang dihapus tidak dapat dikembalikan",cancel:!0}).onOk((()=>{t.dispatch("event/destroy",e.id)}))};return(e,t)=>{const s=(0,a.up)("q-icon"),i=(0,a.up)("q-btn"),z=(0,a.up)("q-breadcrumbs-el"),E=(0,a.up)("q-breadcrumbs"),W=(0,a.up)("q-img"),Z=(0,a.up)("q-spinner-facebook"),x=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(x,{padding:""},{default:(0,a.w5)((()=>[(0,a._)("div",r,[(0,a._)("div",u,[c,(0,a.Wm)(i,{unelevated:"",color:"primary",padding:"2px 12px","no-caps":"",to:{name:"EventCreate"}},{default:(0,a.w5)((()=>[(0,a.Wm)(s,{name:"add"}),o])),_:1})]),(0,a.Wm)(E,{class:"text-grey","active-color":"secondary"},{default:(0,a.w5)((()=>[(0,a.Wm)(z,{label:"Dashboard"}),(0,a.Wm)(z,{label:"Events"})])),_:1})]),(0,a._)("div",_,[(0,a._)("div",p,[(0,a._)("table",m,[v,(0,n.SU)(l).ready?((0,a.wg)(),(0,a.iD)("tbody",g,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,n.SU)(l).data,((e,t)=>((0,a.wg)(),(0,a.iD)("tr",{key:e.id},[(0,a._)("td",null,(0,d.zw)(t+1),1),(0,a._)("td",null,[e.asset?((0,a.wg)(),(0,a.j4)(W,{key:0,src:e.asset.src,ratio:1.5,width:"70px"},null,8,["src"])):(0,a.kq)("",!0)]),(0,a._)("td",null,(0,d.zw)(e.title),1),(0,a._)("td",null,[(0,a._)("table",null,[(0,a._)("tr",null,[b,(0,a._)("td",null,(0,d.zw)(e.start_at),1)]),(0,a._)("tr",null,[h,(0,a._)("td",null,(0,d.zw)(e.end_at),1)])])]),(0,a._)("td",null,(0,d.zw)(e.is_active?"Yes":"No"),1),(0,a._)("td",null,(0,d.zw)(e.category),1),(0,a._)("td",k,[(0,a._)("div",w,[(0,a.Wm)(i,{round:"",icon:"delete",size:"sm",color:"red",unelevated:"",onClick:t=>f(e)},null,8,["onClick"]),(0,a.Wm)(i,{round:"",icon:"edit",size:"sm",color:"blue",unelevated:"",to:{name:"EventEdit",params:{id:e.id}}},null,8,["to"])])])])))),128))])):(0,a.kq)("",!0)]),(0,n.SU)(l).ready?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",y,[(0,a.Wm)(Z,{size:"2em"})])),(0,n.SU)(l).available?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",q,"No data found"))])])])),_:1})}}};var z=l(4379),E=l(2165),W=l(4554),Z=l(1481),x=l(5926),D=l(4027),Q=l(8719),C=l(7518),S=l.n(C);const A=f,U=A;S()(f,"components",{QPage:z.Z,QBtn:E.Z,QIcon:W.Z,QBreadcrumbs:Z.Z,QBreadcrumbsEl:x.Z,QImg:D.Z,QSpinnerFacebook:Q.Z})}}]);