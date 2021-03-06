const assert = require('assert');
const Postgres = require('../db/strategies/postgres/postgres');
const Context = require('../db/strategies/base/contextStrategy');
const HeroiSchema = require('../db/strategies/postgres/schemas/heroiSchema');

const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'Flechas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman', poder: 'Dinheiro' };

let context = {};
describe('Postgres Suite de testes', function() {
    this.timeout(Infinity);

    this.beforeAll(async function() {
        const connection = await Postgres.connect();
        const model = await Postgres.defineModel(connection, HeroiSchema);
        context = new Context(new Postgres(connection, model));
        await context.delete();
        await context.create(MOCK_HEROI_ATUALIZAR);
    });

    it('Postgres Connection', async function() {
        const result = await context.isConnected();
        assert.equal(result, true);
    });

    it('cadastrar', async function() {  
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('listar', async function() {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('atualizar', async function() {
        const [ itemAtualizar ] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        };
        const result = await context.updateAndReturn(itemAtualizar.id, novoItem);
        assert.deepEqual(result.nome, novoItem.nome);
    });

    it('remover por id', async function() {
        const [item] = await context.read({});
        const result = await context.delete(item.id);
        assert.deepEqual(result, 1);
    });

});