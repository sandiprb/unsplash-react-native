import React from 'react'
import { View, Image, Text, StyleSheet, ScrollView, Dimensions, TouchableHighlight } from 'react-native'
import { windowWidth } from '../utils/constants'

export const ImageGrid = ({ navigation, photos = [], onImageClick }) => {
	const styles = ImageGridStyles
	const images =
		photos.length &&
		photos.map((obj, index) => {
			const { urls } = obj
			const { thumb: uri } = urls
			return (
				<View key={`${uri}${index}`} style={styles.imgWrapper}>
					<TouchableHighlight onPress={() => onImageClick(urls)}>
						<Image style={styles.img} resizeMode="cover" source={{ uri }} />
					</TouchableHighlight>
				</View>
			)
		})
	return (
		<ScrollView
			ref={ref => (this.scrollView = ref)}
			onContentSizeChange={(contentWidth, contentHeight) => {
				this.scrollView.scrollToEnd({ animated: true })
			}}
		>
			<View style={styles.container}>{images ? images : null}</View>
		</ScrollView>
	)
}

const ImageGridStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingLeft: 8,
		paddingRight: 8,
	},

	imgWrapper: {
		flexBasis: windowWidth / 3 - 12,
		marginBottom: 8,
	},
	img: {
		height: 100,
	},
})
