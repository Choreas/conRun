<template>
  <div style="margin-top: 5%">
    <div class="statIcons">
      <div class="row">
        <div class="col">
          <q-icon name="fas fa-flag-checkered" size="25px" color="grey" /><br />
        </div>
        <div class="col1">
          {{getTotalDistance('total')}}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-icon name="directions_run" size="25px" color="red" /><br />
        </div>
        <div class="col1" style="color: red">
          {{getTotalDistance('run')}}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-icon name="directions_walk" size="25px" color="blue" /><br />
        </div>
        <div class="col1" style="color: blue">
          {{getTotalDistance('walk')}}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-icon name="directions_bike" size="25px" color="green" />
        </div>
        <div class="col1" style="color: green">
          {{getTotalDistance('cycle')}}
        </div>
      </div>
    </div>

    <q-chart
      v-if="chartRendered"
      identifier="chart"
      style="height: 30vh; width: 100%; margin: 15% 0% 0% 0%"
      type="bar"
      :datasets="generateDatasets()"
      :labels="labels"
      :options="options"
    />
    <div class="row naviDate">
      <q-btn
        class="return"
        @click="skipDate(-1)"
        flat
        round
        color="primary"
        icon="fas fa-caret-left"
        size="30px"
      />
        <q-input v-model="weekInputValue" type="week" name="week" id="camp-week" style="min-width: 30%" required @change="change()" />
      <q-btn
        class="next"
        @click="skipDate(1)"
        flat
        round
        color="primary"
        icon="fas fa-caret-right"
        size="30px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from '@vue/composition-api';
import QChart from 'quasar-components-chart';
import { ITrackResult } from 'src/helpers/track';
import moment from 'moment';
import { ActivityType } from 'src/helpers/interfaces';
import ActivityVue from './Activity.vue';
import { Loading } from 'quasar';
import dbDataHandler, { ITrackingRecord } from 'src/helpers/dbDataHandler';
import { IFilter } from 'src/helpers/dbHandler';
import * as _ from 'lodash';

interface IDataSet {
  label: ActivityType;
  data: number[];
  backgroundColor: string;
  barPercentage: 0.5;
  barThickness: 6;
  maxBarThickness: 8;
  minBarLength: 2;
}

export default defineComponent({
  name: 'Statistics',
  components: { QChart },
  setup(props, {root}) {
    moment.locale('de');
    const chartRendered = ref(false);
    const weekInputValue = ref(`${moment().format('YYYY-')}W${moment().format('WW')}`);
    const trackingData: Ref<ITrackingRecord[]> = ref([]);
    const testData: ITrackingRecord[] = [];
    testData.push({
      startTimestamp: moment().valueOf(),
      endTimestamp: moment().valueOf(),
      distance: 30,
      activity: 'walk',
    });

    function getTotalDistance(activity: ActivityType | 'total'): string {
      const activityArray: ITrackingRecord[] = activity !== 'total' ? _.cloneDeep(trackingData.value).filter( (value: ITrackingRecord) => {
            return value.activity === activity;
          } ) : _.cloneDeep(trackingData.value);
      let result = 0;
      activityArray.forEach( (value: ITrackingRecord) => {
        result += value.distance;
      } );
      return `${result} m`;
    }

    function skipDate(count: number): void {
      const newDate = moment(weekInputValue.value).add(count * 7, 'days');
      weekInputValue.value = `${newDate.format('YYYY-')}W${newDate.format('WW')}`;
      change();
    }

    async function change(): Promise<void> {
      if (!weekInputValue.value) weekInputValue.value = `${moment().format('YYYY-')}W${moment().format('WW')}`;
      chartRendered.value = false;
      Loading.show();
      await loadData();
      setTimeout( () => {
        chartRendered.value = true;
        Loading.hide();
      }, 1000);
    }

    const labels = computed( () => {
      const result: string[] = []
      const mondayOfWeek = moment(weekInputValue.value).startOf('week');
      for (let i: number = 0; i < 7; i++) {
        result.push(`${mondayOfWeek.clone().add(i, 'day').format('DD')}`);
      }
      return result;
    } );

    function generateDatasets(): IDataSet[] {
      const startDay: number = +(moment(weekInputValue.value).format('D'));
      const allDataSets: IDataSet[] = [];
      const walkDataSet: IDataSet = {
        label: 'walk',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#004F9F',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
      };
      const runDataSet: IDataSet = {
        label: 'run',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#E4032E',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
      };
      const bikeDataSet: IDataSet = {
        label: 'cycle',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#00983A',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
      };

      for (let trackingRecord of trackingData.value) {
        const chartDay = moment(trackingRecord.startTimestamp).weekday();
        if (trackingRecord.activity == 'walk') {
          walkDataSet.data[chartDay] += trackingRecord.distance;
        } else if (trackingRecord.activity == 'run') {
          runDataSet.data[chartDay] += trackingRecord.distance;
        } else if (trackingRecord.activity == 'cycle') {
          bikeDataSet.data[chartDay] += trackingRecord.distance;
        }
      }
      allDataSets.push(walkDataSet);
      allDataSets.push(runDataSet);
      allDataSets.push(bikeDataSet);
      return allDataSets;
    }

    const options = {
      scales: {
        yAxes: [
          {   
            beginAtZero: true,
          },
        ],
      },
    };

    async function loadData(): Promise<void> {
      console.log(weekInputValue.value);
      const filters: IFilter[] = [{
        field: 'startTimestamp',
        comparison: '>=',
        value: moment(weekInputValue.value).startOf('day').valueOf(),
        numeric: true
      },
      {
        field: 'startTimestamp',
        comparison: '<=',
        value: moment(weekInputValue.value).endOf('week').valueOf(),
        numeric: true
      }]
      trackingData.value = await dbDataHandler.getTracking(filters);
    }

    onMounted( async () => {
      Loading.show();
      try {
        await loadData();
        chartRendered.value = true;
      } finally {
        Loading.hide();
      }
    } )

    return {
      model: null,
      options: ['Tag', 'Woche', 'Monat'],
      labels,
      change,
      weekInputValue,
      chartRendered,
      skipDate,
      generateDatasets,
      getTotalDistance
    };
  },
});
</script>

<style>
.naviDate {
  max-width: 90%;
  margin-top: 20%;
  margin-left: 10%;
}
.statIcons {
  margin-left: 5%;
}
.col1 {
  margin-right: 30%;
}
</style>