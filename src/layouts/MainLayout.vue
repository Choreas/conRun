<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <p
            id="clock"
            style="text-align: left; height: 100%; margin: 10px"
          ></p>
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

    <q-footer>
      <q-tabs v-model="tab" inline-label outside-arrows mobile-arrows>
        <q-route-tab
          name="move"
          icon="fas fa-heartbeat"
          to="/"
          :disable="this.$route.path == '/Activity'"
        />
        <q-route-tab
          name="statistics"
          icon="fas fa-chart-line"
          to="/statistics"
          :disable="this.$route.path == '/Activity'"
        />
      </q-tabs>
    </q-footer>
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
  setup(props, { root }) {
    const showInfo = ref(false);
    const tab = ref('statistics');

    setInterval(() => {
      let timeStamp = Date.now();
      let formattedString = date.formatDate(timeStamp, 'HH:mm:ss');
      var clock = document.getElementById('clock')!;
      clock.innerHTML = formattedString;
    }, 1000);

    return { showInfo, tab };
  },
});
</script>

<style>
.actionBar,
.statisticBar {
  display: inline-block;
  width: 50%;
  height: 60px;
}
.actionIcon,
.statisticIcon {
  width: 100%;
  height: 100%;
}
</style>
