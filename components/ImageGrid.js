import React from 'react'
import { View, Image, Text, StyleSheet, ScrollView, Dimensions, TouchableHighlight } from 'react-native'
import { windowWidth, windowHeight } from '../utils/constants'
import { getAspectRatioHeight } from '../utils/index'
import { Button } from 'antd-mobile'

export const ImageGrid = ({ navigation, photos = [], onImageClick, isNextPageAvailable, onLoadMoreClick }) => {
	const styles = ImageGridStyles
	const images =
		photos.length &&
		photos.map((obj, index) => {
			const { urls, height, width } = obj
			const { regular: uri } = urls
			const calculatedHeight = getAspectRatioHeight(width, height, windowWidth)
			console.log(calculatedHeight)
			return (
				// <View key={`${uri}${index}`} style={styles.imgWrapper}>
				<TouchableHighlight key={`${uri}${index}`} style={{ width: windowWidth }} onPress={() => onImageClick(urls)}>
					<View>
						<Image
							style={{ width: windowWidth, height: calculatedHeight, marginBottom: 10 }}
							resizeMode="cover"
							source={{ uri }}
						/>
					</View>
				</TouchableHighlight>
				// </View>
			)
		})
	return (
		<ScrollView
			ref={ref => (this.scrollView = ref)}
			/* onContentSizeChange={(contentWidth, contentHeight) => {
				this.scrollView.scrollToEnd({ animated: true })
			}} */
		>
			<View style={styles.container}>
				{images ? (
					<View>
						{images}
						<Button type="ghost" disabled={!isNextPageAvailable} onClick={onLoadMoreClick} inline style={{ margin: 8 }}>
							{isNextPageAvailable ? 'LOAD MORE' : "That's all folks!"}
						</Button>
					</View>
				) : null}
			</View>
		</ScrollView>
	)
}

const ImageGridStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		// paddingLeft: 8,
		// paddingRight: 8,
	},

	imgWrapper: {
		// flexBasis: windowWidth / 1, // - 12,
		// maxWidth: windowWidth,
		flexBasis: '100%',

		// height: windowHeight,
		marginBottom: 8,
	},
	img: {
		height: 100,
	},
})
