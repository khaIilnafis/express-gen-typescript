	private async connectToDatabase(): Promise<void> {
		try {
			this.prisma = new PrismaClient();
			console.log('Prisma Client initialized successfully.');
		} catch (error) {
			console.error('Database connection error:', error);
			// process.exit(1);
		}
	} 