import { PulsarClient } from '@jobflow/pulsar';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.jobs';
import { FibonacciData } from './fibonacci-data.interface';

@Job({
  name: 'Fibonacci',
  description: 'Generate a Fibonacci sequence and store it in the DB.',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
