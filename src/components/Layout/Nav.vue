<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav class="nav">
    <RouterLink to="/" class="nav-link" exact-active-class="active">Ínicio</RouterLink>
    <RouterLink to="/VehicleCompletion" class="nav-link" exact-active-class="active">Finalizar Veículo</RouterLink>
    <RouterLink to="/SearchVehicle" class="nav-link" exact-active-class="active">Buscar Veículo</RouterLink>
    <RouterLink to="/about" class="nav-link" exact-active-class="active">Sobre</RouterLink>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  background-color: var(--dark);
  gap: 12px;
  padding: 0 24px;
  --height-nav: 60px;
  min-height: var(--height-nav);
  max-height: var(--height-nav);
}

.nav-link {
  text-decoration: none;
  color: var(--white);
  font-size: 1.6rem;
}

.active {
  color: var(--primary);
  font-weight: bold;
}
</style>