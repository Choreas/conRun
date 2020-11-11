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
          <p id="clock" style="text-align: left; height: 100%; margin: 10px;"></p>
        </q-toolbar-title>

        <q-btn icon="fa fa-info-circle" @click="showInfo = !showInfo" />
      </q-toolbar>
    </q-header>

    <q-footer>
      <div id="action" class="actionBar">
        <q-btn class="actionIcon" icon="fas fa-heartbeat" @click="toMove" />
      </div>
      <div id="statistic" class="statisticBar">
        <q-btn
          class="statisticIcon"
          icon="fas fa-chart-line"
          @click="toStatistic"
        />
      </div>
    </q-footer>

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
  setup(props, { root }) {
    const showInfo = ref(false);

    setInterval(() => {
      let timeStamp = Date.now();
      let formattedString = date.formatDate(timeStamp, 'HH:mm:ss');
      var clock = document.getElementById('clock')!;
      clock.innerHTML = formattedString;
    }, 1000);

    function toMove(): void {
      root.$router.push('/');
    }

    function toStatistic(): void {
      root.$router.push('statistics');
    }
    return { showInfo, toMove, toStatistic };
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
.actionIcon, .statisticIcon{
  width: 100%;
  height: 100%;

}

</style>
