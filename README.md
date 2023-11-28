# DB2
# How to run?
1. You have to have your own database at local with data inserted
2. You have to modify some code in the file database.js to connect to your database
3. In your database, create a table name user with 4 columns: userId (pri), username, password, token, and insert username: admin, password: $2b$10$6AqtP8fpm2fXohxoQ5xBmeyUo3hOSkSN37XrqRQzo/2cqENf8SIne, token: 0UVIyqpXXCbCYmkVPUj9, userId:1.
4. Note that the password 123456 has been hashed to become the string above.
5. in your command line, run the instruction: npm install
6. then: npm start
