<template>
  <q-page>
    <div class="activityContainer" :style="getBgColor()">
      <q-icon class="activityIcon" :name="getIcon()" :style="getIconColor()" size="85px"/>
      <q-icon class="timerIcon" :style="getIconColor()" name="timer" size="85px"/>
    </div>
    <div class="runbuttons">
      <q-btn class="pausebtn" :style="getBgColor()" rounded icon="fas fa-pause" size="50px" @click="test()"/>
      <q-btn class="finishbtn" :style="getBgColor()" rounded icon="fas fa-flag-checkered" size="50px"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent} from '@vue/composition-api';
import {METHODS} from 'http';
import {colors} from 'quasar';


export default defineComponent({
  name: 'Activity',
  props: {
    activity: String,
  },
  components: {},

  setup(props, {root}) {
    function test(): void {
      console.log(props.activity);
    }

    function getIcon(): string | undefined {
      switch (props.activity) {
        case 'run': {
          return 'directions_run';
        }
        case 'walk': {
          return 'directions_walk';
        }
        case 'cycle': {
          return 'directions_bike';
        }
      }
      return undefined;
    }

    function getIconColor(): object | undefined {
      const iconStyle = {color:''};
        
      switch (props.activity) {
        case 'run': {
          iconStyle.color = '#E4032E';

          break;
        }
        case 'walk': {
          iconStyle.color = '#004F9F';

          break;
        }
        case 'cycle': {
          iconStyle.color = '#00983A';
          
          break;
        }
      }
      return iconStyle;
    }

    function getBgColor(): object | undefined {
      const bgColor = {background:''};
        
      switch (props.activity) {
        case 'run': {
          bgColor.background = '#E898A8';

          break;
        }
        case 'walk': {
          bgColor.background = '#8DB5DE';

          break;
        }
        case 'cycle': {
          bgColor.background = '#85D1A2';
          
          break;
        }
      }
      return bgColor;
    }

    return {test, getIcon, getIconColor, getBgColor};

  }
});
</script>

<style>
  .activityContainer{
    height: 43vh;
    width: 90%;
    border-radius: 20%;
    margin: auto;
    margin-top: 13%;
    position: relative;
    margin-bottom: 5%;
  } 

  .activityIcon{
    height: 20vh;
    width: 100%;
  }

  .timerIcon{
    margin: 10% 0% 0% 5%;
  }

  .pausebtn, .finishbtn{ 
    color: white;
    height: 20vh;
    width: 40%;
    border-radius: 20%;
    margin: 4.5%;
  }

  .runbuttons{
  text-align: center;
  }
</style>
