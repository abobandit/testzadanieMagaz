<template>
  <el-text style="text-align: start"> {{ text }}:
    <template v-if="!isEditing">
      {{ field }}
      <el-icon class="edit-icon" @click="startEditing">
        <EditPen/>
      </el-icon>
    </template>
    <template v-else-if="keyField=== 'phone'">
      <input
          type="tel"
          v-model="editableField"
          ref="inputRef"
          @blur="saveEdit"
          pattern="^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$"
          placeholder="+7(XXX)XXX-XX-XX"
          @keyup.enter="saveEdit"
      />
    </template>
    <template v-else>
      <el-input
          v-model="editableField"
          ref="inputRef"
          @blur="saveEdit"
          @keyup.enter="saveEdit"
          size="small"
      />
    </template>
  </el-text>
</template>

<script setup>
import {ref, defineProps, defineEmits, nextTick, reactive} from 'vue'
import {edit} from "../requests/user.js";

const props = defineProps({
  text: String,
  field: String,
  keyField: String
})

const form = reactive({})


const emit = defineEmits(['update:field'])

const isEditing = ref(false)
const editableField = ref(props.field)
const inputRef = ref(null)

const updateUser = async () => {
  const data = await edit(form)
}
const startEditing = () => {
  isEditing.value = true
  editableField.value = props.field

  // Фокус на input после рендера
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const saveEdit = async () => {
  isEditing.value = false
  form[props.keyField] = editableField.value
  if (!props.field === editableField.value)
  await updateUser()
}

</script>

<style scoped>
.edit-icon {
  cursor: pointer;
  margin-left: 5px;
}
</style>