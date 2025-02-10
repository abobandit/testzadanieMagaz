<script setup>
import {ref} from "vue";
import { useUserStore } from "../store";
import { RouterLink } from "vue-router";
import { UserCircleIcon } from "@heroicons/vue/24/solid/index.js";

import { logout } from "../requests/user";

const userStore = useUserStore();

const searchValue = ref('')

async function handleLogout() {
    await logout();

    userStore.setIsLoginUser(false)
}
</script>

<template>
    <div class="header">
        <el-input
            v-model="searchValue"
            clearable
            placeholder="Type something"
        >
            <template #prefix>
                <el-icon class="el-input__icon">
                    <search/>
                </el-icon>
            </template>
        </el-input>
        <router-link to="/cart" class="cart">
                <el-icon :size="17"><ShoppingCartFull /></el-icon>
        </router-link>
        <el-dropdown trigger="click" v-if="userStore.isLoginUser && userStore.user">
            <span class="profile">
                <user-circle-icon></user-circle-icon>
                <div>
                    {{ userStore.user.name }}
                </div>
            </span>
            <template #dropdown>
                <div class="user-dropdown">
                    <el-dropdown-menu>
                        <el-dropdown-item ><router-link to="/me">Профиль</router-link> </el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">Выйти</el-dropdown-item>
                    </el-dropdown-menu>
                </div>
            </template>
        </el-dropdown>
        <div v-else class="no-authorized">
            <RouterLink to="/auth">Войти</RouterLink>
            <div>/</div>
            <RouterLink to="/signup">Зарегистрироваться</RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.header {
    display: flex;
    align-items: center;
    height: 100%;

    & :deep(.el-input) {
        width: 70%;
        margin-right: auto;
    }

    .cart {
        margin-right: 10px;
        display: flex;
        align-items: center;

        cursor: pointer;
        padding: 5px 15px;
        border: 1px solid black;
        border-radius: 15px;
    }

    .profile {
        display: flex;
        align-items: center;
        gap: 10px;

        & :deep(.el-avatar) {
            flex-shrink: 0;
        }
    }

    .no-authorized {
        display: flex;
        gap: 5px;
    }
}
</style>