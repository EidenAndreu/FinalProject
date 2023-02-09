import { defineStore } from "pinia";
import { supabase } from "../supabase";


// Esta tienda utiliza el Options API
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      if(user) {
        this.user = user;
        const { data: profile } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0];
        console.log('user in store: ', this.user);
        console.log('profile in store: ', this.profile);
      }
    },

    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);

        const { data: profile } = await supabase.from('profiles').insert([
          {
            user_id: this.user.id,
            username: email
          }
        ])
      }
    },

    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      },
      {
        shouldCreateUser: false,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0];
        console.log('profile in store: ', profile);
      }
    },

    async signOut(){
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  

  async editProfile(updatedName, updatedWebsite, updatedAvatar) {
    if (updatedName === null) {
      updatedName = this.profile.name;
    }
    if (updatedWebsite === null) {
      updatedWebsite = this.profile.website;
    }
    if (updatedAvatar === null) {
      updatedAvatar = this.profile.image_src;
    }
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: updatedName,
        website: updatedWebsite,
        image_src: updatedAvatar,
      })
      .match({ id: this.profile.id });
  },
},

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
