import { PulsarModule } from '@jobflow/pulsar';
import { Module } from '@nestjs/common';
import { FibonacciConsumer } from './fibonacci/fibonacci.consumer';
import { LoadProductModule } from './products/load-products.module';
import { JobClientsModule } from './jobs-client.module';

@Module({
  imports: [PulsarModule, LoadProductModule, JobClientsModule],
  providers: [FibonacciConsumer],
})
export class JobsModule {}
