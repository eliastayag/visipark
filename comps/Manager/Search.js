import React, { useState } from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Colors} from '../../styles/Colors';
import Texts from '../../styles/Texts';
import DropShadows from '../../styles/DropShadows';
import styles from '../../styles/CompsStyles/SearchStyles';
import Fetch from '../Fetch';


// data = Fetch();
//  setTenant(data.tenant);
// map, filter tenant,

function Search(props){
  const [searchKey, setSearchKey] = useState('');  
  const [tenants, setTenants] = useState([]);
  const [visitors, setVisitors] = useState([]);
  
  const setData = async()=>{ 
   var data = await Fetch('getCurrentPlates',null,null);
    
    setTenants(data.tenants);
    setVisitors(data.visitors);
    // console.log(data.tenants);
    // console.log(data);
 }

// console.log('tenants',tenants);
  const filteredData = tenants.filter((obj)=>{
    return obj.plate.indexOf(searchKey) >= 0 ||
            obj.num.indexOf(searchKey) >= 0 
  });
  const filteredData1 = visitors.filter((obj)=>{
    return obj.plate.indexOf(searchKey) >= 0 ||
            obj.num.indexOf(searchKey) >= 0 
  });
  
setData();

 //console.log('filetered',filteredData);

    return(
        <View style={styles.container}> 
        {/*  Header */}
        <ScrollView>
            <View style = {styles.content}>
              <Text style={Texts.SecHead}>Search</Text>
              <Text style={Texts.Body}>
                  Search for plate number to see if the vehicle belongs to a tenant, a current visitors or a stranger.
              </Text>
      
            {/*  SearchBar */}
              <View style={styles.SectionStyle}>
                <TextInput 
                  placeholder="Search Plate Number"
                  style={[styles.searchBar,Texts.FormText]}
                  onChangeText={(value)=>{setSearchKey(value)}}
                  
                />
                <Image 
                source={require('../../img/search-grey.png')}
                resizeMode = "contain"
                style={styles.ImageStyle}
                />  
                     
            </View>

       {/* search card   */}
                {filteredData1.map((obj, index)=>{
                  return (                
                    <SearchCardV 
                    setData={props.setData}
                    obj={obj}
                    i={index}                               
                    />
                  )
                })
                
                }

                {filteredData.map((obj, index)=>{
                  return (                
                    <SearchCard 
                    setData={props.setData}
                    obj={obj}
                    i={index}                               
                    />
                  )
                })
                
                }
                
                 
                </View>
         </ScrollView>
        </View>
    
   ) 
  }
      

const SearchCard = (props) => {
        //const {num, obj, i} = props; 
      return(
         <View style={[styles.card, DropShadows.shadow]}>

                    <View style={styles.List}>
                      <Text style={Texts.HeadS}>{props.obj.plate}</Text>
                      <Text style={Texts.BodyLight}>unit{props.obj.num}</Text>
                    </View>
                    
                    <View> 
                      <Text style={[Texts.BodyBold,styles.Status]}>Tenant
                      </Text>
                    </View> 

        </View>
                  

  )       
}

const SearchCardV = (props) => {
  //const {num, obj, i} = props; 
return(
   <View style={[styles.card, DropShadows.shadow]}>

              <View style={styles.List}>
                <Text style={Texts.HeadS}>{props.obj.plate}</Text>
                <Text style={Texts.BodyLight}>unit{props.obj.unit_num}</Text>
              </View>
              
              <View> 
                <Text style={[Texts.BodyBold,styles.Status]}>Visitor
                </Text>
              </View> 

  </View>
            

)       
}


export default Search;
