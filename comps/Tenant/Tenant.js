import React,{useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Visitors from './Visitors';
import History from './History';
import Report from './Report';
import styles from '../../styles/TenantStyles';
import {Colors} from '../../styles/Colors';


function Tenant(){
  const [cont, setCont] = useState('Visitors');

// img src variables
  var visitorimg = null;
  var historyimg = null;
  var reportimg = null;

// Content is everything above tab bar
  var Content = null;

// conditions updating Content and tabbar
  if(cont == 'Visitors'){
    Content = <Visitors />
    visitorimg = require('../../img/ppl-purp.png');
    historyimg = require('../../img/history-grey.png');
    reportimg = require('../../img/report-grey.png');
  }
  if(cont =='History'){
    Content = <History />
    visitorimg = require('../../img/ppl-grey.png');
    historyimg = require('../../img/history-purp.png');
    reportimg = require('../../img/report-grey.png');
  }
  if(cont == 'Report'){
    Content = <Report />
    visitorimg = require('../../img/ppl-grey.png');
    historyimg = require('../../img/history-grey.png');
    reportimg = require('../../img/report-purp.png');
  }


  return(
    <View style={styles.container}>
      {Content}

      {/* Tab bar starts here */}
      <View style={styles.tabbar}>

          <TouchableOpacity 
            style = {styles.tabcont}
            onPress={()=> setCont('Visitors')}>
            <Image 
              style = {styles.tabimg}
              source = {visitorimg}
              resizeMode = 'contain'
            />
            <Text 
            style={[styles.tabtext,{color:(cont=='Visitors')?Colors.Purple:Colors.Darkgrey}]}>
            Visitors</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style = {styles.tabcont}
            onPress={()=> setCont('History')}>
            <Image 
              style = {styles.tabimg}
              source = {historyimg}
              resizeMode = 'contain'
            />
            <Text style={[styles.tabtext,{color:(cont=='History')?Colors.Purple:Colors.Darkgrey}]}>History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style = {styles.tabcont}
            onPress={()=> setCont('Report')}>
            <Image 
              style = {styles.tabimg}
              source = {reportimg}
              resizeMode = 'contain'
            />
            <Text style={[styles.tabtext,{color:(cont=='Report')?Colors.Purple:Colors.Darkgrey}]}>Report</Text>
          </TouchableOpacity>

      </View>
      {/* End of Tab bar */}
    </View>
      
  )
}


export default Tenant;
