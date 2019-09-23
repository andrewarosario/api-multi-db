const ICrud = require('../interfaces/interfaceCrud');

const Sequelize = require('sequelize');

class Postgres extends ICrud {
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
        
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'root',
            'root',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
                logging: false
            }
        );  

        return connection; 
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (error) {
            console.log('Fail!!!', error);
            return false;
        }
    }

    static async defineModel(connection, schema) {
        const model = connection.define(schema.name, schema.schema, schema.options);
    
        await model.sync();
        return model;
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item);
        return dataValues;
    }

    async update(id, item) {
        return await this._schema.update(item, { where: { id } } );
    }

    async updateAndReturn(id, item) {
        const [rows, result] = await this._schema.update(item, { where: { id }, returning: true, raw: true } );
        return result[0];
    }

    async delete(id) {
        const query = id ? { id } : {};
        return this._schema.destroy({ where: query });
    }

    async read(item = {}) {
        return await this._schema.findAll({ where: item, raw: true });
    }
}

module.exports = Postgres;