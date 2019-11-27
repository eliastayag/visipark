import React, {useState, useEffect} from 'react';
import {
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Animated
} from 'react-native';
import styles from '../styles/PagesStyles/LoginStyles';
import Tform from '../comps/Tenant/Tform';
import BMform from '../comps/Manager/BMform';



function Login(props){
  
   
  // functions created for login page
  const [showTenantPage, setShowTenantPage] = useState(false);
  const [showBMPage, setShowBMPage] = useState(false);

  var TenantPage = null;
  if (showTenantPage === true){
    TenantPage=(
      <Tform 
      showpage={props.showpage} 
      setShowpage={props.setShowpage}
      unit = {props.unit}
      setUnit = {props.setUnit}
      showTenantPage = {showTenantPage}
      getUnit = {props.getUnit}
      />);
  } else {
    TenantPage = null;
  }
  var BMPage = null;
  if (showBMPage === true){
    BMPage = (
    <BMform 
      showpage={props.showpage} 
      setShowpage={props.setShowpage}
      showBMPage = {showBMPage}
    />);
  } else {
    BMPage = null;
  }

  var Title = '';
  if(showBMPage){
    Title = 'Go Back';
  } else if (showTenantPage){
    Title = 'Go Back';
  } else {
    Title = 'Login as';
  }

  // Animation 
  const [op, setOp] = useState(new Animated.Value(0));
  useEffect(()=>{
    // setOp(new Animated.Value(0));
    // console.log('op',op);
    Animated.timing(
      op,
      {
        toValue:1,
        duration:300
      }
    ).start();
  },[showBMPage, showTenantPage]);

  return(
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}> 
      <View style={styles.container}>
      
      {/* Logo */}
        <View   style={styles.Top}>
        <Image source={require('../img/Logo.png')}
        resizeMode="contain"
        style={styles.Logo}
        />
        <Text style={styles.LogoText}>VisiPark</Text>
      </View>

      {/* Bottom Part */}
        <KeyboardAvoidingView behavior="position">
          <Animated.View style={[{opacity: op},styles.Bottom]}>
            {/* Title */}
            <View style={styles.title}>
                {/* Back button */}
                {(showBMPage||showTenantPage)?<TouchableOpacity 
                  style = {styles.arrow}
                  onPress = {()=>{setShowBMPage(false);setShowTenantPage(false)}}>
                  <Image 
                        style = {{width: 30}}
                        resizeMode = "contain"
                        source = {require('../img/arrow-white.png')}
                  />  
                </TouchableOpacity>:null}
                <Text style={[styles.LoginText,{marginBottom:showBMPage||showTenantPage?0:10}]}>{Title}</Text>
            </View>
            {/* Two forms. hide and show */}
            {TenantPage}
            {BMPage}

            {/* First page Two buttons */}
            <View style={[styles.Buttons,{display:showBMPage ? "none" : ""}]}>
          <TouchableOpacity
            style={[styles.BMBtn,{display:showBMPage ? "none" : ""},{display:showTenantPage ? "none" : ""}]}
            onPress={()=>{
              setShowBMPage(!showBMPage);
              }}>
            <Text
            style={styles.BMText}>
            Building Manager
            </Text>
           </TouchableOpacity>

          <TouchableOpacity
            style={[styles.TenantBtn,{display:showTenantPage ? "none" : ""}]}
            onPress={()=>{setShowTenantPage(!showTenantPage)}}>
            <Text
            style={styles.TenantText}>
            Tenant
            </Text>
          </TouchableOpacity>
        </View>

        </Animated.View>
      </KeyboardAvoidingView> 
   
    
      </View>
  </TouchableWithoutFeedback>
  )
}


export default Login;
