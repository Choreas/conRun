<template>
  <q-page class="maindiv">
    <q-btn class="runbtn" rounded icon="directions_run" size="50px" @click="runbtn"/>
    <q-btn class="walkbtn" rounded icon="directions_walk" size="50px"/>
    <q-btn class="bikebtn" rounded icon="directions_bike" size="50px"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent} from '@vue/composition-api';

export default defineComponent({
  name: 'Move',
  components: {},

  setup(props, {root}) {

    function runbtn(): void {
      root.$router.push('runPage')
    }
    
    return {runbtn};

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
    margin-top: 15%;
  }

   .walkbtn{
    background-color: #8DB5DE;
    color: #004F9F;
    height: 20vh;
    width: 100%;
    margin-top: 15%;
  }

  .bikebtn{
    background-color: #85D1A2;
    color: #00983A;
    height: 20vh;
    width: 100%;
    margin-top: 15%;
  }
</style>
