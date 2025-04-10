import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seed/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Run seeding logic (Optional: Run only in development or once)
  const seederService = app.get(SeederService);
  await seederService.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
