import{d as s}from"./dexie-SNI3UijA.js";import{_ as D,r as o,o as y,a as b,c as p,b as e,d as n,t as l}from"./index-DyPjF4EF.js";const f={class:"home"},T={class:"container"},A={class:"total"},V={class:"total"},M={class:"total"},j={class:"total"},x={class:"total"},E={__name:"Home",setup(S){const r=o(0),c=o(0),i=o(0),u=o(0),d=o(0);y(async()=>{r.value=await _(),c.value=await w(),i.value=await v(),u.value=await m(),d.value=await g()});async function _(){return(await s.dados.toArray()).length}async function w(){const t=new Date,a=new Date(t);return a.setDate(t.getDate()-7),(await s.dados.where("data").between(a.getTime(),t.getTime()).toArray()).length}async function v(){const t=new Date,a=new Date(t.getFullYear(),t.getMonth(),1);return(await s.dados.where("data").aboveOrEqual(a.getTime()).toArray()).length}async function m(){const t=new Date;return(await s.dados.where("data").aboveOrEqual(t.setHours(0,0,0,0)).toArray()).length}async function g(){const t=new Date,a=new Date(t.getFullYear(),0,1);return(await s.dados.where("data").aboveOrEqual(a.getTime()).toArray()).length}return(t,a)=>(b(),p("div",f,[e("div",T,[e("div",A,[n("Diário "),e("b",null,l(u.value),1)]),e("div",V,[n("Semanal "),e("b",null,l(c.value),1)]),e("div",M,[n("Mensal "),e("b",null,l(i.value),1)]),e("div",j,[n("Anual "),e("b",null,l(d.value),1)]),e("div",x,[n("Geral "),e("b",null,l(r.value),1)])])]))}},B=D(E,[["__scopeId","data-v-b2e4a87e"]]);export{B as default};