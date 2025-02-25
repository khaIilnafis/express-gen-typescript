/**
 * Template for TypeORM database connection method to use in Server class
 */
export default `private async connectToDatabase(): Promise<void> {
  try {
    await createConnection({
      type: process.env.DB_TYPE || '{{ defaultDbType }}',
      host: process.env.DB_HOST || '{{ pgHost }}',
      port: parseInt(process.env.DB_PORT || '{{ pgPort }}', 10),
      username: process.env.DB_USER || '{{ pgUser }}',
      password: process.env.DB_PASSWORD || '{{ pgPassword }}',
      database: process.env.DB_NAME || '{{ databaseName }}',
      entities: ['{{ entitiesPath }}'],
      synchronize: process.env.NODE_ENV !== 'production',
    });
    console.log('{{ successMessage }}');
  } catch (error) {
    console.error('{{ errorMessage }}:', error);
    process.exit(1);
  }
}`;
