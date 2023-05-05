import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MicroAccessControlModule } from './micro-access-control.module';
import { RabbitMQ } from 'libs/common/constants/rabbitmq.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MicroAccessControlModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqp://guest:P455w0rd@localhost:5672?heartbeat=5&connection_timeout=90000',
      ],
      queue: RabbitMQ.UserQueue,
    },
  });
  await app.listen();
  console.log('Microservice MicroAccessControl is listening');
}
bootstrap();
