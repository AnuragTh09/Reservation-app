import app from "./app.js";
import config from "./config/index.config.js";
import connectDatabase from "./Db/index.db.js";

connectDatabase()
.then( () => {
    app.listen(config.PORT || 3000 , ()=> {
        console.log(`\n✅ Server is listening on ${config.PORT}`)
    })
})
.catch( (err) => {
    console.log(`\n 🤦‍♂️ Connection Failed `, err)
})