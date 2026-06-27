export abstract class AbstractJob {
  async execute() {
    console.log('Executing Job ...');
  }
}

/*

A base class that defines the interface all jobs must follow. FibonacciJob extends AbstractJob — this guarantees every job has an execute() method. 
In JobsService, you cast to AbstractJob and call .execute() safely:

await (job.discoveredClass.instance as AbstractJob).execute();

Without this, TypeScript has no idea if .execute() exists on the discovered class.

*/
