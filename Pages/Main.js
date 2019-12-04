
import React,{useState,useEffect} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import styles from '../styles/PagesStyles/MainStyles';
import Tenant from '../Pages/Tenant';
import Login from '../Pages/Login';
import Popup from '../comps/Popup';
import Manager from '../Pages/Manager';
import Fetch from '../comps/Fetch';


var timer = null;
function Main(props){
    // --------- Variables ------------
    // Across the app
    var mpopup = null;
    var page = null;
    const [showpage, setShowpage] = useState('Login'); 
    const [pop, showPop] = useState(''); 
    const [cont, setCont] = useState('Visitors');
    // Tenant - Visitors
    const [visitorNum, setVisitorNum] = useState(0);
    const [unit, setUnit] = useState(0);
    const [spots,setSpots] = useState();
    const [currentVisitors, setCurrentVisitors] = useState([]);
    const [visitorName, setVisitorName] = useState('');
    const [visitorPlate, setVisitorPlate] = useState('');
    const [visitorId, setVisitorId] = useState(0);
    const [visitorRegtime, setVisitorRegtime] = useState(0);
    
    // Tenant - History  
    const [PinnedVisitors, setPinnedVisitors] = useState([]);
    const [UnpinnedVisitors, setUnpinnedVisitors] = useState([]);
    // Building Manager - Units
    const [tenantNum, setTenantNum] = useState(0);
    const [tenantPlate,setTenantPlate] = useState('');
    const [tenantUnits, setTenantUnits] = useState([]);
    


    

    // --------------- Communicate with DB ----------------
    
    // Fetch() for getting and posting
    // Variable = await Fetch("filename", data, "console_log_message");
    // write "null" instead of "data" for GET 

    // Show all tables 
            // Fetch('getData',null,'get all tables');

    // ------------- Tenants -------------
    // Auto-remove expired visitors 
            // Fetch('autoRemove',null,null);

    // Get History data
            // Fetch('getHistory',{unit_num:unit},'Data for History');

    // Get Spots
            // Fetch('getSpots',null,'Spots left');

    // Get Current Visitor 
            // Fetch('getCurrentVisitors',{unit_num:unit},'Fetch Current Visitors');

    // Add a visitor
            // Fetch('addVisitor',{unit_num:unit, name:name,plate:plate, duration:duration},"Added a visitor");

    // Remove a visitor
            // Fetch('removeVisitor',{id: id},'Removed a visitor');

    // Extend a visitor
            // Fetch('extendVisitor',{id: id, extendhour: extendhour},'Extended a visitor');

    // Pin a visitor 
            // Fetch('pinVisitor',{unit_num:unit,id:id},'Pinned a visitor');

    // Unpin a visitor 
            // Fetch('unpinVisitor',{unit_num:unit,id:id},'Unpinned a visitor');

    // Send a report 
            // Fetch('createReport',{unit_num: unit, subject: subject, message: message},'Report sent');

    // ------------ Manager ------------
    // Get all tenants
            // Fetch('getTenants',null,'Tenants');
    
    // Activate a Unit
            // Fetch('activateTenant',{num: unit},'activate unit');

    // Add tenant's plate
            // Fetch('addTenantPlate',{num: unit, plate: plate},'add tenant plate');
    
    // Deactivate a unit and delete the tenant's plate
            // Fetch('deactivateTenant',{num: unit},'deactivate unit');

    // Get all current visitor plates and all tenant plates
            // Fetch('getCurrentPlates', null (pass data), 'Manager searching result');

    // Get all reports
            // Fetch('getReports', null, 'All reports');

    // Delete a report 
            // Fetch('deleteReport',{id: id}, 'deleted a report');

// console.log('visitorNum', visitorNum, 'visitorName',visitorName,'visitorPlate', visitorPlate,'visitorId',visitorId,'visitorRegtime', visitorRegtime);

    // BM and Tenant Login (Auto-login for tenant)
    const getUnit = async()=>{ 
        var localunit = await AsyncStorage.getItem('unit');
        if(localunit !== null && localunit !==''){
            // if there IS unit number stored in local storage
            console.log('Logged in unit', localunit);
            // run get current visitor 
            setUnit(localunit);
            getSpots();
            getCurrentVisitors(localunit);
            setHistory(localunit);
            setShowpage('Tenant');
            
            // start setting timer
            if(timer === null){
                timer = setInterval(()=>{
                    //console.log("timer");
                    // Get data for Tenant
                    Fetch('autoRemove',null,null);
                    getCurrentVisitors(localunit);
                    getSpots();
                    setHistory(localunit);
                    // Get data for BM
                    getTenantUnits();
    
                }, 1000)
            }
        } else {
            // if there ISN'T unit number stored in local storage
            setShowpage('Login');
            if(timer === null){
                timer = setInterval(()=>{
                    //console.log("timer");
                    // Get data for BM
                    getTenantUnits();
    
                }, 1000)
            }
        }
    }

    // Tenant - Visitors
    const getSpots = async()=>{
        var spotnum = await Fetch('getSpots',null,null);
        setSpots(spotnum);
    }
    const getCurrentVisitors = async(unit)=>{
        var visitors = await Fetch('getCurrentVisitors',{unit_num: unit},null);
        setCurrentVisitors(visitors);
        setVisitorNum(visitors.length);  
    }
    // Tenant - History
    const setHistory = async(unit)=>{
        
        var History = await Fetch('getHistory',{unit_num:unit},null);
        setPinnedVisitors(History.pinned);
        setUnpinnedVisitors(History.notpinned);
    }

    // BM - Tenants
    const getTenantUnits = async()=>{
        var Tenants = await Fetch('getTenants',null,null);
        setTenantUnits(Tenants);        
    }

    // conditions to show and hide pages
    if(showpage == 'Login'){
        page = <Login 
                // show Login, Tenant or Manager page
                showpage={showpage}    
                setShowpage={setShowpage} 
                // unit info
                unit = {unit}
                setUnit = {setUnit}
                getUnit = {getUnit}
                />;
            props.setSafebg(false);
    }
    if(showpage == 'Tenant'){
        page = <Tenant 
                 unit = {unit}
                 cont={cont}
                 setCont={setCont}
                 pop = {pop} 
                 showPop = {showPop}
                 // spots
                 spots = {spots}
                 // async function 
                 getUnit = {getUnit}
                 // Visitors Page
                 visitorNum = {visitorNum}
                 currentVisitors = {currentVisitors}
                 visitorName = {visitorName}
                 setVisitorName = {setVisitorName}
                 visitorPlate = {visitorPlate}
                 setVisitorPlate = {setVisitorPlate}
                 visitorId = {visitorId}
                 setVisitorId = {setVisitorId}
                 visitorRegtime = {visitorRegtime}
                 setVisitorRegtime = {setVisitorRegtime}
                 // History Page
                 setHistory = {setHistory}
                 UnpinnedVisitors = {UnpinnedVisitors}
                 PinnedVisitors = {PinnedVisitors}



                />;
        props.setSafebg(true);
    }
    if(showpage == 'Manager'){
        page = <Manager 
                 pop = {pop} 
                 showPop = {showPop}
                //BM - Tenants
                tenantUnits = {tenantUnits}
                setTenantUnits = {setTenantUnits}
                getTenantUnits = {getTenantUnits}
                tenantNum = {tenantNum}
                setTenantNum = {setTenantNum}
                tenantPlate = {tenantPlate}
                setTenantPlate = {setTenantPlate}
                // BM - Search
                // BM - Report
                />;
        props.setSafebg(true);
    }

     // Conditions to show Popup
     if (pop == ''){
        mpopup = null;
     } else {
         mpopup = <Popup 
                     // popup
                     pop = {pop} 
                     showPop = {showPop} 
                     // show page
                     setShowpage = {setShowpage}
                     // set content on Tenant page
                     cont = {cont}
                     setCont = {setCont}
                     // unit
                     unit = {unit}
                     // visitors info
                     visitorNum = {visitorNum}
                     visitorName = {visitorName}
                     setVisitorName = {setVisitorName}
                     visitorPlate = {visitorPlate}
                     setVisitorPlate = {setVisitorPlate}
                     visitorId = {visitorId}
                     setVisitorId = {setVisitorId}
                     visitorRegtime = {visitorRegtime}
                     setVisitorRegtime = {setVisitorRegtime}
                    // fetch 
                    getCurrentVisitors = {getCurrentVisitors}
                    // BM - Units
                    getTenantUnits = {getTenantUnits}
                    tenantNum = {tenantNum}
                    setTenantNum = {setTenantNum}
                    tenantPlate = {tenantPlate}
                    setTenantPlate = {setTenantPlate}
                     />;                 
             }



// Fetch data when the app loads and update every second
             

    useEffect(()=>{
        // when the app loads
        getUnit();
        
        return ()=>{
            if(timer){
                clearInterval(timer);
                timer = null;
            }
        }
        
    },[]);
      


    // -------------- UI ------------------
return (
        <View style={styles.container}>
           {mpopup} 
           {page}
        </View>

    )
}

export default Main;
