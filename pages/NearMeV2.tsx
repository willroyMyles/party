import React, { useEffect, useState, memo, createRef, useRef } from "react";
import { View, Text, Colors, Button, LoaderScreen } from "react-native-ui-lib";
import MapView, {
  Region,
  Circle,
  LatLng,
  EventUserLocation,
} from "react-native-maps";

import { Dimensions } from "react-native";

import { LocationRegion } from "expo-location";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { MarkerPinItem } from "../components/MarkerPin";
import FireStore from "../data_layer/FireStore";
import { FeedItemModel } from "../universal/Models";
import { getLocation, getRegion, getLatitudeLongitudeFromString } from "../universal/GetLocation";
import { eventEmitter, eventStrings } from "../universal/EventEmitter";
import Mapcard from "../components/Mapcard";

const radius = 600;

const NearMeV2 = () => {
  const [region, setRegion] = useState<Region>();
  const [mockCoords, setMockCoords] = useState<LatLng>();
  const [geoRegions, setGeoRegions] = useState<LocationRegion[]>([]);
  const [eventCards, setEventCards] = useState<FeedItemModel>();
  const taskName = "geoLocation";

  useEffect(() => {
    sortGeoRegions();
    getLocation().then( async ( res ) =>
    {      
      const reg = await getRegion(res);
      setRegion(reg);
    });

    eventEmitter.addListener(eventStrings.locationEntered, addEvent);

    return () => {
      eventEmitter.removeListener(eventStrings.locationEntered, addEvent);
      Location.hasStartedGeofencingAsync(taskName).then((res) => {
        if (res) {
          // Location.stopGeofencingAsync(taskName)
        }
      });
    };
  }, [] );
  
   const map = useRef<MapView | null>();

    useEffect(() => {
      if (region) {
        map.current?.animateToRegion(region);
      }
    }, [region] );

  const handleLocChanged = async ( loc: EventUserLocation ) => { };

  const addEvent = (refr: string) => {
    const event = FireStore.data.get(refr);
    if (event) {
      setEventCards(event)
    }
  };

  const sortGeoRegions = () =>
  {
    const d: any = [];
    FireStore.data.forEach( ( value, key ) =>
    {
      const coord = getLatitudeLongitudeFromString( value.location );
      if ( coord )
      {
        const c: LocationRegion = {
          latitude: coord.latitude,
          longitude: coord.longitude,
          radius,
          identifier: value.reference,
        };

        d.push( c );
      }
    } );
    
    setGeoRegions( d );
  }

  const onMarkerPressed = ( ref: string ) =>
  {
    console.log(ref);
    addEvent(ref)
  }

  return (
    <View flex>
      {region && <MapView
        ref={map}
        followsUserLocation
        showsScale
        showsMyLocationButton
        showsUserLocation
        onUserLocationChange={handleLocChanged}
        style={{ width: "100%", height: "100%" }}
        onTouchEnd={() =>
        {
          if(eventCards) setEventCards(undefined)
        }
        }
      >
        <Circle
          radius={radius}
          center={region}
          fillColor={Colors.primary + "22"}
          strokeWidth={1}
          strokeColor={Colors.grey50}
        />

        {[...FireStore.data.values()].map( ( value, index ) =>
        {
          return <MarkerPinItem key={index} value={value} onPressed={onMarkerPressed}/>
        } )}
          
          
      </MapView>}
      <View
        padding-10
        center
        style={{
          position: "absolute",
          minHeight: 10,
          minWidth: "100%",
          bottom: 3,
        }}
      >
        {eventCards && region &&
           <Mapcard  item={eventCards} currentPosition={region} />
        }
      </View>
    </View>
  );
};

export default NearMeV2;
