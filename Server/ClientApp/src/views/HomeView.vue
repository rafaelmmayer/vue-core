<script setup>
import { onMounted, ref, onUpdated, onUnmounted, inject } from 'vue'

import usersDb from '../assets/users.json'
import DividerDate from '../components/DividerDate.vue';
import DividerUser from '../components/DividerUser.vue';
import Month from '../components/Month.vue';
import TaskTimeLine from '../components/TaskTimeLine.vue';
import TaskUser from '../components/TaskUser.vue';
import DateComponent from '../components/DateComponent.vue'
import OverlayMenuTimeline from '../components/OverlayMenuTimeline.vue';
import UserComponent from '../components/UserComponent.vue';

import { taskHeaderStore } from '../stores/taskHeader'

const { headerViewHeight, headerGanttHeight } = inject('globalStyles')
const { monthsArr } = inject('appGlobalConfigs')

const taskHeader = taskHeaderStore()

const months = ref([])
const dates = ref([])
const users = ref([])
const overlayVisibility = ref(false)

onUpdated(() => {
	const daysContainer = document.getElementById('days')
	const width = daysContainer.getBoundingClientRect().right - daysContainer.getBoundingClientRect().left
	const usersContainer = document.getElementById('users')
	
	const taskTimeLineEl = document.getElementById('tasks-timeline')
	taskTimeLineEl.style.width = width + 'px'
	taskTimeLineEl.style.height = usersContainer.offsetHeight + 'px'
})
onUnmounted(() => {
	document.getElementById('tasks-timeline-container').removeEventListener('scroll', onTaskTimeLineScroll)
})
onMounted(() => {
	users.value = usersDb
		.map(u => {
			const tasks = u.Tasks.map(t => {
				const startDate = new Date(t.StartDate ?? Date.now())
				const endDate = new Date(t.EndDate)
				const deadLine = new Date(t.Deadline ?? Date.now())
				return {
					...t,
					ActualTime: Math.trunc(t.ActualTime),
					Deadline: deadLine,
					EndDate: endDate,
					EstimatedTime: Math.trunc(t.EstimatedTime),
					StartDate: startDate,
					StartDateStr: getDateStr(startDate),
					EndDateStr: getDateStr(endDate),
					DeadLineStr: getDateStr(deadLine)
				}
			})
			return {
				...u,
				Tasks: tasks
			}
		})

	
	const tasks = users.value.flatMap(u => u.Tasks)

	const startDates = tasks
		.map(t => t.StartDate)
		.sort((a, b) => a - b)

	const endDates = tasks
		.map(t => t.EndDate)
		.sort((a, b) => b - a)
	
	const auxMonths = []
	dates.value = getDays(startDates[0], endDates[0])
		.map(d => {
			const dayOfWeek = d.getDay()
			const month = d.getMonth()
			const isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0)
			if (!auxMonths.includes(month)) {
				auxMonths.push(month)
			}
			const date = {
				dayOfWeek: dayOfWeek,
				day: d.getDate(),
				month,
				dateStr: getDateStr(d),
				isWeekend
			}
			return date
		})
	
	months.value = auxMonths.map(m => {
		return {
			num: m,
			name: monthsArr[m]
		}
	})

	document.getElementById('tasks-timeline-container').addEventListener('scroll', onTaskTimeLineScroll)
})
function getDays(startDate, endDate) {
	let dt = startDate
	let arr = []
	const daysDiff = getDaysDifference(startDate, endDate)
	if (daysDiff < 70) {
		endDate.setDate(endDate.getDate() + (70 - daysDiff))
	}
	while (dt < endDate){
		arr.push(new Date(dt))
		dt.setDate(dt.getDate() + 1)
	}
    return arr;
}
function getDaysDifference(startDate, endDate) {
	let difference = endDate.getTime() - startDate.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}
function onTaskTimeLineScroll(event) {
	document.getElementById('users-container').scroll(0, event.target.scrollTop)
	document.getElementById('calendar-container').scroll(event.target.scrollLeft, 0)
}
function getDateStr(date) {
	return date.toISOString().split('T')[0]
}
function handleClickBtnUnassignedTasks() {
	overlayVisibility.value = !overlayVisibility.value
}
function handle
</script>

<template>
	<div class="view">
		<div>RMTask</div>
		<div class="gantt-menu-container" :style="{ top: (headerViewHeight + 1) + 'px', height: (headerGanttHeight / 2) + 'px' }">
			<div></div>
			<div class="gantt-menu">
				<v-btn variant="flat" size="small" prepend-icon="mdi-vuetify">
					button
				</v-btn>
				<v-btn variant="flat" size="small" prepend-icon="mdi-vuetify">
					button
				</v-btn>
				<v-btn variant="flat" size="small" prepend-icon="mdi-vuetify">
					button
				</v-btn>
				<v-btn variant="flat" size="small" @click="handleClickBtnUnassignedTasks">
					Tarefas não atribuidas
				</v-btn>
			</div>
		</div>
		<div>
			<div class="gantt-container">
				<OverlayMenuTimeline :is-visible="overlayVisibility" >
					<h2>Alooou</h2>
				</OverlayMenuTimeline>
				<div class="relative">
					<TaskUser v-if="taskHeader.task" :task="taskHeader.task" :user-id="123" :is-from-header="true" />
				</div>
				<div id="calendar-container" class="max-width calendar-container">
					<div class="mouth-container" style="left: 700px;">
						<Month v-for="month in months" :month="month" />
					</div>
					<div id="days" class="days-container">
						<DateComponent v-for="date in dates" :date="date"/>
					</div>
				</div>
				<div id="users-container" class="max-height users-container">
					<div id="users">
						<div v-for="user in users" :key="user.Id" :id="user.Id">
							<UserComponent :user-name="user.Name" />
							<div :id="'task-container-user-' + user.Id">
								<TaskUser v-for="task in user.Tasks" :task="task" :user-id="user.Id" />
							</div>
						</div>
					</div>
				</div>
				<div id="tasks-timeline-container" class="max-height max-width tasks-timeline-container">
					<div id="tasks-timeline" class="tasks-timeline">
						<DividerDate v-for="date in dates" :date="date"/>
						<div v-for="user in users" :key="user.Id">
							<DividerUser :user-id="user.Id"/>
							<TaskTimeLine v-for="task in user.Tasks" :task="task"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.view {
	display: grid;
	grid-template-rows: var(--header-view-height) 1fr;
	height: 100vh;
	overflow: hidden;
}
.gantt-container {
	display: grid;
	grid-template-columns: var(--users-gantt-widht) 1fr;
	grid-template-rows: var(--header-gantt-height) 1fr;
	border-top: 1px solid #cfcbcb;
	height: 100%;
	position: absolute;
}
.max-height {
	max-height: calc(100vh - var(--header-view-height) - var(--header-gantt-height));
}
.max-width {
	max-width: calc(100vw - var(--users-gantt-widht));
}
.calendar-container {
	overflow: hidden;
	display: grid;
	grid-template-rows: 2fr 1fr;
	position: relative;
}
.gantt-menu-container {
	width: 100%; 
	position: fixed; 
	right: 0; 
	z-index: 1;
	display: grid;
	grid-template-columns: 1fr auto;
}
.gantt-menu {
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: end;
	padding-right: 20px;
}
.mouth-container {
	height: 100%;
	display: flex;
	position: sticky;
}
.days-container {
	display: inline-flex;
	margin-right: 40px;
	height: 100%;
}
.users-container {
	overflow-y: hidden;
	overflow-x: visible;
	padding-bottom: 40px;
}
.tasks-timeline-container {
	overflow: scroll;
	background-color: #f9f8f8;
}
.tasks-timeline {
	position: relative;
}
</style>