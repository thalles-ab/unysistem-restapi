module.exports	= {
    database: "talentoses",
    username: "root",
    password: "12357951",
    params:	{
        dialect: "mysql",
        port: 3306,
        host: "talentoses.cnflodg3fqfr.sa-east-1.rds.amazonaws.com",
        define:	{
            underscored: true
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    },
    jwtSecret: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjdiYTllM2QxLTdiNDMtNDc1YS05NjVlLTYwOGNiNDdmMDUwOSIsImlhdCI6MTUwNDMwMDA0NCwiZXhwIjoxNTA0MzAzNjQ0fQ.SvOQ6obzHp-GMstXjeSusgQdzLhPEXgFAZzOldVqlZA",
    jwtSession:	{ session: false }
};