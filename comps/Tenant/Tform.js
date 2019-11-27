import React,{useEffect, useState} from 'react';
import {
  View,
   Text, 
   TouchableOpacity, 
   TextInput,
   AsyncStorage,
   Animated
  } from 'react-native';
import styles from '../../styles/PagesStyles/LoginStyles';
import {Colors} from '../../styles/Colors';
import Texts from '../../styles/Texts';



function Tform(props){
  // Animation 
  const [op] = useState(new Animated.Value(0));
  useEffect(()=>{
    Animated.timing(
      op,
      {
        toValue:1,
        duration:300
      }
    ).start();
  },[props.showTenantPage]);

  // function for storing unit num locally
  // called when button is pressed
  var storeunit = async(unit) =>{
    await AsyncStorage.setItem('unit',unit);
  }

  return(

    <Animated.View style={{opacity: op, width: "90%", marginTop: 10, alignItems:"center"}}> 
      <TextInput
          placeholder="Unit Number"
          onChangeText = {(txt)=>{
            props.setUnit(txt)}}
          maxLength={3}
          value = {props.unit}
          keyboardType = "numeric"
          style={[Texts.FormText,{color:'white' ,padding: 13, borderColor: 'white', borderWidth: 2, borderRadius: 25 ,width:'90%', height: 45,  color:'white', margin:20,textAlign: 'center'} ]}
          placeholderTextColor="#bea9c9"
      />
      <TouchableOpacity
        style={styles.Tform}
        onPress={()=>{
          storeunit(props.unit);
          props.setShowpage('Tenant');
          }}>
        <Text style={{color:"#863AE8", fontFamily:"Poppins-SemiBold", fontSize:20}}>
        Login as Tenant
        </Text>
       </TouchableOpacity>

      </Animated.View>
  )
}


export default Tform;
