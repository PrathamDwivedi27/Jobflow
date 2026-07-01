import { Jobs } from '@jobflow/nestjs';
import { Job } from '../../decorators/job.decorator';
import { LoadProductsMessage, PulsarClient } from '@jobflow/pulsar';
import { AbstractJob } from '../abstract.jobs';

@Job({
  name: Jobs.LOAD_PRODUCTS,
  description: 'Loads uploaded product data into the DB after enrichment.',
})
export class LoadProductsJob extends AbstractJob<LoadProductsMessage> {
  protected messageClass = LoadProductsMessage;

  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
