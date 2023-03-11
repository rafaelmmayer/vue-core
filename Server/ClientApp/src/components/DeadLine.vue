<script setup>
import { inject, onMounted, ref } from 'vue'

const { taskUserHeight, weekDayWidth, usersGanttWidht } = inject('globalStyles')

const props = defineProps({
    top: Number,
    date: String
})

const left = ref(0)

onMounted(() => {
    const dateElement = document.getElementById(props.date)

    left.value = dateElement.getBoundingClientRect().left - usersGanttWidht
})

</script>

<template>
    <div class="deadline-container" :style="{ width: weekDayWidth + 'px', height: taskUserHeight + 'px', top: top + 'px', left: left + 'px' }">
        <div class="deadline"></div>
    </div>
</template>

<style scoped>
.deadline-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}
.deadline {
    background-color: rgb(185 28 28);
    padding: 12px;
    border-radius: 50%;
}
</style>