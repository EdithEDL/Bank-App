import db from '../db/connection';
import {DataTypes} from 'sequelize';
import PLazo from './period';



const Interest= db.define('Interest', {

    idInterest:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idPeriod:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Plazo', // Nombre de la tabla referenciada
            key: 'idPeriod'
        }
    },
    interest:{
        type: DataTypes.NUMBER,  
    },
    }, {
        tableName: 'interest',
        timestamps: false, // Si no tienes columnas de timestamps
        updateAt: false
    });

    Interest.belongsTo(PLazo, { foreignKey: 'idPeriod' });

  
export default Interest;