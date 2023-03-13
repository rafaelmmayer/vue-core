<script setup>
import { onMounted, onUpdated, ref, inject, watch } from 'vue'
import DeadLine from './DeadLine.vue';

const globalStyles = inject('globalStyles')

const props = defineProps({
    task: Object,
    userUpdatedCount: Number
})

const top = ref(0)
const left = ref(0)
const width = ref(0)

watch(() => props.userUpdatedCount, ()  => {
    load()
})
onMounted(() => {
    load()
})
function load() {
    const taskElement = document.getElementById(props.task.Id)
    const startDateEl = document.getElementById(props.task.StartDateStr)
    const endDateEl = document.getElementById(props.task.EndDateStr)
    const timeLineEl = document.getElementById('users-container')

    top.value = taskElement.getBoundingClientRect().top - (globalStyles.headerViewHeight + globalStyles.headerGanttHeight - timeLineEl.scrollTop)
    left.value = startDateEl.getBoundingClientRect().left - globalStyles.usersGanttWidht
    width.value = endDateEl.getBoundingClientRect().right - startDateEl.getBoundingClientRect().left
}
</script>

<template>
    <div class="task-timeline-divider" :style="{ top: (top - 1) + 'px' }"></div>
    <div class="task-timeline-container" :style="{ top: top + 'px', left: left + 'px', width: width + 'px', height: globalStyles.taskUserHeight + 'px' }">
        <div class="task-timeline" :style="{ height: (globalStyles.taskUserHeight - 15) + 'px' }"></div>
    </div>
    <DeadLine :top="top" :date="task.DeadLineStr" />
</template>

<style scoped>
.task-timeline-divider {
    height: 1px;
    position: absolute;
    width: 100%;
    background-color: #cfcbcb;
}
.task-timeline-container {
    position: absolute;
    display: flex;
    align-items: center;
}
.task-timeline {
    flex: 1 1 0%;
    margin-left: 8px;
    margin-right: 8px;
    background-color: rgb(0 0 0);
    border-radius: 8px;
}
</style>
