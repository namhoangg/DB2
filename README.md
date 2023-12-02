# DB2
# How to run?
1. You have to have your own database at local with data inserted using file 1.1.sql and 1.2.sql
2. You have to modify some code in the file database.js to connect to your database
3. In your database, create a table name user with 4 columns: userId (pri), username, password, token, and insert username: admin, password: $2b$10$6AqtP8fpm2fXohxoQ5xBmeyUo3hOSkSN37XrqRQzo/2cqENf8SIne, token: 0UVIyqpXXCbCYmkVPUj9, userId:1.
```sql
drop table user;
CREATE TABLE user (
	userId int primary key not null,
    username varchar(100), 
    password varchar(75),
    token varchar(50)
);

INSERT INTO user (userId, username, password, token)
VALUES
(1, 'admin', '$2b$10$6AqtP8fpm2fXohxoQ5xBmeyUo3hOSkSN37XrqRQzo/2cqENf8SIne', '0UVIyqpXXCbCYmkVPUj9');
```
4. Note that the password 123456 has been hashed to become the string above.
5. in your command line, run the instruction: npm install
6. then: npm start
