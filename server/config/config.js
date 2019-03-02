

//====================================
//Puerto
//====================================

process.env.PORT = process.env.PORT || 3000;


//====================================
// Entorno
//====================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//====================================
// BD
//====================================

let urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe' : 'mongodb+srv://cafe-user1:mongodb16@cluster0-dgiyl.mongodb.net/cafe?retryWrites=true';

process.env.URLDB = urlDB;


