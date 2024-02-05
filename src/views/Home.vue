<script setup>
import { ref, onMounted } from "vue";
import { db } from "../database/dexie.js";

const totalVehicles = ref(0);
const totalVehiclesWeek = ref(0);
const totalVehiclesMonth = ref(0);
const totalVehiclesDay = ref(0);
const totalVehiclesYear = ref(0);

onMounted(async () => {
  totalVehicles.value = await getTotalGeral();
  totalVehiclesWeek.value = await getTotalSemanal();
  totalVehiclesMonth.value = await getTotalMensal();
  totalVehiclesDay.value = await getTotalDiario();
  totalVehiclesYear.value = await getTotalAnual();
});

async function getTotalGeral() {
  const results = await db.dados.toArray();
  return results.length;
}

async function getTotalSemanal() {
  const hoje = new Date();
  const umaSemanaAtras = new Date(hoje);
  umaSemanaAtras.setDate(hoje.getDate() - 7);

  const results = await db.dados
    .where('data')
    .between(umaSemanaAtras.getTime(), hoje.getTime())
    .toArray();

  return results.length;
}

async function getTotalMensal() {
  const hoje = new Date();
  const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const results = await db.dados
    .where('data')
    .aboveOrEqual(primeiroDiaMes.getTime())
    .toArray();

  return results.length;
}

async function getTotalDiario() {
  const hoje = new Date();

  const results = await db.dados
    .where('data')
    .aboveOrEqual(hoje.setHours(0, 0, 0, 0))
    .toArray();

  return results.length;
}

async function getTotalAnual() {
  const hoje = new Date();
  const primeiroDiaAno = new Date(hoje.getFullYear(), 0, 1);

  const results = await db.dados
    .where('data')
    .aboveOrEqual(primeiroDiaAno.getTime())
    .toArray();

  return results.length;
}
</script>

<template>
  <div class="home">
    <div class="container">
      <div class="total">Diário <b>{{ totalVehiclesDay }}</b></div>
      <div class="total">Semanal <b>{{ totalVehiclesWeek }}</b></div>
      <div class="total">Mensal <b>{{ totalVehiclesMonth }}</b></div>
      <div class="total">Anual <b>{{ totalVehiclesYear }}</b></div>
      <div class="total">Geral <b>{{ totalVehicles }}</b></div>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  --height-home: calc(100vh - 60px);
  min-height: var(--height-home);
  max-height: var(--height-home);
  background-color: var(--white2);
  padding: 24px 0;

  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.container {
  --width-container: 80%;
  --height-container: 400px;

  min-width: var(--width-container);
  max-width: var(--width-container);
  min-height: var(--height-container);
  max-height: var(--height-container);
  background-color: var(--white);
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 12px;
  padding: 24px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.total {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  --width-height-total: 70px;
  min-width: var(--width-height-total);
  max-width: var(--width-height-total);
  min-height: var(--width-height-total);
  max-height: var(--width-height-total);

  background-color: var(--dark);
  color: var(--primary);
  font-weight: bold;
  border-radius: 8px;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border: solid 2px var(--primary);
}

.total > b {
  color: var(--white);
  font-size: 2.4rem;
  text-shadow: 1px 2px 0px var(--primary);
}
</style>
