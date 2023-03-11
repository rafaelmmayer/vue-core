<script setup>
import { inject } from 'vue'

const globalStyles = inject('globalStyles')

const globalVarsCss = {
	'--header-view-height': globalStyles.headerViewHeight + 'px',
	'--header-gantt-height': globalStyles.headerGanttHeight + 'px',
	'--users-gantt-widht': globalStyles.usersGanttWidht + 'px',
	'--week-day-width': globalStyles.weekDayWidth + 'px',
	'--weekend-day-width': globalStyles.weekendDayWidth + 'px',
	'--user-height': globalStyles.userHeight + 'px',
	'--task-user-height': globalStyles.taskUserHeight + 'px',
}
</script>
<template>
  <div :style="globalVarsCss">
    <RouterView/>
  </div>
</template>
