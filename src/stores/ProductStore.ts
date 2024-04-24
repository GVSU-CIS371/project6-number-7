import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { db } from "../Firebase";
import { CollectionReference, QuerySnapshot, collection, getDocs, addDoc, QueryDocumentSnapshot, deleteDoc, doc } from "firebase/firestore";

export const useProductStore = defineStore("ProductStore", {
  // State
  state: () => ({
    products: [] as ProductDoc[],
  }),
  // Actions
  actions: {
    init() {
      this.products = initProducts;

      const myProductsCol: CollectionReference = collection(db, "products");

      getDocs(myProductsCol).then((docs: QuerySnapshot) => {
        if(docs.empty){
          initProducts.forEach(async (product: ProductDoc) => {
            await addDoc(myProductsCol, { data: product.data, id: product.id });
          });
        } else {
          this.products = []

          docs.forEach((qDoc: QueryDocumentSnapshot) => {
            const productData = qDoc.data() as ProductDoc;
            console.log(productData);
            this.products.push({id: productData.id, data: productData.data});
          });
        }
      });
    },
    filterByCategory(category: string) {
      return this.products.filter((x: ProductDoc) => x.data.category.includes(category));

    },
    filterByRating(minRating: number) {
      return this.products.filter( (p: ProductDoc) => p.data.rating > minRating )
    },
    async addItem(newProduct: ProductDoc) {
      const myProductsCol: CollectionReference = collection(db, "products");
      const newDocRef = await addDoc(myProductsCol, { data: newProduct.data, id: newProduct.id });
      this.products.push({ id: newDocRef.id, data: newProduct.data });
    },
    async deleteItem(productId: string) {
      try {
        const productRef = doc(collection(db, 'products'), productId);
        await deleteDoc(productRef);
        // Update the local products list after deletion
        this.products = this.products.filter(product => product.id !== productId);
      } catch (error) {
        throw new Error('Error deleting product');
      }
    },
  },
});
