const Server = require('http').createServer();
const io = require('socket.io')?.(Server);

const bus = io.of('/bus');
const user = io.of('/user');
bus.on('connection', (socket) => {
    socket.on("bus_moved", (data) => {
        if (data?.long && data?.lat) {
            user.emit("C_bus_moved", {long: data.long, lat: data.lat});
        }
    })
});
Server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bus is working\n');
});

const port = process.env.PORT || 3030;
Server.listen(port, () =>
    console.log(`server link ${'http://localhost:' + port}`)
);