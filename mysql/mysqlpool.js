const bluebird = require("bluebird")
const mysql = require("mysql")

function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

const p = console.log

let pool
export function initPool(opt) {
    pool = bluebird.promisifyAll(mysql.createPool(opt))
}

export async function getConnectionAsync(cb) {
    let conn = await pool.getConnectionAsync()
    conn = bluebird.promisifyAll(conn)
    try {
        return await cb(conn)
    } catch (e) {
        throw e
    } finally {
        conn.release()
    }
}

export async function transactionAsync(cb) {
    let conn = await pool.getConnectionAsync()
    conn = bluebird.promisifyAll(conn)
    await conn.beginTransactionAsync()
    try {
        let result = await cb(conn)
        await conn.commitAsync()
        return result
    } catch (e) {
        await conn.rollbackAsync()
        throw e
    } finally {
        conn.release()
    }
}

export async function createConnection(opt) {
    let conn = mysql.createConnection(opt)
    return bluebird.promisifyAll(conn)
}

