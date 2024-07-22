import db from '../db/connection';
import {DataTypes} from 'sequelize';


const PLazo= db.define('Plazo', {

    idPeriod:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description:{
        type: DataTypes.STRING
    },
    }, {
        tableName: 'period',
        timestamps: false, // Si no tienes columnas de timestamps
        updateAt: false
    });
  

export default PLazo;