// Class provides methods to interact with Band Site API for comments and showdates
export class bandSiteApi {
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.baseUrl = `https://unit-2-project-api-25c1595833b2.herokuapp.com/`;
	}

	// Posts new comment to API
	postComment = async (comment) => {
		try {
			const response = await axios.post(`${this.baseUrl}comments?api_key=${this.apiKey}`, comment, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log("Comment posted");
		} catch(error) {
			console.log("Error posting comment:", error);
		}
	}

	// Retrieves all comments from API
	getComments = async () => {
		try {
			const response = await axios.get(`${this.baseUrl}comments?api_key=${this.apiKey}`);
			const comments = response.data

			// Sort comments by timestamp (newest first)
			comments.sort((a,b) => b.timestamp - a.timestamp);

			console.log("Comments retrieved")
			return comments
		} catch (error) {
			console.log("Error getting comments:", error)
		}
	}

	// Retrieves all show dates from API
	getShowDates = async () => {
		try {
			const response = await axios.get(`${this.baseUrl}showdates?api_key=${this.apiKey}`);
			const shows = response.data;
			return shows;
		} catch(error) {
			console.log("Error getting showdates:", error)
		}
	}

	// Add a like to a comment
	putLike = async (commentId) => {
		try {
			const response = await axios.put(`${this.baseUrl}comments/${commentId}/like?api_key=${this.apiKey}`, {});
			console.log(`Comment ${commentId} updated`)
			const like = response;
			return like;
		} catch (error) {
			console.log("Error putting like:", error)
		}
	}
}