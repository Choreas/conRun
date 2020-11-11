<template>
  <q-page class="row items-center justify-evenly">
    <div class="runcontainer">
      <q-icon class="runicon" name="directions_run" size="85px"/>
      <q-icon class="timericon" name="timer" size="85px"/>
    </div>
    <div class="runbuttons">
      <q-btn class="pausebtn" rounded icon="fas fa-pause" size="50px"/>
      <q-btn class="finishbtn" rounded icon="fas fa-flag-checkered" size="50px"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent} from '@vue/composition-api';


export default defineComponent({
  name: 'Homepage',
  components: {},

  setup(props, {root}) {
    
    
    return {};

  }
});
</script>

<style>
  .runcontainer{
    height: 300px;
    width: 350px;
    background-color: #E898A8;
    border-radius: 30px;
    margin: 0 auto;
    position: absolute;
    top: 67px;

  }

  .runicon{
    position: absolute;
    left: 132px;
    top: 37px;
    color: #E4032E;
  }

  .timericon{ 
    position: absolute;
    top: 170px;
    left: 20px;
    color: #E4032E;
  }

  .pausebtn{ 
    background-color:#E898A8;
    position: absolute;
    color: white;
    top: 380px;
    left: 20px;
    height: 140px;
    width: 168px;
    border-radius: 30px;
  }

  .finishbtn{ 
    background-color:#E898A8;
    position: absolute;
    color: white;
    top: 380px;
    left: 203px;
    height: 140px;
    width: 168px;
    border-radius: 30px;
  }
</style>
