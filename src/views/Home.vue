<template>
  <div class="wrapper">
    <div class="navBar">
    <Nav />
  </div>
  <br/><br/>

    <div class="content"> 
      <!-- <h3>Your account:</h3>
      <router-link to="/account">Account</router-link> -->
    
    <NewTask class="newTask"/>
  </div>
  <div>
    <h1 class="h1Tasks">Tasks:</h1>
  </div>
    <div class="flex-container">
    <TaskItem  class="taskBox" v-for="task in tasks" :key="task.id" :task="task" @child-complete="completeTaskSupabase" @child-edit="editTaskSupabase"/>
    </div>
   
  </div>
</template>

<script setup>
import { ref, onUpdated } from 'vue';
import { useTaskStore } from "../stores/task";
import { useRouter } from 'vue-router';
import Nav from '../components/Nav.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';


const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);

// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async() => {
  tasks.value = await taskStore.fetchTasks();
};

getTasks();

onUpdated(() => {
  getTasks()
})

//Funcion para completar tarea conectandose a Supabase
const completeTaskSupabase = async (taskObject) => {
  // initial log to verifiy that is connected
/*   console.log("click me"); */
  // log to verifiy that we are recievign the data from the childComp named "taskItem" and view it on the console
 /*  console.log(taskObject.id);
  console.log(taskObject.is_complete); */
  // variable to store the OPPOSITE value of the data received from the child component with the logical operator "!" !===opposite
  let changeTaskBooleanValue = !taskObject.is_complete;
  let taskId = taskObject.id;
  // log to verify that we have changed correctly the value of the recived data
 /*  console.log(changeTaskBooleanValue, taskId); */
  await taskStore.completeTask(changeTaskBooleanValue, taskId);
  //getTasks();
};

//Función para editar tarea conectándose con supabase
const editTaskSupabase = async (editedTaskObject) => {
 /*  console.log("click");
  console.log(editedTaskObject); */
  await taskStore.editTask(editedTaskObject.title, editedTaskObject.description, editedTaskObject.id)


}

</script>

<style></style>