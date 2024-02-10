<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav class="nav">
    <div class="wrapper-logo">
      <RouterLink to="/" class="logo">
        <img src="../../assets/logo.jpg" alt="logo" width="40" height="40">
      </RouterLink>
    </div>

    <div class="wrapper-links">
      <RouterLink to="/" class="nav-link" exact-active-class="active">
        <i class="ri-home-3-line"></i>
        Ínicio
      </RouterLink>
      <RouterLink to="/VehicleCompletion" class="nav-link" exact-active-class="active">
        <i class="ri-car-fill"></i>
        Finalizar
      </RouterLink>
      <RouterLink to="/SearchVehicle" class="nav-link" exact-active-class="active">
        <i class="ri-search-line"></i>
        Buscar
      </RouterLink>
      <RouterLink to="/about" class="nav-link" exact-active-class="active">
        <i class="ri-information-line"></i>
        Sobre
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--dark);
  padding: 0 24px;
  --height-nav: 60px;
  min-height: var(--height-nav);
  max-height: var(--height-nav);
}

.wrapper-logo, .wrapper-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.logo > img {
  --width-height-img: 40px;
  min-width: var(--width-height-img);
  max-width: var(--width-height-img);
  min-height: var(--width-height-img);
  max-height: var(--width-height-img);
  object-fit: cover;
  border-radius: 4px;
}

.nav-link {
  text-decoration: none;
  color: var(--white);
  font-size: 1.4rem;
}

.active {
  color: var(--primary);
  font-weight: bold;
}
</style>