<template>
  
    <Nav />
    <Account />
    <div class="editProfileDiv">
      <label for="">Name:</label
      ><input type="text" name="" id="" v-model="updatedName" />
      <label for="">Website:</label
      ><input type="text" name="" id="" v-model="updatedWebsite" />
      <label for="">Avatar url:</label
      ><input type="text" name="" id="" v-model="updatedAvatar" />
      <button class="buttonChanges" @click="updateProfile">Save changes</button>
    </div>
    <Footer />
  </template>
  
  <script setup>
  import { supabase } from "../supabase";
  import { onMounted, ref, toRefs } from "vue";
  import { useUserStore } from "../stores/user";
  import Nav from "../components/Nav.vue";
  import { useRouter } from "vue-router";
  import Footer from "../components/Footer.vue"
  
  const userStore = useUserStore();
  
  const loading = ref(false);
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);
  const name = ref(null);
  const updatedName = ref(username);
  const updatedWebsite = ref(website);
  const updatedAvatar = ref(avatar_url);
  
  const redirect = useRouter();
  
  onMounted(() => {
    getProfile();
  });
  
  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    avatar_url.value = userStore.profile.image_src;
    website.value = userStore.profile.website;
    name.value = userStore.profile.name;
  }
  
  async function signOut() {
    try {
      loading.value = true;
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      loading.value = false;
    }
  }
  
  const updateProfile = async () => {
    await userStore.editProfile(
      updatedName.value,
      updatedWebsite.value,
      updatedAvatar.value
    );
    updatedName.value = "";
    updatedWebsite.value = "";
    updatedAvatar.value = "";
    redirect.push({ path: "/account" });
  };
  </script>

  <style>
    /* Estilos para la etiqueta label */
    label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  /* Estilos para el input de tipo texto */
  input[type="text"] {
    display: block;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
  }

  /* .inputGroup{
    width: 50%;
  border: 1px solid #ccc;
  padding: 10px;
  }

  .input-field{
    width: 100%;
  border: none;
  outline: none;
  } */

  
  
  /* Estilos para el botón de guardar cambios */
  .buttonChanges {
    display: block;
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .editProfileDiv{
    min-height: 53.5vh;
    margin-left: 25vw;
    margin-top: 10vw;
    background-image: url("src\img\Paper.png")
  }

  @media (max-width: 600px) {

    
    /* Alinear los campos de nombre, sitio web y avatar en columnas */
    label, input[type="text"] {
      display: block;
      width: 50%;
      margin-bottom: 1rem;
    }
    
    /* Alinear el botón de guardar cambios en el centro */
    button {
      margin: 1rem auto;
    }

    .editProfileDiv {
  /* max-width: 600px; */
 /*  margin: 0 auto; */
  margin-top: 5vw;
    margin-left: 15vw;
    margin-right: 12vw;
    display: flex;
    flex-direction: column;
}
input[type="text"] {
    width: 80%;
    min-width: 50vw;
    box-sizing: border-box;
    
}


  }
  
 </style>