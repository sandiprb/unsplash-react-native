import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { SearchBar, Button, WhiteSpace, WingBlank, ActivityIndicator } from 'antd-mobile'
import AutoHeightImage from 'react-native-auto-height-image'
import { getPhotoByKeyword } from './Unsplash'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			query: 'india',
			photos: [],
			isLoading: false,
		}
	}

	getPhotos = async query => {
		this.setState({ isLoading: true })
		const photos = await getPhotoByKeyword(query)
		this.setState({ photos, isLoading: false })
	}

	render() {
		const { query, photos, isLoading } = this.state

		const images = photos.length
			? photos.map((obj, index) => {
					const { urls: { small } } = obj
					return <AutoHeightImage key={`${small}${index}`} height={33} imageURL={small} />
				})
			: null

		return (
			<View style={styles.container}>
				<ActivityIndicator toast text={`Loading...`} animating={isLoading} />
				<SearchBar
					placeholder="Search..."
					value={query}
					cancelText={'Cancel'}
					maxLength={8}
					onChange={query => {
						this.setState({ query })
					}}
					onSubmit={() => this.getPhotos(query)}
				/>
				<WingBlank />
				<ScrollView>{images}</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	wrapper: {
		padding: 20,
	},
})
