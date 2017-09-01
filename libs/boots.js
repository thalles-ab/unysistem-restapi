module.exports	=	app	=>	{
    app.listen(app.get("port"),	()	=>	{
        console.log(`Talentos API - porta ${app.get("port")}`);
    });
}
