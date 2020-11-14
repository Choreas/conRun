<template>
  <q-page>
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
  name: 'runPage',
  components: {},

  setup(props, {root}) {
    
    
    return {};

  }
});
</script>

<style>
  .runcontainer{
    height: 43vh;
    width: 90%;
    background-color: #E898A8;
    border-radius: 50%;
    margin: auto;
    margin-top: 13%;
    position: relative;
    margin-bottom: 5%;
  }

  .runicon{
    height: 20vh;
    width: 100%;
    color: #E4032E;
  }

  .timericon{
    color: #E4032E;
    margin-left: 10%;
    margin-top: 10%;
  }

  .pausebtn{ 
    background-color:#E898A8;
    color: white;
    height: 20vh;
    width: 40%;
    border-radius: 20%;
    margin: 3.5%;

  }

  .finishbtn{ 
    background-color:#E898A8;
    color: white;
    height: 20vh;
    width: 40%;
    border-radius: 20%;
    margin: 3.5%

  }

  .runbuttons{
  text-align: center;
  }
</style>
