export default {
    testGeo(): void {
      var onSuccess = function(position: any) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
      };

      // onError Callback receives a PositionError object
      //
      function onError(error: any) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },

    watchPosition(successCallback: PositionCallback, errorCallback: PositionErrorCallback): number {
      const options: PositionOptions = {
        timeout: 10000,
        enableHighAccuracy: true,
      };

      return navigator.geolocation.watchPosition(successCallback, errorCallback, options);
    },

    stopWatching(watchId: number): boolean {
      try {
        navigator.geolocation.clearWatch(watchId);
        return true;
      } catch (e) {
        return false;
      }
    },

    getDistanceInMetres(from: Position, to: Position): number {
      const earthRadius = 6371; // Radius of the earth in km
      const dLat = deg2rad(to.coords.latitude - from.coords.latitude);  // deg2rad below
      const dLon = deg2rad(to.coords.longitude - from.coords.longitude); 
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(from.coords.latitude)) * Math.cos(deg2rad(to.coords.latitude)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = earthRadius * c; 
      return d * 1000;
    },
}

function deg2rad(degrees: number): number {
  var pi = Math.PI;
  return degrees * (pi/180);
}