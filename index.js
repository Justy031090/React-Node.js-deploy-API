const { MongoClient } = require('mongodb');
//need to change here my password to import it.
const uri =
    'mongodb+srv://justy031090:Motomoto20232023@bankapi.nf9vh.mongodb.net/users?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err, suc) => {
    if (err) return console.log('error!');
    const collection = client.db('test').collection('devices');
    // perform actions on the collection object
});

// axios({
//     method: 'post',
//     url: baseUrl + 'applications/' + appName + '/dataexport/plantypes' + plan,
//     headers: {},
//     data: {
//       foo: 'bar', // This is the body part
//     }
//   });
