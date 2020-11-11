<template>
  <q-page class="row items-center justify-evenly">
    <div class="buttons">
      <q-btn class="runbtn" rounded icon="directions_run" size="50px" @click="runbtn"/>
      <q-btn class="walkbtn" rounded icon="directions_walk" size="50px"/>
      <q-btn class="bikebtn" rounded icon="directions_bike" size="50px"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent} from '@vue/composition-api';

export default defineComponent({
  name: 'Move',
  components: {},

  setup(props, {root}) {

    function runbtn(): void {
      root.$router.push('Runpage')
    }
    
    return {runbtn};

  }
});
</script>

<style>

  .buttons{
    height: 280px;
    width: 350px;
    border-radius: 30px;
    margin: 0 auto;
    position: absolute;
    top: 67px;
  }

  .runbtn{
    background-color: #E898A8;
    color: #E4032E;
    height: 160px;
    width: 350px;
    display: block;
  }

  .walkbtn{
    background-color: #8DB5DE;
    color: #004F9F;
    height: 160px;
    width: 350px;
    display: block;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .bikebtn{
    background-color: #85D1A2;
    color: #00983A;
    height: 160px;
    width: 350px;
    display: block;
  }

</style>
