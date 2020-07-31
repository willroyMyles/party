import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,

  StatusBar,
} from 'react-native';

import {
  View,
  Text,
} from 'react-native-ui-lib'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Feed from 'pages/Feed';
import { eventEmitter } from './universal/EventEmitter';
import StackNavigator from './pages/StackNavigator';
import FireStore from './data_layer/FireStore';
import TToast from './components/TToast';
import { ThemeProvider, useTheme } from "styled-components"
import { themehelper } from './universal/Theme';
import tm from './universal/UiManager';
import { observer } from 'mobx-react';
import { observe } from 'mobx';


declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <ThemeProvider theme={tm.theme} >
      <View flex bg-background>
        <StackNavigator />
        <TToast />

      </View>
    </ThemeProvider>
  )




  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView>

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default observer(App);
