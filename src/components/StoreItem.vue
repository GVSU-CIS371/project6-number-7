
<template>

  <!-- your answer -->
  
    <v-hover v-slot:default="{ isHovering, props }" >
  <v-card class="ma-4" max-width="475"  v-bind="props" :elevation="isHovering ? 12 : 2">


    <v-card-item class="ml-4 mt-4 mb-" >
      <v-card-title class="font-weight-bold">{{product.data.name}}</v-card-title>
    </v-card-item>


    <v-card-item class="ml-4 mt-n2 px-4">
      <span 
      ><v-icon v-if="product.data.rating > 0"
        icon="mdi mdi-star"
        size="small"
        color="#ffd700"
      </v-icon>
      <v-icon  v-if="product.data.rating == 0"
        icon="mdi mdi-star-outline"
        size="small"
        color="#ffd700"
      </v-icon>
      <v-icon v-if="product.data.rating > 1"
        icon="mdi mdi-star"
        size="small"
        color="#ffd700"
      </v-icon>
      <v-icon  v-if="product.data.rating < 2"
        icon="mdi mdi-star-outline"
        size="small"
        color="#ffd700"
      </v-icon>
      <v-icon v-if="product.data.rating > 2"
        icon="mdi mdi-star"
        size="small"
        color="#ffd700"
      </v-icon>
      <v-icon  v-if="product.data.rating < 3"
        icon="mdi mdi-star-outline"
        size="small"
        color="#ffd700"
      </v-icon>
      <v-icon v-if="product.data.rating > 3"
        icon="mdi mdi-star"
        size="small"
        color="#ffd700"
      </v-icon>
      <v-icon  v-if="product.data.rating < 4"
        icon="mdi mdi-star-outline"
        size="small"
        color="#ffd700"
      </v-icon>
      <v-icon v-if="Math.floor(product.data.rating) > 4"
        icon="mdi mdi-star"
        size="small"
        color="#ffd700"
      </v-icon></span>  
      <v-icon  v-if="product.data.rating < 5"
        icon="mdi mdi-star-outline"
        size="small"
        color="#ffd700"
      </v-icon>
      

      <span class="px-6"><v-icon
        icon="mdi mdi-cash"
        size="large"
        color="green"
      </v-icon>{{product.data.price}}</span> 


       <span><v-icon
        icon=" mdi mdi-package-variant-closed"
        size="large"
        color="blue"
      </v-icon>{{product.data.stock}}</span>
    </v-card-item>
    

    <v-card-item class="ma-4">
      <v-img
      :width="400"
      :height="200"
        :src=product.data.image
    
      >
      </v-img>
    </v-card-item>

  
    <v-card-item class="mx-4 pb-8 text-body-2">
      {{product.data.description}}
    </v-card-item>
   
 
 
  </v-card>
    </v-hover>




  
 
</template>



<script lang="ts" setup>
import { ProductDoc } from '../types/product';

//import {ref} from "vue";

type Props = {
  product: ProductDoc
}

defineProps<Props>();




</script>

