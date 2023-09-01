<template>
  <div
    :class="pageLoading ? 'page-loading' : ''"
    class="messages-container">
    <template v-if="$route.params.id && userDetail">
      <template v-if="pageLoading">
        <div class="display-flex justify-center align-center h-100 w-100">
          <v-progress-circular  :size="128" :width="12" indeterminate></v-progress-circular>
        </div>

      </template>
      <template v-else>
        <v-toolbar color="primary">
          <template v-slot:prepend>
            <v-avatar @click="changeTargetUserStatus(true)" color="grey-lighten-1">
              <v-img
                v-if="userDetail.image"
                alt="Avatar"
                :src="userDetail.image"
              ></v-img>
              <v-icon v-else color="white">mdi-person</v-icon>
            </v-avatar>
          </template>
          <template v-slot:title>
            <template v-if="searchOpen">
              <v-text-field
                placeholder="Ara"
                variant="underlined"
                v-model="searchText">
                <template v-slot:append>
                  <v-icon @click="() => {searchOpen = false;}">mdi-close</v-icon>
                </template>
              </v-text-field>
            </template>
            <h5 v-else @click="changeTargetUserStatus(true)">{{userDetail.name}}</h5>
          </template>
          <template v-slot:append>
            <template v-if="!searchOpen">
              <v-btn @click="() => {searchOpen = true;}" icon>
                <v-icon>
                  mdi-magnify
                </v-icon>
              </v-btn>
              <v-btn @click="() => {$router.push('/')}" icon>
                <v-icon>
                  mdi-arrow-left
                </v-icon>
              </v-btn>
            </template>
          </template>
        </v-toolbar>
        <v-virtual-scroll
          class="virtual-scroll-height mt-4 ml-4 mr-2 pb-5"
          :items="messages"
        >
          <template v-slot:default="{ item }">
            <div :class="item.sender === 1 ? 'message-right' : 'message-left'"
              class="my-2">
              <div
                v-html="highlightText(item.text)"
                :class="item.sender === 1 ? 'primary' : 'secondary'"
                class="chat-balloon">

              </div>

            </div>

          </template>
        </v-virtual-scroll>
        <v-text-field
          v-model="messageText"
          @keyup.enter="sendMessage" class="mt-5" label="Mesaj" variant="outlined">
          <template v-slot:append>
            <v-icon @click="sendMessage">mdi-send</v-icon>
          </template>
        </v-text-field>
      </template>
    </template>
    <template v-else>
      <v-container class="justify-center align-center align-items-center">
        <h1 class="text-center">Hoşgeldiniz</h1>
      </v-container>
    </template>

  </div>
</template>
<style lang="scss">
  .chat-balloon {
    &.secondary {
      background-color: #19ea065F !important;
      color: #1450e0 !important;
    }
    &.primary {
      background-color: rgba(6, 234, 215, 0.37) !important;
      color: #1450e0 !important;
    }
    max-width: 250px!important;
    border-radius: 10px;
    padding: 4px 10px;
    overflow: hidden;
  }
  .message-left, .message-right {
    display: flex;
    align-items: center;
  }
  .message-left {
    justify-content: left;
  }
  .message-right {
    justify-content: right;
  }
  .display-flex {
    display: flex;
  }
  .messages-container {
    height: calc(100vh - 72px)!important;
    border-radius: 20px;

    &:not(.page-loading) {
      display: grid;
      grid-template-rows: 60px 1fr 60px;
    }
    .v-text-field {
      .v-input__slot::after {
        border-bottom: none !important;
      }
    }
  }
</style>
<script>
import {mapActions, mapState} from "pinia/dist/pinia";
import {useAppStore} from "@/store/app";

export default {
  name: "Messages",
  data() {
    return {
      messages: [],
      messageText: '',
      searchOpen: false,
      searchText: '',
      pageLoading: true,
    }
  },
  computed: {
    ...mapState(useAppStore, ['currentUser']),
    ...mapState(useAppStore, ['userDetail'])
  },
  watch: {
    '$route.params.id': function (newId) {
      this.pageLoading = true;
      this.getChatMessages(newId).then((data) => {
        this.pageLoading = false;
        this.messages = data;
      }).catch((e) => {
        this.toastError(e.message);
      });
    },
    'currentUser': function (newId) {
      this.getChatMessages(this.$route.params.id).then((data) => {
        this.pageLoading = false;
        this.messages = data;
      }).catch((e) => {
        this.toastError(e.message);
      });
    },
  },
  methods: {
    highlightText(text) {
      if (!this.searchText) return text; // If the search term is empty, return the original text.

      // Use regular expression to match the search term in the text and wrap it with a <span> element with a black background.
      return text.replace(
        new RegExp(`(${this.searchText})`, 'gi'),
        '<span style="background-color: black; color: white;">$1</span>'
      );
    },
    sendMessage() {
      this.messages.push({
        sender: this.currentUser.id,
        text: this.messageText
      }); // not calling any request because text are custom data
      this.messageText = "";
    },
    ...mapActions(useAppStore, ['getChatMessages']),
    ...mapActions(useAppStore, ['toastError']),
    ...mapActions(useAppStore, ['changeTargetUserStatus'])
  }
}
</script>
