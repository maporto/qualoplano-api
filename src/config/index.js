const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8080,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'DUMMYIDEXAMPLE',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'DUMMYEXAMPLEKEY',
    AWS_REGION: process.env.AWS_REGION || 'sa-east-1',
    DYNAMODB_ENDPOINT: process.env.DYNAMODB_ENDPOINT || 'http://dynamodb-local:8000',
    JWT_SECRET: process.env.JWT_SECRET || 'qop',
    MASTER_KEY: process.env.MASTER_KEY || '123456',
}

module.exports = {
    ...env,
    isProduction: function () {
        return env.NODE_ENV === 'production'
    }
}