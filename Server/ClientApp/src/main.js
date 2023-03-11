import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'


const app = createApp(App)

app.provide('globalStyles', {
    headerViewHeight: 50,
    headerGanttHeight: 75,
    usersGanttWidht: 700,
    weekDayWidth: 60,
    weekendDayWidth: 28,
    userHeight: 50,
    taskUserHeight: 35,
})

app.provide('appGlobalConfigs', {
    monthsArr: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
    ]
})

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
