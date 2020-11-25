<template>
  <q-page class="maindiv">
    <q-btn class="runbtn" rounded icon="directions_run" size="50px" @click="openActivityScreen('run')"/>
    <q-btn class="walkbtn" rounded icon="directions_walk" size="50px" @click="openActivityScreen('walk')"/>
    <q-btn class="bikebtn" rounded icon="directions_bike" size="50px" @click="openActivityScreen('cycle')"/>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';

export default defineComponent({
  name: 'Move',
  components: {},

  setup(props, {root}) {

    function openActivityScreen(activityName: string): void {
      root.$router.push({name: 'Activity', params: {activity: activityName}});
    }
    
    return {openActivityScreen};

  }
});
</script>

<style>
  .maindiv{
    position: relative;
    width: 90%; 
    margin: auto;
  }

  .runbtn{
    background-color: #E898A8;
    color: #E4032E;
    height: 20vh;
    width: 100%;
    margin-top: 13%;
  }

   .walkbtn{
    background-color: #8DB5DE;
    color: #004F9F;
    height: 20vh;
    width: 100%;
    margin-top: 13%;
  }

  .bikebtn{
    background-color: #85D1A2;
    color: #00983A;
    height: 20vh;
    width: 100%;
    margin-top: 13%;
  }
</style>
