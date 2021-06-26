REST API 

End points : - 

# Register a user
-http://localhost:8800/api/user/register

# Login User
http://localhost:8800/api/user/login

# Get All the people from collection (Auth route)
-http://localhost:8800/api/users

# Update people by Id (Auth route)
-http://localhost:8800/api/user/update/:id

# To add auth
* After login you'll get a token
* copy the token
* Pass that token in header of those routes 
# Example - 
  * key - auth-token 
  * value - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNjNjJmZjIyZWNiYT
