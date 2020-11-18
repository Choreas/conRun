<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          conRun
        </q-toolbar-title>

        <q-btn icon="fa fa-info-circle" @click="showInfo = !showInfo"/>
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
import {defineComponent, ref } from '@vue/composition-api';
import AppInfo from 'pages/AppInfo.vue';

export default defineComponent({
  name: 'MainLayout',
  components: { 
    AppInfo
  },
  setup() {
    const showInfo = ref(false);

    return {showInfo}
  }
});
</script>
