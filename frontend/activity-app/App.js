// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigators/AppStack';
import { AuthProvider } from './path/to/AuthContext';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

export default function App() {
  return (
    
    <NavigationContainer>
          <AuthProvider>
      <AppStack />
      </AuthProvider>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
