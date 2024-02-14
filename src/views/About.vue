<script setup>
import { RouterView } from "vue-router";
import NavAbout from "../components/Layout/NavAbout.vue";
</script>

<template>
  <div class="about">
    <NavAbout />
    <RouterView />
  </div>
</template>

<style scoped>
.about {
  padding: 0px;
}
</style>