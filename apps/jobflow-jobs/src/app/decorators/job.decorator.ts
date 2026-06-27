import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';
import { JobMetadata } from '../interfaces/job-metadata.interface';

export const JOB_METADATA_KEY = 'job_meta';

export const Job = (meta: JobMetadata) =>
  applyDecorators(SetMetadata(JOB_METADATA_KEY, meta), Injectable());

/*

applyDecorators combines multiple decorators into one. So @Job({ name: 'Fibonacci', description: '...' }) does two things simultaneously:

SetMetadata — stores { name, description } on the class under the key 'job_meta'. Think of it as tagging the class with extra info that NestJS's DI container can read.
Injectable() — makes the class available for NestJS's dependency injection, so it can be discovered and instantiated

Without Injectable(), NestJS wouldn't manage the class's lifecycle and DiscoveryService couldn't find it.

*/
