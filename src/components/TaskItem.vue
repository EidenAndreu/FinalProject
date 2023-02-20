<template>
<div class="container">
    <img src="../img/pin.png" alt="">
    <h3 :class="props.task.is_complete ? 'case1': 'case2'">{{task.title}}</h3>
    <p :class="props.task.is_complete ? 'case1': 'case2'">{{ task.description }}</p>
    <div class="itemBtns">
    <button @click="completeTask">Completed</button>
    <button @click="showInput">Edit</button>
    <button @click="showModalToggle">Delete</button>
    <div class="modal" v-if="showModal">
      <h2>Are you sure you want to delete the task "{{ task.title }}" ?</h2>
      <button @click="deleteTask">Yes</button>
      <button @click="showModalToggle">Cancel</button>
    </div>
    
    <div v-if="inputContainer">
        <input type="text" v-model="currentTaskTitle">
        <input type="text" v-model="currentTaskDescription">
        <button @click="editTask">Edit task</button>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../stores/task';
import { supabase } from '../supabase';

//Definir emits para pasar lógica y eventos hacia componentes padres.
const emit = defineEmits([
    "childComplete" , "childEdit"
])

const completeTask = () => {
    emit("childComplete", props.task)
}

//Variable para usar la tienda fácil
const taskStore = useTaskStore();

//Variable para recibir información de la tarea mediante prop como .Objeto
const props = defineProps({
    task: Object,
});

//Función para mostrar y ocultar inputs

const inputContainer = ref(false);
const currentTaskTitle = ref(props.task.title);
const currentTaskDescription = ref(props.task.description);
const showInput = () => {
    inputContainer.value = !inputContainer.value
}

// Función con validación + envío de datos y eventos mediante emit
const editTask = () => {
    if(currentTaskTitle.value.length === 0 || currentTaskDescription.value.length === 0){
        alert("Title or description can not be empty")
    }else{
        const newTaskEdited = {
            title : currentTaskTitle.value,
            description : currentTaskDescription.value,
            id: props.task.id
        };
        emit('childEdit', newTaskEdited );
        inputContainer.value = !inputContainer.value

    }
}


// Función para borrar la tarea a través de la store.
const deleteTask = async() => {
    await taskStore.deleteTask(props.task.id);
};

const completedTask = ref(false)

const showModal = ref(false);
const showModalToggle = () => {
  showModal.value = !showModal.value;
};
</script>

<style>

.case2{
    text-decoration: none;
}
.case1{
    text-decoration: line-through;
}

</style>
