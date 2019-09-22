const ICrud = require('./interfaces/interfaceCrud');
const Mongoose = require('mongoose');
const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando',
};

class MongoDB extends ICrud {
    constructor() {
        super();
        this._herois = null;
        this._driver = null;
    }

    connect() {
        Mongoose.connect(
            'mongodb://root:root@localhost:27017/admin', 
            { useNewUrlParser: true }, 
            function (error) {
                if (!error) return;
                console.log('Falha na conexão!', error);
            }
        );

        const connection = Mongoose.connection;
        connection.once('open', () => console.log('database rodando!!'));

        this._driver = connection;
        this.defineModel();
    }

    defineModel() {
        const heroiSchema = new Mongoose.Schema({
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
        
        this._herois = Mongoose.model('heroi', heroiSchema);     
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState];
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return STATUS[this._driver.readyState];
    }

    async create(item) {
        return await this._herois.create(item);
    }

    async read(item, skip = 0, limit = 10) {
        return await this._herois.find(item)
            .skip(skip)
            .limit(limit);
    }

    async update(id, item) {
        return this._herois.updateOne({_id: id}, { $set: item });
    }

    async delete(id) {
        return await this._herois.deleteOne({_id: id});
    }
}

module.exports = MongoDB;