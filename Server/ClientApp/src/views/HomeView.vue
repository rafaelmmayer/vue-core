<script setup>
import { onMounted, reactive } from 'vue'
const data = reactive({
  weatherForecast: [] 
})
onMounted(async () => {
  const res = await fetch('api/WeatherForecast/GetWeatherForecast')
  const json = await res.json()
  data.weatherForecast = json
})
</script>

<template>
  <div>
    <h2>Home</h2>
    <ul>
      <li v-for="w in data.weatherForecast" :key="w.Date">
        {{ w.summary + ' ' + w.temperatureC }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>