"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[318],{4318:(e,l,a)=>{a.r(l),a.d(l,{default:()=>z});a(246);var t=a(3673),d=a(8880),u=a(2323),o=a(1959),s=a(3617),i=a(9582);const r={class:"q-py-sm"},m=(0,t._)("div",{class:"row items-center q-gutter-x-md"},[(0,t._)("div",{class:"title"},"Edit Lead")],-1),n={class:"card-box card-xl"},c={class:"q-gutter-y-sm"},p={class:"row justify-between items-center"},_={class:"row q-gutter-x-md q-py-md"},b=(0,t._)("div",{class:""},"Status",-1),w={class:"q-mt-md flex justify-end q-gutter-x-md"},f=(0,t._)("div",{class:"card-title q-pa-md flex justify-between items-center bordered"},[(0,t._)("h3",null,"Select Status")],-1),y={class:"q-pa-md flex justify-end bg-grey-1"},q={setup(e){const l=(0,i.yj)(),a=(0,s.oR)(),q=((0,i.tv)(),(0,o.qj)({id:"",customer_name:"",customer_phone:"",customer_email:"",status:"",description:"",lead_status_id:"",lead_type:""})),v=(0,o.iH)([]),g=(0,o.iH)(null),W=()=>{a.dispatch("lead/getById",l.params.id).then((e=>{if(200==e.status){let l=e.data.data.lead;v.value=e.data.data.statuses,q.id=l.id,q.customer_name=l.customer_name,q.customer_phone=l.customer_phone,q.customer_email=l.customer_email,q.description=l.description,q.lead_type=l.lead_type,q.lead_status_id=l.lead_status_id,g.value=l.status?l.status:null}}))};(0,t.wF)((()=>{W()}));const h=(0,o.iH)(!1),S=e=>{g.value=e,q.lead_status_id=e.id},U=()=>{a.dispatch("lead/update",q)};return(e,l)=>{const a=(0,t.up)("q-breadcrumbs-el"),s=(0,t.up)("q-breadcrumbs"),i=(0,t.up)("q-badge"),W=(0,t.up)("q-btn"),k=(0,t.up)("q-input"),V=(0,t.up)("q-form"),Q=(0,t.up)("q-separator"),Z=(0,t.up)("q-icon"),x=(0,t.up)("q-item-section"),C=(0,t.up)("q-item"),j=(0,t.up)("q-expansion-item"),I=(0,t.up)("q-list"),E=(0,t.up)("q-card"),B=(0,t.up)("q-dialog"),D=(0,t.up)("q-page"),H=(0,t.Q2)("close-popup");return(0,t.wg)(),(0,t.j4)(D,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",r,[m,(0,t.Wm)(s,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(a,{label:"Dashboard"}),(0,t.Wm)(a,{label:"Lead"}),(0,t.Wm)(a,{label:"Edit"})])),_:1})]),(0,t._)("div",n,[(0,t.Wm)(V,{onSubmit:(0,d.iM)(U,["prevent"])},{default:(0,t.w5)((()=>[(0,t._)("div",c,[(0,t._)("div",p,[(0,t._)("div",_,[b,(0,t.Wm)(i,{color:g.value?g.value.color:"orange"},{default:(0,t.w5)((()=>[(0,t.Uk)((0,u.zw)(g.value?g.value.label:"New"),1)])),_:1},8,["color"])]),(0,t.Wm)(W,{icon:"edit",label:"Edit Status",color:"blue",size:"sm",unelevated:"",onClick:l[0]||(l[0]=e=>h.value=!0)})]),(0,t.Wm)(k,{required:"",filled:"",label:"Customer Name",modelValue:(0,o.SU)(q).customer_name,"onUpdate:modelValue":l[1]||(l[1]=e=>(0,o.SU)(q).customer_name=e)},null,8,["modelValue"]),(0,t.Wm)(k,{required:"",filled:"",label:"Customer Phone",modelValue:(0,o.SU)(q).customer_phone,"onUpdate:modelValue":l[2]||(l[2]=e=>(0,o.SU)(q).customer_phone=e)},null,8,["modelValue"]),(0,t.Wm)(k,{required:"",filled:"",label:"Customer Email",modelValue:(0,o.SU)(q).customer_email,"onUpdate:modelValue":l[3]||(l[3]=e=>(0,o.SU)(q).customer_email=e)},null,8,["modelValue"]),(0,t.Wm)(k,{required:"",filled:"",label:"Lead Type",modelValue:(0,o.SU)(q).lead_type,"onUpdate:modelValue":l[4]||(l[4]=e=>(0,o.SU)(q).lead_type=e)},null,8,["modelValue"]),(0,t.Wm)(k,{required:"",filled:"",type:"textarea",modelValue:(0,o.SU)(q).description,"onUpdate:modelValue":l[5]||(l[5]=e=>(0,o.SU)(q).description=e),label:"Description"},null,8,["modelValue"])]),(0,t._)("div",w,[(0,t.Wm)(W,{label:"Cancel",type:"button",color:"primary",outline:"",to:{name:"LeadIndex"}}),(0,t.Wm)(W,{label:"Submit",type:"submit",color:"primary"})])])),_:1},8,["onSubmit"])]),(0,t.Wm)(B,{modelValue:h.value,"onUpdate:modelValue":l[6]||(l[6]=e=>h.value=e)},{default:(0,t.w5)((()=>[(0,t.Wm)(E,{class:"card-lg"},{default:(0,t.w5)((()=>[f,(0,t.Wm)(Q),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(v.value,((e,l)=>((0,t.wg)(),(0,t.j4)(I,{separator:"",key:l},{default:(0,t.w5)((()=>[e.childs.length?((0,t.wg)(),(0,t.j4)(j,{key:0,"expand-separator":"",separator:"",label:e.label},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e.childs,(e=>((0,t.wg)(),(0,t.j4)(C,{onClick:l=>S(e),clickable:"",key:e.id},{default:(0,t.w5)((()=>[(0,t.Wm)(x,{side:""},{default:(0,t.w5)((()=>[(0,t.Wm)(Z,{class:"cursor-pointer",name:(0,o.SU)(q).lead_status_id==e.id?"radio_button_checked":"radio_button_unchecked",color:(0,o.SU)(q).lead_status_id==e.id?"green":"grey-7"},null,8,["name","color"])])),_:2},1024),(0,t.Wm)(x,null,{default:(0,t.w5)((()=>[(0,t.Uk)((0,u.zw)(e.label),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:2},1032,["label"])):((0,t.wg)(),(0,t.j4)(C,{key:1,onClick:l=>S(e),clickable:""},{default:(0,t.w5)((()=>[(0,t.Wm)(x,{side:""},{default:(0,t.w5)((()=>[(0,t.Wm)(Z,{class:"cursor-pointer",name:(0,o.SU)(q).lead_status_id==e.id?"radio_button_checked":"radio_button_unchecked",color:(0,o.SU)(q).lead_status_id==e.id?"green":"grey-7"},null,8,["name","color"])])),_:2},1024),(0,t.Wm)(x,null,{default:(0,t.w5)((()=>[(0,t.Uk)((0,u.zw)(e.label),1)])),_:2},1024)])),_:2},1032,["onClick"]))])),_:2},1024)))),128)),(0,t._)("div",y,[(0,t.wy)((0,t.Wm)(W,{label:"Close",unelevated:"",color:"primary"},null,512),[[H]])])])),_:1})])),_:1},8,["modelValue"])])),_:1})}}};var v=a(4379),g=a(1481),W=a(5926),h=a(5269),S=a(9721),U=a(2165),k=a(4842),V=a(6778),Q=a(151),Z=a(5869),x=a(7011),C=a(4615),j=a(3414),I=a(2035),E=a(4554),B=a(677),D=a(7518),H=a.n(D);const L=q,z=L;H()(q,"components",{QPage:v.Z,QBreadcrumbs:g.Z,QBreadcrumbsEl:W.Z,QForm:h.Z,QBadge:S.Z,QBtn:U.Z,QInput:k.Z,QDialog:V.Z,QCard:Q.Z,QSeparator:Z.Z,QList:x.Z,QExpansionItem:C.Z,QItem:j.Z,QItemSection:I.Z,QIcon:E.Z}),H()(q,"directives",{ClosePopup:B.Z})}}]);