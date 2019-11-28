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


  const [searchKey, setSearchKey] = useState('');
  //const [searchResult, setSearchResult] = useState('');
  let PinnedVisitors = props;
  console.log("passed" + PinnedVisitors);
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
  const {pin, obj, i} = props;
  return (
    <View style={[styles.card, DropShadows.shadow]}>
      <TouchableOpacity onPress={() => {
        console.log('pin/unpin a visitor unit', props.unit, 'id', obj.id);
        
        // do if else statement to pin or unpined
        pin === 0 ?
          Fetch('pinVisitor', { unit_num: props.unit, id: obj.id }, 'Pinned a visitor')
          : Fetch('unpinVisitor', { unit_num: props.unit, id: obj.id }, 'Pinned a visitor');
           // set History
          props.setHistory(props.unit);
      }}>

        <Image
          source={pin === 0 ? require('../../img/pin-grey.png') : require('../../img/pin-purp.png')}
          style={styles.pinImg}
        />
      </TouchableOpacity>

      <View style={styles.List}>
        <Text style={[Texts.BodyBold, styles.name]} numberOfLines={1}>{obj.name}</Text>
        <Text style={Texts.BodyLight}>{obj.plate}</Text>
        <Text style={[Texts.HistoryDate, { marginLeft: -4 }]}> {obj.date}</Text>
      </View>


      <TouchableOpacity
        style={styles.visiBtn}
        onPress={() => {
          props.showPop('AddVisitor');
          // if there no visitor
          if (props.card1 == false) {
            props.setName1(obj.name);
            props.setPlate1(obj.plate);
          }
          // if there's 1 visitor already
          if (props.card1 == true && props.card2 == false) {
            props.setName2(obj.name);
            props.setPlate2(obj.plate);
          }
          // if there's 2 visitors already
          if (props.card1 == true && props.card2 == true) {
            props.showPop('Full');
          }

        }}>
        <Text style={[Texts.BodyBold, { color: Colors.Purple }]}>
          Revisit
                    </Text>
      </TouchableOpacity>


    </View>
  )
}

export default History;
