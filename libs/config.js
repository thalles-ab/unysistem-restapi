module.exports	= {
    mongourl: "mongodb://localhost:27017/talentoses",
    mongoconfig:{
        useMongoClient: true,
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30
    },
    jwtSecret:	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjdiYTllM2QxLTdiNDMtNDc1YS05NjVlLTYwOGNiNDdmMDUwOSIsImlhdCI6MTUwNDMwMDA0NCwiZXhwIjoxNTA0MzAzNjQ0fQ.SvOQ6obzHp-GMstXjeSusgQdzLhPEXgFAZzOldVqlZA",
    jwtSession:	{session:	false}
};
