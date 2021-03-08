const path = require("path");
const client = require("../client/client");

const getUsers = (req, res, next) => {
	client
		.query("SELECT * FROM users")
		.then((data) => res.json(data.rows))
		.catch((err) => console.log(err));
};

const getUser = (req, res, next) => {
	const { id } = req.params;

	client
		.query("SELECT * FROM users WHERE id=$1", [id])
		.then((data) => res.json(data.rows))
		.catch((err) => console.log(err));
};

const createUser = (req, res, next) => {
	const { first_name, last_name } = req.body;
	const text =
		"INSERT INTO users(first_name, last_name) VALUES ($1, $2) RETURNING *";
	const values = [first_name, last_name];

	//express-validator takes over
	/* 	if (!first_name | !last_name) {
		return res.status(400).send("fill in a first and a last name");
	}*/
	client
		.query(text, values)
		.then((data) => res.json(data.rows))
		.catch((err) => console.log(err));
};

const changeUser = (req, res, next) => {
	const { id } = req.params;
	const { first_name, last_name } = req.body;
	const text =
		"UPDATE users SET first_name=$1, last_name=$2 WHERE id=$3 RETURNING *";
	const values = [first_name, last_name, id];

	if (!first_name || !last_name) {
		return res.status(400).send("fill in a first and a last name");
	}
	client
		.query(text, values)
		.then((data) => res.json(data.rows))
		.catch((err) => console.log(err));
};

const deleteUser = (req, res, next) => {
	const { id } = req.params;
	client
		.query("DELETE FROM users WHERE id=$1 RETURNING *", [id])
		.then((data) => res.json(data.rows))
		.catch((err) => console.log(err));
};

const show404 = (req, res, next) => {
	res.status(404);
	res.sendFile(path.join(__dirname, "../pages/404.html"));
};

module.exports = {
	getUsers: getUsers,
	getUser: getUser,
	createUser: createUser,
	changeUser: changeUser,
	deleteUser: deleteUser,
	show404: show404,
};
