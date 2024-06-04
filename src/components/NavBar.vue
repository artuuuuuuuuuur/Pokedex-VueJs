<template>
        <nav class="w-full fixed top-0 left-0 bg-white shadow-xl h-19">
          <div class="container mx-auto flex justify-center space-x-14">
        <router-link
          v-for="item in items"
          :key="item.name"
          :to="item.route"
          class="text-black text-xl"
          :class="{ 'border-b-2 border-black': isActiveRoute(item.route) }"
        >
          {{ item.name }}
        </router-link>
          </div>
        </nav>
        
      
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        items: [
          { name: 'Pokedex', route: '/' },
          { name: 'Party', route: '/party' },
          { name: 'Trainer Card', route: '/trainer-card' }
        ]
      };
    },
    methods: {
      isActiveRoute(route) {
        return this.$route.path === route;
      }
    }
  };
  </script>
  
  
  