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
    console.log(params.id)
    const data = await db.dados.get(Number(params.id));
    console.log(data)
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

</script>

<template>
  <div class="viewDetails">
    <div class="info">
      <span>Marca: <b>{{ currentVehicle.marca }}</b></span><br>
      <span>Placa: <b>{{ currentVehicle.placa }}</b></span><br>
      <span>Quantidade de Peças: <b>{{ currentVehicle.qtdPecas }}</b></span><br>
      <span>Data: <b>{{ currentVehicle.data }}</b></span><br>
    </div>

    <div class="actions">
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

.actions {
  padding: 24px;
}

.btn {
  --height-inputs-buttons: 45px;
  --height-inputs: 60px;
  border: solid 1px var(--dark);
  --width-btn: var(--height-inputs-buttons);
  min-width: var(--width-btn);
  padding: 8px 16px;
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

.btn-del {
  background-color: var(--danger);
}
</style>