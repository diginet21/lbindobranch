"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[311],{7311:(a,e,l)=>{l.r(e),l.d(e,{default:()=>Z});l(5363);var t=l(3673),n=l(1959),d=l(2323),s=l(3617),i=l(2270);const c={class:"q-py-sm"},r={class:"row items-center q-gutter-x-md"},u=(0,t._)("div",{class:"title"},"Services",-1),o=(0,t._)("span",null,"New Services",-1),p={class:"card-column"},m={class:"table-responsive"},_={class:"table striped"},g=(0,t._)("thead",null,[(0,t._)("tr",null,[(0,t._)("th",null,"#"),(0,t._)("th",null,"Title"),(0,t._)("th",null,"Default Price"),(0,t._)("th",null,"Sell Price"),(0,t._)("th",null,"Action")])],-1),b={class:"q-gutter-sm"},v={key:0},h=(0,t._)("td",{colspan:"6"},[(0,t._)("div",{class:"text-center q-pa-xs"},"No data found")],-1),k=[h],y={key:0,class:"q-pa-md text-center"},w={setup(a){const e=(0,s.oR)(),l=(0,n.Fl)((()=>e.state.layanan.main_data)),h=(0,n.Fl)((()=>e.state.layanan.master_data));(0,t.bv)((()=>{l.value.data.length||e.dispatch("layanan/getIndex"),h.value.length||e.dispatch("layanan/getMaster")}));const w=a=>"Rp "+a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."),q=a=>{i.Z.create({title:"Yakin Akan menghapus data?",message:"Data yang dihapus tidak dapat dikembalikan",cancel:!0}).onOk((()=>{e.dispatch("layanan/destroy",a.id)}))},S=(0,n.Fl)((()=>e.state.loading)),f=()=>{e.dispatch("layanan/paginateData",{take:l.value.limit,skip:l.value.data.length})};return(a,e)=>{const s=(0,t.up)("q-icon"),i=(0,t.up)("q-btn"),h=(0,t.up)("q-breadcrumbs-el"),x=(0,t.up)("q-breadcrumbs"),D=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(D,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",c,[(0,t._)("div",r,[u,(0,t.Wm)(i,{unelevated:"",color:"primary",padding:"2px 12px","no-caps":"",to:{name:"LayananCreate"}},{default:(0,t.w5)((()=>[(0,t.Wm)(s,{name:"add"}),o])),_:1})]),(0,t.Wm)(x,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(h,{label:"Dashboard"}),(0,t.Wm)(h,{label:"Services"})])),_:1})]),(0,t._)("div",p,[(0,t._)("div",m,[(0,t._)("table",_,[g,(0,t._)("tbody",null,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,n.SU)(l).data,((a,e)=>((0,t.wg)(),(0,t.iD)("tr",{key:e},[(0,t._)("td",null,(0,d.zw)(e+1),1),(0,t._)("td",null,(0,d.zw)(a.title),1),(0,t._)("td",null,(0,d.zw)(w(a.default_price)),1),(0,t._)("td",null,(0,d.zw)(w(a.sell_price)),1),(0,t._)("td",null,[(0,t._)("div",b,[(0,t.Wm)(i,{round:"",icon:"delete",size:"sm",color:"red",unelevated:"",onClick:e=>q(a)},null,8,["onClick"]),(0,t.Wm)(i,{round:"",icon:"edit",size:"sm",color:"blue",unelevated:"",to:{name:"LayananEdit",params:{id:a.id}}},null,8,["to"])])])])))),128)),(0,n.SU)(l).available?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("tr",v,k))])])])]),(0,n.SU)(l).count>(0,n.SU)(l).data.length?((0,t.wg)(),(0,t.iD)("div",y,[(0,t.Wm)(i,{loading:(0,n.SU)(S),label:"Loadmore..",outline:"",size:"md",color:"primary","no-caps":"",onClick:f},null,8,["loading"])])):(0,t.kq)("",!0)])),_:1})}}};var q=l(4379),S=l(2165),f=l(4554),x=l(1481),D=l(5926),W=l(7518),z=l.n(W);const C=w,Z=C;z()(w,"components",{QPage:q.Z,QBtn:S.Z,QIcon:f.Z,QBreadcrumbs:x.Z,QBreadcrumbsEl:D.Z})}}]);