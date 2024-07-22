import db from '../db/connection';
import {DataTypes} from 'sequelize';
import Cliente from './client';
import Monto from './amount';
import PLazo from './period';
import Interest from './interest';


const Prestamo= db.define('Prestamo', {

    idLoan:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idClient:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Cliente', // Nombre de la tabla referenciada
            key: 'idClient'
        }
    },
    idPeriod:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Plazo', // Nombre de la tabla referenciada
            key: 'idPeriod'
        }
    },
    idAmount:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Monto', // Nombre de la tabla referenciada
            key: 'idAmount'
        }
    },
    idInterest:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Interest', // Nombre de la tabla referenciada
            key: 'idInterest'
        }
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,

    },
    }, {
        tableName: 'loan',
        timestamps: false, 
        
    });

    // Definir las asociaciones
    Prestamo.belongsTo(Cliente, { foreignKey: 'idClient' });
    Prestamo.belongsTo(Monto, { foreignKey: 'idAmount' });
    Prestamo.belongsTo(PLazo, { foreignKey: 'idPeriod' });
    Prestamo.belongsTo(Interest, { foreignKey: 'idInterest' });

  

export default Prestamo;