import React,{useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Visitors from '../comps/Tenant/Visitors2';
import History from '../comps/Tenant/History';
import Report from '../comps/Tenant/Report';
import styles from '../styles/PagesStyles/TenantStyles';
import {Colors} from '../styles/Colors';





function Tenant(props){ 
  // img src variables
  var visitorimg = null;
  var historyimg = null;
  var reportimg = null;

// Content is everything above tab bar
  var Content = null;
// conditions updating Content and tabbar
  if(props.cont == 'Visitors'){

    Content = <Visitors 
          // popup
          pop={props.pop} 
          showPop={props.showPop}
          // unit info
          unit = {props.unit}
          // spots
          spots = {props.spots}
          // visitors info
          visitorNum = {props.visitorNum}
          currentVisitors = {props.currentVisitors}
          visitorName = {props.VisitorName}
          setVisitorName = {props.setVisitorName}
          visitorId = {props.visitorId}
          setVisitorId = {props.setVisitorId}
          visitorPlate = {props.visitorPlate}
          setVisitorPlate = {props.setVisitorPlate}
          visitorRegtime = {props.visitorRegtime}
          setVisitorRegtime = {props.setVisitorRegtime}
          />  
    visitorimg = require('../img/ppl-purp.png');
    historyimg = require('../img/history-grey.png');
    reportimg = require('../img/report-grey.png');
  }
  if(props.cont =='History'){
    Content = <History 
            unit = {props.unit}
            pop={props.pop} 
            showPop={props.showPop}
            // visitor info 
            visitorNum = {props.visitorNum}
            visitorName = {props.visitorName}
            setVisitorName = {props.setVisitorName}
            visitorId = {props.visitorId}
            setVisitorId = {props.setVisitorId}
            visitorPlate = {props.visitorPlate}
            setVisitorPlate = {props.setVisitorPlate}
            visitorRegtime = {props.visitorRegtime}
            setVisitorRegtime = {props.setVisitorRegtime}
            // pass value //
            PinnedVisitors={props.PinnedVisitors}
            UnpinnedVisitors={props.UnpinnedVisitors}
            setHistory = {props.setHistory}
            setUnpinnedVisitors={props.setUnpinnedVisitors}
    />
    visitorimg = require('../img/ppl-grey.png');
    historyimg = require('../img/history-purp.png');
    reportimg = require('../img/report-grey.png');
  }
  if(props.cont == 'Report'){
    Content = <Report 
                pop={props.pop} 
                showPop={props.showPop}
                unit = {props.unit}/>
    visitorimg = require('../img/ppl-grey.png');
    historyimg = require('../img/history-grey.png');
    reportimg = require('../img/report-purp.png');
  }


  useEffect(()=>{
    props.getUnit();
  },[]);

  return(
    <View style={styles.container}>
      {Content}

      {/* Tab bar starts here */}
      <View style={styles.tabbar}>

          <TouchableOpacity 
            style = {styles.tabcont}
            onPress={()=> props.setCont('Visitors')}>
            <Image 
              style = {styles.tabimg}
              source = {visitorimg}
              resizeMode = 'contain'
            />
            <Text 
            style={[styles.tabtext,{color:(props.cont=='Visitors')?Colors.Purple:Colors.Darkgrey}]}>
            Visitors</Text>
          </TouchableOpacity>
           
          <TouchableOpacity
            style = {styles.tabcont}
            onPress={()=> props.setCont('History')}
          >
            <Image 
              style = {styles.tabimg}
              source = {historyimg}
              resizeMode = 'contain'
            />
            <Text style={[styles.tabtext,{color:(props.cont=='History')?Colors.Purple:Colors.Darkgrey}]}>History</Text>

          </TouchableOpacity>

          <TouchableOpacity 
            style = {styles.tabcont}
            onPress={()=> props.setCont('Report')}>
            <Image 
              style = {styles.tabimg}
              source = {reportimg}
              resizeMode = 'contain'
            />
            <Text style={[styles.tabtext,{color:(props.cont=='Report')?Colors.Purple:Colors.Darkgrey}]}>Report</Text>
          </TouchableOpacity>

      </View>
      {/* End of Tab bar */}
    </View>

  )
}


export default Tenant;
