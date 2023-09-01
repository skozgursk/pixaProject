<template>
  <v-navigation-drawer
    class="px-5 px-3"
    v-bind:width="width"
    v-model="userDrawer"
    temporary
  >
    <template v-if="userDetail">
      <v-card class="d-flex flex-column justify-center align-center mt-5 pa-2">
        <v-avatar
          class="my-5"
          color="surface-variant" size="100">
          <v-img
            v-if="userDetail.image"
            alt="Avatar"
            :src="userDetail.image"
          ></v-img>
        </v-avatar>

        <h4>
          {{userDetail.name}}
        </h4>
        <v-btn

          class="position-absolute back-button"
          icon @click="changeTargetUserStatus(false)">
          <v-icon >mdi-arrow-left</v-icon>
        </v-btn>
      </v-card>

      <v-card class="d-flex flex-row justify-start align-center mt-5 pa-5">
        <v-icon class="mr-4">mdi-phone</v-icon> {{userDetail.phone}}
      </v-card>
      <v-card class="d-flex flex-row justify-center align-center mt-5 pa-5">
        {{userDetail.about}}
      </v-card>

      <v-card class="d-flex flex-column justify-center align-center mt-5 pa-2">
        <h4 class="px-3 my-3">Paylaşılan Medya</h4>
        <div class="w-100">
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
        </div>
      </v-card>

      <v-card class="d-flex flex-column justify-center align-center mt-5 pa-3">
        <h4 class="px-3 my-2">Ortak gruplar</h4>
        <p v-for="ugn in userDetail.userGroupsNames">
          {{ugn}}
        </p>
      </v-card>


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
.v-navigation-drawer {
  background-color: rgb(236, 236, 236);
}
.back-button {
  top: 5px;
  right: 5px;
  border: unset!important;
  box-shadow: unset!important;
}
</style>
