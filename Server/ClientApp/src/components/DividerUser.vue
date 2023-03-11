<script setup>
import { onMounted, defineProps, ref, inject } from 'vue'

const globalStyles = inject('globalStyles')

const props = defineProps({
    userId: String
})

const top = ref(0)

onMounted(() => {
    const userElement = document.getElementById(props.userId)

    top.value = userElement.getBoundingClientRect().top - (globalStyles.headerViewHeight + globalStyles.headerGanttHeight)
})
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