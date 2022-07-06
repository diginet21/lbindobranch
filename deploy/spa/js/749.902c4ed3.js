"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[749],{4749:(l,e,a)=>{a.r(e),a.d(e,{default:()=>E});a(9544);var t=a(3673),d=a(1959),u=a(2323),s=a(3617),n=a(821);const i={class:"q-py-sm"},c={class:"row items-center q-gutter-x-md"},o=(0,t._)("div",{class:"title"},"Lead Status",-1),r=(0,t._)("span",null,"Add Lead Status",-1),p={class:"card-column"},m={class:"table-responsive"},b={class:"table striped"},_=(0,t._)("thead",null,[(0,t._)("tr",null,[(0,t._)("th",null,"#"),(0,t._)("th",null,"Label"),(0,t._)("th",null,"Action")])],-1),v={class:"q-gutter-sm"},h={key:0},y=(0,t._)("td",{colspan:"3"},[(0,t._)("div",{class:"text-center"},"No data found")],-1),g=[y],S={class:"card-header"},k={class:"text-md"},w={class:"flex justify-end q-gutter-x-sm q-mt-md items-center"},q={setup(l){const e=(0,s.oR)(),a=(0,d.Fl)((()=>e.state.leadStatus.lead_status));(0,t.bv)((()=>{a.value.length||e.dispatch("leadStatus/getAll")}));const y=l=>{n.Z.create({title:"Yakin Akan menghapus data?",message:"Data yang dihapus tidak dapat dikembalikan",cancel:!0}).onOk((()=>{e.dispatch("leadStatus/destroy",l.id)}))},q=(0,d.iH)(!1),f=(0,d.iH)(!1),W=(0,d.qj)({type:"Add",id:"",label:""}),Z=()=>{W.type="Add",W.label="",q.value=!0},C=l=>{W.type="Edit",W.label=l.label,W.id=l.id,q.value=!0},Q=()=>{"Add"==W.type&&e.dispatch("leadStatus/store",W).then((()=>{e.dispatch("leadStatus/getAll"),q.value=!1})).finally((()=>f.value=!1)),"Edit"==W.type&&e.dispatch("leadStatus/update",W).then((()=>{e.dispatch("leadStatus/getAll"),q.value=!1})).finally((()=>f.value=!1))};return(l,e)=>{const s=(0,t.up)("q-icon"),n=(0,t.up)("q-btn"),f=(0,t.up)("q-breadcrumbs-el"),A=(0,t.up)("q-breadcrumbs"),x=(0,t.up)("q-input"),U=(0,t.up)("q-form"),D=(0,t.up)("q-card-section"),L=(0,t.up)("q-card"),V=(0,t.up)("q-dialog"),z=(0,t.up)("q-page"),j=(0,t.Q2)("close-popup");return(0,t.wg)(),(0,t.j4)(z,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",i,[(0,t._)("div",c,[o,(0,t.Wm)(n,{unelevated:"",color:"primary",padding:"2px 12px","no-caps":"",onClick:Z},{default:(0,t.w5)((()=>[(0,t.Wm)(s,{name:"add"}),r])),_:1})]),(0,t.Wm)(A,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{label:"Dashboard"}),(0,t.Wm)(f,{label:"Lead Status"})])),_:1})]),(0,t._)("div",p,[(0,t._)("div",m,[(0,t._)("table",b,[_,(0,t._)("tbody",null,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,d.SU)(a),((l,e)=>((0,t.wg)(),(0,t.iD)("tr",{key:l.id},[(0,t._)("td",null,(0,u.zw)(e+1),1),(0,t._)("td",null,(0,u.zw)(l.label),1),(0,t._)("td",null,[(0,t._)("div",v,[(0,t.Wm)(n,{round:"",icon:"delete",size:"sm",color:"red",unelevated:"",onClick:e=>y(l)},null,8,["onClick"]),(0,t.Wm)(n,{round:"",icon:"edit",size:"sm",color:"blue",unelevated:"",onClick:e=>C(l)},null,8,["onClick"])])])])))),128)),(0,d.SU)(a).length?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("tr",h,g))])])])]),(0,t.Wm)(V,{modelValue:q.value,"onUpdate:modelValue":e[1]||(e[1]=l=>q.value=l)},{default:(0,t.w5)((()=>[(0,t.Wm)(L,{class:"card-md"},{default:(0,t.w5)((()=>[(0,t._)("div",S,[(0,t._)("div",k,(0,u.zw)((0,d.SU)(W).type)+" Status Label",1)]),(0,t.Wm)(D,null,{default:(0,t.w5)((()=>[(0,t.Wm)(U,{onSubmit:Q},{default:(0,t.w5)((()=>[(0,t.Wm)(x,{label:"Status Label",modelValue:(0,d.SU)(W).label,"onUpdate:modelValue":e[0]||(e[0]=l=>(0,d.SU)(W).label=l),outlined:""},null,8,["modelValue"]),(0,t._)("div",w,[(0,t.wy)((0,t.Wm)(n,{label:"Cancel",outline:"",type:"button",color:"primary"},null,512),[[j]]),(0,t.Wm)(n,{label:"Submit",unelevated:"",type:"submit",color:"primary"})])])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})}}};var f=a(4379),W=a(2165),Z=a(4554),C=a(1481),Q=a(5926),A=a(6778),x=a(151),U=a(5589),D=a(5269),L=a(4842),V=a(677),z=a(7518),j=a.n(z);const B=q,E=B;j()(q,"components",{QPage:f.Z,QBtn:W.Z,QIcon:Z.Z,QBreadcrumbs:C.Z,QBreadcrumbsEl:Q.Z,QDialog:A.Z,QCard:x.Z,QCardSection:U.Z,QForm:D.Z,QInput:L.Z}),j()(q,"directives",{ClosePopup:V.Z})}}]);