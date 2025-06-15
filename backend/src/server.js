const { app } = require(".");

const PORT=5454;

app.listen(PORT, ()=>{
  console.log('Clothing store listning on PORT : ',PORT)
});