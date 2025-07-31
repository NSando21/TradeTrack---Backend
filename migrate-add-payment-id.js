const { DataSource } = require('typeorm');
require('dotenv').config({ path: './src/config/config.env' });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tradetrack',
  synchronize: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false
  }
});

async function addPaymentIdColumn() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Conexión a la base de datos establecida');

    // Verificar si la columna ya existe
    const columnExists = await AppDataSource.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'subscriptions' 
      AND column_name = 'mercadoPagoPaymentId'
    `);

    if (columnExists.length > 0) {
      console.log('⚠️  La columna mercadoPagoPaymentId ya existe');
      return;
    }

    // Agregar la columna
    await AppDataSource.query(`
      ALTER TABLE subscriptions 
      ADD COLUMN "mercadoPagoPaymentId" VARCHAR(100)
    `);

    console.log('✅ Columna mercadoPagoPaymentId agregada exitosamente');

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('🔌 Conexión a la base de datos cerrada');
    }
  }
}

addPaymentIdColumn(); 