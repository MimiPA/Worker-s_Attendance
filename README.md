## Package

The package used by this file are :
- bcrypt        : "^5.0.1"
- cors          : "^2.8.5"
- express       : "^4.17.1"
- jsonwebtoken  : "^8.5.1"
- moment        : "^2.29.1"
- mysql2        : "^2.3.0"
- nodemailer    : "^6.6.3"
- nodemon       : "^2.0.12"
- sequelize     : "^6.6.5"
  
  
## Endpoint

- Register  
POST - http://localhost:5000/users/register  
Perlu masukkan <b>first_name, last_name, email, password, repassword</b>  
-Kalau email / password / repassword ada yang kosong, maka muncul pesan ("All input is required").....  
-Kalau password != repassword, maka akan muncul pesan ("Please match both password").....  
-Kalau email sudah ada, maka muncul pesan ("User Already Exist. Please Login").....  
-Kalau berhasil masuk ke database, maka response akan memberikan token.....  
  
- Login  
POST - http://localhost:5000/users/login  
Perlu masukkan <b>email, password</b>  
-Kalau email / password ada yang kosong, maka muncul pesan ("All input is required").....  
-Kalau gagal dapat data user / pass salah, maka muncul pesan ("Invalid Credentials").....  
-Kalau berhasil login, maka akan dapatkan token baru.....  

