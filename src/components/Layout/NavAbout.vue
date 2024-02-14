<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="navAbout">
    <RouterLink to="/about" class="nav-link" exact-active-class="active">Info</RouterLink>
    <RouterLink to="/about/config" class="nav-link" active-class="active">Configurações</RouterLink>
  </nav>
</template>

<style scoped>
.navAbout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  background-color: var(--primary);
  height: 45px;
}

.nav-link {
  text-decoration: none;
  color: var(--dark);
  font-size: 1.4rem;
  padding: 4px 16px;
  border-radius: 20px;
}

.nav-link:hover {
  transition: border ease .4s;
  border: solid 2px var(--dark);
}

.nav-link:active {
  scale: .98;
}

.active {
  background-color: var(--dark);
  padding: 4px 16px;
  border-radius: 20px;
  color: var(--primary);
  font-weight: bold;
}
</style>