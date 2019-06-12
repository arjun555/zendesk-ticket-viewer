// Render error.ejs page for the case of an unknown route
function renderUnknownRoute(pageReq, pageRes){
    pageRes.render('error',
    {
        status: '404',
        text: `The requested URL '${pageReq.res.req._parsedOriginalUrl.pathname}' was not found on this server.`
    })
}

module.exports = {
    render : renderUnknownRoute
}