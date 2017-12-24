import Unsplash, { toJson } from 'unsplash-js/native'

const APP_ID = 'ee6677864df1917f7b8bded7f9102a89deb72a4bf52559615baac87971649b20'
const APP_SECRET = '0d6c22ab2a4239021a3c2d44758ae33d9f29ab7bbab23882adff246c9e690184'
const CALLBACK_URL = 'http://sandipbaradiya.com'

const unsplash = new Unsplash({
	applicationId: APP_ID,
	secret: APP_SECRET,
	callbackUrl: CALLBACK_URL,
})

export const getPhotoByKeyword = async (keyword, page) => {
	try {
		const data = await unsplash.search.photos(keyword, page)
		const { _bodyInit } = data
		const { results, total_pages } = JSON.parse(_bodyInit)
		return { fetchedPhotos: results, total_pages }
	} catch (error) {
		console.error(error)
	}
}
