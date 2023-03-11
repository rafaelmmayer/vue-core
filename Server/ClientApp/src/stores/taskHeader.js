import { defineStore } from 'pinia'

export const taskHeaderStore = defineStore('taskHeader', {
    state: () => {
        return { task: null }
    },

    actions: {
        setTask(newTask) {
            this.task = newTask
        }
    }
  })