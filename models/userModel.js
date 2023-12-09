const db = require("../configs/dataBaseConnection")

class User {
   
  constructor(username,email,password){
    this.username = username,
    this.email = email,
    this.password = password
  }

  async saveUserData () {
    let todayD = new Date()

    let yyyy = todayD.getFullYear()
    let mm = todayD.getMonth() + 1
    let dd = todayD.getDate()

    let createdAt = `${yyyy}-${mm}-${dd}`

    console.log(createdAt);

    let insertNewUserQuery = `INSERT INTO users (user_name,user_email,user_password) VALUES ('${this.username}','${this.email}','${this.password}')`

    const [newUser,_] = await db.execute(insertNewUserQuery)

    return newUser
  }

  // Functions or Operations

  static findUserByUserName(userName){
    let sqlQ = `SELECT * FROM users WHERE user_name = "${userName}"`

    return db.execute(sqlQ)
  }


  static async findUserEmail(email){
    let sqlQ = `SELECT * FROM users WHERE user_email = "${email}"`
     
   return db.execute(sqlQ)
  }


}

module.exports = User