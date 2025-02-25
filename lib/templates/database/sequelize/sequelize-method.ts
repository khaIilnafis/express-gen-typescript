private async connectToDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
} 