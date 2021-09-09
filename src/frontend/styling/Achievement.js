import { StyleSheet } from 'react-native';
import Colours from '../resources/themes/Colours';

const iconWidth = '8vh';

const achievementStyles = (theme) =>
	StyleSheet.create({
		headContainer: {
			flex: 1,
			alignItems: 'center',
		},
		achievementContainer: {
			width: iconWidth,
			margin: '2.5vw',
			marginTop: '1vw',
		},
		achievementRow: {
			display: 'flex',
			flexDirection: 'row',
		},
		achievementIcon: {
			resizeMode: 'contain',
			width: iconWidth,
			height: iconWidth,
			borderRadius: 50,
			borderWidth: 5,
		},
		achievementBronze: {
			borderColor: Colours.Unique.Bronze,
		},
		achievementSilver: {
			borderColor: Colours.Unique.Silver,
		},
		achievementGold: {
			borderColor: Colours.Unique.Gold,
		},
		progressBar: {
			height: '1vh',
			borderRadius: 10,
			marginTop: '2vh',
		},
		textStyles: {
			fontStyle: 'normal',
			fontWeight: '700',
			color: theme.Quinary,
		},
		achievementName: {
			alignSelf: 'center',
			marginTop: '4vh',
		},
		achievementHeader: {
			fontSize: 24,
		},
	});

export default achievementStyles;