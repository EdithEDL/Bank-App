import db from '../db/connection';
import {DataTypes} from 'sequelize';


const Monto = db.define('Monto', {

    idAmount:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    totalAmount:{
        type: DataTypes.NUMBER
    }
    }, {
        tableName: 'amount',
        timestamps: false, // Si no tienes columnas de timestamps
        updateAt: false
    });
  

export default Monto;