<template>
  <q-page>
    <div class="activityContainer" :style="getBgColor()">
      <q-icon class="activityIcon" :name="getIcon()" :style="getIconColor()" size="85px"/>
      <div class="row">
        <div class="col">
          <q-icon class="timerIcon" :style="getIconColor()" name="timer" size="85px"/>
        </div>
        <div class="col timercontent">
          {{elapsedTime}} 
          <br>
          {{traveledDistance}} m
        </div>
      </div>
    </div>
    <div class="runbuttons">
      <q-btn class="pausebtn" :style="getBgColor()" rounded icon="fas fa-pause" size="50px"/>
      <q-btn class="finishbtn" :style="getBgColor()" rounded icon="fas fa-flag-checkered" size="50px" @click="finish()"/>
    </div>
    <q-dialog v-model="finishbtn" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card>
        <q-card-section>
          <div class="text-h6">Congratulations!</div>
        </q-card-section>

        <q-card-section align="center">
          {{elapsedTime}}
          <br> 
          Your Distance: {{traveledDistance}} m
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="routeToStatistics()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, onUnmounted, ref} from '@vue/composition-api';
import moment from 'moment';
import { Loading } from 'quasar';
import dbDataHandler from 'src/helpers/dbDataHandler';
import { track } from 'src/helpers/track';
import { ActivityType } from '../helpers/interfaces';

export default defineComponent({
  name: 'Activity',
  props: {
    activity: String,
  },
  components: {},

  setup(props, {root}) {
    let distanceCallback: CallableFunction;
    const intervals: NodeJS.Timeout[] = [];
    const startTimestamp = ref(0);
    const currentTimestamp = ref(moment());
    const traveledDistance = ref(0);
    const finishbtn = ref(false);

    const elapsedTime = computed( () => {
      if (startTimestamp.value === 0) return "00:00:00 ''00";
      const duration = moment.duration(currentTimestamp.value.diff(moment(startTimestamp.value)));
      let   hours = duration.hours().toString(),
            minutes = duration.minutes().toString(),
            seconds = duration.seconds().toString(),
            milliSeconds = duration.milliseconds().toString().substring(0, 2);
      return `${hours.length === 1 ? '0' : ''}${hours}:${minutes.length === 1 ? '0' : ''}${minutes}:${seconds.length === 1 ? '0' : ''}${seconds} ''${milliSeconds.length === 1 ? '0' : ''}${milliSeconds}`;
    } );

    async function finish(): Promise<void> {
      Loading.show();
      try {
        clearIntervals();
        const finalResult = track.finishTracking();
        await dbDataHandler.insertTracking({
          startTimestamp: finalResult.start.valueOf(),
          endTimestamp: finalResult.end.valueOf(),
          activity: finalResult.activity,
          distance: finalResult.distance
        });
        traveledDistance.value = finalResult.distance;
        finishbtn.value = true;
      } catch (e) {
        console.log('ERROR when trying to finish tracking. Message: ', e.message);
        root.$router.push('/');
      } finally {
        Loading.hide();
      }
    }

    function routeToStatistics(): void {
      root.$router.push('/statistics');
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

    onMounted( () => {
      document.addEventListener("backbutton", (e: any) => {
        e.preventDefault();
      }, true);

      const trackingData = track.startTracking(props.activity as ActivityType);
      distanceCallback = trackingData.distanceCallback;
      startTimestamp.value = trackingData.startMoment;

      intervals.push(setInterval( () => {
        currentTimestamp.value = moment();
      }, 100 ));

      intervals.push(setInterval( () => {
        traveledDistance.value = distanceCallback();
      }, 8000 )); 
    } );

    function clearIntervals(): void {
      for (const interval of intervals) {
        clearInterval(interval);
      }
    }

    onUnmounted( () => {
      clearIntervals();
      try {
        track.finishTracking();
        console.log('Page was unmounted wrongly. Tracking has been ended now.');
      } catch (e) {
        console.log('Page was cleanly unmounted.')
      }
    } );

    return {getIcon, getIconColor, getBgColor, elapsedTime, traveledDistance, finishbtn, finish, routeToStatistics};

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

  .timercontent {
    margin: 10% 0% 0% 5%;
    font-size: 19px;
  }
</style>
