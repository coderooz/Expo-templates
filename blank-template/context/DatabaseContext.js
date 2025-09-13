import React, {createContext} from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import PropTypes from "prop-types";
import {Alert} from 'react-native';

export const DbContext = createContext();

export const DatabaseContext = ({children}) => {
    const database = useSQLiteContext();
    
    const executeQuery = async (query) => {
        try {
            const [result] = await database.executeSql(query);
            return result;
        } catch (error) {
            console.log('Error: ', error);
            return null;
        }
    }

    /**
     * Inserts a new user into the database.
     * @param {Object} data - The user data to be inserted.
     * @returns {number} - The last inserted row ID.
     */
    const InsertUsers = async (data) => {
        const query = `INSERT INTO Users (name, image, phone, email, address, deliveryType) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [data.name, (data.image || '../assets/default.jpg'), data.phone, data.email, data.address, data.orderType];
        const result = await database.runAsync(query, values); 
        return result.lastInsertRowId;
    }


    const CleanTables = async () => {
        try {

            // await database.runAsync("DROP TABLE Users;");
                
            await database.runAsync("DELETE FROM sqlite_sequence WHERE name='Users';");
            await db.execAsync(`
            PRAGMA journal_mode = WAL;
            PRAGMA foregin_keys = ON;
            
            CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                image TEXT DEFAULT '../assets/default.jpg',
                email TEXT,
                address TEXT NOT NULL,
                contactPhone TEXT,
                deliveryType TEXT DEFAULT 'one-time',
                dateCreated TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            `);

            const checkImageColumn = await db.getFirstAsync(`SELECT COUNT(*) AS count FROM pragma_table_info('Users') WHERE name='image'`);
            if (checkImageColumn.count === 0) {await db.execAsync(`ALTER TABLE Users ADD COLUMN image TEXT;`);} 
            Alert.alert('Database Reset', 'All tables have been reset');
        } catch (error) {
            Alert.alert("Error", "Failed to clean databse.");
        }
    };

    const InsertData = async (tableName, data) => {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');

        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        const result = await database.runAsync(query, values);
        return result.lastInsertRowId;
    };
    
    const UpdateTable = async (tableName, data, condition) => {
        let query = `UPDATE ${tableName} SET `;
        let values = [];
        let conditions = [];

        for (const key in data) {
            query += `${key} = ?, `;
            values.push(data[key]);
        }
        query = query.slice(0, -2);

        for (const key in condition) {
            conditions.push(`${key} = ?`);
            values.push(condition[key]);
        }
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        const result = await database.runAsync(query, values);
        return result.changes; 
    };

    const exportData = async () => {
        // Export data from the database
        const query = `SELECT * FROM Users; SELECT * FROM Deleveries; SELECT * FROM Billings;`;
        const result = await database.executeSql(query);
        return result;
    }

    
    
    UpdateTable.propTypes = {
        tableName: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        condition: PropTypes.object.isRequired
    }

    InsertUsers.propTypes = {
        data: PropTypes.object.isRequired
    }

    executeQuery.propTypes = {
        query: PropTypes.string.isRequired
    }

    InsertData.propTypes = {
        tableName: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }

    return (
        <DbContext.Provider value={{database, InsertUsers, UpdateTable, InsertData, CleanTables, exportData, executeQuery }}>
            {children}
        </DbContext.Provider>
    );
}