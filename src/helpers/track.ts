import * as moment from 'moment';
import { ActivityType } from './interfaces';
import locationHandler from './locationHandler';
import * as _ from 'lodash';

export interface ITrackResult {
  start: moment.Moment;
  end: moment.Moment;
  durationMilliseconds: number;
  distance: number;
  activity: ActivityType;
}

interface ITrackData {
  start?: moment.Moment;
  activity?: ActivityType;
  watchId?: number;
  waypoints: Position[];
}

export namespace track {
  const ongoingTrackData: ITrackData = {waypoints: []};

  function successfulTrackingInterval(position: Position): void {
    console.log('waypoint - latitude: ', position.coords.latitude, 'longitude: ', position.coords.longitude);
    ongoingTrackData.waypoints.push(position);
  }

  function onTrackingError(positionError: PositionError): void {
    console.log('TRACKING ERROR: ', JSON.stringify(positionError));
    clearTrackData();
  }

  export function startTracking(activity: ActivityType): void {
    // throw error if there already is an ogoing tracking
    if (ongoingTrackData.watchId !== undefined) throw new Error('Tried to start tracking while another tracking process was already active!');
    ongoingTrackData.activity = activity;
    // get current timestamp
    ongoingTrackData.start = moment.default();
    ongoingTrackData.watchId = locationHandler.watchPosition(successfulTrackingInterval, onTrackingError);
  }

  export function finishTracking(): ITrackResult {
    if (ongoingTrackData.watchId === undefined || ongoingTrackData.start === undefined || ongoingTrackData.activity === undefined) throw new Error('No tracking in progress!');
    if (!locationHandler.stopWatching(ongoingTrackData.watchId)) throw new Error('No tracking in progress!');

    ongoingTrackData.watchId = undefined;

    const endTimestamp = moment.default();
    const duration = endTimestamp.diff(ongoingTrackData.start);

    try {
      const distance = buildDistance(ongoingTrackData.waypoints);
      return {
        distance,
        durationMilliseconds: duration,
        end: endTimestamp,
        start: ongoingTrackData.start,
        activity: ongoingTrackData.activity
      }
    } finally {
      clearTrackData();
    }
  }

  function buildDistance(waypoints: Position[]): number {
    console.log('=== buildDistance ===');

    if (waypoints.length < 2) throw new Error('Needs at least two waypoints!');
    const sortedWaypoints = _.cloneDeep(waypoints).sort( (a: Position, b: Position) => {
      return a.timestamp - b.timestamp;
    } );

    let distance = 0;

    for (const [idx, point] of sortedWaypoints.entries()) {
      console.log('waypoint: ', point.coords.latitude);
      if (idx === 0) continue;
      distance += locationHandler.getDistanceInMetres(sortedWaypoints[idx - 1], point);
    }
    
    console.log('=== END buildDistance ===');

    return distance;
  }

  function clearTrackData(): void {
    ongoingTrackData.watchId = undefined;
    ongoingTrackData.activity = undefined;
    ongoingTrackData.start = undefined;
    ongoingTrackData.waypoints = [];
  }
}