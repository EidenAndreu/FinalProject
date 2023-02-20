<template>
 <nav>
    <router-link to="/">
      <img class="imgNav" style="width: 5vw;" src="../img/to-do-list.png" alt="">
    </router-link>

   <!--  <button class="hamburger" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button> -->

    <ul class="navRouters nav-menu" :class="{ active: showMenu }">
      <li>
        <router-link to="/" class="navBtn">Task Manager</router-link>
      </li>
      <li>
        <router-link to="/account" class="navBtn">Your Account</router-link>
      </li>
    </ul>

    <div>
      <ul class="logOutBox">
        <li class="log-out-welcome">
          <p>Welcome, {{ userEmail.split("@")[0] }}</p>
        </li>
        <li>
          <button @click="signOut" class="button">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{
    await useUserStore().signOut();
    redirect.push({ path: "/auth/login" });
  } catch (error) {}
};

/* onMounted(() => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  })
}); */


</script>

<style>
.navbar-img {
  width: 90px;
}

nav {
  /* background-color: lightgray; */
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

nav ul {
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hamburger {
  display: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-menu {
    display: none;
  }

  .nav-menu.active {
    display: flex;
    flex-direction: column;
  }
}

</style>
