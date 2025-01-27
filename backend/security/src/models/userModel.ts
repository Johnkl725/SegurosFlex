import pool from '../config/db';
import sql from 'mssql';

// Definimos la interfaz para el usuario
export interface User {
  UsuarioID?: number;
  Nombre: string;
  Apellido: string;
  Email: string;
  Password: string;
  Rol: 'Personal' | 'Administrador' | 'Beneficiario';
}

// Función para llamar al procedimiento almacenado y buscar usuario por email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const poolConnection = await pool;
    const result = await poolConnection
      .request()
      .input('Email', sql.VarChar, email)
      .execute('sp_FindUserByEmail');

    if (result.recordset.length > 0) {
      return result.recordset[0] as User;
    }
    return null;
  } catch (error) {
    console.error('Error al ejecutar sp_FindUserByEmail:', error);
    throw new Error('Error en la base de datos');
  }
};

// Función para llamar al procedimiento almacenado y crear un usuario
export const createUser = async (user: User): Promise<void> => {
  try {
    const poolConnection = await pool;
    await poolConnection
      .request()
      .input('Nombre', sql.VarChar, user.Nombre)
      .input('Apellido', sql.VarChar, user.Apellido)
      .input('Email', sql.VarChar, user.Email)
      .input('Password', sql.VarChar, user.Password)
      .input('Rol', sql.VarChar, user.Rol)
      .execute('sp_CreateUser');
  } catch (error) {
    console.error('Error al ejecutar sp_CreateUser:', error);
    throw new Error('Error en la base de datos');
  }
};
