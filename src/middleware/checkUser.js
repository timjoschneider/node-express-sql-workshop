const client = require("../client/client");
const path = require("path");

module.exports = (req, res, next) => {
	const { id } = req.params;
	client
		.query(
			"SELECT * FROM users WHERE EXISTS(SELECT * FROM users WHERE id=$1)",
			[id]
		)
		.then((data) => {
			console.log(data);
			if (!data.rows[0]) {
				res.status(404);
				return res.sendFile(path.join(__dirname, "../pages/404.html"));
			}
			return next();
		})
		.catch((error) =>
			res.sendFile(path.join(__dirname, "../pages/404.html"))
		);
};
