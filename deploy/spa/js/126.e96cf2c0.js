"use strict";(self["webpackChunklbindobranch"]=self["webpackChunklbindobranch"]||[]).push([[126],{4126:(e,l,o)=>{o.r(l),o.d(l,{default:()=>I});var t=o(3673),n=o(8880),a=o(1959),d=o(3617),i=o(9582),u=o(6417);const m={class:"q-py-sm"},s=(0,t._)("div",{class:"row items-center q-gutter-x-md"},[(0,t._)("div",{class:"title"},"Add New Vehicle")],-1),p={class:"form-container"},c={class:"col q-pa-sm"},r={class:"card-box"},_={class:"q-gutter-y-md"},b=(0,t.Uk)(" No results "),y={class:"row q-gutter-sm"},g={class:"col"},w={class:"col"},v={class:"q-mt-xl",style:{"min-height":"200px"}},k={class:"flex justify-between items-center q-mb-md"},U=(0,t._)("div",{class:"text-md"},"Down Payments",-1),S={key:0,class:"text-center q-pt-lg"},V={class:"submit-block"},h={setup(e){const l=(0,d.oR)(),o=((0,i.yj)(),(0,i.tv)(),(0,a.Fl)((()=>l.getters["vehicle/getAllOptions"]))),h=(0,a.Fl)((()=>l.state.vehicle.vehicle_master));(0,t.wF)((()=>{h.value.length||l.dispatch("vehicle/getAll")}));const q=(0,a.qj)({sell_price:"",vehicle_id:"",booking_type:"Amount",booking_amount:"",down_payments:[{dp_type:"Amount",dp_amount:""}]});(0,t.YP)((()=>q.booking_type),(()=>{q.booking_amount=""}));const f=(0,a.Fl)((()=>l.state.loading)),W=()=>{q.vehicle_id?l.dispatch("vehicle/store",q):u.Z.create({type:"negative",message:"Produk tidak boleh kosong"})},x=["Percent","Amount"],A=((0,a.iH)(""),e=>{let l=h.value.find((l=>l.id==e));l&&(q.sell_price=l.price)}),Z=()=>{q.down_payments.push({dp_type:"Amount",dp_amount:""})},j=e=>{q.down_payments.splice(e,1)};return(e,l)=>{const d=(0,t.up)("q-breadcrumbs-el"),i=(0,t.up)("q-breadcrumbs"),u=(0,t.up)("q-item-section"),h=(0,t.up)("q-item"),P=(0,t.up)("q-select"),Q=(0,t.up)("money-formatter"),F=(0,t.up)("q-input"),D=(0,t.up)("q-btn"),B=(0,t.up)("q-list"),C=(0,t.up)("q-form"),I=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(I,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",m,[s,(0,t.Wm)(i,{class:"text-grey","active-color":"secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(d,{label:"Dashboard"}),(0,t.Wm)(d,{label:"Vehicles"}),(0,t.Wm)(d,{label:"New"})])),_:1})]),(0,t.Wm)(C,{onSubmit:(0,n.iM)(W,["prevent"])},{default:(0,t.w5)((()=>[(0,t._)("div",p,[(0,t._)("div",c,[(0,t._)("div",r,[(0,t._)("div",_,[(0,t.Wm)(P,{outlined:"",required:"",label:"Select Vehicle",modelValue:(0,a.SU)(q).vehicle_id,"onUpdate:modelValue":[l[0]||(l[0]=e=>(0,a.SU)(q).vehicle_id=e),A],options:(0,a.SU)(o),"map-options":"","emit-value":""},{"no-option":(0,t.w5)((()=>[(0,t.Wm)(h,null,{default:(0,t.w5)((()=>[(0,t.Wm)(u,{class:"text-grey"},{default:(0,t.w5)((()=>[b])),_:1})])),_:1})])),_:1},8,["modelValue","options"]),(0,t.Wm)(Q,{label:"Sell Price",required:"",outlined:"",modelValue:(0,a.SU)(q).sell_price,"onUpdate:modelValue":l[1]||(l[1]=e=>(0,a.SU)(q).sell_price=e)},null,8,["modelValue"]),(0,t._)("div",y,[(0,t._)("div",g,[(0,t.Wm)(P,{outlined:"",required:"",label:"Booking Fee Type",modelValue:(0,a.SU)(q).booking_type,"onUpdate:modelValue":l[2]||(l[2]=e=>(0,a.SU)(q).booking_type=e),options:x,"map-options":"","emit-value":""},null,8,["modelValue"])]),(0,t._)("div",w,["Amount"==(0,a.SU)(q).booking_type?((0,t.wg)(),(0,t.j4)(Q,{key:0,outlined:"",required:"",modelValue:(0,a.SU)(q).booking_amount,"onUpdate:modelValue":l[3]||(l[3]=e=>(0,a.SU)(q).booking_amount=e),label:"Booking Fee Amount"},null,8,["modelValue"])):((0,t.wg)(),(0,t.j4)(F,{key:1,outlined:"",required:"",modelValue:(0,a.SU)(q).booking_amount,"onUpdate:modelValue":l[4]||(l[4]=e=>(0,a.SU)(q).booking_amount=e),label:"Booking Fee Amount",mask:"##"},null,8,["modelValue"]))])])]),(0,t._)("div",v,[(0,t._)("div",k,[U,(0,t.Wm)(D,{label:"Add Down Payment Field",color:"primary",size:"12px",onClick:Z})]),(0,t._)("div",null,[(0,t.Wm)(B,null,{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,a.SU)(q).down_payments,((e,l)=>((0,t.wg)(),(0,t.j4)(h,{key:l},{default:(0,t.w5)((()=>[(0,t.Wm)(u,null,{default:(0,t.w5)((()=>[(0,t.Wm)(P,{outlined:"",required:"",label:"Down Payment Type",modelValue:(0,a.SU)(q).down_payments[l].dp_type,"onUpdate:modelValue":e=>(0,a.SU)(q).down_payments[l].dp_type=e,options:x,"map-options":"","emit-value":""},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024),(0,t.Wm)(u,{class:"col"},{default:(0,t.w5)((()=>["Amount"==(0,a.SU)(q).down_payments[l].dp_type?((0,t.wg)(),(0,t.j4)(Q,{key:0,outlined:"",required:"",modelValue:(0,a.SU)(q).down_payments[l].dp_amount,"onUpdate:modelValue":e=>(0,a.SU)(q).down_payments[l].dp_amount=e,label:"Down Payment Amount"},null,8,["modelValue","onUpdate:modelValue"])):((0,t.wg)(),(0,t.j4)(F,{key:1,outlined:"",required:"",modelValue:(0,a.SU)(q).down_payments[l].dp_amount,"onUpdate:modelValue":e=>(0,a.SU)(q).down_payments[l].dp_amount=e,label:"Down Payment Amount",mask:"##"},null,8,["modelValue","onUpdate:modelValue"]))])),_:2},1024),(0,t.Wm)(u,{side:""},{default:(0,t.w5)((()=>[(0,a.SU)(q).down_payments.length>1?((0,t.wg)(),(0,t.j4)(D,{key:0,icon:"delete",round:"",onClick:e=>j(l),color:"red",unelevated:"",size:"sm"},null,8,["onClick"])):(0,t.kq)("",!0)])),_:2},1024)])),_:2},1024)))),128))])),_:1}),(0,a.SU)(q).down_payments.length?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("div",S,"Tidak ada data"))])]),(0,t._)("div",V,[(0,t.Wm)(D,{padding:"6px 24px",loading:(0,a.SU)(f),type:"submit",label:"Submit",color:"primary",unelevated:""},null,8,["loading"]),(0,t.Wm)(D,{padding:"6px 24px",disable:(0,a.SU)(f),label:"Cancel",class:"bg-white",color:"primary",outline:"",to:"/vehicles"},null,8,["disable"])])])])])])),_:1},8,["onSubmit"])])),_:1})}}};var q=o(4379),f=o(1481),W=o(5926),x=o(5269),A=o(9396),Z=o(3414),j=o(2035),P=o(4842),Q=o(2165),F=o(7011),D=o(7518),B=o.n(D);const C=h,I=C;B()(h,"components",{QPage:q.Z,QBreadcrumbs:f.Z,QBreadcrumbsEl:W.Z,QForm:x.Z,QSelect:A.Z,QItem:Z.Z,QItemSection:j.Z,QInput:P.Z,QBtn:Q.Z,QList:F.Z})}}]);