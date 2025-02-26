	private async connectToDatabase(): Promise<void> {
		try {
			await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/{{databaseName}}');
			console.log('MongoDB connected successfully.');
		} catch (error) {
			console.error('Database connection error:', error);
			// process.exit(1);
		}
	} 