<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "../../database/dexie.js";

const { params } = useRoute();
const { back } = useRouter();

const marca = ref(null);
const placa = ref(null);
const qtdPeca = ref(null);
const dataI = ref(null);

const message = ref(null);

onMounted(async () => {
  await getOneById();
})

const backPage = () => back();


const getOneById = async () => {
  try {
    const data = await db.dados.get(Number(params.id));

    if(data) {
      marca.value = data.marca
      placa.value = data.placa
      qtdPeca.value = data.qtdPecas
      dataI.value = data.data
    }

  } catch (error) {
    console.error(`Erro ao obter dados por ID ${id}:`, error);
  }
}


const editCompleteVehicle = async () => {
  if (!marca.value || !placa.value || !qtdPeca.value || !dataI.value) return;

try {
  await db.dados.update(Number(params.id), {
    marca: marca.value.toUpperCase(),
    placa: placa.value.toUpperCase(),
    qtdPecas: qtdPeca.value,
    data: dataI.value,
  });

  message.value = `Veículo < ${placa.value} > editado com sucesso!`
} catch (error) {
  console.error("Ouve um erro ao editar veículo:", error);
}
}

</script>

<template>
  <div class="EditVehicleCompletion">
    <div class="back">
      <div class="btnBack" @click="backPage">
        <i class="ri-arrow-left-line"></i>
      </div>
    </div>

    <div class="inputs">
      <input type="text" tabindex="1" v-model="marca" placeholder="marca" style="text-transform: uppercase;">
      <input type="text" tabindex="2" v-model="placa" placeholder="placa" style="text-transform: uppercase;">
      <input type="text" tabindex="3" v-model="qtdPeca" placeholder="qtd peças">

      <h3 class="message">{{ message }}</h3>
      <button class="btn" tabindex="4" @click="editCompleteVehicle">
        Editar Registro
        <i class="ri-edit-line"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.EditVehicleCompletion {
  padding: 24px;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  --height-inputs-buttons: 45px;
  --height-inputs: 280px;

  padding: 0 24px;
  background-color: var(--silver);
  min-height: var(--height-inputs);
  max-height: var(--height-inputs);
  border-radius: 4px;
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

.back {
  width: 100%;
  margin: 0 0 24px 0;
}

.btn:focus {
  color: var(--primary);
}

.btn, .btnBack {
  border: solid 1px var(--dark);

  margin-top: 24px;

  width: 100%;
  min-height: var(--height-inputs-buttons);
  max-height: var(--height-inputs-buttons);
  font-size: 2rem;
  border-radius: 4px;

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
</style>