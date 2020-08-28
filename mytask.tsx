import RNGeofenceEvent, { RNEventPayload, RNGeofenceEventName, RNGeofenceJsTask } from 'react-native-background-geofencing';
export const myTask = ( payload: RNEventPayload ) => new Promise( resolve =>
{
    
    console.log("task started");
})
