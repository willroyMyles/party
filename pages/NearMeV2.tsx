import React, { useEffect, useState, memo, createRef, useRef } from "react";
import { View, Text, Colors, Button } from "react-native-ui-lib";
import MapView, {
  Region,
  Circle,
  LatLng,
  EventUserLocation,
} from "react-native-maps";
import {
  getLocation,
  getRegion,
  getLatitudeLongitudeFromString,
} from "../../universial/GetLocation";
import { Dimensions } from "react-native";
import { FeedItemModel } from "../../universial/Models";
import MarkerPin, { MarkerPinItem } from "./MarkerPin";
import dataProvider from "../../dataLayer/DataStore";
import { LocationRegion } from "expo-location";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { eventEmitter, eventStrings } from "../../universial/EventEmitter";
import Mapcard from "../../components/Mapcard";

const radius = 1600;

const Map = memo(
  ({ region, coord }: { region?: Region; coord?: Coordinates }) => {
    const map = useRef<MapView | null>();

    useEffect(() => {
      if (region) {
        map.current?.animateToRegion(region);
      }
    }, [region]);

    const handleLocChanged = async (loc: EventUserLocation) => {};

    if (region)
      return (
        <MapView
          ref={map}
          // liteMode

          followsUserLocation
          showsScale
          showsMyLocationButton
          showsUserLocation
          onUserLocationChange={handleLocChanged}
          // showsMyLocationButton
          // region={region}
          style={{ width: Dimensions.get("screen").width, height: "100%" }}
        >
          <Circle
            radius={radius}
            center={region}
            fillColor={Colors.primary + "22"}
            strokeWidth={1}
            strokeColor={Colors.grey50}
          />

          {[...dataProvider.data.values()].map((value, index) => {
            return <MarkerPinItem key={index} value={value} />;
          })}
        </MapView>
      );
    else
      return (
        <View center>
          <Text>getting location</Text>
        </View>
      );
  }
);

const NearMeV2 = () => {
  const [region, setRegion] = useState<Region>();
  const [mockCoords, setMockCoords] = useState<Coordinates>();
  const [geoRegions, setGeoRegions] = useState<LocationRegion[]>([]);
  const [eventCards, setEventCards] = useState<FeedItemModel[]>([]);
  const taskName = "geoLocation";

  useEffect(() => {
    sortGeoRegions();

    getLocation().then(async (res) => {
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
  }, []);

  const addEvent = (refr: string) => {
    const event = dataProvider.data.get(refr);
    if (event) {
      if (!eventCards.includes(event)) {
        setEventCards((list) => list.concat(event));
      }
    }
  };

  const sortGeoRegions = () => {
    const d: any = [];
    dataProvider.data.forEach((value, key) => {
      const coord = getLatitudeLongitudeFromString(value.location);
      if (coord) {
        const c: LocationRegion = {
          latitude: coord.latitude,
          longitude: coord.longitude,
          radius,
          identifier: value.reference,
        };

        d.push(c);
      }
    });

    setGeoRegions(d);

    if (TaskManager.isTaskDefined(taskName)) {
      Location.hasStartedGeofencingAsync("geoLocation").then(async (res) => {
        if (!res && geoRegions.length > 0) {
          await Location.startGeofencingAsync("geoLocation", geoRegions);
          console.log("geo started");
        }
      });
    }
  };

  return (
    <View flex>
      <Map region={region} coord={mockCoords} />
      <View
        bg-background
        padding-10
        center
        style={{
          position: "absolute",
          minHeight: 10,
          minWidth: "100%",
          bottom: 3,
        }}
      >
        {eventCards.map((value, index) => {
          return <Mapcard key={index} item={value} />;
        })}
      </View>
    </View>
  );
};

export default NearMeV2;
