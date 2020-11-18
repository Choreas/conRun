<template>
  <q-page>
    <div class="activityContainer" :style="getBgColor()">
      <q-icon class="activityIcon" :name="getIcon()" :style="getIconColor()" size="85px"/>
      <q-icon class="timerIcon" :style="getIconColor()" name="timer" size="85px"/>
    </div>
    <div class="runbuttons">
      <q-btn class="pausebtn" :style="getBgColor()" rounded icon="fas fa-pause" size="50px"/>
      <q-btn class="finishbtn" :style="getBgColor()" rounded icon="fas fa-flag-checkered" size="50px" @click="finishbtn = true"/>
    </div>
    <q-dialog v-model="finishbtn" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card>
        <q-card-section>
          <div class="text-h6">Congratulations!</div>
        </q-card-section>

        <q-card-section align="center">
          01:25:50:11 <br> Your Distance: 6503 m
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';

export default defineComponent({
  name: 'Activity',
  props: {
    activity: String,
  },
  components: {},
  
  data () {
    return {
      finishbtn: false, 
    }
  },

  setup(props, {root}) {
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

    function getIconColor(): object {
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

    function getBgColor(): object {
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

    return {getIcon, getIconColor, getBgColor};

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
