const Mongoose = require('mongoose');

function connectionError(error) {
    if (!error) return;
    console.log('Falha na conexão!', error);
}

Mongoose.connect(
    'mongodb://root:root@localhost:27017/admin', 
    { useNewUrlParser: true }, 
    connectionError
);

const connection = Mongoose.connection;

connection.once('open', () => console.log('database rodando!!'));

const Heroi = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});

const model = Mongoose.model('heroi', Heroi);

async function main() {
    const result = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    });
}

main();