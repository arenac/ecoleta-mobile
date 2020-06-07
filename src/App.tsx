import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
declare const global: {HermesInternal: null | {}};

import Home from './pages/Home';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </>
  );
};

export default App;
