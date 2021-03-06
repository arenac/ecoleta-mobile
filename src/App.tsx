import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
declare const global: {HermesInternal: null | {}};

import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
};

export default App;
