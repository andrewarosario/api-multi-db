const BaseRoute = require('./base/baseRoute');

class HeroiRoutes extends BaseRoute {

    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {

                    const { skip, limit, nome } = request.query;

                    let query = nome ? { nome } : {};

                    return this.db.read(query, +skip, +limit);
                    
                } catch (error) {
                    console.log('DEU RUIM', error);
                    return 'Erro interno no servidor';
                }
            }
        }
    }

}

module.exports = HeroiRoutes;