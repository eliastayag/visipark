import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { Colors } from '../../styles/Colors';
import Texts from '../../styles/Texts';
import DropShadows from '../../styles/DropShadows';
import styles from '../../styles/CompsStyles/HistoryStyles';
import Fetch from '../Fetch';



function History(props) {
  // console.log('visitor name & plate', props.visitorName, props.visitorPlate);
  const [searchKey, setSearchKey] = useState('');
  //const [searchResult, setSearchResult] = useState('');
  // let PinnedVisitors = props;
  // console.log("passed" + PinnedVisitors);
  var data = [...props.PinnedVisitors, ...props.UnpinnedVisitors];

  const filteredData = data.filter((obj) => {
    return obj.name.toLowerCase().indexOf(searchKey) >= 0 ||
      obj.plate.toLowerCase().indexOf(searchKey) >= 0 ||
      obj.name.indexOf(searchKey) >= 0 ||
      obj.plate.indexOf(searchKey) >= 0 ||
      obj.date.indexOf(searchKey) >= 0
  })

  return (
    // <TouchableWithoutFeedback onPress = 
    //   {Keyboard.dismiss}>
    <View style={styles.container}>
      {/*  Header */}
      <ScrollView>
        <View style={styles.content} >
          <Text style={Texts.SecHead}>History</Text>
          <Text style={Texts.Body}>
            Your recent visitors. You can pin a visitor to keep the profile on the top.
          </Text>



          {/*  SearchBar */}
          <View style={styles.SectionStyle}>
            <TextInput
              placeholder="search"
              style={[styles.searchBar, Texts.FormText]}
              onChangeText={(value) => setSearchKey(value)}
              autoCapitalize='none'

            />
            <Image
              source={require('../../img/search-grey.png')}
              resizeMode="contain"
              style={styles.ImageStyle}
            />
          </View>

          {/* history Card  */}

          {filteredData.length > 0 ?
            (filteredData.map((obj, index) => {
              var pin = parseInt(obj.pin);

              return (
                <HistoryCard 
                  {...props}
                  pin={pin}
                  obj={obj}
                  i={index}
                  setHistory = {props.setHistory}
                  unit = {props.unit}
                  showPop = {props.showPop}
                  visitorName = {props.visitorName}
                  setVisitorName = {props.setVisitorName}
                  visitorPlate = {props.visitorPlate}
                  setVisitorPlate = {props.setVisitorPlate}
                />       
                  )

            })) :
            (
              <View style={{ paddingLeft: 10 }}>

                <Text style={[Texts.BodyLight, { color: Colors.Darkgrey }]}>No results found</Text>
              </View>
            )
          }
        </View>
      </ScrollView>

    </View>

  )
  
}

const HistoryCard = (props) => {
  const [cardOp] = useState(new Animated.Value(0));
  
  const runAnim = ()=>{
    Animated.timing(
      cardOp,
      {
        toValue: 1,
        duration: 200,
        delay: props.i*50
      }
    ).start();
  }

  // var curFunc = runAnim;
  // if(props.status === 1){
  //   curFunc = stopAnim;
  // }

  // curFunc();

  useEffect(()=>{
    runAnim();
  },[]);
  
  return (
    <Animated.View style={[styles.card, DropShadows.shadow,{opacity: cardOp}]}>
      <TouchableOpacity onPress={async() => {
        console.log('pin/unpin a visitor unit', props.unit, 'id', props.obj.id);
        
        // do if else statement to pin or unpined
        props.pin === 0 ?
          await Fetch('pinVisitor', { unit_num: props.unit, id: props.obj.id }, 'Pinned a visitor')
          : await Fetch('unpinVisitor', { unit_num: props.unit, id: props.obj.id }, 'Pinned a visitor');
          cardOp.setValue(0);
          runAnim();
           // set History
          props.setHistory(props.unit);
      }}>

        <Image
          source={props.pin === 0 ? require('../../img/pin-grey.png') : require('../../img/pin-purp.png')}
          style={styles.pinImg}
        />
      </TouchableOpacity>

      <View style={styles.List}>
        <Text style={[Texts.BodyBold, styles.name]} numberOfLines={1}>{props.obj.name}</Text>
        <Text style={Texts.BodyLight}>{props.obj.plate}</Text>
        <Text style={[Texts.HistoryDate, { marginLeft: -4 }]}> {props.obj.date}</Text>
      </View>

      <TouchableOpacity
        style={styles.visiBtn}
        onPress={() => {
          // check f there're 2 visitors already
          if (props.visitorNum >=2) {
            props.showPop('Full');
          } else {      
            props.setVisitorPlate(props.obj.plate);      
            props.setVisitorName(props.obj.name);      
            props.showPop('AddVisitor');
          }
        }}>
        <Text style={[Texts.BodyBold, { color: Colors.Purple }]}>
          Revisit
                    </Text>
      </TouchableOpacity>


    </Animated.View>
  )
}

export default History;
