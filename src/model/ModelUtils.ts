/**
 * Module to contain utility functions for the models.
 *
 * Haoyi teaches us:
 * "The simplest interface to a package is static method with standard types":-)
 */

 import {v4} from 'uuid';

 /**
  * Generates new UUID.
  */
 export function newUUID(): string {
  return v4();
 }
