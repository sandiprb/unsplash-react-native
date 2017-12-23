import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
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
			query: 'india',
			isLoading: false,
			pagesFetched: 0,
		}
	}

	componentDidMount() {
		this.getPhotos(this.state.query)
	}

	getPhotos = async () => {
		this.setState({ isLoading: true })
		const { pagesFetched, photos, query } = this.state
		const nextPage = pagesFetched + 1
		const fetchedPhotos = await getPhotoByKeyword(query, nextPage)
		let latestPhotos = [...photos, ...fetchedPhotos]
		this.setState({ photos: latestPhotos, isLoading: false, pagesFetched: nextPage })
	}

	render() {
		const { query, photos, isLoading } = this.state
		const showLoadMore = photos.length
		console.log(photos.length)

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
				<ImageGrid photos={photos} />
				{showLoadMore ? (
					<Button type="ghost" onClick={this.getPhotos} inline style={styles.btnLoadMore}>
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
	btnLoadMore: {
		margin: 8,
	},
})
