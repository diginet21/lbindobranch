"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[898],{8898:(e,a,n)=>{n.r(a),n.d(a,{default:()=>D});var t=n(3673),l=n(1959),s=n(2323),d=n(3617),r=n(2270);const i={class:"q-py-sm"},c={class:"row items-center q-gutter-x-md"},u=(0,t._)("div",{class:"title"},"Banner",-1),o=(0,t._)("span",null,"New Banner",-1),p={class:"card-column"},b={class:"table-responsive"},m={class:"table striped"},g=(0,t._)("thead",null,[(0,t._)("tr",null,[(0,t._)("th",null,"#"),(0,t._)("th",null,"Image"),(0,t._)("th",{align:"left"},"Title"),(0,t._)("th",{align:"left"},"Type"),(0,t._)("th",null,"Action")])],-1),_={align:"left"},h={align:"left"},k={align:"left"},v={class:"q-gutter-sm"},w={key:0,class:"text-center full-width q-py-lg bg-grey-1"},y={setup(e){const a=(0,d.oR)(),n=(0,l.Fl)((()=>a.state.banner.banners));(0,t.bv)((()=>{n.value.length||a.dispatch("banner/getBanners")}));const y=e=>{r.Z.create({title:"Yakin Akan menghapus data?",message:"Data yang dihapus tidak dapat dikembalikan",cancel:!0}).onOk((()=>{a.dispatch("banner/destroy",e.id)}))};return(e,a)=>{const d=(0,t.up)("q-icon"),r=(0,t.up)("q-btn"),f=(0,t.up)("q-breadcrumbs-el"),q=(0,t.up)("q-breadcrumbs"),B=(0,t.up)("q-img"),W=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(W,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",i,[(0,t._)("div",c,[u,(0,t.Wm)(r,{unelevated:"",color:"primary",padding:"2px 12px","no-caps":"",to:{name:"BannerCreate"}},{default:(0,t.w5)((()=>[(0,t.Wm)(d,{name:"add"}),o])),_:1})]),(0,t.Wm)(q,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{label:"Dashboard"}),(0,t.Wm)(f,{label:"Banner"})])),_:1})]),(0,t._)("div",p,[(0,t._)("div",b,[(0,t._)("table",m,[g,(0,t._)("tbody",null,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,l.SU)(n).data,((e,a)=>((0,t.wg)(),(0,t.iD)("tr",{key:e.id},[(0,t._)("td",null,(0,s.zw)(a+1),1),(0,t._)("td",_,[e.asset?((0,t.wg)(),(0,t.j4)(B,{key:0,src:e.asset.src,ratio:1.5,width:"70px"},null,8,["src"])):(0,t.kq)("",!0)]),(0,t._)("td",h,(0,s.zw)(e.title),1),(0,t._)("td",k,(0,s.zw)(e.banner_type),1),(0,t._)("td",null,[(0,t._)("div",v,[(0,t.Wm)(r,{round:"",icon:"delete",size:"sm",color:"red",unelevated:"",onClick:a=>y(e)},null,8,["onClick"]),(0,t.Wm)(r,{round:"",icon:"edit",size:"sm",color:"blue",unelevated:"",to:{name:"BannerEdit",params:{id:e.id}}},null,8,["to"])])])])))),128))])]),(0,l.SU)(n).available?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("div",w,"Tidak ada data"))])])])),_:1})}}};var f=n(4379),q=n(2165),B=n(4554),W=n(1481),Z=n(5926),x=n(4027),Q=n(7518),z=n.n(Q);const C=y,D=C;z()(y,"components",{QPage:f.Z,QBtn:q.Z,QIcon:B.Z,QBreadcrumbs:W.Z,QBreadcrumbsEl:Z.Z,QImg:x.Z})}}]);