<script setup>
import { deleteDataBase } from "../database/dexie.js";

const deleteAllDatabase = async () => {
  const conf = confirm("Deletar base de dados.")
  
  if(conf) {
    const result = await deleteDataBase();
    alert(result);
  }
}
</script>
<template>
  <div class="about">
    <h1>Versão: 1.0.0</h1>
    <hr>
    <br><br>
    <button class="btn" @click="deleteAllDatabase">Deletar Base de Dados</button>
  </div>
</template>

<style scoped>
.about {
  padding: 24px;
}

.btn:focus {
  color: var(--primary);
}

.btn {
  border: solid 1px var(--dark);
  font-size: 1.6rem;
  font-weight: bold;
  border-radius: 4px;
  padding: 8px 16px;

  background-color: var(--danger);
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
</style>