<template>
  <v-app>
    <user-detail></user-detail>
    <v-main>
      <v-snackbar
        v-model="snackbarError"
        color="error"
        top
        timeout="5000"
      >
        {{snackbarErrorMessage}}
      </v-snackbar>
      <v-container  class="h-100">
        <template v-if="pageLoading">
          <div class="display-flex justify-center align-center h-100 w-100">
            <v-progress-circular  :size="128" :width="12" indeterminate></v-progress-circular>
          </div>

        </template>
        <template v-else>
          <template v-if="!error">
            <v-row>
              <v-col
                :class="$route.params.id ? 'hidden-sm hidden-xs' : ''"
                lg="3"
                xl="3"
                md="4"
                xxl="3"
                sm="12"
                xs="12"
                cols="12">
                <users-list></users-list>
              </v-col>
              <v-col
                :class="!$route.params.id ? 'hidden-sm hidden-xs' : ''"
                lg="9"
                xl="9"
                md="8"
                xxl="9"
                sm="12"
                xs="12"
                cols="12">
                <router-view />
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <v-card class="h-100">
              <v-card-title>
                Hata
              </v-card-title>
              <v-card-text>
                <v-alert
                  color="error"
                  dark
                  text
                >
                  {{errorMessage}}
                </v-alert>
              </v-card-text>
            </v-card>
          </template>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>
<style lang="scss">
  .display-flex {
    display: flex;
  }
  .v-application, .v-layout {
    background-color: #e9e9e9!important;
  }
</style>
<script>
import UsersList from "@/components/UsersList";
import {useAppStore} from "@/store/app";
import { mapActions } from 'pinia'
import {mapState} from "pinia/dist/pinia";
import UserDetail from "@/components/UserDetail";

export default {
  name: "Desktop",
  components: {UserDetail, UsersList},
  data() {
    return {
      pageLoading: true,
      error: false,
      errorMessage: '',
    }
  },
  computed: {
    ...mapState(useAppStore, ['snackbarError']),
    ...mapState(useAppStore, ['snackbarErrorMessage'])
  },
  mounted() {
    this.pageLoading = true;
    this.getMessagedUsers().then(() => {
      this.pageLoading = false;
    }).catch((e) => {
      this.error = true;
      this.errorMessage = e.message;
    });
    this.getAuthUser().then(() => {
      this.pageLoading = false;
    }).catch((e) => {
      this.error = true;
      this.errorMessage = e.message;
    });
  },
  methods: {
    ...mapActions(useAppStore, ['getMessagedUsers']),
    ...mapActions(useAppStore, ['getAuthUser']),
  }
}
</script>

<style scoped>

</style>
