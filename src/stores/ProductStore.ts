import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { db } from "../Firebase";
import { CollectionReference, QuerySnapshot, collection, getDocs, addDoc, QueryDocumentSnapshot, deleteDoc, doc, query, where, updateDoc, DocumentReference, setDoc, getDoc } from "firebase/firestore";
import { da, tr } from "vuetify/locale";

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
    async updateItem(productId: string, data: any) {
  
        const myCol: CollectionReference = collection(db, "products");
        const qr = query(myCol, where("id", "==", productId));
        const qs = await getDocs(qr);
    
        qs.forEach(async (qd) => {
          const myDoc = doc(myCol, qd.id);
          await updateDoc(myDoc, { data: data });
    
          // Update the local state 
          const index = this.products.findIndex((product) => product.id === productId);
          if (index !== -1) {
            this.products[index].data = data;
          }
        });
    },
  },
});
