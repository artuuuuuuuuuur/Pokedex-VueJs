import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '@/pages/Pokedex.vue'
import PokemonPage from '@/pages/PokemonPage.vue'
import Party from '@/pages/Party.vue'
import TrainerCard from '@/pages/TrainerCard.vue'
const routes = [
    {
      path: '/',
      name: 'pokedex',
      component: Pokedex
    },
    {
      path: "/pokemon/:id/",
      name: "PokemonPage",
      component: PokemonPage,
    },
    {
      path: "/party",
      name: "Party",
      component: Party,
    },
    {
      path: '/trainer-card',
      name: 'Trainer Card',
      component: TrainerCard
    }
  ]
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  
})

export default router
