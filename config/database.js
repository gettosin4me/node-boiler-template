const db = {
    host: process.env.DATABASE_HOST || 'localhost',
    name: process.env.DATABASE_NAME || 'youverify_identity',
    user: process.env.DATABASE_USER || 'youverify',
    port: process.env.DATABASE_PORT || '27017',
    password: process.env.DATABASE_PASSWORD
};

exports.database = {
    url: `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`
};
