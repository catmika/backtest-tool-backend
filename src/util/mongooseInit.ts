import mongoose from 'mongoose';
import config from './config';
import { database, up } from 'migrate-mongo';

mongoose.pluralize(null);

mongoose.connection.on('disconnect', () => {
  console.log('MongoDB is disconnected!');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB is reconnected');
});

const connectWithRetry = async (startFunction: any): Promise<void> => {
  try {
    // Start migration
    console.log('Start migration...');
    const { db, client } = await database.connect();
    const migrated = await up(db, client);
    migrated.forEach((fileName: string) => console.log('Migrated:', fileName));
    await client.close();

    // Finish migration
    await mongoose.connect(config.MONGO_DB as string);
    startFunction();
    console.log('DB connected!');
  } catch (err) {
    await mongoose.disconnect();
    if (err instanceof Error) {
      console.log(`DB Connection Error: ${err.message}`);
    }
    setTimeout(connectWithRetry, 5000);
  }
};

export default connectWithRetry;
