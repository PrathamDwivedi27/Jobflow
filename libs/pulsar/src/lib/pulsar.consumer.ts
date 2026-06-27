import { deserialize } from './serialize';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, Message } from 'pulsar-client';
import { PulsarClient } from './pulsar.client';

export abstract class PulsarConsumer<T> implements OnModuleInit {
  // T is the generic of the data type of the message we get
  private consumer!: Consumer;
  protected readonly logger = new Logger(this.topic);

  constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string,
  ) {}

  async onModuleInit() {
    this.consumer = await this.pulsarClient.createConsumer(
      this.topic,
      this.listener.bind(this),
    );
  }

  private async listener(message: Message) {
    try {
      const data = deserialize<T>(message.getData()); // this is the buffer and then we deserialize it
      this.logger.debug(`Recieved message: ${JSON.stringify(data)}`);
      await this.onMessage(data);
    } catch (error) {
      this.logger.error(error);
    } finally {
      await this.acknowledge(message); // still acknowledge even if failed
    }
  }

  protected async acknowledge(message: Message) {
    await this.consumer.acknowledge(message);
  }

  protected abstract onMessage(data: T): Promise<void>;
}
