import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import styles from '../styling/Header';
import Menu from './Menu';
import BackButton from './BackButton'
import SideMenu from './SideMenu';

import {useTheme} from '@react-navigation/native';

function MenuHeader(props) {
	const {colors} = useTheme();
	const [modalVisible, setModalVisible] = useState(false);
	var hp = props.hp != undefined ? props.hp : [];
	
	return (
		<View style={styles(colors).header}>
			<View style={styles(colors).menuTitle}>

				{ props.back ? <BackButton navigation={props.navigation}/>:
					<Menu menuClicked={() => setModalVisible(true)} />}
				<Text style={styles(colors).headerText}>{props.text}</Text>
			</View>
			{!props.back && <SideMenu modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={props.navigation} />}
			{props.children}
			{hp.map (() => {
				return (
						<Image
						style={{ height: 30, width: 30, resizeMode: 'contain', margin: 2
					}}
						source={require('../resources/images/Heart.png')}
				/> 
				);
			})}
			<View style={{alignContent:'flex-end', height:25}}>
				{props.right}
			</View>


		</View>
	);
}

export default MenuHeader;
