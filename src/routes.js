import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "./views/NotFound.vue";

const routes = [
  { path: "/:pathMatch(.*)*", component: NotFound },
  { path: "/", component: () => import("./views/Home.vue") },
  { path: "/VehicleCompletion", component: () => import("./views/VehicleCompletion.vue") },
  { path: "/ViewDetails/:id", component: () => import("./views/viewDetails.vue") },
  { path: "/SearchVehicle", component: () => import("./views/SearchVehicle.vue") },
  { 
    path: "/about", 
    component: () => import("./views/About.vue"),
    children: [
      {
        path: "",
        component: () => import("./views/About/info.vue")
      },
      {
        path: "config",
        component: () => import("./views/About/config.vue")
      },
    ]
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
