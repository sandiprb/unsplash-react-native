import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { SearchBar, Button, WhiteSpace, WingBlank, ActivityIndicator } from 'antd-mobile'
import { ImageGrid } from './ImageGrid'

import { getPhotoByKeyword } from '../utils/Unsplash'

export default class Home extends React.Component {
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

	handleImageClick = imgSrc => {
		const { navigation } = this.props
		navigation.navigate('ImageViewer', imgSrc)
	}

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
					<Text style={styles.loadedText}>{`Found ${photos.length} results for ${currentQuery}`}</Text>
				) : null}

				{photosLoaded ? <ImageGrid photos={photos} onImageClick={this.handleImageClick} /> : null}

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
