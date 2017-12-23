import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import { SearchBar, Button, WhiteSpace, WingBlank, ActivityIndicator } from 'antd-mobile'
import AutoHeightImage from 'react-native-auto-height-image'
import { getPhotoByKeyword } from './Unsplash'
import { ImageGrid } from './components/ImageGrid'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			photos: [],
			query: '',
			currentQuery: '',
			isLoading: false,
			nextPage: 1,
		}
	}

	componentDidMount() {
		this.getPhotos(this.state.query)
	}

	getPhotos = async () => {
		const {query, currentQuery } = this.state
		await this.setState({ isLoading: true })
		if(query != currentQuery) {
			await this.setState({photos: [], nextPage: 1})
		}
		const {photos, nextPage} = this.state
		const fetchedPhotos = await getPhotoByKeyword(query, nextPage)
		let latestPhotos = [...photos, ...fetchedPhotos]
		this.setState({ photos: latestPhotos, isLoading: false,currentQuery: query })
	}

	handleLoadMore = async () => {
		const { nextPage } = this.state
		await this.setState({nextPage: nextPage + 1})
		this.getPhotos()
	}

	render() {
		const { query, photos, isLoading, currentQuery } = this.state
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
				{photosLoaded ? <Text style={styles.loadedText}> {`Found ${photos.length} results for ${currentQuery}.`} </Text> : null}
				<ImageGrid photos={photos} />
				{photosLoaded ? (
					<Button type="ghost" onClick={this.handleLoadMore} inline style={styles.btnLoadMore}>
						LOAD MORE
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
