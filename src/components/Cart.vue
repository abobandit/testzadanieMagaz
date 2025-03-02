<script setup>
import { computed } from 'vue';
import { updateCartProuductDetail, cart, removeCartProuduct, addOrder } from '../requests/cart';
import { el } from 'element-plus/es/locales.mjs';
import {appURL} from "../axios/axios.js";
import {product} from "../requests/products.js";

const cartData = ref([])
const isAllChoosen = computed(() => cartData.value.every(el => el.isChoosen))

async function handleGetCartProducts() {
    const data = await cart();
    cartData.value = data.data.data
}

async function handleUpdateQuantity(id, count = 1) {
    await updateCartProuductDetail(id, {
        quantity: count
    });
}

async function handleRemoveCartProuduct(id) {
    await removeCartProuduct(id);
    await handleGetCartProducts();
}

async function handleCreateOrder() {
    const filtered = cartData.value.filter(el => el.isChoosen).map(el => {
        return {
           product_id: el.product.id,
           quantity: el.quantity
        }
    })
    filtered.forEach(el =>{
       addOrder({ items: [el]});
    })
    await handleGetCartProducts();
}

handleGetCartProducts();
</script>

<template>
    <div class="cart-actions">
        <el-checkbox
            :indeterminate="!isAllChoosen"
            v-model="isAllChoosen"
            @change="(value) => {
                if(value) {
                    cartData.forEach(el => {
                        el.isChoosen = true
                    })
                } else {
                    cartData.forEach(el => {
                        el.isChoosen = false
                    })
                }
            }"
        >
            Выбрать все
        </el-checkbox>
        <el-button class="order-checkout" @click="handleCreateOrder">Оформить заказ</el-button>
    </div>
    <div class="cart-list">
        <div v-for="item in cartData" :key="item.product.id" class="cart-item">
            <el-checkbox
                v-model="item.isChoosen"
            >
            </el-checkbox>
            
<!--            <PhotoIcon></PhotoIcon>-->
            <el-image style="width: 100px; height: 100px" :src="appURL + item.product.images[0]" />
            <div class="cart-description">
                <div class="cart-name">{{ item.product.name }}</div>
                <div>Артикул: {{ item.product.sku }}</div>
                <div>Описание: {{ item.product.description }}</div>
            </div>
            <div class="cart-price">
                ₽ {{ item.product.price }}
            </div>
            <div>
                <el-input-number 
                    v-model="item.quantity" 
                    @input="(value) => {
                            handleUpdateQuantity(item.id, value)
                        }"  
                    :min="1" 
                    :max="10" />
            </div>
            <div class="cart-delete" @click="handleRemoveCartProuduct(item.product.id)">
                <el-icon><Delete /></el-icon>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.order-checkout {
    margin-left: auto;
}

.cart-actions {
    display: flex;
    margin-bottom: 1rem;
}

.cart-list {
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.cart-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 20px;
    height: 120px;
    border-radius: 16px;
    border: 1px solid black;

    svg {
        height: 100%;
    }
}

.cart-name {
    font-weight: bold;
    font-size: 16px;
}

:deep(.el-image) {
    width: 200px;
    border-radius: 16px;
    overflow: hidden;
}

.cart-price {
    flex-shrink: 0;
    margin-left: auto;
}

.cart-delete {
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;

    :hover :deep(path) {
       fill: red;
    }
}
</style>