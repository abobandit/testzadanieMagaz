<script setup>
import {useUserStore} from "../store/index.js";
import ProfileFieldEditable from "./ProfileFieldEditable.vue";
import {edit} from "../requests/user.js";
import {reactive} from "vue";

const userStore = useUserStore()

</script>

<template>
<el-main style=" display:grid; " >
  <ProfileFieldEditable keyField="email" :field="userStore.user?.email" text="Почта"/>
  <ProfileFieldEditable keyField="name" :field="userStore.user?.name" text="Имя"/>
  <ProfileFieldEditable keyField="password" :field="''" text="Изменить пароль"/>
  <ProfileFieldEditable keyField="phone" :field="userStore.user?.phone" text="Номер телефона"/>
  <ProfileFieldEditable keyField="address" :field="userStore.user?.address" text="Адрес"/>
</el-main>
</template>

<style scoped>
</style>