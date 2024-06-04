<template>
  <div class="h-32"></div>
  <div class="w-screen flex justify-between">
    <div class="container grid grid-cols-3 gap-10 justify-items-center">
      <RouterLink
      v-for="(pokemon, index) in pokemonsList"
      :key="index"
      :to="{ name: 'PokemonPage', params: { id: index + 1}}"
      class="router-link"
      >
      <PokemonCard
      :data="pokemon"
      :name="pokemon.name"
      :url="pokemon.url"
      :id="index + 1"
      />
      </RouterLink>
      
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getPokemonByName, getAllPokemon } from '@/service/pokemon.service';
import InputText from 'primevue/inputtext';
import PokemonCard from '@/components/PokemonCard.vue';

const pokemon = ref("");
const pokemonData = ref({} as any);
const pokemonsList = ref([] as any[]);

const getTypedPokemon = async () => {
const response = await getPokemonByName(pokemon.value);
pokemonData.value = response;
}

const getPokemons = async () => {
const response = await getAllPokemon();
pokemonsList.value = response.results;
}

watch(pokemon, () => {
getTypedPokemon();
});

onMounted(() => {
getPokemons();
});
</script>

<style scoped>
.container {
display: flex;
flex-wrap: wrap;
justify-content: center;
margin-left: 10%;
margin-right: 10%;
max-width: 100%;
}

.router-link{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 25%;
  text-decoration: none;
  box-shadow: 0px 14px 15px rgba(0, 0, 0, 0.185);
  color: black;
}
</style>