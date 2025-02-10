<script setup>
import {HeartIcon} from "@heroicons/vue/24/solid"
import {HeartIcon as HeartIconOutline} from "@heroicons/vue/24/outline"
import {
  addToFavorites,
  deleteProduct,
  product,
  products,
  removeFromFavorites,
  updateProduct
} from "../requests/products";
import {ref} from "vue";
import {addToCart} from "../requests/cart";
import {categories} from "../requests/categories";
import {useUserStore} from "../store";
import {appURL} from "../axios/axios.js";
import ReviewPop from "./ReviewPop.vue";
import {Star, StarFilled} from "@element-plus/icons-vue";

const productsData = ref([])
const productEdit = ref(null)
const categoriesData = ref([])
const userStore = useUserStore()
const hoverIndex = ref(null);

const isOpenEditDrawer = ref(false)
const handleClose = (done) => {
  ElMessageBox.confirm('Вы уверены что хотите закрыть? Не сохраненные данные будут потеряны',
    {
      confirmButtonText: 'Заркыть',
      cancelButtonText: 'Отмена',
    }
  )
    .then(() => {
      isOpenEditDrawer.value = false;
      done()
    })
    .catch(() => {
      // catch error
    })
}

async function handleProducts() {
    const data = await products();

    productsData.value = data.data.data;
}

async function handleAddToCart(id, count = 1) {
    await addToCart({
        product_id: id,
        quantity: count
    });
    await handleProducts();
}

async function handleAddToFavorites(id,idx) {
    await addToFavorites(id, {product_id: id}).then(()=>{
      productsData.value[idx].is_favorite  = true
    });
}
async function handleRemoveFromFavorites(id,idx) {
    await removeFromFavorites(id, {product_id: id}).then(()=>{
      productsData.value[idx].is_favorite  = false
    });
}

async function handleGetProduct(id) {
    categoriesData.value = (await categories()).data.data;
    productEdit.value = (await product(id)).data.data;

}

async function handleUpdateProduct() {
    await updateProduct(productEdit.value.id, {
        name: productEdit.value.name,
        price: productEdit.value.price,
        slug: productEdit.value.slug,
        category_id: productEdit.value.category.id,
        description: productEdit.value.description,
        sku: productEdit.value.sku,
    });
    await handleProducts();
    // kyrlukone@gmail.com

}

async function handleDeleteProduct(id) {
    ElMessageBox.confirm('Вы уверены что удалить данный товар?',
    {
      confirmButtonText: 'Удалить',
      cancelButtonText: 'Отмена',
    }
  )
    .then(async () => {
        await deleteProduct(id)
        await handleProducts()
        done()
    })
    .catch(() => {
      // catch error
    })

}
handleProducts();
</script>

<template>
    <h2>Каталог</h2>

    <div class="products-list">

        <el-card v-for="(product,idx) in productsData" :key="product.id" class="products-item with-sale">
            <template #header>
                <div class="card-header">
                    <span>{{ product.name }}</span>
                    <span v-if="product.discount_price" class="products-stock">50%</span>
                    <el-dropdown v-if="userStore.isAdmin" trigger="click">
                        <div class="more">
                            <el-icon><MoreFilled /></el-icon>
                        </div>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="() => {
                                handleGetProduct(product.id)
                                isOpenEditDrawer = !isOpenEditDrawer
                            }">Редактировать</el-dropdown-item>
                            <el-dropdown-item @click="handleDeleteProduct(product.id)">
                                <span style="color: red;">Удалить</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </template>
            <div class="products-body">
                <img width="200" height="200" :src="appURL + product.images[0]" >
                <div>Описание: {{ product.description }}</div>
                <el-check-tag class="products-category" checked>{{product.category.name}}</el-check-tag>
            </div>
            <template #footer>
                <div class="products-footer">
                    <div class="products-price">₽ {{ product.price }}</div>
                    <div class="favorites">
                        <heart-icon-outline v-if="!product.is_favorite" @click="handleAddToFavorites(product.id,idx)"/>
                        <heart-icon v-else @click="handleRemoveFromFavorites(product.id,idx)"/>
                    </div>
                    <div class="products-cart" @click="handleAddToCart(product.id)">
                        <el-icon><Plus /></el-icon>
                        <el-icon><ShoppingCart /></el-icon>
                    </div>
                  <ReviewPop
                      :product_id="product.id"
                      />
                </div>
            </template>
        </el-card>
    </div>
  <el-drawer v-model="isOpenEditDrawer" :before-close="handleClose">
    <template #header>
      <h4>Редактирование товара</h4>
    </template>
    <template #default>
      <div v-if="productEdit" class="form-edit">
        <el-input v-model="productEdit.name" size="large" placeholder="Название товара" />
        <el-input v-model="productEdit.description" size="large" placeholder="Описание товара" />
        <el-input v-model="productEdit.sku" size="large" placeholder="Артикул товара" />
        <el-input v-model="productEdit.stock" size="large" placeholder="Количество товара" />
        <el-input v-model="productEdit.slug" size="large" placeholder="Символьный код товара"/>
        <el-input v-model="productEdit.price" size="large" placeholder="Цена товара"/>
        <el-select v-model="productEdit.category" size="large" value-key="name">
            <el-option v-for="category in categoriesData" :key="category.id" :label="category.name"
            :value="category" />
        </el-select>
      </div>
    </template>
    <template #footer>
      <div>
        <el-button @click="handleClose">Отменить</el-button>
        <el-button type="primary" @click="handleUpdateProduct">Сохранить</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>

.form-edit {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
}

.more {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(223, 223, 223);
    margin-left: 0.5rem;
    cursor: pointer;
}

.card-header {
    display: flex;
}

.products-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.products-category {
    margin-top: 0.5rem  ;
}

.products-item {
    width: calc(33% - 1rem);
    display: flex;
    flex-direction: column;
}

.products-footer {
    display: flex;
}

.favorites {
    width: 20px;
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.products-price {
    margin-right: auto;
    font-weight: bold;
}

.products-stock {
    background-color: greenyellow;
    color: rgb(0, 0, 0);
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 0.75em;
    font-weight: 500;
    max-height: 30px;
    margin-left: auto;
}

.products-cart {
    display: flex;
    gap: 5px;
    cursor: pointer;
    padding: 5px 7.5px;
    border: 1px solid black;
    border-radius: 15px ;
}

:deep(.el-card__footer) {
    border: none;
    margin-top: auto;
}

:deep(.el-image__inner) {
    border-radius: var(--el-border-radius-base);
}
:deep(.el-button + .el-button) {
    margin-left: 0.5rem !important;
}
</style>