"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[898],{8898:(e,a,n)=>{n.r(a),n.d(a,{default:()=>A});var t=n(3673),l=n(1959),s=n(2323),d=n(3617),r=n(2270);const i={class:"q-py-sm"},c={class:"row items-center q-gutter-x-md"},o=(0,t._)("div",{class:"title"},"Banner",-1),u=(0,t._)("span",null,"New Banner",-1),p={class:"card-column"},m={class:"table-responsive"},b={class:"table striped"},g=(0,t._)("thead",null,[(0,t._)("tr",null,[(0,t._)("th",null,"#"),(0,t._)("th",null,"Image"),(0,t._)("th",{align:"left"},"Title"),(0,t._)("th",{align:"left"},"Type"),(0,t._)("th",null,"Action")])],-1),_={key:0},k={align:"left"},h={align:"left"},v={align:"left"},w={class:"q-gutter-sm"},y={key:0},q=(0,t._)("td",{colspan:"6"},[(0,t._)("div",{class:"text-center q-pa-xs"},"No data found")],-1),f=[q],B={key:0,class:"text-center q-py-md"},x={setup(e){const a=(0,d.oR)(),n=(0,l.Fl)((()=>a.state.banner.banners));(0,t.bv)((()=>{n.value.length||a.dispatch("banner/getBanners")}));const q=e=>{r.Z.create({title:"Yakin Akan menghapus data?",message:"Data yang dihapus tidak dapat dikembalikan",cancel:!0}).onOk((()=>{a.dispatch("banner/destroy",e.id)}))};return(e,a)=>{const d=(0,t.up)("q-icon"),r=(0,t.up)("q-btn"),x=(0,t.up)("q-breadcrumbs-el"),W=(0,t.up)("q-breadcrumbs"),Z=(0,t.up)("q-img"),D=(0,t.up)("q-spinner-facebook"),Q=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(Q,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",i,[(0,t._)("div",c,[o,(0,t.Wm)(r,{unelevated:"",color:"primary",padding:"2px 12px","no-caps":"",to:{name:"BannerCreate"}},{default:(0,t.w5)((()=>[(0,t.Wm)(d,{name:"add"}),u])),_:1})]),(0,t.Wm)(W,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(x,{label:"Dashboard"}),(0,t.Wm)(x,{label:"Banner"})])),_:1})]),(0,t._)("div",p,[(0,t._)("div",m,[(0,t._)("table",b,[g,(0,l.SU)(n).ready?((0,t.wg)(),(0,t.iD)("tbody",_,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,l.SU)(n).data,((e,a)=>((0,t.wg)(),(0,t.iD)("tr",{key:e.id},[(0,t._)("td",null,(0,s.zw)(a+1),1),(0,t._)("td",k,[e.asset?((0,t.wg)(),(0,t.j4)(Z,{key:0,src:e.asset.src,ratio:1.5,width:"70px"},null,8,["src"])):(0,t.kq)("",!0)]),(0,t._)("td",h,(0,s.zw)(e.title),1),(0,t._)("td",v,(0,s.zw)(e.banner_type),1),(0,t._)("td",null,[(0,t._)("div",w,[(0,t.Wm)(r,{round:"",icon:"delete",size:"sm",color:"red",unelevated:"",onClick:a=>q(e)},null,8,["onClick"]),(0,t.Wm)(r,{round:"",icon:"edit",size:"sm",color:"blue",unelevated:"",to:{name:"BannerEdit",params:{id:e.id}}},null,8,["to"])])])])))),128)),(0,l.SU)(n).available?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("tr",y,f))])):(0,t.kq)("",!0)]),(0,l.SU)(n).ready?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("div",B,[(0,t.Wm)(D,{size:"2em"})]))])])])),_:1})}}};var W=n(4379),Z=n(2165),D=n(4554),Q=n(1481),z=n(5926),C=n(4027),S=n(8719),U=n(7518),I=n.n(U);const j=x,A=j;I()(x,"components",{QPage:W.Z,QBtn:Z.Z,QIcon:D.Z,QBreadcrumbs:Q.Z,QBreadcrumbsEl:z.Z,QImg:C.Z,QSpinnerFacebook:S.Z})}}]);