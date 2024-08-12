const {Model, DataType } = require('sequelize');
const {NOT} = require('sequelize/types/dererrable');
const sequelize = new Sequelize = new Sequelize('sqlite::memory');

Endereco.imit({
    Id:{
        type: DataType.INTEGER,
        primarykey: true,
        autoIncrement: true,
    },
    Cep: {
        type: DataType.STRING,
        allowNull: false,
    },
    Logradouro: {
        type: DataType.STRING,
        allowNull: false,

    },
    Numero: {
    type: DataType.INTEGER,
    allowNull: false, 

},
    Complemento: {
        type: DataType.STRING,

    },
    Bairro: {
        type: DataType.STRING,
        allowNull: false,

    },
    Cidade: {
        type: DataType.STRING,
        allowNull: false,
    },
    Estado: {
        type: DataType.STRING,
        allownull: false,
    },
    MunicipiosIBGE: {
        type: DataType.STRING,
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'Endereco',
    tableName: 'enderecos',
    timestamps: true,
});
module.exports = Endereco;
