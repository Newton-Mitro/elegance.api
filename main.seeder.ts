import { NestFactory } from '@nestjs/core';
import { SeedModule } from './src/core/seed/seed.module';
import { SeederService } from './src/core/seed/seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const seeder = appContext.get(SeederService);

  await seeder.seed();

  await appContext.close();
}

bootstrap().catch((e) => {
  console.error('❌ Error during seeding:', e);
  process.exit(1);
});
