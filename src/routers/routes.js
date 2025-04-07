import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import Boutique from "@/views/Boutique.vue";
import MesCommandes from "@/views/MesCommandes.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Dashboard from "@/views/Dashboard.vue";
import Panier from "@/views/Panier.vue";

export const routes = [
    {path: '/', component: Index},
    {path: '/login', component: Login},
    {path: '/Boutique', component: Boutique},
    {path: '/MesCommandes', component: MesCommandes},
    {path: '/ProductDetail/:id', component: ProductDetail},
    {path: '/Panier', component: Panier},
    {path: '/Dashboard', component: Dashboard},
]