<template>
  <div class="h-32"></div>
  <div class="w-screen flex justify-between">
    <div class="container grid grid-cols-3 gap-10 justify-items-center">
      
      <RouterLink
      v-for="(pokemon, index) in cachedPokemons"
      :key="pokemon.id"
      :to="{ name: 'PokemonPage', params: { id: pokemon.id }}"
      class="router-link"
      >
      <CachePokemonCard
      :data="pokemon"
      :name="pokemon.name"
      :url="cachedPokemons.url"
      :id="index+1"
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
import Button from 'primevue/button';
import CachePokemonCard from '@/components/CachePokemonCard.vue'
import { usePartyStore } from '@/stores/party';

const pokemon = ref("");
const pokemonData = ref({} as any);
const cachedPokemons = ref([] as any);
const party = usePartyStore();

const formattedParty = ref<any[]>([] as any);

const getTypedPokemon = async () => {
const response = await getPokemonByName(pokemon.value);
pokemonData.value = response;
}

const fetchCachedPokemons = async () => {
  formattedParty.value = party.party.map((pokemon) => ({
        name: pokemon,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    }));
};

watch(pokemon, () => {
getTypedPokemon();
});

onMounted(() => {
fetchCachedPokemons();
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