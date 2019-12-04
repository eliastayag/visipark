import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Colors} from '../../styles/Colors';
import Texts from '../../styles/Texts';
import styles from '../../styles/CompsStyles/ReportsStyles';
import DropShadows from '../../styles/DropShadows';
import Fetch from '../Fetch';


function ReportCard(props){

  const leftContent = <Text>Delete</Text>;
 


  return(
    
     <TouchableOpacity onPress={() => {props.showPop('Reports')}}>
          <View style={[styles.card, DropShadows.shadow]}>
          <Text style={[Texts.HeadS,]}>{props.item.subject}</Text>
          <Text style={[Texts.Body,]}>{props.item.date}</Text>
         <Text style={[Texts.BodyLight,{marginBottom:5, marginTop:10}]} numberOfLines={2}>{props.item.message}</Text>
          <Text style={Texts.Link}>Read More >>></Text>
          </View>  
          </TouchableOpacity> 
          
  )
}

function Reports(props){

   const [Tenantreports, setReports] = useState([]);
  
  var setTenantReports = async()=>{
    var reports = await Fetch('getReports', null, null);
    setReports(reports);
  }

useEffect(()=>{
    setTenantReports();
})


    return(
        <View style={styles.container}>

        <Text style={[Texts.SecHead, styles.header]}>Reports</Text>
        <Text style={[Texts.Body, styles.headerDesc]}>Read or delete reports submitted by tenants regarding visitor parking.</Text>

{/* tenants reports starts here */}

<ScrollView style={{marginBottom:72}}>
                {Tenantreports.map((item, index)=>{
                  return (
                <ReportCard item={item} pop={props.pop} showPop={props.showPop} item={item}/>
                  )
                })}
             </ScrollView>  

    
</View>
    )
}

export default Reports;
