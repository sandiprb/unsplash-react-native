import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableHighlight } from 'react-native'
import { StackNavigator } from 'react-navigation'

import { SearchBar, Button, WhiteSpace, WingBlank, ActivityIndicator } from 'antd-mobile'
import AutoHeightImage from 'react-native-auto-height-image'

import { getPhotoByKeyword } from './utils/Unsplash'
import { ImageGrid } from './components/ImageGrid'
import { windowHeight, windowWidth } from './utils/constants'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isNextPageAvailable: true,
			currentQuery: '',
			isLoading: false,
			nextPage: 1,
			photos: [],
			query: '',
		}
	}

	componentDidMount() {}

	getPhotos = async () => {
		const { query, currentQuery } = this.state
		this.setState({ isLoading: true })
		if (query != currentQuery) {
			this.setState({ photos: [], nextPage: 1 })
		}
		const { photos, nextPage } = this.state
		const { fetchedPhotos, total_pages } = await getPhotoByKeyword(query, nextPage)
		const latestPhotos = [...photos, ...fetchedPhotos]
		const isNextPageAvailable = total_pages > nextPage
		this.setState({ photos: latestPhotos, isLoading: false, currentQuery: query, isNextPageAvailable })
	}

	handleLoadMore = async () => {
		const { nextPage } = this.state
		this.setState({ nextPage: nextPage + 1 })
		this.getPhotos()
	}

	handleImageClick = imgSrc => {}

	render() {
		const { query, photos, isLoading, currentQuery, isNextPageAvailable } = this.state
		const photosLoaded = photos.length

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
					onSubmit={() => this.getPhotos()}
				/>

				<WingBlank />

				{photosLoaded ? (
					<Text style={styles.loadedText}> {`Found ${photos.length} results for ${currentQuery}.`} </Text>
				) : null}

				{photosLoaded ? <ImageGrid photos={photos} /> : null}

				{photosLoaded ? (
					<Button
						type="ghost"
						disabled={!isNextPageAvailable}
						onClick={this.handleLoadMore}
						inline
						style={styles.btnLoadMore}
					>
						{isNextPageAvailable ? 'LOAD MORE' : "That's all folks!"}
					</Button>
				) : null}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30,
		backgroundColor: '#fff',
	},
	loadedText: {
		fontSize: 14,
		margin: 4,
		fontWeight: 'bold',
	},
	btnLoadMore: {
		margin: 8,
	},
})

const ImageViewer = ({ navigation }) => {
	/* Image Preview Mode on Image Click */
}

const SplashScreen = ({ navigation }) => {
	const { textName, logo } = SplashScreenStyles
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: windowHeight }}>
			<TouchableHighlight onPress={() => navigation.navigate('Home')}>
				<View>
					<Image
						source={{
							url:
								'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Logo_of_Unsplash.svg/2000px-Logo_of_Unsplash.svg.png',
						}}
						style={logo}
					/>
					<Text style={textName}>Unsplash</Text>
				</View>
			</TouchableHighlight>
		</View>
	)
}

const SplashScreenStyles = StyleSheet.create({
	logo: {
		width: 100,
		height: 100,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	textName: {
		textAlign: 'center',
		fontSize: 44,
		fontWeight: 'bold',
	},
})

const RootNavigator = StackNavigator({
	SplashScreen: {
		screen: SplashScreen,
		navigationOptions: ({ navigation }) => ({
			header: null,
			headerMode: 'none',
		}),
	},
	Home: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			header: null,
			headerMode: 'none',
		}),
	},
})

export default RootNavigator
