import{_ as v,r as u,o as y,a as r,c,b as t,w as f,v as w,F as g,e as b,t as l,p as k,f as x}from"./index-5ZBYzHjB.js";import{d as i}from"./dexie-SNI3UijA.js";const h=n=>(k("data-v-6ac06f64"),n=n(),x(),n),I={class:"VehicleCompletion"},S={class:"inputs"},D=h(()=>t("i",{class:"ri-search-line"},null,-1)),A=[D],E={key:0,class:"list"},V={class:"marca"},B={class:"placa"},C={class:"qtd-peca"},F={class:"dataInput"},N={key:1,class:"dataEmpty"},q=h(()=>t("div",{class:"btnShared"},[t("i",{class:"ri-share-forward-2-line"})],-1)),M={__name:"SearchVehicle",setup(n){const s=u(""),o=u([]);y(async()=>{o.value=await _()});async function _(){try{return await i.dados.toArray()}catch(a){console.error(`Error while searching data: ${a.stack||a}`)}}async function d(){try{const a=Date.parse(s.value);if(isNaN(a)){o.value=await i.dados.where("marca").startsWithIgnoreCase(s.value).or("placa").startsWithIgnoreCase(s.value).toArray();return}o.value=await i.dados.where("data").aboveOrEqual(a).toArray()}catch(a){console.error(`Error while searching data: ${a.stack||a}`)}}const m=a=>new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(new Date(a));return(a,p)=>(r(),c("div",I,[t("div",S,[f(t("input",{type:"text",tabindex:"1","onUpdate:modelValue":p[0]||(p[0]=e=>s.value=e),onKeyup:d,placeholder:"digite a placa/modelo/data",style:{"text-transform":"uppercase"}},null,544),[[w,s.value]]),t("button",{class:"btn",tabindex:"2",onClick:d},A)]),o.value.length>0?(r(),c("ul",E,[(r(!0),c(g,null,b(o.value,e=>(r(),c("li",{class:"item-list",key:e.id},[t("span",V,l(e.marca),1),t("span",B,l(e.placa),1),t("span",C,l(e.qtdPecas),1),t("span",F,l(m(e.data)),1)]))),128))])):(r(),c("div",N," Nenhum veículo adicionado. ")),q]))}},$=v(M,[["__scopeId","data-v-6ac06f64"]]);export{$ as default};