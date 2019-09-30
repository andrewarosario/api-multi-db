const assert = require('assert');
const api = require('./../api');

let app = {};

describe('Suite de testes da API de Herois', function() {
    this.beforeAll(async () => {
        app = await api;
    });

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('listar /herois - deve retornar somente 10 registros', async () => {
        const TAMANHO_LIMITE = 3;
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMITE);
    });

    it('listar /herois - deve filtrar um item', async () => {
        const NAME = 'Gaviao Negro'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=0&nome=${NAME}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.deepEqual(dados[0].nome, NAME);
    });
});