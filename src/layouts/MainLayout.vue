<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <!--set timer -->

        <q-toolbar-title>
          <p id="clock" style="text-align: left; vertical-align: middle"></p>
        </q-toolbar-title>

        <q-btn icon="fa fa-info-circle" @click="showInfo = !showInfo" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-dialog v-model="showInfo" auto-close>
        <app-info />
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import AppInfo from 'pages/AppInfo.vue';
import { date } from 'quasar';

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppInfo,
  },
  setup() {
    const showInfo = ref(false);

    setInterval(() => {
      let timeStamp = Date.now();
      let formattedString = date.formatDate(timeStamp, 'HH:mm:ss');
      var clock = document.getElementById('clock')!;
      clock.innerHTML = formattedString;
    }, 1000);

    return { showInfo };
  },
});
</script>
