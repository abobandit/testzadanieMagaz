<template>
    <el-card v-if="productItem" class="products-item with-sale">
            <template #header>
                <div class="card-header">
                    <span>{{ productItem.name }}</span>
                    <span v-if="productItem.discount_price" class="products-stock">50%</span>
                </div>
            </template>
            <div class="products-body">
                <img width="200" height="200" :src="appURL + productItem.images[0]" >
                <div>Описание: {{ productItem.description }}</div>
                <div>Цена: {{ productItem.price }}</div>
                <div>Артикул: {{ productItem.sku }}</div>
                <el-check-tag class="products-category" checked>{{productItem.category.name}}</el-check-tag>
            </div>
        </el-card>
</template>
<script setup>
import { useUserStore } from '../store/index';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const categoriesData = ref([])
const userStore = useUserStore();
const route = useRoute();
import {
  product,
} from "../requests/products";
import {categories} from "../requests/categories.js";
import {appURL} from "../axios/axios.js";
const productItem = ref(null)
async function handleGetProduct(id) {
  productItem.value = null; // Убираем старые данные
    categoriesData.value = (await categories()).data.data;
    productItem.value = (await product(id)).data.data;

}
handleGetProduct(route.params.id)
</script>