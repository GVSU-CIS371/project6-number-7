<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
      <v-btn @click="showModal = true" class="mx-5">
        <v-icon>mdi-plus</v-icon>
        Add Product
      </v-btn>
    </v-app-bar>
    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-footer color="primary" app>
      © 2023 My Online Store. All rights reserved.
    </v-footer>

    <!-- Modal for Add Product -->
    <div class="modal-overlay" v-if="showModal">
      <div class="modal-box">
        <v-form @submit.prevent="submitForm">
          <v-card>
            <v-card-title>Add Product</v-card-title>

            <!-- Form fields -->
            <v-text-field v-model="formData.name" label="Name" required></v-text-field>
            <v-text-field v-model="formData.imageUrl" label="Image URL" required></v-text-field>
            <v-text-field v-model="formData.description" label="Description" required></v-text-field>
            <v-slider v-model="formData.rating" label="Rating" min="0" max="5" :thumb-label="true" step="1"></v-slider>
            <div class="flex-row">
              <v-text-field v-model="formData.price" label="Price $" type="number" required></v-text-field>
              <v-text-field v-model="formData.stock" label="Stock" type="number" required></v-text-field>
            </div>

            <!-- Submit button -->
            <v-btn type="submit">Add Product</v-btn>
            <v-btn @click="closeModal">Cancel</v-btn>
          </v-card>
        </v-form>
      </div>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useProductStore } from './stores/ProductStore'; // Update the path

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);

const showModal = ref(false);
const formData = ref({
  name: '',
  imageUrl: '',
  description: '',
  rating: 0,
  price: 0,
  stock: 0,
});

const productStore = useProductStore();

const submitForm = async () => {
  const productId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const confirmAction = confirm('Are you sure you want to add this product?');
  if (confirmAction) {
    try {
      await productStore.addItem({
        id: productId,
        data: {
          name: formData.value.name,
          image: formData.value.imageUrl,
          description: formData.value.description,
          rating: formData.value.rating,
          price: formData.value.price,
          stock: formData.value.stock,
          category: "",
        },
      });
      alert('Product added successfully!');
      closeModal();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  }
};

const closeModal = () => {
  formData.value.name = '';
  formData.value.imageUrl = '';
  formData.value.description = '';
  formData.value.rating = 0;
  formData.value.price = 0;
  formData.value.stock = 0;
  showModal.value = false;
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.modal-box {
  width: 400px; 
  height: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}

.flex-row {
  display: flex;
}

.flex-row > * {
  margin-right: 10px; 
}
</style>
