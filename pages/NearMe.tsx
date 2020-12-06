import {LocationRegion} from 'expo-location';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {
  Circle,
  EventUserLocation,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {View, Colors, TouchableOpacity, Text} from 'react-native-ui-lib';
import {useTheme} from 'styled-components';
import Mapcard from '../components/Mapcard';
import FireStore from '../data_layer/FireStore';
import {
  getLatitudeLongitudeFromString,
  getLocation,
  getRegion,
} from '../universal/GetLocation';
import {FeedItemModel, PartyType} from '../universal/Models';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {eventEmitter, eventStrings} from '../universal/EventEmitter';
import psuedoLocationTracker, {
  radius,
} from '../data_layer/PsuedoLocationTracker';
import {
  AppState,
  AppStateStatus,
  Dimensions,
  Easing,
  PermissionsAndroid,
} from 'react-native';
import {observer} from 'mobx-react';
import tm from '../universal/UiManager';
import {getColorForType, GetPartytypeString} from '../universal/GS';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actionsheet';
import workManager from 'react-native-background-worker';
import Geolocation from 'react-native-geolocation-service';
import RNLocation from 'react-native-location';
import {animated, useSpring} from 'react-spring/native';

const foregroundTask = 'online geo tasks';
const backgroundTask = 'offline geo tasks';

// PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
//     title: "need ",
//     message: "never",
//     buttonPositive: "ok",
//     buttonNegative: "no",
//     buttonNeutral: "none"
// } )

// Location.requestPermissionsAsync()

// export const GeoLocationUpdates = ( { data, error }: { data: any, error: any } ) =>
// {

//     if ( error )
//     {
//         console.log( error )
//         return
//     }

//     if ( data )
//     {
//         const { longitude, latitude } = data.locations[0].coords
//         console.log(`passing location, ${longitude} ${latitude}`)
//         psuedoLocationTracker.updateUserLocation( { latitude, longitude } )
//     }
// }

// export const GeoLocationUpdatesActive = ( { data, error }: { data: any, error: any } ) =>
// {

//     if ( error )
//     {
//         console.log( error )
//         return
//     }

//     if ( data )
//     {
//         if(AppState.currentState !== "active") return
//         const { longitude, latitude } = data.locations[0].coords
//         psuedoLocationTracker.updateUserLocation( { latitude, longitude } );

//     }
// }

// TaskManager.defineTask( backgroundTask, ( { data, error } ) => GeoLocationUpdates({data,error}) )
// TaskManager.defineTask( foregroundTask, ( { data, error } ) => GeoLocationUpdatesActive( { data, error } ) )
const screenWidth = Dimensions.get('screen').width;
//@next refresh
const NearMe = () => {
  const map = useRef<MapView | any>();
  const theme = useTheme();
  const [region, setRegion] = useState<Region | null>();
  const [markers, setMarkers] = useState<FeedItemModel[]>([]);
  const [focusedEvent, setFocusedEvent] = useState<string>('');
  const [geoRegions, setGeoRegions] = useState<LocationRegion[]>([]);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    sortMarkers();
    const keys = [...FireStore.categorizedData.keys()];
    setKeys(keys);
  }, [FireStore.data.size]);

  const [props, set] = useSpring(() => ({
    right: -screenWidth,
    config: {
      duration: 450,
      easing: Easing.ease,
    },
  }));
  const Views = animated(View);

  const BackgroundTask = () =>
    new Promise<void>(async (resolve, reject) => {
      let id: string = '';
      try {
        const parties = await FireStore.getOnGoingParties();

        const locationRegions: LocationRegion[] = [];
        for (let index = 0; index < parties.length; index++) {
          const element = parties[index];
          const coord = getLatitudeLongitudeFromString(element.location);
          if (coord) {
            const c: LocationRegion = {
              latitude: coord.latitude,
              longitude: coord.longitude,
              radius: radius,
              identifier: element.reference,
            };

            locationRegions.push(c);
          }
        }

        getLocation().then((res) => {
          psuedoLocationTracker.watchTheseLocations(locationRegions);
          psuedoLocationTracker.updateUserLocation(res);
        });
      } catch (err) {
        console.log('error', err);
        workManager.cancel(id);
        resolve();
      }

      resolve();
    });

  useEffect(() => {
    getUserRegion();

    // sort
    // sortMarkers()

    if (
      !eventEmitter
        .eventNames()
        .includes(eventStrings.dataFromProviderFinishedLoad)
    )
      eventEmitter.addListener(eventStrings.dataFromProviderFinishedLoad, () =>
        sortMarkers(),
      );

    // AppState.addEventListener( "change", changeLocationUpdates )

    let id: string = '';
    workManager
      .setWorker({
        type: 'periodic',
        name: 'test worker',
        notification: {
          title: 'test title',
          text: 'just a test notification ',
        },
        foregroundBehaviour: 'blocking',
        workflow: async () => BackgroundTask(),
        repeatInterval: 15,
        timeout: 1,
        constraints: {
          network: 'connected',
        },
      })
      .then((res) => {
        id = res;
      })
      .catch((err) => {
        console.log(`some error ${err}`);
      });

    return () => {
      AppState.removeEventListener('change', changeLocationUpdates);

      // eventEmitter.removeListener( eventStrings.dataFromProviderFinishedLoad, () => sortMarkers() )
    };
  }, []);

  const changeLocationUpdates = (state: AppStateStatus) => {
    sortMarkers();

    if (state == 'active') {
      // stopBackgroundTask()
      // startForegroundTasks(geoRegions.length >0? geoRegions : [...psuedoLocationTracker.data.values()])
    } else {
      // stopForegroundTask()
      // startBackgroundTasks( geoRegions.length > 0 ? geoRegions : [...psuedoLocationTracker.data.values()] )
    }
  };

  const userLocationChanged = async (e: EventUserLocation) => {
    const loc = e.nativeEvent.coordinate;
    const reg = getRegion(loc);
    setRegion(reg);
  };

  const getUserRegion = async () => {
    try {
      const coor = await getLocation();
      const reg = getRegion(coor);
      if (map.current) {
        map.current.animateToRegion(reg);
        map.current.forceUpdate();
      }
      setRegion(reg);
    } catch (err) {
      console.log('err', err);
    }
  };

  function startForegroundTasks(data: any[]) {
    Location.startLocationUpdatesAsync(foregroundTask, {
      //runs unlimited
      accuracy: Location.Accuracy.Highest,
    }).then(() => {
      psuedoLocationTracker.watchTheseLocations(data);
    });
  }

  async function startBackgroundTasks(data: any[]) {
    await Location.startLocationUpdatesAsync(backgroundTask, {
      //runs unlimited
      timeInterval: 1000 * 60 * 60, //runs every hr mins,
      accuracy: Location.Accuracy.High,
    }).then(() => {
      psuedoLocationTracker.watchTheseLocations(data);
    });
  }

  const stopForegroundTask = () =>
    Location.stopLocationUpdatesAsync(foregroundTask);
  const stopBackgroundTask = async () =>
    await Location.stopLocationUpdatesAsync(backgroundTask);

  const sortMarkers = () => {
    const arr = [...FireStore.data.values()];
    if (arr.length == 0) return;
    if (arr.length == markers.length) return;
    setMarkers(arr);

    const d: any = [];
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      const coord = getLatitudeLongitudeFromString(element.location);
      if (coord) {
        const c: LocationRegion = {
          latitude: coord.latitude,
          longitude: coord.longitude,
          radius: radius,
          identifier: element.reference,
        };

        d.push(c);
      }
    }
    setGeoRegions(d);
    startForegroundTasks(d);
  };

  const filterOptions = () => {
    const arr: number[] = [];
    Object.values(PartyType).map((val, index) => {
      const num = Number.parseInt(val);
      if (isNaN(num)) return;
      // const str = GetPartytypeString(num);
      arr.push(num);
    });

    arr.push(100);

    return arr;
  };

  const handleFilterPressed = () => {
    // actionSheet.current?.show();
    show();
  };

  const setFilter = (index: number) => {
    if (index == 5) return;
    const threshold = Object.values(PartyType).length / 2;
    const arr =
      index < threshold
        ? [...FireStore.data.values()].filter((a) => a.partyType == index)
        : [...FireStore.data.values()];
    setMarkers(arr);
  };

  const show = () => {
    const bool = props.right.get() != 20;
    if (bool) set({right: 20});
    else set({right: -screenWidth});
  };

  let actionSheet = useRef<ActionSheet | any>();

  // if ( region )
  return (
    <View style={{backgroundColor: Colors.background}}>
      <MapView
        ref={map}
        showsUserLocation
        onUserLocationChange={userLocationChanged}
        onPress={() => setFocusedEvent('')}
        onTouchStart={() => setFocusedEvent('')}
        customMapStyle={tm.theme.maptype}
        style={{width: '100%', height: '100%'}}
        provider={PROVIDER_GOOGLE}>
        {region && (
          <Circle
            radius={radius}
            center={region}
            fillColor={Colors.primary + '22'}
            strokeWidth={1}
            strokeColor={Colors.grey50}
          />
        )}

        <ShowEventOnMarkerPressed
          markers={markers}
          onPress={setFocusedEvent}
          region={region}
        />
      </MapView>
      {/* <ActionSheet
        ref={actionSheet}
        title={
          <View row center spread style={{height: 55, padding: 30}}></View>
        }
        options={[...filterOptions(), 'all', 'cancel']}
        cancelButtonIndex={filterOptions().length + 1}
        destructiveButtonIndex={filterOptions().length + 1}
        onPress={setFilter}>
        <Text>hello</Text>
      </ActionSheet> */}
      <View
        center
        style={{
          position: 'absolute',
          bottom: 10,
          height: 60,
          //   backgroundColor: Colors.grey80,
          width: '80%',
          left: '10%',
          elevation: 0,
          overflow: 'hidden',
        }}>
        <Views
          row
          spread
          paddingH-20
          style={{
            right: props.right,
          }}>
          {filterOptions().map((value, index) => {
            const partytype: PartyType = PartyType[value];

            return (
              <TouchableOpacity
                onPress={() => setFilter(value)}
                style={{
                  backgroundColor: getColorForType(value) || Colors.foreground,
                  width: screenWidth * 0.08,
                  height: screenWidth * 0.08,
                  borderRadius: 25,
                  elevation: 5,
                  // padding: 10,
                  margin: screenWidth * 0.03,
                }}>
                {index > Object.keys(PartyType).length / 2.1 && (
                  <View center>
                    <Icon
                      style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        height: '100%',
                      }}
                      name="times"
                      size={24}
                      color={Colors.text1}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </Views>
      </View>
      <View
        center
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 40,
          height: 40,
          backgroundColor: Colors.foreground,
          borderRadius: 10,
          elevation: 10,
        }}>
        <TouchableOpacity onPress={handleFilterPressed}>
          <Icon name="sliders-h" size={23} color={Colors.text1} />
        </TouchableOpacity>
      </View>
      <View
        padding-10
        center
        style={{
          position: 'absolute',
          minHeight: 10,
          minWidth: '100%',
          // bottom: 3,
          top: '17%',
        }}>
        {focusedEvent != '' && region && (
          <Mapcard reference={focusedEvent} currentPosition={region} />
        )}
      </View>
    </View>
  );
};

const ShowEventOnMarkerPressed = ({
  markers,
  onPress,
  region,
}: {
  markers: FeedItemModel[];
  onPress: (ref: string) => void;
  region: Region;
}) => {
  if (markers.length <= 0) return <View />;

  const mark = useRef<Marker>();

  useEffect(() => {
    if (mark.current) {
      // mark.current.props.onLayout(()=>)
    }
  }, []);

  return (
    <>
      {markers.map((value, index) => {
        const coord: LatLng | undefined = getLatitudeLongitudeFromString(
          value.location,
        );
        if (coord)
          return (
            <View key={index}>
              <Marker
                ref={mark}
                key={value.reference}
                // image={require( "../assets/images/marker.png" )}
                pinColor={getColorForType(value.partyType)}
                coordinate={coord}
                onPress={() => onPress(value.reference || '')}
                flat></Marker>
              <Circle
                center={coord}
                radius={30}
                fillColor={Colors.black}
                strokeColor={Colors.grey20}
                strokeWidth={0.5}
              />
            </View>
          );
        else return <View key={value.reference} />;
      })}
    </>
  );
};
export default observer(NearMe);
