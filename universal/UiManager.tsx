import {observable, action, autorun} from 'mobx';
import {
  lightTheme,
  darkTheme,
  LightMpaStyle,
  DarkMapStyleWithoutLandmarks,
} from './Theme';
import {Colors} from 'react-native-ui-lib';
import {themehelper} from './Theme';
import AsyncStorage from '@react-native-community/async-storage';

export enum ThemeType {
  LIGHT = 0,
  DARK = 1,
}

const granted = 'granted';
const notGranted = 'not granted';
export class Store {
  @observable themeType = ThemeType.DARK;
  @observable theme = lightTheme;

  @observable maptype: any =
    this.themeType == ThemeType.LIGHT
      ? LightMpaStyle
      : DarkMapStyleWithoutLandmarks;
  @observable setting: any = {theme: false};

  @observable isLocationGranted: boolean | undefined = undefined;

  @action setLocationGranted = (val: boolean) => {
    this.isLocationGranted = val;
    AsyncStorage.setItem('locationGranted', val ? granted : notGranted);
  };

  constructor() {
    AsyncStorage.getItem('theme')
      .then((res) => {
        if (res == undefined || res == null) this.setThemeType(true);
        else this.setThemeType(ThemeType.DARK.toString() == res);
      })
      .catch((err) => {
        this.setThemeType(true);
      });

    if (this.isLocationGranted == undefined)
      AsyncStorage.getItem('locationGranted').then((res) => {
        if (res == granted) {
          this.isLocationGranted = true;
        } else {
          this.isLocationGranted = false;
        }
      });
  }

  /**
   * if true, sets the theme to dark else light
   * @param val : boolean
   */
  @action setThemeType = (val: boolean) => {
    new Promise((resolve) => {
      if (val) {
        this.themeType = ThemeType.DARK;
        this.maptype = DarkMapStyleWithoutLandmarks;
      } else {
        this.themeType = ThemeType.LIGHT;
        this.maptype = LightMpaStyle;
      }
      this.setting.theme = val;
      this.theme = this.themeType == ThemeType.DARK ? darkTheme : lightTheme;
      AsyncStorage.setItem('theme', this.themeType.toString());
      themehelper.reviseLoading(this.theme);
      resolve(true);
    });
  };
}

const tm = new Store();
export default tm;
