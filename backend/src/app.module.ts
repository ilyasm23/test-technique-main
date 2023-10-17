import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from 'src/common/configs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/jwt.strategy';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TodosResolver } from './todos/todos.resolver';
import { PostgresService } from './postgres.service';
import { TodosService } from './todos/todos.service';
// import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'secret',
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    // TodosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    TodosResolver,
    PostgresService,
    TodosService,
  ],
})
export class AppModule {}
