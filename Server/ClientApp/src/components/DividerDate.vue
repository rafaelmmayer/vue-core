<script setup>
import { computed, inject } from 'vue';

const globalStyles = inject('globalStyles')

const props = defineProps({
    date: Object
})

let left = computed(() => {
    const dateElement = document.getElementById(props.date.dateStr)
    return dateElement.getBoundingClientRect().left - globalStyles.usersGanttWidht
})
</script>

<template>
    <div v-if="date.isWeekend" class="divider-date weekend" :style="{ left: left + 'px', width: globalStyles.weekendDayWidth + 'px' }"></div>
    <div v-else>
        <div class="divider-date" :style="{ left: (left) + 'px' }"></div>
    </div>
</template>

<style scoped>
.divider-date {
    position: absolute;
    height: 100%;
    border-left: 0.5px solid #cfcbcb
}
.weekend {
    background-color: #e9e7e7;
}
</style>