<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    month: Object
})

const width = ref(0)

onMounted(() => {
    const datesEl = document.querySelectorAll(`[data-month="${props.month.num}"]`)
    const firstDate = datesEl[0]
    const lastDate = datesEl[datesEl.length - 1]

    width.value = lastDate.getBoundingClientRect().right - firstDate.getBoundingClientRect().left
})

</script>

<template>
    <div class="month-container" :style="{ width: width + 'px' }">
        <div class="month-wrapper">
            <div class="month">
                {{ month.name }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.month-container {
    height: 100%;
    position: relative;
    background-color: white;
}
.month-wrapper {
    position: sticky;
    display: inline-block;
    padding-top: 4px;
    padding-bottom: 4px;
    left: 0;
}
.month {
    display: flex;
    justify-content: flex-end;
    width: 36px;
    border-left: 2px solid #e9e7e7;
}
</style>