import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import styles from '../styles/MainStyles';
import Tform from './Tform';
import BMform from './BMform';



function Login(){
  const [showTenantPage, setShowTenantPage] = useState(false);
  const [showBMPage, setShowBMPage] = useState(false);

  var TenantPage = null;
  if (showTenantPage === true){
  TenantPage=(
      <Tform />
  );
  }
  var BMPage = null;
  if (showBMPage === true){
    BMPage=(<BMform/>);
  }
  return(
    <View style={styles.container}>
    {TenantPage}
    {BMPage}
      <Image source={require('../img/Logo.png')}
      style={styles.Logo}
      />
      <Text style={styles.LogoText}>VisiPark</Text>
      <Text style={styles.LoginText}>
      {showTenantPage ? "apartment unit" : "Login as"}
      </Text>

      <View>
        <TouchableOpacity
        style={[styles.BMBtn,{display:showTenantPage ? "none" : ""},
          {backgroundColor:showBMPage ? "white" : "#863AE8"}]}
        onPress={()=>{setShowBMPage(!showBMPage)}}
        >
          <Text
          style={[styles.BMText,{color:showBMPage ? "#863AE8" : "white"}]}>
          {showBMPage ? "login as manager" : "Building Manager"}
          </Text>
         </TouchableOpacity>

        <TouchableOpacity style={[styles.TenantBtn,{display:showBMPage ? "none" : ""}]}
        onPress={()=>{setShowTenantPage(!showTenantPage)}}>
          <Text style={styles.TenantText}>
          {showTenantPage ? "login as tenant" : "Tenant"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default Login;