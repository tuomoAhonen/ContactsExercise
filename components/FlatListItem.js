import {View, Text, StyleSheet} from 'react-native';

const FlatListItem = ({item}) => {
	//console.log(item);
	return (
		<View style={styles.container}>
			<Text>
				{item.firsName} {item.lastName}
			</Text>
			<Text>{item.phoneNumbers.map((p) => p.number).join(', ')}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		rowGap: 10,
		gap: 10,
		//justifyContent: 'flex-start',
		//alignContent: 'center',
		//alignItems: 'center',
	},
});

export default FlatListItem;
