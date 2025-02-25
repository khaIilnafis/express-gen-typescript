/**
 * Template for Prisma database connection method to use in Server class
 */
export default `private async connectToDatabase(): Promise<void> {
  try {
    this.prisma = new PrismaClient();
    await this.prisma.$connect();
    console.log('{{ successMessage }}');
  } catch (error) {
    console.error('{{ errorMessage }}:', error);
    process.exit(1);
  }
}`;
