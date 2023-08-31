<template>
  <v-container>
    <v-list class="bg-transparent">
      <v-list-item
        class="my-3 cursor-pointer" >
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-img
              v-if="currentUser.image"
              alt="Avatar"
              :src="currentUser.image"
            ></v-img>
            <v-icon v-else color="white">mdi-person</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title>{{currentUser.name}}</v-list-item-title>

        <template v-slot:append>
          <v-icon>mdi-cogs</v-icon>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list v-if="currentUser" class="bg-transparent">

      <v-list-subheader>Mesajlar</v-list-subheader>
      <template v-for="(u, k) in messagedUsers">
        <v-list-item
          v-if="currentUser.id !== u.id"
          @click="() => {$router.push('/' + u.messageId)}"
          class="my-3 cursor-pointer" >
          <template v-slot:prepend>
            <v-avatar color="grey-lighten-1">
              <v-img
                v-if="u.image"
                alt="Avatar"
                :src="u.image"
              ></v-img>
              <v-icon v-else color="white">mdi-person</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>{{u.name}}</v-list-item-title>
          <v-list-item-subtitle>
            {{u.lastMessage}}
          </v-list-item-subtitle>
          <template v-slot:append>
            <span class="v-list-item-subtitle">
              {{calcMessageTime(u.lastMessageTime)}}
            </span>

          </template>
        </v-list-item>
        <v-divider v-if="k !== messagedUsers.length - 1 && currentUser.id !== u.id"></v-divider>
      </template>
    </v-list>
  </v-container>
</template>
<style>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
<script>
import { mapState } from 'pinia'
import {useAppStore} from "@/store/app";

export default {
  name: "UsersList",
  computed: {
    ...mapState(useAppStore, ['messagedUsers']),
    ...mapState(useAppStore, ['currentUser'])
  },
  methods: {
    calcMessageTime(time) {
      const timestamp = time * 1000;
      const currentDate = new Date();
      const timeDifference = currentDate - timestamp;

      const minute = 60 * 1000;
      const hour = minute * 60;
      const day = hour * 24;
      const week = day * 7;
      const year = day * 365;

      if (timeDifference < minute) {
        return 'Just now';
      } else if (timeDifference < hour) {
        const minutesAgo = Math.floor(timeDifference / minute);
        return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
      } else if (timeDifference < day) {
        const hoursAgo = Math.floor(timeDifference / hour);
        return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
      } else if (timeDifference < week) {
        const daysAgo = Math.floor(timeDifference / day);
        if (daysAgo === 1) {
          return 'Yesterday';
        } else {
          return `${daysAgo} days ago`;
        }
      } else if (timeDifference < year) {
        const weeksAgo = Math.floor(timeDifference / week);
        return `${weeksAgo} week${weeksAgo !== 1 ? 's' : ''} ago`;
      } else {
        const yearsAgo = Math.floor(timeDifference / year);
        return `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
      }
    }
  }
}
</script>

<style scoped>

</style>
