<script setup>
import { ref, onMounted } from "vue";
import { db } from "../database/dexie.js";

const search = ref("")
const listAll = ref([])
const csvContent = ref("");

onMounted(async () => {
  listAll.value = await searchAll();
  generateCSVContent();
})

////////

function generateCSVContent() {
  const header = Object.keys(listAll.value[0]).join(',') + '\n';
  const rows = listAll.value.map(item => {
    if (item.data) {
      item.data = formatDate(item.data);
    }
    return Object.values(item).join(',');
  }).join('\n');
  csvContent.value = header + rows;
}

function shareOnWhatsApp() {
  const mensagem = "Confira os dados do dia:\n\n\n" + csvContent.value;
  window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(mensagem));
}

////////



async function searchAll() {
  try {
    const results = await db.dados.toArray();

    return results
  } catch (error) {
    console.error(`Error while searching data: ${error.stack || error}`);
  }
}

async function searchFn() {
  try {
    const timestamp = Date.parse(search.value);
   
    if (isNaN(timestamp)) {
      listAll.value = await db.dados
          .where('marca')
          .startsWithIgnoreCase(search.value)
          .or('placa')
          .startsWithIgnoreCase(search.value)
          .toArray();
      return;
    }

    listAll.value = await db.dados
          .where('data')
          .aboveOrEqual(timestamp)
          .toArray();

  } catch (error) {
    console.error(`Error while searching data: ${error.stack || error}`);
  }
}


const formatDate = (data) => {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(data))
}

</script>

<template>
  <div class="VehicleCompletion">
    <div class="inputs">
      <input type="text" tabindex="1" v-model="search" @keyup="searchFn" placeholder="digite a placa/modelo/data" style="text-transform: uppercase;">
      <button class="btn" tabindex="2" @click="searchFn">
        <i class="ri-search-line"></i>
      </button>
    </div>

    <ul class="list" v-if="listAll.length > 0">
      <span>Search</span>
      <li class="item-list" v-for="item in listAll" :key="item.id">
        <span class="marca">{{item.marca}}</span>
        <span class="placa">{{item.placa}}</span>
        <span class="qtd-peca">{{item.qtdPecas}}</span>
        <span class="dataInput">{{formatDate(item.data)}}</span>
      </li>
    </ul>

    <div class="dataEmpty" v-else>
      Nenhum veículo adicionado.
    </div>

    <div class="btnShared">
      <i class="ri-share-forward-2-line"></i>
    </div>
  </div>
</template>

<style scoped>
.VehicleCompletion {
  --height-VehicleCompletion: calc(100vh - 60px);
  min-height: var(--height-VehicleCompletion);
  max-height: var(--height-VehicleCompletion);
  overflow: hidden;
}

.inputs {
  display: flex;
  align-items: center;
  gap: 4px;

  --height-inputs-buttons: 45px;
  --height-inputs: 60px;

  padding: 0 24px;
  background-color: var(--silver);
  min-height: var(--height-inputs);
  max-height: var(--height-inputs);
}

.inputs > input {
  flex: 1;
  width: 100%;
  min-height: var(--height-inputs-buttons);
  max-height: var(--height-inputs-buttons);

  border-radius: 4px;
  border: solid 1px var(--silver3);
  padding: 0 14px;
  font-size: 1.4rem;
}

.inputs > input::placeholder {
  text-transform: lowercase;
}

.inputs > input:focus, .btn:focus {
  outline: solid 2px var(--primary);
}

.btn:focus {
  color: var(--primary);
}

.btn {
  border: solid 1px var(--dark);
  --width-btn: var(--height-inputs-buttons);
  min-width: var(--width-btn);
  max-width: var(--width-btn);
  min-height: var(--height-inputs-buttons);
  max-height: var(--height-inputs-buttons);
  font-size: 2rem;
  border-radius: 4px;

  background-color: var(--dark);
  color: var(--white);
}

.btn:hover {
  transition: opacity ease .4s;
  opacity: .95;
  cursor: pointer;
}

.btn:active {
  scale: .95;
}

.list {
  --height-list: calc(100vh - 120px);
  --width-list: 100%;

  min-width: var(--width-list);
  max-width: var(--width-list);
  min-height: var(--height-list);
  max-height: var(--height-list);
  overflow-y: auto;
  scroll-behavior: smooth;

  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 0;
}

.item-list {
  position: relative;
  background-color: var(--white2);
  --height-item-list: 40px;
  min-height: var(--height-item-list);
  max-height: var(--height-item-list);


  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  gap: 4px;
  --font-size-span: 1.4rem;
  --font-size-before: 1rem;
  --color-before: var(--dark4);
}

.item-list > span {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: var(--font-size-span);
}

.marca {
  position: relative;
  justify-content: flex-start;
}

.marca::before {
  content: 'Marca';
  position: absolute;
  top: -14px;
  left: 0;
  font-weight: normal;
  font-size: var(--font-size-before);
  color: var(--color-before);
}

.placa {
  position: relative;
  justify-content: flex-start;
}

.placa::before {
  content: 'Placa';
  position: absolute;
  top: -14px;
  left: 0;
  font-weight: normal;
  font-size: var(--font-size-before);
  color: var(--color-before);
}

.qtd-peca {
  position: relative;
  justify-content: flex-start;
}

.qtd-peca::before {
  content: 'Quantidade de peças';
  position: absolute;
  top: -14px;
  left: 0;
  font-weight: normal;
  font-size: var(--font-size-before);
  color: var(--color-before);
}

.dataInput {
  position: absolute;
  bottom: 4px;
  right: 24px;
  font-size: 1.2rem !important;
  color: var(--color-before);
}

.btnShared {
  position: absolute;
  bottom: 24px;
  right: 24px;

  background-color: var(--dark);
  color: var(--primary);
  --width-height-btnShared: 40px;
  width: var(--width-height-btnShared);
  height: var(--width-height-btnShared);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  font-size: 2.6rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.dataEmpty {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
  font-size: 1.8rem;
}
</style>