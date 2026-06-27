import { PulsarClient } from '@jobflow/pulsar';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.jobs';

@Job({
  name: 'Fibonacci',
  description: 'Generate a Fibonacci sequence and store it in the DB.',
})
export class FibonacciJob extends AbstractJob {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
