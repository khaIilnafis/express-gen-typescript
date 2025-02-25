/**
 * Template for Sequelize database connection method to use in Server class
 */
export default `private async connectToDatabase(): Promise<void> {
  try {
    this.sequelize = new Sequelize({
      database: process.env.DB_NAME || '{{ databaseName }}',
      username: process.env.DB_USER || '{{ pgUser }}',
      password: process.env.DB_PASSWORD || '{{ pgPassword }}',
      host: process.env.DB_HOST || '{{ pgHost }}',
      port: parseInt(process.env.DB_PORT || '{{ pgPort }}', 10),
      dialect: '{{ sequelizeDialect }}',
      models: [join(__dirname, '{{ modelsPath }}')],
    });
    
    await this.sequelize.authenticate();
    console.log('{{ successMessage }}');
  } catch (error) {
    console.error('{{ errorMessage }}:', error);
    process.exit(1);
  }
}`;
