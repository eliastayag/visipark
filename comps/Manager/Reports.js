import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Colors} from '../../styles/Colors';
import Texts from '../../styles/Texts';
import styles from '../../styles/CompsStyles/ReportsStyles';
import DropShadows from '../../styles/DropShadows';
import Fetch from '../Fetch';


function ReportCard(props){

 


  return(
    
     <TouchableOpacity onPress={() => {
       
       props.setReportSubject(props.item.subject);
       props.setReportDate(props.item.date);
       props.setReportBody(props.item.message);
       props.setReportUnit(props.item.unit_num);
       props.showPop('Reports')
       
       
       }}>
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




useEffect(()=>{
  props.getTenantReports();
},[]);


    return(
        <View style={styles.container}>

        <Text style={[Texts.SecHead, styles.header]}>Reports</Text>
        <Text style={[Texts.Body, styles.headerDesc]}>Read or delete reports submitted by tenants regarding visitor parking.</Text>

{/* tenants reports starts here */}

<ScrollView style={{marginBottom:72}}>
                {props.tenantReports.map((item, index)=>{
                  return (
                <ReportCard item={item} pop={props.pop} showPop={props.showPop} item={item}
                            tenantReports = {props.tenantReports}
                            reportSubject = {props.reportSubject}
                            reportDate = {props.reportDate}
                            reportBody = {props.reportBody}
                            getTenantReports = {props.getTenantReports}
                            setTenantReports = {props.setTenantReports}
                            setReportSubject = {props.setReportSubject}
                            setReportDate = {props.setReportDate}
                            setReportBody = {props.setReportBody}
                            setReportUnit = {props.setReportUnit}
                />
                  )
                })}
             </ScrollView>  

    
</View>
    )
}

export default Reports;
