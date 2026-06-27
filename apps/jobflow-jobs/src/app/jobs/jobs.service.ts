import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { AbstractJob } from './abstract.jobs';
import { JOB_METADATA_KEY } from '../decorators/job.decorator';
import { JobMetadata } from '../interfaces/job-metadata.interface';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];
  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit() {
    this.jobs =
      await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
        JOB_METADATA_KEY,
      );
  }

  getJobs() {
    return this.jobs.map((job) => job.meta);
  }

  async executeJob(name: string) {
    const job = this.jobs.find((job) => job.meta.name === name);
    if (!job) {
      throw new BadRequestException(`Job ${name} does not exist`);
    }

    await (job.discoveredClass.instance as AbstractJob).execute();
    return job.meta;
  }
}

/*

OnModuleInit is a NestJS lifecycle hook — onModuleInit() runs once, right after the module is fully loaded. At that moment, DiscoveryService scans all registered providers in the NestJS DI container, finds every class tagged with 'job_meta', and stores them.
Your question: "If a job is already executed, does it still get picked up?"
Yes — and that's intentional. onModuleInit builds a registry of available job definitions, not a history of executions. Think of it like a menu at a restaurant — the menu lists all dishes. Whether you've ordered one before doesn't remove it from the menu. executeJob(name) is the act of ordering — the registry just tells you what's available.

*/
