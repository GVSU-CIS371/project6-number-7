<template>
  <!-- your answer -->
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        v-for="(n, i) in prod.products.length"
        :key="n"
        cols="3"
      >
      <StoreItem
       :product=prod.products[i]
      ></StoreItem>
       
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// your answer
import StoreItem from './StoreItem.vue';


import { useProductStore } from '../stores/ProductStore';

const prod = useProductStore();
prod.init()





</script>
