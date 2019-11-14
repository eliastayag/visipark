import React from 'react';
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

function Tenants(props){

    var tUnit = "101"
    var tPlate = "ABC 123"

    //Tenant List Cards
    var tenantList = 

    <View style={styles.card}>


        <Text style={[Texts.BodyBold, styles.tenantUnit]}>{tUnit}</Text>
        <Text style={[Texts.BodyBold]}>{tPlate}</Text>
        <Switch style={styles.tenantSwitch}></Switch>

     </View>


    return(
        <View style={styles.container}>

                <Text style={Texts.SecHead}>Tenants</Text>
                <Text style={[Texts.Body, styles.headerDesc]}>Activate VisiPark and add a tenant plate number for each unit as needed. 
                    Reactivate for updating tenant plate.</Text>

            <View style={styles.content}>
            <TextInput 
          placeholder = "Search Room Number"
          style={[styles.input,Texts.FormText]}
          clearButtonMode = 'always'
          maxLength = {40}
            />

            <View style={styles.subHeader}>
                <Text style={[Texts.Body, styles.subUnit]}>Unit</Text>
                <Text style={[Texts.Body]}>Tenant Plate</Text>
                <Text style={[Texts.Body, styles.subActive]}>Active</Text>
            </View>

        {/* tenants list starts here */}
        <ScrollView>
            {tenantList}
        </ScrollView>
            </View>
            
    </View>
    )
}

export default Tenants;
