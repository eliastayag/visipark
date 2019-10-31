
import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/MainStyles';
import Tenant from './Tenant/Tenant';
import Login from '../comps/Login';
import Report from '../comps/Tenant/Report';


function Main(){
    // UI
    var page = <Login />

    return (
        <View>

           {page}
            
        </View>
    )
}

export default Main;
