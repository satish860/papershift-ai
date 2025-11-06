import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { z } from 'zod';

// Edge Store automatically reads EDGE_STORE_ACCESS_KEY and EDGE_STORE_SECRET_KEY from env
const es = initEdgeStore.create();

/**
 * Edge Store router configuration
 * Handles file uploads for the OCR playground
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket({
      maxSize: 100 * 1024 * 1024, // 100MB
      accept: ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'],
    })
    .input(
      z.object({
        type: z.enum(['pdf', 'image']).optional(),
      })
    )
    .path(({ input }) => [{ type: input.type || 'document' }])
    .beforeUpload(() => {
      // Add authentication logic here in the future
      // For now, allow all uploads during beta
      return true;
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  basePath: '/api/edgestore',
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
