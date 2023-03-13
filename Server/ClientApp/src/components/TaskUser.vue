<script setup>
import { onUpdated, onMounted, onUnmounted } from 'vue';
import { taskHeaderStore } from '../stores/taskHeader'

const taskHeader = taskHeaderStore()

const props = defineProps({
    task: Object,
    userId: String,
    isFromHeader: Boolean
})

let isFixed = false
let divTaskEl = null
let dragAreaEl = null

onUnmounted(() => {
    interact(divTaskEl).unset()
    interact(dragAreaEl).unset()
})
onUpdated(() => {
    loadTaskInterectTask()
})
onMounted(() => {
    loadTaskInterectTask()
})
function loadTaskInterectTask() {
    divTaskEl = document.getElementById(props.task.Id)
    dragAreaEl = document.getElementById("drag-area-" + props.task.Id)

    interact(dragAreaEl)
        .draggable({  
            manualStart: true,
            listeners: {
                start (event) {
                    event.target.style.top = (event.client.y - 55) + 'px'
                    event.target.style.left = (event.client.x) + 'px'
                },
                move (event) {
                    var target = event.target

                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

                    // translate the element
                    target.style.webkitTransform = target.style.transform =
                        "translate(" + x + "px, " + y + "px)";

                    // update the posiion attributes
                    target.setAttribute('data-x', x)
                    target.setAttribute('data-y', y)
                },
                end (event) {
                    document.body.style.cursor = 'default'
                    event.target.hidden = true
                    event.target.style.transform = null
                    event.target.removeAttribute('data-x')
                    event.target.removeAttribute('data-y')
                }
            }
        })
        .on('down', function (event) {
            let interaction = event.interaction

            if (interaction.pointerIsDown && !interaction.interacting()) {
                const dragItemEl = document.getElementById('drag-item-' + props.task.Id)
                dragItemEl.hidden = false
                document.body.style.cursor = 'grabbing'

                interaction.start({ name: 'drag' }, event.interactable, dragItemEl)
            }
        })

    if (props.isFromHeader) {
        return
    }

    interact(divTaskEl)
        .dropzone({
            overlap: 0.75,
            ondragenter: function (event) {
                event.target.classList.add("dragover")
            },
            ondragleave: function (event) {
                event.target.classList.remove("dragover")
            },
            ondrop: function (event) {
                event.target.classList.remove("dragover")
            },
        })
}
function handleDoubleClick() {
    if (props.isFromHeader) {
        return
    }
    taskHeader.setTask(props.task)
}
</script>

<template>
    <div :key="task.Id" :id="task.Id" class="task" :class="[ isFromHeader ? 'task-header' : 'task-user' ]" @dblclick="handleDoubleClick">
        <div :id="'drag-area-'+ task.Id" class="drag-area">
            <img src="../assets/drag.png"/>
        </div> 
        <div class="task-name">{{ task.Name }}</div> 
        <div class="task-project-name">{{ task.ProjectName }}</div> 
        <div :id="'drag-item-'+task.Id" :data-task-id="task.Id" class="drag-item" hidden>{{ task.Name }}</div>
    </div>
</template>

<style scoped>
.task {
    user-select: none;
    padding-left: 20px;
    padding-right: 20px;
    display: grid;
    grid-template-columns: 25px 1fr 1.3fr; 
}
.drag-area {
    display: flex;
    align-items: center;
    cursor: grab;
}
.task-user {
    height: var(--task-user-height);
    border-top: 1px solid #cfcbcb;
}
.task-name {
    display: flex;
    align-items: center;
}
.task-project-name {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.task-header {
    height: 100%;
}
.dragover {
    background-color: rgb(248 250 252);
}
.drag-item {
    background-color: rgb(252 165 165);
    position: absolute;
    z-index: 1;
}
</style>