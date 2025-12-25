import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'languageflow',
      password: process.env.DB_PASSWORD || 'languageflow123',
      database: process.env.DB_NAME || 'languageflow',
      schema: 'public',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}