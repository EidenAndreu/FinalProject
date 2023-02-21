<template>
  <nav>
    <button @click="toggleMenuHamburger" class="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <router-link to="/">
      <img class="imgNav" style="width: 5vw;" src="../img/to-do-list.png" alt="">
    </router-link>

    <span class="navRouters nav-menu" :class="{ active: showMenu }">
      <router-link v-if="showMenu" to="/" class="navBtn">Task Manager</router-link>

      <router-link v-if="showMenu" to="/account" class="navBtn">Your Account</router-link>
    </span>

    <div>
      <button @click="signOut" class="logout-button">Log out</button>
    </div>
  </nav>
</template>

<script setup>
  import { useUserStore } from "../stores/user";
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { ref, onMounted } from "vue";
  
  const showMenu = ref(false);
  
  const toggleMenuHamburger = () => {
    showMenu.value = !showMenu.value;
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");
  };

 /*  const toggleMenuHamburger = () => {
    showMenu.value = !showMenu.value;
  }; */

  const getUser = useUserStore().user;
  const userEmail = getUser.email;

  const redirect = useRouter();

  const signOut = async () => {
    try {
      await useUserStore().signOut();
      redirect.push({ path: "/auth/login" });
    } catch (error) {}
  };

</script>


<style>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.imgNav {
  width: 5vw;
  max-width: 100%;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navBtn {
  margin: 1rem;
  color: #777;
  text-decoration: none;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.navBtn.active {
  color: #000;
  font-weight: bold;
}

.button {
  background-color: #2962ff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.button:hover {
  background-color: #0039cb;
}

.hamburger {
  display: none;
  cursor: pointer;
  padding: 10px;
  background-color: transparent;
  border: none;
}

.hamburger span {
  display: block;
  width: 30px;
  height: 3px;
  margin: 6px auto;
  background-color: #000;
  transition: transform 0.2s ease-out;
}

.hamburger.active span:first-of-type {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.active span:nth-of-type(2) {
  opacity: 0;
}

.hamburger.active span:last-of-type {
  transform: translateY(-9px) rotate(-45deg);
}


@media (max-width: 768px) {
  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    width: 100%;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }

  .nav-menu.active {
    display: flex;
  }

  .navBtn {
    display: block;
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }

  .button {
    display: block;
    width: 100%;
    text-align: center;
  }
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

  .hamburger.active span {
    background-color: #fff;
  }
}

</style>
