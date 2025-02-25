/**
 * Template for Mongoose database connection method to use in Server class
 */
export default `private async connectToDatabase(): Promise<void> {
  try {
    await connect('{{ mongoUri }}');
    console.log('{{ successMessage }}');
  } catch (error) {
    console.error('{{ errorMessage }}:', error);
    process.exit(1);
  }
}`;
