<template>
    <div class="h-80 px-10 py-1 mt-16 w-full p-4 fixed top-5 text-black"
    :style="{ backgroundColor: getTypeColor(firstType?.type?.name) }">
      <div class="h-10">
        <div class="flex justify-end mt-4 space-x-16">
          <router-link
            v-if="hasPrevious"
            :to="{ name: 'PokemonPage', params: { id: id - 1 } }"
            class="btn btn-primary text-white font-bold"
          >
            < #{{id - 1}}
          </router-link>
          <router-link
            v-if="hasNext"
            :to="{ name: 'PokemonPage', params: { id: id + 1 } }"
            class="btn btn-primary text-white font-bold"
          >
          #{{ id + 1 }} >
          </router-link>
        </div>
      </div>
      <div class="flex">
        <div class="bg-white h-52 w-52 ml-20">
          <img 
            v-if="pokemon.sprites?.front_default" 
            :src="pokemon.sprites.front_default" 
            alt="Pokemon Image"
            class="h-52 w-52"
          >
        </div>
        <div class="self-end ml-10 font-bold">
          <h2 class="text-white text-5xl name" 
          v-if="pokemon.name">
          {{ (pokemon.name).toUpperCase() }}</h2>
          <Button 
          @click="addToCache"
          label="Adicionar ao time" icon="pi pi-bookmark"
          class="bg-white p-2 pl-5 pr-5 mt-4 mb-4 font-bold drop-shadow-lg"/>
        </div>
      </div>
      
      
      <div class="m-20">
      <div class="flex">
        <h2 class="text-2xl font-bold">Tipo: </h2>
        <ul class="flex self-end">
          <li 
          class="ml-14 capitalize text-lg p-1 pl-6 pr-6 rounded-xl text-white font-semibold" 
          :style="{ backgroundColor: getTypeColor(type.type.name) }"
          v-for="type in pokemon.types" :key="type.slot">{{ type.type.name }}</li>
        </ul>
      </div>
      
      <div class="mt-5 flex">
        <label class="text-2xl font-bold mr-5">Altura:</label>
        <p class="self-end text-xl mr-20">{{ pokemon.height }}</p>
        <label class="text-2xl font-bold mr-5">Peso:</label>
        <p class="self-end text-xl">{{ pokemon.weight }}</p>
        
      </div>
      
      <div 
      v-if="pokemon.stats"
      class="mt-5">
        <label class="text-2xl font-bold mr-5">Estatísticas</label>
        
        <ProgressBar 
        :value="getStats('hp')/252 * 100" class="h-5 w-96 mt-2" >HP: {{ getStats('hp') }} </ProgressBar>
        <ProgressBar
        :value="getStats('attack')/252 * 100" class="h-5 w-96 mt-2" >Ataque: {{ getStats('attack') }} </ProgressBar> 
        <ProgressBar
        :value="getStats('defense')/252 * 100" class="h-5 w-96 mt-2" >Defesa: {{ getStats('defense') }} </ProgressBar> 
        <ProgressBar
        :value="getStats('speed')/252 * 100" class="h-5 w-96 mt-2" >Velocidade: {{ getStats('speed') }} </ProgressBar> 
        
      </div>
    </div>
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { onMounted, ref, watch } from 'vue';
  import { getPokemonById, getAllPokemon } from '@/service/pokemon.service';
  import { PokeColors } from '@/types/colors.enum';
  import { RouterLink } from 'vue-router';
  import Button from 'primevue/button';
  import ProgressBar from 'primevue/progressbar';
  import { usePartyStore } from '@/stores/party';
  
  const pokemon = ref({} as any);
  const firstType = ref<any>(null);
  const pokemonsList = ref([] as any[]);
  const router = useRouter();
  const id = ref(Number(router.currentRoute.value.params.id));
  const hasPrevious = ref(id.value > 1);
  const hasNext = ref(id.value < 151);
  const store = usePartyStore();

  

  
  const getCurrentPokemon = async () => {
    try {
      const response = await getPokemonById(id.value);
      pokemon.value = response;
      firstType.value = response.types.length > 0 ? response.types[0] : null;
    } catch (error) {
      console.error('Erro ao buscar o Pokémon:', error);
    }
  };
  
  const loadAllPokemon = async () => {
    try {
      const response = await getAllPokemon();
      pokemonsList.value = response.results;
  
    } catch (error) {
      console.error('Erro ao buscar a lista de Pokémons:', error);
    }
  };
  
  const getTypeColor = (type: string | undefined) => {
    if (!type) return '#FFF';
    const colorKey = type as keyof typeof PokeColors;
    return PokeColors[colorKey] || '#000';
  };
  
  const getStats = (stat: string | undefined) => {
    switch (stat) {
      case "hp":
        if (!pokemon.value.stats) return '';
        const hpStat = pokemon.value.stats.find((stat: any) => stat.stat.name === 'hp');
        return hpStat ? hpStat.base_stat : '';
        break;
    
      case "attack":
      if (!pokemon.value.stats) return '';
        const attackStat = pokemon.value.stats.find((stat: any) => stat.stat.name === 'attack');
        return attackStat ? attackStat.base_stat : '';
        break;
      
      case "defense":
      if (!pokemon.value.stats) return '';
        const defenseStat = pokemon.value.stats.find((stat: any) => stat.stat.name === 'defense');
        return defenseStat ? defenseStat.base_stat : '';
        break;
      
      case "speed":
      if (!pokemon.value.stats) return '';
        const speedStat = pokemon.value.stats.find((stat: any) => stat.stat.name === 'speed');
        return speedStat ? speedStat.base_stat : '';
        break;
      
      default:
        return ;
        break;
    }
}; 

  const addToCache = () => {
  
    try {
      store.addPokemon(pokemon.value)
    } catch (error) {
      return 'deu não';
    }
};
  
  
  onMounted(() => {
    getCurrentPokemon();
    loadAllPokemon();
  });
  
  watch(() => router.currentRoute.value.params.id, (newId) => {
    id.value = Number(newId);
    hasPrevious.value = id.value > 1;
    hasNext.value = id.value < 151;
    getCurrentPokemon();
  });
  
</script>
  
<style scoped>
  
</style>
  