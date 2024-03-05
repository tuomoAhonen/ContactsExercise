import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {Alert, Button, FlatList, StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import * as Contacts from 'expo-contacts';
import FlatListItem from './components/FlatListItem';

export default function App() {
	const [contactList, setContactList] = useState([]);
	const [contactListPermission, setContactListPermission] = useState(false);

	const getContacts = () => {
		// do something
		//console.log('hello');
		if (!contactListPermission) {
			return Alert.alert('Error with permissions', 'Allow the app to use your contacts');
		}

		/*
		const exampleContact = {
			[Contacts.Fields.FirstName]: 'Esa',
			[Contacts.Fields.LastName]: 'Esimerkkinen',
			[Contacts.Fields.Company]: 'Esan Yritys oy',
			[Contacts.Fields.PhoneNumbers]: [
				{countryCode: 'FI', digits: '0441234567', isPrimary: true, label: 'Esan Yritys', number: '044 123 4567'},
			],
		};

		(async () => {
			try {
				// tänne example contact
				return await Contacts.addContactAsync(exampleContact);
			} catch (error) {
				return console.log(error);
			}
		})();
    */

		(async () => {
			try {
				const {data} = await Contacts.getContactsAsync({fields: [Contacts.Fields.PhoneNumbers]});
				//console.log(data);
				const results = [];
				if (data && data !== null && data !== 'null') {
					for (const [key, value] of Object.entries(data)) {
						results.push({id: key, ...value});
					}
					return setContactList([...results]);
				} else {
					return setContactList([]);
				}
			} catch (error) {
				return console.log(error);
			}
		})();
	};

	useEffect(() => {
		(async () => {
			try {
				const {status} = await Contacts.requestPermissionsAsync();
				console.log(status);
				if (status === 'granted') {
					return setContactListPermission(true);
				}
			} catch (error) {
				return console.log(error);
			}
		})();
	}, []);

	//console.log(contactList);

	return (
		<View style={styles.container}>
			<Text style={styles.yourContactsText}>Your contacts</Text>
			{contactList && contactList.length > 0 && (
				<FlatList data={contactList} renderItem={({item}, index) => <FlatListItem key={index} item={item} />} />
			)}
			<View style={styles.getButton}>
				<Button title='Get Contacts' onPress={getContacts} />
			</View>

			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		//justifyContent: 'center',
	},
	yourContactsText: {
		fontSize: 30,
		justifyContent: 'flex-start',
	},
	getButton: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 20,
		//position: 'absolute',
		//bottom: 20,
	},
});

