import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/PagesStyles/ManagerStyles';
import Tenants from '../comps/Manager/Tenants';
import Search from '../comps/Manager/Search';
import Reports from '../comps/Manager/Reports';
import {Colors} from '../styles/Colors';


function Manager(props){
const [cont, setCont] = useState ('Tenants');

  // img src variables
  var tenantimg = null;
  var searchimg = null;
  var reportsimg = null;

// Content is everything above tab bar

  var Content = null;

// conditions updating Content and tabbar
  if(cont == 'Tenants'){
    Content = <Tenants 
                pop={props.pop} 
                showPop={props.showPop}
                tenantUnits = {props.tenantUnits}
                setTenantUnits = {props.setTenantUnits}
                getTenantUnits = {props.getTenantUnits}
                tenantNum = {props.tenantNum}
                setTenantNum = {props.setTenantNum}
                tenantPlate = {props.tenantPlate}
                setTenantPlate = {props.setTenantPlate}
                
                />

    tenantimg = require('../img/ppl-purp.png')
    searchimg = require('../img/search-grey.png')
    reportsimg = require('../img/report-grey.png')
  }
  if(cont == 'Search'){
    Content = <Search pop={props.pop} showPop={props.showPop}/>

    tenantimg = require('../img/ppl-grey.png')
    searchimg = require('../img/search-purp.png')
    reportsimg = require('../img/report-grey.png')
  }
  if(cont == 'Reports'){
    Content = <Reports pop={props.pop} showPop={props.showPop} 
                        tenantReports = {props.tenantReports}
                        reportSubject = {props.reportSubject}
                        reportDate = {props.reportDate}
                        reportBody = {props.reportBody}
                        getTenantReports = {props.getTenantReports}
                        setTenantReports = {props.setTenantReports}
    />

    tenantimg = require('../img/ppl-grey.png')
    searchimg = require('../img/search-grey.png')
    reportsimg = require('../img/report-purp.png')
  }

  return(
    <View style={styles.container}>
      {Content}

      {/* Insert tab bar here */}
     <View style={styles.tabbar}>

          <TouchableOpacity 
            style = {styles.tabcont}
            onPress={()=> setCont('Tenants')}>
            <Image 
              style = {styles.tabimg}
              source = {tenantimg}
              resizeMode = 'contain'
            />
            <Text 
            style={[styles.tabtext,{color:(cont=='Tenants')?Colors.Purple:Colors.Darkgrey}]}>
            Tenants</Text>
          </TouchableOpacity>
           
          <TouchableOpacity
            style = {styles.tabcont}
            onPress={()=> setCont('Search')}
          >
            <Image 
              style = {styles.tabimg}
              source = {searchimg}
              resizeMode = 'contain'
            />
            <Text style={[styles.tabtext,{color:(cont=='Search')?Colors.Purple:Colors.Darkgrey}]}>Search</Text>

          </TouchableOpacity>

          <TouchableOpacity 
            style = {styles.tabcont}
            onPress={()=> setCont('Reports')}>
            <Image 
              style = {styles.tabimg}
              source = {reportsimg}
              resizeMode = 'contain'
            />
            <Text style={[styles.tabtext,{color:(cont=='Reports')?Colors.Purple:Colors.Darkgrey}]}>Reports</Text>
          </TouchableOpacity>

      </View>
      {/* End of Tab bar */}
    </View>
  )
}


export default Manager;
