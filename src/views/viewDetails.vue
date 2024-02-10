<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "../database/dexie.js";

const { params } = useRoute();
const { back } = useRouter();

const currentVehicle = ref({})

onMounted(async () => {
  await getOneById();
})

const getOneById = async () => {
  try {
    const data = await db.dados.get(Number(params.id));
    currentVehicle.value = data;
  } catch (error) {
    console.error(`Erro ao obter dados por ID ${id}:`, error);
  }
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

const formatDate = (data) => {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(data));
}


</script>

<template>
  <div class="viewDetails">
    <div class="info" v-if="currentVehicle.marca">
      <span>Marca: <b>{{ currentVehicle.marca }}</b></span><br>
      <span>Placa: <b>{{ currentVehicle.placa }}</b></span><br>
      <span>Quantidade de Peças: <b>{{ currentVehicle.qtdPecas }}</b></span><br>
      <span>Data: <b>{{ formatDate(currentVehicle.data) }}</b></span><br>
    </div>

    <div class="actions">
      <button class="btn btn-update">
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

.btn {
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

.btn:hover {
  transition: opacity ease .4s;
  opacity: .95;
  cursor: pointer;
}

.btn:active {
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