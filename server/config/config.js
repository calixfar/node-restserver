

//====================================
//Puerto
//====================================

process.env.PORT = process.env.PORT || 3000;


//====================================
// Entorno
//====================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//====================================
// Vencimiento TOKEN
//====================================

process.env.caducidad_TOKEN =  60 * 60 * 24 * 30;

//====================================
// SEED de autenticación
//====================================

process.env.SEED = process.env.SEED || 'seed-autenticacion-desarrollo';

//====================================
// BD
//====================================

let urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI;

process.env.URLDB = urlDB;


