<script setup>
const props = defineProps({
    date: Object
})
</script>

<template>
    <div class="day" :class="date.isWeekend ? 'weekend' : 'normal-day'" :id="date.dateStr" :data-month="date.month">
        {{ date.day }}
    </div>
</template>

<style scoped>
.day {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.normal-day {
	min-width: var(--week-day-width)
}
.weekend {
	background-color: #e9e7e7;
	min-width: var(--weekend-day-width)
}
</style>