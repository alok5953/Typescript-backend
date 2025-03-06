import pgPromise, { ICTFObject, IFormattingOptions, IMain, QueryFile } from "pg-promise"
import { ExtendedDatabase, initOptions } from "./initOptions"
import { types } from "pg"
import APP_CONFIG from "../config"
import * as fs from "fs"
import path from "path"
import { Diagnostics } from "./diagnostic"


const dbConfig = {
    host: APP_CONFIG.DB_HOST,
    port: APP_CONFIG.DB_PORT,
    database: APP_CONFIG.DB_NAME,
    user: APP_CONFIG.DB_USER,
    password: APP_CONFIG.DB_PASSWORD
}

const pgp: IMain = pgPromise(initOptions)

// To write every query from pgp.as.format into the file
if (APP_CONFIG.ENV !== "production") {
    if (!fs.existsSync(path.join(path.resolve(), "constants"))) {
        fs.mkdirSync(path.join(path.resolve(), "constants"), {
            mode: 0o755,
        })
        fs.writeFileSync(
            path.join(path.resolve(), "constants", "queries.txt"),
            "",
            {
                mode: 0o755,
            }
        )
    }

    const oldFormat = pgp.as.format
    pgp.as.format = (
        query: string | QueryFile | ICTFObject,
        values?: any,
        options?: IFormattingOptions
    ): string => {
        const queryToReturn = oldFormat(query, values, options)

        let formatted = queryToReturn

        formatted += "\n"
        formatted += "##############################"
        formatted += "\n"

        fs.writeFileSync(
            path.join(path.resolve(), "constants", "queries.txt"),
            formatted,
            {
                flag: "a",
            }
        )

        return queryToReturn
    }
}

// To parse bigint
const INT8_OID = types.builtins.INT8 as unknown as number;
const INT4_OID = types.builtins.INT4 as unknown as number;
const FLOAT4_OID = types.builtins.FLOAT4 as unknown as number;
const FLOAT8_OID = types.builtins.FLOAT8 as unknown as number;
const NUMERIC_OID = types.builtins.NUMERIC as unknown as number;
const DATE_OID = types.builtins.DATE as unknown as number;

pgp.pg.types.setTypeParser(INT8_OID, parseInt)
pgp.pg.types.setTypeParser(INT4_OID, parseInt)

// To parse float and numeric
pgp.pg.types.setTypeParser(FLOAT4_OID, parseFloat)
pgp.pg.types.setTypeParser(FLOAT8_OID, parseFloat)
pgp.pg.types.setTypeParser(NUMERIC_OID, parseFloat)

// To parse array of bigint in database query result
const BIGINT_ARRAY_OID = 1016 as unknown as number;
const parseBigIntArray = pgp.pg.types.getTypeParser(BIGINT_ARRAY_OID)
pgp.pg.types.setTypeParser(
    BIGINT_ARRAY_OID,
    (value) =>
        value === null
            ? null
            : parseBigIntArray(value).map((element: string) => parseInt(element))
)

// right way to parse date[]
const DATE_ARRAY_OID = 1182 as unknown as number;
pgp.pg.types.setTypeParser(DATE_ARRAY_OID, (value) =>
    value === "{}" ? [] : value.replace(/\{|\}/g, "").split(",")
)

// omit parsing date to JS standard
pgp.pg.types.setTypeParser(DATE_OID, (value) => value)

// Creating the database instance with extensions:
const db: ExtendedDatabase = pgp(dbConfig)

// Initializing optional diagnostics:
Diagnostics.init(initOptions)

export default db
export { pgp }