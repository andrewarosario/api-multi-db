const ICrud = require('./interfaces/interfaceCrud');

const Sequelize = require('sequelize');

class Postgres extends ICrud {
    constructor() {
        super();
        this._driver = null;
        this._herois = null;
        
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'root',
            'root',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        );  
        await this.defineModel(); 
    }

    async isConnected() {
        try {
            await this._driver.authenticate();
            return true;
        } catch (error) {
            console.log('Fail!!!', error);
            return false;
        }
    }

    async defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: false
            }
        }, {
            tableName: 'tb_herois',
            freezeTableName: false,
            timestamps: false
        });
    
        await this._herois.sync();
    }

    async create(item) {
        const { dataValues } = await this._herois.create(item);
        return dataValues;
    }

    async update(id, item) {
        return await this._herois.update(item, { where: { id } } );
    }

    async updateAndReturn(id, item) {
        const [rows, result] = await this._herois.update(item, { where: { id }, returning: true, raw: true } );
        return result[0];
    }

    async read(item = {}) {
        return await this._herois.findAll({ where: item, raw: true });
    }
}

module.exports = Postgres;