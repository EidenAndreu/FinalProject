<template>
    <Nav />
    <div>
      <label for="">name</label
      ><input type="text" name="" id="" v-model="updatedName" />
      <label for="">website</label
      ><input type="text" name="" id="" v-model="updatedWebsite" />
      <label for="">avatar url</label
      ><input type="text" name="" id="" v-model="updatedAvatar" />
      <button @click="updateProfile">Save changes</button>
    </div>
  </template>
  
  <script setup>
  import { supabase } from "../supabase";
  import { onMounted, ref, toRefs } from "vue";
  import { useUserStore } from "../stores/user";
  import Nav from "../components/Nav.vue";
  import { useRouter } from "vue-router";
  
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
img {
  width: 200px;
  border-radius: 50%;
}</style>