/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import styles from './styles/PagesStyles/AppStyles';
import Main from './Pages/Main';
import {Colors} from './styles/Colors';

function App(){
  const [safebg, setSafebg] = useState(true)
  return(
    <SafeAreaView style={[styles.container, {backgroundColor:(safebg)?"#fff":Colors.Purple, opacity: 1}]}>
        <Main safebg={safebg} setSafebg={setSafebg}/>
    </SafeAreaView>
  )
}

export default App;

