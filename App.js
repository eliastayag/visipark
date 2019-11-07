/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import styles from './styles/PagesStyles/AppStyles';
import Main from './Pages/Main';

function App(){
  return(
    <View style={styles.container}>
        <Main/>
    </View>
  )
}

export default App;
