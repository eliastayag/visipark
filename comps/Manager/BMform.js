import React, {useEffect, useState} from 'react';
import {
  View, 
  Text,
  Animated,
  TouchableOpacity, 
  TextInput
} from 'react-native';
import styles from '../../styles/PagesStyles/LoginStyles';
import Texts from '../../styles/Texts';
import Colors from '../../styles/Colors';

function BMform(props){
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
   },[props.showBMPage]);
 
  return(

    <Animated.View style={{opacity: op, width: "90%", marginTop: 10, alignItems:"center"}}>
      <TextInput
      keyboardType = "numeric"
      secureTextEntry={true}  
      maxLength = {6}
      style={[Texts.FormText,{ padding: 13, borderColor: 'white', borderWidth: 2, borderRadius: 25 , height: 45,  color:'white', margin:20,width:'90%',textAlign: 'center'}]}
      placeholder="Password"
      placeholderTextColor="#bea9c9"
      
      />
      <TouchableOpacity
        style={styles.BMForm }
        onPress={()=>{props.setShowpage('Manager')}}>
        <Text style={{color:Colors.Purple, fontFamily:"Poppins-Regular", fontSize:18}}>
        Login as Manager
        </Text>
       </TouchableOpacity>
    </Animated.View>





  )
}


export default BMform;
