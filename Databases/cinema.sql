CREATE TABLE "User"
(
	user_id SERIAL UNIQUE NOT NULL,
	login varchar(30) NOT NULL,
	password text NOT NULL,
	isAdmin Boolean DEFAULT false
);

CREATE TABLE "Profile"
(
	profile_id INT NOT NULL, FOREIGN KEY(profile_id) REFERENCES "User"(user_id),
	name varchar(30),
	fam varchar(30),
	phone_number varchar(12)
);

CREATE TABLE jwttoken
(
	user_id INT NOT NULL, FOREIGN KEY(user_id) REFERENCES "User"(user_id),
	token text NOT NULL
);