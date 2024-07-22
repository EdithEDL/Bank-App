import db from '../db/connection';
import {DataTypes} from 'sequelize';


const Cliente = db.define('Cliente', {

    idClient:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameClient:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.NUMBER
    },
    }, {
        tableName: 'client',
        timestamps: false, // Si no tienes columnas de timestamps
        updateAt: false
    });
  

export default Cliente;