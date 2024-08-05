# Mux Webhook Handler

```bash
npm install @mux/webhook-handler
```

Then, make sure to set the `MUX_WEBHOOK_SECRET` environment variable to the value you found in the Mux dashboard.

## Using with Next.js

Create a route handler file at your preferred location, eg. `/api/webhooks/mux/route.ts`.

Then, implement your logic inside the configuration passed into `createWebhooksHandler` to handle the various events sent from Mux.

```js
import { createWebhooksHandler } from "@mux/webhook-handler";

const handler = createWebhooksHandler({
  // Add/remove optional handlers to get access to the data.
  onVideoAssetCreated: async (payload) => {
    // Update a video in the database
    console.log("video updated!", payload)
  },
  onVideoAssetDeleted: async (payload) => {
    // Delete a video in the database
    console.log("video deleted!", payload)
  }
})

export const POST = handler.POST
```