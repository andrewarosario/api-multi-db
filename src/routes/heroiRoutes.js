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
            handler: (request, headers) => this.db.read()
        }
    }

}

module.exports = HeroiRoutes;