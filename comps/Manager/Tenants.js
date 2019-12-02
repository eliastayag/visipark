import React, {useState, useEffect} from 'react';
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
import Fetch from '../Fetch';

function TenantCard(props){
  const [val, setVal] = useState(props.item.activated);
  var plate = null;

if (val == false){
  plate = 
  <Text style={[Texts.BodyBold,styles.plateEmptyGrey]}>Add Plate</Text>
} else{
  if (props.item.plate == null){
    plate = 
    <TouchableOpacity onPress={()=>props.showPop("UnitProfile")}>

       <Text style={[Texts.BodyBold,styles.plateEmpty]}>Add Plate</Text>
       </TouchableOpacity>
  } else {
    plate = 
    <TouchableOpacity onPress={()=>props.showPop("UnitProfile")}>
    <Text style={styles.plateActive}>{props.item.plate}</Text>
    </TouchableOpacity>

  }
}

  return(

    <View style={[styles.card, DropShadows.shadow]}>
      <Text style={[Texts.BodyBold, styles.tenantUnit]}>{props.item.num}</Text>
      {plate}
      <Switch style={styles.tenantSwitch} 
        onValueChange={(val, ind) => {

          if (val == 1){
            setVal(val);
          }


        if (val == 0){
          setVal(val);
          props.showPop("DisableConfirm")
        }
      }}

    trackColor={{true: Colors.Purple, false: 'grey'}}
    
    value={val==1}>
    </Switch>
    </View> 
  )
}


function Tenants(props){
  const [units, setUnits] = useState([]);
  
  var setTenants = async()=>{
    var tenants = await Fetch('getTenants',null,null);
    setUnits(tenants);
  }

useEffect(()=>{
    setTenants();
})




//  const [searchKey, setSearchKey] = useState('');
//  const filteredData = data.filter((obj)=>{
//    return obj.num.indexOf(searchKey) >= 0
//  })

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
        {units.map((item, index)=>{

        return (
          <TenantCard item={item} 
                      pop={props.pop} 
                      showPop={props.showPop}
                      
                      />
        )
      })}
          </ScrollView>            
    </View>
    )
}
export default Tenants;