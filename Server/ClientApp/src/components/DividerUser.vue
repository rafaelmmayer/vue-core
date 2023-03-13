<script setup>
import { onMounted, ref, inject, watch } from 'vue'

const globalStyles = inject('globalStyles')

const props = defineProps({
    userId: String,
    userUpdatedCount: Number
})

const top = ref(0)

watch(() => props.userUpdatedCount, () => {
    loadComponent()
})
onMounted(() => {
    loadComponent()
})
function loadComponent() {
    const userElement = document.getElementById(props.userId)
    const timeLineEl = document.getElementById('users-container')

    top.value = userElement.getBoundingClientRect().top - (globalStyles.headerViewHeight + globalStyles.headerGanttHeight - timeLineEl.scrollTop)
}
</script>

<template>
    <div class="divider-user" :style="{ top: (top - 1) + 'px' }"></div>
</template>

<style scoped>
.divider-user {
    height: 1px;
    position: absolute;
    width: 100%;
    background-color: rgb(239 68 68);
}
</style>