<template>
  <v-navigation-drawer
    v-bind:width="width"
    v-model="userDrawer"
    temporary
  >
    <template v-if="userDetail">
      <v-list-item
        class="my-6"
        :prepend-avatar="userDetail.image"
        :title="userDetail.name"
      >
        <template v-slot:append>
          <v-btn icon @click="changeTargetUserStatus(false)">
            <v-icon >mdi-arrow-left</v-icon>
          </v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item prepend-icon="mdi-phone" :title="userDetail.phone"></v-list-item>
        <v-list-item :title="userDetail.about"></v-list-item>
      </v-list>


      <h4 class="px-3 my-6">Paylaşılan Medya</h4>
      <v-row class="px-3">
        <v-col
          v-for="(item, i) in userDetail.sharedMedia"
          :key="i"
          cols="12"
          md="6"
        >
          <v-img
            :src="item"
            cover
            height="150"
            class="text-right pa-2"
          >
          </v-img>
        </v-col>
      </v-row>


      <h4 class="px-3 my-6">Oluşturulmuş gruplar</h4>

      <v-list density="compact" nav>
        <v-list-item v-for="ugn in userDetail.userGroupsNames">
          {{ugn}}
        </v-list-item>
      </v-list>

    </template>

  </v-navigation-drawer>
</template>

<script>
import {mapActions, mapState} from "pinia/dist/pinia";
import {useAppStore} from "@/store/app";

export default {
  name: "UserDetail",
  data() {
    return {
      width: window.innerWidth > 425 ? window.innerWidth / 2 : window.innerWidth
    }
  },
  computed: {
    ...mapState(useAppStore, ['userDetail']),
    ...mapState(useAppStore, ['userDrawer']),
  },
  methods: {
    ...mapActions(useAppStore, ['changeTargetUserStatus'])
  }
}
</script>

<style scoped>

</style>
