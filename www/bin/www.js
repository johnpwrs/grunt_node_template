process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var app = require('../app');
var port = process.env.APP_PORT || 3000;

app.set('port', port);
app.set('sslport', process.env.NODE_SSL_PORT, 3443);


var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
