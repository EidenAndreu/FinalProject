<template>
  <div class="profile-page">
  <Nav />
  <div class="profile-container">
  <div class="login-container">
    <div class="login-text">
    <h3>Name: {{ username ? username.split("@")[0] : username}}</h3>
    <h3>e-mail: {{ email}}</h3>
    <h3>Website: {{ website }}</h3>
    <button class="edit-button" @click="editOption">Edit Profile</button>
  </div>
  
  <div class="editBtnAccount">
    <img class="profile-picture" :src="avatar_url ? avatar_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
    
    </div>
  </div>
</div>
</div>
<Footer />
</template>

<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';
  import { useRouter } from "vue-router";
  import Footer from "../components/Footer.vue";
  const userStore = useUserStore();

  const loading = ref(false);
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);
  const redirect = useRouter();
  const email = ref(null)


  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    avatar_url.value = userStore.profile.image_src;
    website.value = userStore.profile.website;
    email.value = supabase.auth.user().email;

  }

  async function signOut() {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  const editOption = () => {
  /* console.log("click"); */
  redirect.push({ path: "/edit" });
};
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}



</style>