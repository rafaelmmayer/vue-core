<script setup>
import { computed } from 'vue'

const props = defineProps({
    isVisible: Boolean
})

const transform = computed(() => {
    return props.isVisible ? 'translateX(0)' : 'translateX(100%)'
})
</script>

<template>
    <div class="overlay-menu-timeline" :style="{ transform }">
        <slot></slot>
    </div>
</template>

<style scoped>
.overlay-menu-timeline {
    background-color: white; 
    width: 400px; 
    position: absolute; 
    right: 0; 
    bottom: 0; 
    z-index: 1000; 
	border: 1px solid #e9e7e7;
	height: calc(100% - var(--header-gantt-height));
	transition: transform 0.3s;
	box-shadow: -5px 0px 6px 0px rgba(0,0,0,0.04);
}
</style>