<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "../database/dexie.js";

const { params } = useRoute();
const { back, push } = useRouter();

const currentVehicle = ref({})

onMounted(async () => {
  await getOneById();
})


const backPage = () => back();

const getOneById = async () => {
  try {
    const data = await db.dados.get(Number(params.id));
    currentVehicle.value = data;
  } catch (error) {
    console.error(`Erro ao obter dados por ID ${id}:`, error);
  }
}

async function EditVehicleCompletion() {
  push(`/EditVehicleCompletion/${Number(params.id)}`)
}

async function deleteDataById(id) {
  const confirmDelete = confirm("Deseja realmente deletar essa entrada?");

  if(confirmDelete) {
    try {
      await db.dados.where('id').equals(id).delete();
      alert("Deletado com sucesso!");
      back();
    } catch (error) {
      console.error(`Erro ao excluir dados por ID ${id}:`, error);
    }
  }
}

</script>

<template>
  <div class="viewDetails">
    
    <div class="info" v-if="currentVehicle.marca">
      <div class="back">
        <div class="btnBack" @click="backPage">
          <i class="ri-arrow-left-line"></i>
        </div>
      </div>
      
      <span>Marca: <b>{{ currentVehicle.marca }}</b></span><br>
      <span>Placa: <b>{{ currentVehicle.placa }}</b></span><br>
      <span>Quantidade de Peças: <b>{{ currentVehicle.qtdPecas }}</b></span><br>
      <span>Data: <b>{{ currentVehicle.data }}</b></span><br>
    </div>

    <div class="actions">
      <button class="btn btn-update" @click="EditVehicleCompletion">
        Editar
      </button>
      <button class="btn btn-del" @click="deleteDataById(currentVehicle.id)">
        deletar
      </button>
    </div>
  </div>
</template>

<style scoped>
.info {
  padding: 24px;
}

.info > span {
  font-size: 1.6rem;
}

.actions {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back {
  width: 100%;
  margin: 0 0 24px 0;
}

.btn, .btnBack {
  --height-inputs-buttons: 45px;
  --height-inputs: 60px;
  border: solid 1px transparent;
  --width-btn: var(--height-inputs-buttons);
  min-width: var(--width-btn);
  padding: 4px 16px;
  min-height: var(--height-inputs-buttons);
  max-height: var(--height-inputs-buttons);
  font-size: 2rem;
  font-weight: bold;
  border-radius: 4px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: var(--dark);
  color: var(--white);
}
.btnBack {
  --width-height-back-buttons: 45px;
  min-width: var(--width-height-back-buttons) !important;
  max-width: var(--width-height-back-buttons) !important;
  min-height: var(--width-height-back-buttons) !important;
  max-height: var(--width-height-back-buttons) !important;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--white);
  color: var(--dark);
  cursor: pointer;
}


.btn:hover, .btnBack:hover {
  transition: opacity ease .4s;
  opacity: .95;
  cursor: pointer;
}

.btn:active, .btnBack:active {
  scale: .95;
}

.btn-del {
  background-color: var(--danger);
}

.btn-update {
  background-color: var(--alert);
  color: var(--dark);
}
</style>