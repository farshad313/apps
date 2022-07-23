/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useEffect } from 'react';
 import { YellowBox } from 'react-native';
 import SplashScreen from 'react-native-splash-screen'
 import RootStackNavigation from './src/navigations';
 import { Provider } from 'react-redux';
 import { PersistGate } from 'redux-persist/integration/react';
 import { persistor, store } from './src/store';
 YellowBox.ignoreWarnings([
	'',
]);

 const App = () => {
   useEffect(() => {
     SplashScreen.hide()
   }, [])

   return (
     <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
         <RootStackNavigation />
        </PersistGate>
      </Provider>
   );
 };
 
 
 export default App;
 