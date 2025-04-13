// main.seeder.ts
import { NestFactory } from '@nestjs/core';
import { SeederService } from './src/seed/seeder.service';
import { SeedModule } from './src/seed/seed.module';

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
