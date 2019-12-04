import React, {useState, useEffect} from 'react';
import {View, Text,
        TextInput,
        ScrollView,
        TouchableOpacity,
        TouchableWithoutFeedback,
        Keyboard,
        Image,
        Switch
    } from 'react-native';
import {Colors} from '../../styles/Colors';
import Texts from '../../styles/Texts';
import styles from '../../styles/CompsStyles/TenantsStyles';
import DropShadows from '../../styles/DropShadows';
import Fetch from '../Fetch';

function TenantCard(props){
  // data from database: num(int), plate(varchar), activated(boolean)
  var plate = null;

// if a unit is not active
if (props.item.activated == 0){
  // display greyed out 'add plate'
  plate = 
    <Text style={[Texts.BodyBold,styles.plateEmptyGrey]}>Add Plate</Text>
} else{
  // if a unit is active
  if (props.item.plate==null || props.item.plate==''){
    // There is no tenant plate
    // display purple 'add plate'
    plate = 
      <TouchableOpacity 
        onPress={()=>{
          props.setTenantNum(props.item.num);
          props.showPop("UnitProfile");
      }}>
        <Text style={[Texts.BodyBold,styles.plateEmpty]}>Add Plate</Text>
      </TouchableOpacity>
  } else {
    // There is tenant plate
    // display the plate in purple
    plate = 
      <TouchableOpacity 
        onPress={()=>{
          props.setTenantNum(props.item.num);
          props.setTenantPlate(props.item.plate);
          props.showPop("UnitProfile");
      }}>
        <Text style={styles.plateActive}>{props.item.plate}</Text>
      </TouchableOpacity>
  }
}

  return(
    <View style={[styles.card, DropShadows.shadow]}>
      {/* unit number */}
      <Text style={[Texts.BodyBold, styles.tenantUnit]}>{props.item.num}</Text>
      {/* Plate */}
      {plate}
      {/* swtich */}
      <Switch 
        style={styles.tenantSwitch} 
        trackColor={{true: Colors.Purple, false: 'grey'}}
        value={props.item.activated==1}
        onValueChange={async(value, index) => {
          // switch being turned on - activate unit
          if (value == true){
            console.log('unit', props.item.num, 'turned on');
            // activate unit in database
            await Fetch('activateTenant',{num: props.item.num},'activate unit');
            // update tenants data
            props.getTenantUnits();
          }
          // switch being turned off - disable unit
          if (value == false){
            console.log('unit', props.item.num, 'turned off');
            props.setTenantNum(props.item.num);
            // show comfirmation popup
            props.showPop("DisableConfirm");
          }
        }}
      />  
    </View> 
  )
}


function Tenants(props){
  // get data from database for UI
  useEffect(()=>{
      props.getTenantUnits();
  },[]);
  //search function 
 const [searchKey, setSearchKey] = useState('');
 const filteredData = props.tenantUnits.filter((obj)=>{
   return obj.num.indexOf(searchKey) >= 0
 })

  return(

  <TouchableWithoutFeedback onPress = {Keyboard.dissmiss}>

    <View style={styles.container}>
      {/* Header */}
      <Text style={[Texts.SecHead, styles.header]}>Tenants</Text>
      <Text style={[Texts.Body, styles.headerDesc]}>Activate VisiPark for a unit and add a tenant plate number for each unit as needed. Deactivate a unit to forbid a unit from logging in.</Text>
      {/* Body */}
      <View style={styles.SectionStyle}>
        {/* Search bar */}
        <TextInput 
          style={[styles.searchBar, Texts.FormText]}
          placeholder = "Search Room Number"
          clearButtonMode = 'always'
          keyboardType = 'numeric'
          maxLength = {3}
          onChangeText={(value)=>{setSearchKey(value)}}
        />          
        <Image 
          source={require('../../img/search-grey.png')}
          resizeMode = "contain"
          style={styles.ImageStyle}
        />  
      </View>
      {/* Search result */}
      <View style={styles.subHeader}>
        <Text style={[Texts.Body, styles.subUnit]}>Unit</Text>
        <Text style={[Texts.Body]}>Tenant Plate</Text>
        <Text style={[Texts.Body, styles.subActive]}>Active</Text>
      </View>
      {/* tenants list starts here */}
      <ScrollView
        style={{marginBottom:72, marginTop:5}}>
        
        {filteredData.map((item, index)=>{
        return (
          <TenantCard item={item} 
                      index = {index}
                      pop={props.pop} 
                      showPop={props.showPop}  
                      setTenantNum = {props.setTenantNum}
                      setTenantPlate = {props.setTenantPlate}
                      getTenantUnits = {props.getTenantUnits}
                      />
        )
      })}

      </ScrollView>  
              

    </View>
  </TouchableWithoutFeedback>
  )
}
export default Tenants;