<script setup>
import { ref, computed, inject, defineEmits } from 'vue'

const { userHeight } = inject('globalStyles')

const props = defineProps({
    userName: String
})

const tasksVisible = ref(false)

const iconButton = computed(() => {
    return tasksVisible.value ? 'mdi-chevron-right' : 'mdi-chevron-down' 
})

function handleBtnClick() {
    tasksVisible.value = !tasksVisible.value
}
</script>

<template>
    <div class="user" :style="{ height: userHeight + 'px' }">
        <v-btn :icon="iconButton" variant="flat" size="x-small" @click="handleBtnClick"></v-btn>
        <span style="margin-left: 8px;">
            {{ userName }}
        </span>
    </div>
</template>

<style scoped>
.user {
	padding: 8px;
	display: flex;
	align-items: center;
	border-top: 1px solid rgb(239, 68, 68);
}
</style>