import React, { useEffect, useState, memo, createRef, useRef, PureComponent } from "react";
import { View, Text, Colors, Button, LoaderScreen } from "react-native-ui-lib";
import MapView, {
  Region,
  Circle,
  LatLng,
  EventUserLocation,
  PROVIDER_GOOGLE,
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
const taskName = "geoLocation";

class NearMeV2 extends PureComponent
{
  map = createRef<MapView>();
  state = {
    region: undefined,
    eventCard: undefined,
    geoRegions:undefined
  }

  componentWillUnmount()
  {
    eventEmitter.removeListener( eventStrings.locationEntered, this.addEvent );
    eventEmitter.removeListener(eventStrings.dataFromProviderFinishedLoad, this.dataChanged)
  }

  componentDidMount()
  {
    this.sortGeoRegions();
    getLocation().then( async ( res ) =>
    {      
      const reg = await getRegion(res);
      this.setState( { region: reg } )
      this.dataChanged()   
      
    });

  eventEmitter.addListener(eventStrings.locationEntered, this.addEvent);
  eventEmitter.addListener(eventStrings.dataFromProviderFinishedLoad, this.dataChanged)
    return () => {
      Location.hasStartedGeofencingAsync(taskName).then((res) => {
        if (res) {
          // Location.stopGeofencingAsync(taskName)
        }
      });
    };
  }

  dataChanged = () =>
  {
    this.forceUpdate()
      this.map.current?.animateToRegion( this.state.region, 2000 );      

  }

   handleLocChanged = async ( loc: EventUserLocation ) => { };

   addEvent = (refr: string) => {
    const event = FireStore.data.get(refr);
    if (event) {
      this.setState( {
        eventCard : event
      })
    }
  };

  sortGeoRegions = () =>
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
    
    this.setState({geoRegion:d})
  }

  onMarkerPressed = ( ref: string ) =>
  {
    this.addEvent(ref)
  }

  render()
  {
    return (
      <View flex>
        {this.state.region && <MapView
          ref={this.map}
          followsUserLocation
          showsScale
          showsMyLocationButton
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          onUserLocationChange={this.handleLocChanged}
          style={{ width: "100%", height: "100%" }}
          onTouchEnd={() =>
          {
            if ( this.state.eventCard ) this.setState({eventCard:undefined})
          }
          }
        >
          <Circle
            radius={radius}
            center={this.state.region}
            fillColor={Colors.primary + "22"}
            strokeWidth={1}
            strokeColor={Colors.grey50}
          />

          {[...FireStore.data.values()].map( ( value, index ) =>
          {
            return <MarkerPinItem key={index} value={value} onPressed={this.onMarkerPressed} />
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
          {this.state.eventCard && this.state.region &&
            <Mapcard item={this.state.eventCard} currentPosition={this.state.region} />
          }
        </View>
      </View>
    )
  }
};

export default NearMeV2;
