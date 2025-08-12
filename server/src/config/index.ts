import { AppDataSource } from './ormconfig';

AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.error('Database initialization error:', error));
