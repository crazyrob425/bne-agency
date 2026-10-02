// Local type shim: compression ships no TypeScript declarations and we avoid
// adding @types/compression as a new dev dependency for one import.
declare module "compression" {
  import { RequestHandler } from "express";
  interface CompressionOptions {
    threshold?: number | string;
    level?: number;
    memLevel?: number;
    chunkSize?: number;
    windowBits?: number;
    filter?: (req: any, res: any) => boolean;
  }
  function compression(options?: CompressionOptions): RequestHandler;
  export default compression;
}
