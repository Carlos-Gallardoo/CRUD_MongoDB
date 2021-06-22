
module.exports = {
    port : process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb+srv://admin:6tx66F7U9cCT7MXR@cluster0.3rx5k.mongodb.net/CRUD?retryWrites=true&w=majority',
  //db: process.env.MONGODB || 'mongodb://localhost:27017/mytest2'
    urlParser: {
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useFindAndModify:false,
      useCreateIndex: true,
      
    }
}