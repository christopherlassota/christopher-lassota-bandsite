export class bandSiteApi {
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.baseUrl = `https://unit-2-project-api-25c1595833b2.herokuapp.com/`;
	}

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

	getComments = async () => {
		try {
			const response = await axios.get(`${this.baseUrl}comments?api_key=${this.apiKey}`);
			const comments = response.data
			comments.sort((a,b) => b.timestamp - a.timestamp);
			console.log("comments retrieved")
			return comments
		} catch (error) {
			console.log("Error getting comments:", error)
		}
	}

	getShowDates = async () => {
		try {
			const response = await axios.get(`${this.baseUrl}showdates?api_key=${this.apiKey}`);
			const shows = response.data;
			return shows;
		} catch(error) {
			console.log("Error getting showdates:", error)
		}
	}
}