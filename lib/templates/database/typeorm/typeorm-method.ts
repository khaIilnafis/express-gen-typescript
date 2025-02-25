private async connectToDatabase(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
} 