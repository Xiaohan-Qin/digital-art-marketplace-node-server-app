
// storing data in a session
const setSession = (req, res) => {

    const name = req.params['name'];
    const value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);

}


// retrieving data from a session
const getSession = (req, res) =>
{

    const name = req.params['name'];
    const value = req.session[name];
    res.send(value);

}


// retrieving entire session and clearing it
const getSessionAll = (req, res) => {

    res.send(req.session);
}

const resetSession = (req,res) => {

    req.session.destroy();
    res.send(200);
}

export default (app) => {
    app.get("/api/session/set/:name/:value", setSession);
    app.get("/api/session/get/:name", getSession);
};