import React, {useState} from 'react';
import {View, Text,
        TextInput,
        ScrollView,
        TouchableOpacity,
        Image,
        Switch
    } from 'react-native';
import {Colors} from '../../styles/Colors';
import Texts from '../../styles/Texts';
import styles from '../../styles/CompsStyles/TenantsStyles';
import DropShadows from '../../styles/DropShadows';

function TenantCard(props){
  const [val, setVal] = useState(props.item.active);
  var plate = null;

  if (props.item.plate == ""){
    plate = 
    <Text style={[Texts.BodyBold,styles.plateEmpty]}>Add Plate</Text>
  } else { 
    plate =
    <Text style={[Texts.BodyBold]}>{props.item.plate}</Text>
  }

  return(

    <View style={[styles.card, DropShadows.shadow]}>
      <Text style={[Texts.BodyBold, styles.tenantUnit]}>{props.item.unit}</Text>
      <TouchableOpacity onPress={()=>props.showPop("UnitProfile")}>
      {plate}
      </TouchableOpacity>
      <Switch style={styles.tenantSwitch} 
        onValueChange={(val, ind) => {
        setVal(val);
      }}
    trackColor={{true: Colors.Purple, false: 'grey'}}
    value={val}>
    </Switch>
    </View> 
  )
}


function Tenants(props){

  var data = [
    {plate:"", unit:"101", active: true},
    {plate:"aa234", unit:"102", active: false},
    {plate:"cc789", unit:"103", active: true},
    {plate:"dd456", unit:"104", active: false},
    {plate:"ee789", unit:"105", active: false},
    {plate:"ee789", unit:"106", active: false},
    {plate:"ee789", unit:"107", active: true},
    {plate:"ee789", unit:"108", active: true},
    {plate:"ee789", unit:"109", active: false},
  ];


const [searchKey, setSearchKey] = useState('');
const filteredData = data.filter((obj)=>{
  return obj.unit.indexOf(searchKey) >= 0
})

    return(
        <View style={styles.container}>

                <Text style={[Texts.SecHead, styles.header]}>Tenants</Text>
                <Text style={[Texts.Body, styles.headerDesc]}>Activate VisiPark and add a tenant plate number for each unit as needed. 
                    Reactivate for updating tenant plate.</Text>


            <View style={styles.SectionStyle}>

            <TextInput 
            style={[styles.searchBar, Texts.FormText]}
          placeholder = "Search Room Number"
          clearButtonMode = 'always'
          maxLength = {3}
          onChangeText={(value)=>{setSearchKey(value)}}
            />          

            <Image 
            source={require('../../img/search-grey.png')}
            resizeMode = "contain"
            style={styles.ImageStyle}
           />  
           </View>

            <View style={styles.subHeader}>
                <Text style={[Texts.Body, styles.subUnit]}>Unit</Text>
                <Text style={[Texts.Body]}>Tenant Plate</Text>
                <Text style={[Texts.Body, styles.subActive]}>Active</Text>
            </View>

        {/* tenants list starts here */}

        <ScrollView style={{marginBottom:72, marginTop:5}}>
        {filteredData.map((item, index)=>{

        return (
          <TenantCard item={item} pop={props.pop} showPop={props.showPop}/>
        )
      })}
          </ScrollView>            
    </View>
    )
}
export default Tenants;