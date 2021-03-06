import React, { Component, useState, useCallback, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	Button,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ImageBackground,
	ScrollView,
	FlatList,
	ActivityIndicator,
} from "react-native";
import Colors from "../constants/ThemeColors";
import HomeScreenCard from "../Components/HomeScreenCard";

import {PATIENTS} from "../Data/dummyData";
import * as AppointmentActions from '../store/actions/appointmentAction';
import * as PatientActions from '../store/actions/PatientAction';
import {useDispatch, useSelector} from 'react-redux';

import  FontAwesome from "react-native-vector-icons/FontAwesome";
import  FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import  MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const HomeScreen = (props) => {
	const Appointments = useSelector(state => state.appointment.appointments);
	
	const PatientName = useSelector(state => state.patient.patients.name);
	
	console.log("PATIENT NAME");
	// console.log(PatientName);
	const dispatch = useDispatch();
	const [error , setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	
	// const userId = useSelector(state => state.auth.userId);
	// const data = useSelector(state => state.patient.find(id => patient.id == userId))
	// console.log("Patient Name")
	// console.log(Appointments);
	// console.log(userId)
	const stateSnap = useSelector(state => state)
	console.log("THIS IS THE STATE SNAP");
	console.log(stateSnap)


	
	// console.log(isLoading);
	const getPatients = useCallback(async()=>{
		setIsLoading(true)
		try{
			const patientData = await dispatch(PatientActions.fetchPatient());
		}catch (err) {
			setError(erro.message)
		}
		setIsLoading(false)
	},[isLoading, dispatch])

	const getData = useCallback(async()=>{
		setIsLoading(true)
		try{
			
			const currentAppointments = await dispatch(AppointmentActions.FetchAppointments());
			// console.log("currentAppointments");
			// console.log(currentAppointments)
		}catch (err){
			setError(err.message);
		}
		setIsLoading(false)
	}, [isLoading, dispatch]);

	useEffect(()=>{
		getPatients();
		getData();
		
	}, [dispatch]);
	
	const renderCard = (itemData) => {
		return (
			<View style={styles.renderList}>
				
				<HomeScreenCard
					name={itemData.item.Name}
					time={itemData.item.time}
				/>

			</View>
		);
	};

	if (isLoading){
			return (
				 <View style={styles.LoadingContainer}>
						<ActivityIndicator size="large"/>
				 </View>

				);
		}

	return (
		<View style={styles.screen}>
			<View style={styles.screenTop}>
				<View style={styles.GreetingsContainer}>
					<Text style={styles.Titletext}>Hello, {PatientName} </Text>
					<Text style={styles.Titletext}></Text>
				</View>

		
			</View>
					<View style={styles.ButtonsContainer}>
					<TouchableOpacity
						style={styles.floatingButtons1}
						activeOpacity={0.8}
						onPress={() => {
							props.navigation.navigate("appointments");
						}}
					>	
					<View style={{marginRight:4, paddingBottom:4}}>
						<MaterialCommunityIcons
							name="account-clock"
							size={30}
							color="white"
						/>
						</View>
						<View style={{ marginTop: 0 }}>
							<Text style={styles.Buttontext}>Appointments</Text>
						</View>
					</TouchableOpacity>
					{/*// <TouchableOpacity
					// 	style={styles.floatingButtons2}
					// 	activeOpacity={0.8}
					// >
					// 	<FontAwesome5
					// 		name="briefcase-medical"
					// 		size={40}
					// 		color="white"
					// 	/>
					// 	<View style={{ marginTop: 0 }}>
					// 		<Text style={styles.Buttontext}></Text>
					// 	</View>
					// </TouchableOpacity>*/}
					<TouchableOpacity
						style={styles.floatingButtons3}
						activeOpacity={0.8}
					>
						<FontAwesome5
							name="money-check"
							size={26}
							color="white"
						/>
						<View style={{ marginTop: 0 }}>
							<Text style={styles.Buttontext}>Invoices</Text>
						</View>
					</TouchableOpacity>
				</View>

			<View style={styles.InfoContainer}>
						<TouchableOpacity style={styles.PatientsNumber} onPress={()=>{
							props.navigation.navigate('appointmentsList');
						}} >
						<View style={styles.iconContainer}>
						
							<FontAwesome5 name="users" size={35} color='white' />
							</View>
							<Text style={{fontSize:20, color:'white'}}>{Appointments.length} Patients </Text>
						
						</TouchableOpacity>
						<TouchableOpacity style={styles.TotalCollection} onPress={() =>{
							const patients = dispatch(PatientActions.fetchPatient());
							console.log(patients);
							

						}}>
						
							<FontAwesome5
							name="money-check"
							size={35}
							color="white"
						/>
							<Text style={{fontSize:19, color:'white'}}>Rs. {Appointments.length*1000} </Text>
						</TouchableOpacity>

						
				</View>
			

			<View style={styles.ScreenBottom}>
				
				<View style={{flex:1}}>
				<FlatList 
						data={Appointments} 
						renderItem={renderCard}  
						ListEmptyComponent={()=>{
							return (
								<View>
								<Text style={{fontSize:20}}>NO ITEMS</Text>
								</View>
								);
						}}
						showsVerticalScrollIndicator={false}

				/>
				
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		height: "100%",
		width: "100%",
	},
	screenTop: {
		paddingTop: 105,
		
		backgroundColor: Colors.BackgroundBlue,
	},
	ScreenBottom: {
		flex: 2,
		alignItems: "center",

		height: "100%",
		width:'100%',
		backgroundColor: 'white',
	},

	text: {
		fontSize: 25,
		fontWeight: "bold",
		color: Colors.HomeScreenText,
	},
	Titletext: {
		fontSize: 40,
		fontWeight: "400",
		color: Colors.HomeScreenText,
	},
	GreetingsContainer: {
		marginRight: 90,
		marginLeft: 40,
		paddingBottom: 20,
	},
	floatingButtons1: {
		width: 160,
		height: 80,
		flexDirection:'row',
		justifyContent: "space-around",
		paddingLeft:10,
		paddingRight:10,
		paddingBottom:10,
		alignItems: "center",
		borderRadius: 50,
		paddingTop:8,
		backgroundColor: Colors.PurpleButton,
	},
	floatingButtons2: {
		width: 150,
		height: 80,
		justifyContent: "center",
		marginLeft: 25,
		alignItems: "center",
		borderRadius: 50,
		paddingTop:10,
		backgroundColor: Colors.RedButton,
	},
	floatingButtons3: {
		width: 160,
		height: 80,
		flexDirection:'row',
		justifyContent: "space-around",
		paddingLeft:10,
		paddingRight:10,
		paddingBottom:10,
		alignItems: "center",
		borderRadius: 50,
		paddingTop:8,
		backgroundColor: Colors.GreenButton,
	},
	Buttontext: {
		fontSize: 14,
		// fontWeight: "400",
		color: "white",
	},
	ButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding:10,
		backgroundColor: "white",
	},
	background: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		alignItems: "center",
	},
	
	listContainer: {
		width: 360,
		alignItems: "center",
		height: '100%',
		backgroundColor:'red'
	},
	renderList: {
		width:370,
		height:120,
		alignItems: "center",
	},
	InfoContainer: {
		width:'100%',
		height:200,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:"center",
		paddingLeft:10,

		backgroundColor:'white'
	},
	PatientsNumber:{
		width:150,
		height:120,
		alignItems: "center",
		borderRadius: 10,
		paddingTop:10,
		backgroundColor:Colors.BackgroundBlue,
		
		justifyContent:'space-around'

	},
	TotalCollection:{
		width:150,
		height:120,
		alignItems: "center",
		borderRadius: 10,
		paddingTop:10,

		backgroundColor:Colors.BackgroundBlue,
		marginLeft:50,
		justifyContent:'space-around'
	},
	iconContainer:{
		marginBottom:2,
	},
	LoadingContainer:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
});

export default HomeScreen;
