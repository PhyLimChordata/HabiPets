import React, { useState } from 'react';
import { View, Text } from 'react-native';

import styles from '../styling/Header';
import Menu from './Menu';
import SideMenu from './SideMenu';
import BottomPopup from './BottomPopup';

function Header(props) {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View style={styles.header}>
			<View style={styles.menuTitle}>
				<Menu menuClicked={() => setModalVisible(true)} />
				<Text style={styles.headerText}>{props.text}</Text>
			</View>
			<SideMenu modalVisible={modalVisible} setModalVisible={setModalVisible} stack={props.stack}/>
			{props.children}
			<View style={styles.MiddleComponent} />
		</View>
	);
}

export default Header;
