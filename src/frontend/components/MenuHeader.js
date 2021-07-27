import React, {useState} from 'react';
import {View, Text} from 'react-native';

import styles from '../styling/Header';
import Menu from './Menu';
import SideMenu from "./SideMenu";
import BottomPopup from "./BottomPopup";

function Header(props) {
	return (
		<View style={styles.header}>
			<View style={styles.menuTitle}>
				<Menu />
				<Text style={styles.headerText}>{props.text}</Text>	
			</View>
			{props.children}
			<View style={styles.MiddleComponent} />
		</View>
	);
}

export default Header;
