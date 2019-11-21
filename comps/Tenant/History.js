import React, { useState, useEffect } from 'react';
import {
  View, 
  Text, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import {Colors} from '../../styles/Colors';
import Texts from '../../styles/Texts';
import styles from '../../styles/CompsStyles/HistoryStyles';



function History(props){

   // const [showPin, setShowPin] = useState(true);
    const [searchKey, setSearchKey] = useState('');
    let PinnedVisitors = props;
    console.log("passed" +PinnedVisitors);
    data = [...props.PinnedVisitors, ...props.UnpinnedVisitors ];


    const filteredData = data.filter((obj)=>{
    return obj.name.indexOf(searchKey) >= 0 ||
            obj.plate.indexOf(searchKey) >= 0 
  })




    return(
      <TouchableWithoutFeedback onPress = 
        {Keyboard.dismiss}>
        <View style={styles.container}> 
{/*  Header */}
            <View>
              <Text style={Texts.SecHead}>History</Text>
              <Text style={Texts.Body}>
              Your recent visitors. You can pin a visitor to keep the profile on the top.
              </Text>
      
{/*  SearchBar */}
            <View style={styles.SectionStyle}>
                    <TextInput 
                        placeholder="search"
                        style={[styles.searchBar,Texts.FormText]}
                        onChangeText={(value)=>setSearchKey(value)}
                        
                    />
                    <Image 
                    source={require('../../img/search-grey.png')}
                    resizeMode = "contain"
                    style={styles.ImageStyle}
                    />  
                    </View>       
                </View>
{/* history Card  */}
        {/* //<View style={{flex:1}}> */}
            <ScrollView style={{flex:1}}>
                {filteredData.map((obj, index)=>{
                  var pin = parseInt(obj.pin);
                  return (
                
                  <View style={styles.card}>
                    <TouchableOpacity onPress={()=>{
                      // do if else statement to pin or unpined
                      pin===0 ? props.dbPinVisitor(obj.id) : props.dbUnpinVisitor(obj.id);
                    }}>
                      
                    <Image
                      source={pin===0 ? require('../../img/pin-grey.png') : require('../../img/pin-purp.png')}  
                      style={styles.pinImg}
                    />    
                    </TouchableOpacity>

                    <View style={styles.List}>
                      <Text style={[Texts.BodyBold, styles.name]}>{obj.name}</Text>
                      <Text style={Texts.BodyLight}>{obj.plate}</Text>
                    </View>
                  

                    <TouchableOpacity 
                    style={styles.visiBtn}
                    onPress={() => {
                      props.showPop('AddVisitor');
                      // if there no visitor
                      if(props.card1 == false){
                        props.setName1(obj.name);
                        props.setPlate1(obj.plate);
                      }
                      // if there's 1 visitor already
                      if(props.card1 ==  true && props.card2 == false){
                        props.setName2(obj.name);
                        props.setPlate2(obj.plate);
                      }
                      // if there's 2 visitors already
                      if(props.card1 == true && props.card2 == true){
                        props.showPop('Full');
                      }
                  
                    }}>
                    <Text style={[Texts.BodyBold,{color: Colors.Purple}]}>
                        Revisit
                    </Text>
                   </TouchableOpacity>
                  

                  </View>               
                  )
              
                })}
             </ScrollView>  
        {/* </View> */}


        </View>
      </TouchableWithoutFeedback>
    )


}


export default History;
