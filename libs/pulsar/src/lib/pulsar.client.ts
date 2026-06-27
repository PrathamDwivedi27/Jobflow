import { Consumer, Message, Producer } from 'pulsar-client';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pulsar-client';

@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client = new Client({
    serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
  });

  private readonly producers: Producer[] = [];
  private readonly consumers: Consumer[] = [];

  constructor(private readonly configService: ConfigService) {}

  async createProducer(topic: string) {
    const producer = await this.client.createProducer({
      topic,
    });

    this.producers.push(producer);
    return producer;
  }

  async createConsumer(topic: string, listener: (message: Message) => void) {
    const consumer = await this.client.subscribe({
      topic,
      subscription: 'jobflow', // round robin fashion
      listener,
    });
    this.consumers.push(consumer);
    return consumer;
  }

  async onModuleDestroy() {
    for (const producer of this.producers) {
      producer.close();
    }
    await this.client.close();
  }
}

// pulsar supports batching by default
