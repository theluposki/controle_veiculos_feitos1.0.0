import { createRouter, createWebHistory } from "vue-router";
import NotFound from "./views/NotFound.vue";

const routes = [
  { path: "/:pathMatch(.*)*", component: NotFound },
  { path: "/", component: () => import("./views/Home.vue") },
  { path: "/VehicleCompletion", component: () => import("./views/VehicleCompletion.vue") },
  { path: "/ViewDetails/:id", component: () => import("./views/viewDetails.vue") },
  { path: "/SearchVehicle", component: () => import("./views/SearchVehicle.vue") },
  { path: "/about", component: () => import("./views/About.vue") },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
