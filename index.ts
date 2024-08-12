import Mux from '@mux/mux-node';

const muxWebhookSecret = process.env.MUX_WEBHOOK_SECRET;
if (!muxWebhookSecret) {
    throw new Error('MUX_WEBHOOK_SECRET is not set. Please configure this environment variable.');
}

const mux = new Mux({
    webhookSecret: muxWebhookSecret,
});

export function createWebhooksHandler(config: WebhookRegistrationConfig): WebhooksHandler {
    return {
        config: config,
        POST: async (req: Request) => await handleWebhooks(config, req)
    }
}

type WebhooksHandler = {
    config: WebhookRegistrationConfig
    POST: (req: Request) => Promise<Response>
}

type HandlerType = 
    | Mux.Webhooks.VideoAssetCreatedWebhookEvent
    | Mux.Webhooks.VideoAssetReadyWebhookEvent
    | Mux.Webhooks.VideoAssetErroredWebhookEvent
    | Mux.Webhooks.VideoAssetUpdatedWebhookEvent
    | Mux.Webhooks.VideoAssetDeletedWebhookEvent
    | Mux.Webhooks.VideoAssetLiveStreamCompletedWebhookEvent
    | Mux.Webhooks.VideoAssetStaticRenditionsReadyWebhookEvent
    | Mux.Webhooks.VideoAssetStaticRenditionsPreparingWebhookEvent
    | Mux.Webhooks.VideoAssetStaticRenditionsDeletedWebhookEvent
    | Mux.Webhooks.VideoAssetStaticRenditionsErroredWebhookEvent
    | Mux.Webhooks.VideoAssetMasterPreparingWebhookEvent
    | Mux.Webhooks.VideoAssetMasterReadyWebhookEvent
    | Mux.Webhooks.VideoAssetMasterDeletedWebhookEvent
    | Mux.Webhooks.VideoAssetMasterErroredWebhookEvent
    | Mux.Webhooks.VideoAssetTrackCreatedWebhookEvent
    | Mux.Webhooks.VideoAssetTrackReadyWebhookEvent
    | Mux.Webhooks.VideoAssetTrackErroredWebhookEvent
    | Mux.Webhooks.VideoAssetTrackDeletedWebhookEvent
    | Mux.Webhooks.VideoAssetWarningWebhookEvent
    | Mux.Webhooks.VideoUploadAssetCreatedWebhookEvent
    | Mux.Webhooks.VideoUploadCancelledWebhookEvent
    | Mux.Webhooks.VideoUploadCreatedWebhookEvent
    | Mux.Webhooks.VideoUploadErroredWebhookEvent
    | Mux.Webhooks.VideoLiveStreamCreatedWebhookEvent
    | Mux.Webhooks.VideoLiveStreamConnectedWebhookEvent
    | Mux.Webhooks.VideoLiveStreamRecordingWebhookEvent
    | Mux.Webhooks.VideoLiveStreamActiveWebhookEvent
    | Mux.Webhooks.VideoLiveStreamDisconnectedWebhookEvent
    | Mux.Webhooks.VideoLiveStreamIdleWebhookEvent
    | Mux.Webhooks.VideoLiveStreamUpdatedWebhookEvent
    | Mux.Webhooks.VideoLiveStreamEnabledWebhookEvent
    | Mux.Webhooks.VideoLiveStreamDisabledWebhookEvent
    | Mux.Webhooks.VideoLiveStreamDeletedWebhookEvent
    | Mux.Webhooks.VideoLiveStreamWarningWebhookEvent
    | Mux.Webhooks.VideoLiveStreamSimulcastTargetCreatedWebhookEvent
    | Mux.Webhooks.VideoLiveStreamSimulcastTargetIdleWebhookEvent
    | Mux.Webhooks.VideoLiveStreamSimulcastTargetStartingWebhookEvent
    | Mux.Webhooks.VideoLiveStreamSimulcastTargetBroadcastingWebhookEvent
    | Mux.Webhooks.VideoLiveStreamSimulcastTargetErroredWebhookEvent
    | Mux.Webhooks.VideoLiveStreamSimulcastTargetDeletedWebhookEvent
    | Mux.Webhooks.VideoLiveStreamSimulcastTargetUpdatedWebhookEvent
type HandlerFn<T extends HandlerType> = (payload: T) => Promise<void | Response>

type WebhooksHandlerMap = {
    [path: string]: HandlerFn<Mux.Webhooks.VideoAssetCreatedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetReadyWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetErroredWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetUpdatedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetDeletedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetLiveStreamCompletedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetStaticRenditionsReadyWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetStaticRenditionsPreparingWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetStaticRenditionsDeletedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetStaticRenditionsErroredWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetMasterReadyWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetMasterPreparingWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetMasterDeletedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetMasterErroredWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetTrackCreatedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetTrackReadyWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetTrackErroredWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetTrackDeletedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoAssetWarningWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoUploadAssetCreatedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoUploadCancelledWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoUploadCreatedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoUploadErroredWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamCreatedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamConnectedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamRecordingWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamActiveWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamDisconnectedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamIdleWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamUpdatedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamEnabledWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamDisabledWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamDeletedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamWarningWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetCreatedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetIdleWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetStartingWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetBroadcastingWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetErroredWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetDeletedWebhookEvent> |
    HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetUpdatedWebhookEvent> |
    undefined
}

export type WebhookRegistrationConfig = {
    secret?: string
    onVideoAssetCreated?: HandlerFn<Mux.Webhooks.VideoAssetCreatedWebhookEvent>;
    onVideoAssetReady?: HandlerFn<Mux.Webhooks.VideoAssetReadyWebhookEvent>;
    onVideoAssetErrored?: HandlerFn<Mux.Webhooks.VideoAssetErroredWebhookEvent>;
    onVideoAssetUpdated?: HandlerFn<Mux.Webhooks.VideoAssetUpdatedWebhookEvent>;
    onVideoAssetDeleted?: HandlerFn<Mux.Webhooks.VideoAssetDeletedWebhookEvent>;
    onVideoAssetLiveStreamCompleted?: HandlerFn<Mux.Webhooks.VideoAssetLiveStreamCompletedWebhookEvent>;
    onVideoAssetStaticRenditionsReady?: HandlerFn<Mux.Webhooks.VideoAssetStaticRenditionsReadyWebhookEvent>;
    onVideoAssetStaticRenditionsPreparing?: HandlerFn<Mux.Webhooks.VideoAssetStaticRenditionsPreparingWebhookEvent>;
    onVideoAssetStaticRenditionsDeleted?: HandlerFn<Mux.Webhooks.VideoAssetStaticRenditionsDeletedWebhookEvent>;
    onVideoAssetStaticRenditionsErrored?: HandlerFn<Mux.Webhooks.VideoAssetStaticRenditionsErroredWebhookEvent>;
    onVideoAssetMasterReady?: HandlerFn<Mux.Webhooks.VideoAssetMasterReadyWebhookEvent>;
    onVideoAssetMasterPreparing?: HandlerFn<Mux.Webhooks.VideoAssetMasterPreparingWebhookEvent>;
    onVideoAssetMasterDeleted?: HandlerFn<Mux.Webhooks.VideoAssetMasterDeletedWebhookEvent>;
    onVideoAssetMasterErrored?: HandlerFn<Mux.Webhooks.VideoAssetMasterErroredWebhookEvent>;
    onVideoAssetTrackCreated?: HandlerFn<Mux.Webhooks.VideoAssetTrackCreatedWebhookEvent>;
    onVideoAssetTrackReady?: HandlerFn<Mux.Webhooks.VideoAssetTrackReadyWebhookEvent>;
    onVideoAssetTrackErrored?: HandlerFn<Mux.Webhooks.VideoAssetTrackErroredWebhookEvent>;
    onVideoAssetTrackDeleted?: HandlerFn<Mux.Webhooks.VideoAssetTrackDeletedWebhookEvent>;
    onVideoAssetWarning?: HandlerFn<Mux.Webhooks.VideoAssetWarningWebhookEvent>;
    onVideoUploadAssetCreated?: HandlerFn<Mux.Webhooks.VideoUploadAssetCreatedWebhookEvent>;
    onVideoUploadCancelled?: HandlerFn<Mux.Webhooks.VideoUploadCancelledWebhookEvent>;
    onVideoUploadCreated?: HandlerFn<Mux.Webhooks.VideoUploadCreatedWebhookEvent>;
    onVideoUploadErrored?: HandlerFn<Mux.Webhooks.VideoUploadErroredWebhookEvent>;
    onVideoLiveStreamCreated?: HandlerFn<Mux.Webhooks.VideoLiveStreamCreatedWebhookEvent>;
    onVideoLiveStreamConnected?: HandlerFn<Mux.Webhooks.VideoLiveStreamConnectedWebhookEvent>;
    onVideoLiveStreamRecording?: HandlerFn<Mux.Webhooks.VideoLiveStreamRecordingWebhookEvent>;
    onVideoLiveStreamActive?: HandlerFn<Mux.Webhooks.VideoLiveStreamActiveWebhookEvent>;
    onVideoLiveStreamDisconnected?: HandlerFn<Mux.Webhooks.VideoLiveStreamDisconnectedWebhookEvent>;
    onVideoLiveStreamIdle?: HandlerFn<Mux.Webhooks.VideoLiveStreamIdleWebhookEvent>;
    onVideoLiveStreamUpdated?: HandlerFn<Mux.Webhooks.VideoLiveStreamUpdatedWebhookEvent>;
    onVideoLiveStreamEnabled?: HandlerFn<Mux.Webhooks.VideoLiveStreamEnabledWebhookEvent>;
    onVideoLiveStreamDisabled?: HandlerFn<Mux.Webhooks.VideoLiveStreamDisabledWebhookEvent>;
    onVideoLiveStreamDeleted?: HandlerFn<Mux.Webhooks.VideoLiveStreamDeletedWebhookEvent>;
    onVideoLiveStreamWarning?: HandlerFn<Mux.Webhooks.VideoLiveStreamWarningWebhookEvent>;
    onVideoLiveStreamSimulcastTargetCreated?: HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetCreatedWebhookEvent>;
    onVideoLiveStreamSimulcastTargetIdle?: HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetIdleWebhookEvent>;
    onVideoLiveStreamSimulcastTargetStarting?: HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetStartingWebhookEvent>;
    onVideoLiveStreamSimulcastTargetBroadcasting?: HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetBroadcastingWebhookEvent>;
    onVideoLiveStreamSimulcastTargetErrored?: HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetErroredWebhookEvent>;
    onVideoLiveStreamSimulcastTargetDeleted?: HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetDeletedWebhookEvent>;
    onVideoLiveStreamSimulcastTargetUpdated?: HandlerFn<Mux.Webhooks.VideoLiveStreamSimulcastTargetUpdatedWebhookEvent>;
}

export async function handleWebhooks(config: WebhookRegistrationConfig, req: Request): Promise<Response> {
    const WEBHOOK_SECRET = config.secret ? config.secret : process.env.MUX_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add MUX_WEBHOOK_SECRET from Mux Dashboard to .env or .env.local')
    }

    const headers = req.headers;
    const body = await req.text();
    let event: Mux.Webhooks.UnwrapWebhookEvent;

    try {
        event = mux.webhooks.unwrap(body, headers);
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    const handlerMap: WebhooksHandlerMap = {
        'video.asset.created': config.onVideoAssetCreated,
        'video.asset.deleted': config.onVideoAssetDeleted,
        'video.asset.errored': config.onVideoAssetErrored,
        'video.asset.live_stream_completed': config.onVideoAssetLiveStreamCompleted,
        'video.asset.master.preparing': config.onVideoAssetMasterPreparing,
        'video.asset.master.ready': config.onVideoAssetMasterReady,
        'video.asset.updated': config.onVideoAssetUpdated,
        'video.asset.static_renditions.ready': config.onVideoAssetStaticRenditionsReady,
        'video.asset.static_renditions.preparing': config.onVideoAssetStaticRenditionsPreparing,
        'video.asset.static_renditions.deleted': config.onVideoAssetStaticRenditionsDeleted,
        'video.asset.static_renditions.errored': config.onVideoAssetStaticRenditionsErrored,
        'video.asset.master.deleted': config.onVideoAssetMasterDeleted,
        'video.asset.master.errored': config.onVideoAssetMasterErrored,
        'video.asset.track.created': config.onVideoAssetTrackCreated,
        'video.asset.track.ready': config.onVideoAssetTrackReady,
        'video.asset.track.errored': config.onVideoAssetTrackErrored,
        'video.asset.track.deleted': config.onVideoAssetTrackDeleted,
        'video.asset.warning': config.onVideoAssetWarning,
        'video.upload.asset_created': config.onVideoUploadAssetCreated,
        'video.upload.cancelled': config.onVideoUploadCancelled,
        'video.upload.created': config.onVideoUploadCreated,
        'video.upload.errored': config.onVideoUploadErrored,
        'video.live_stream.created': config.onVideoLiveStreamCreated,
        'video.live_stream.connected': config.onVideoLiveStreamConnected,
        'video.live_stream.recording': config.onVideoLiveStreamRecording,
        'video.live_stream.active': config.onVideoLiveStreamActive,
        'video.live_stream.disconnected': config.onVideoLiveStreamDisconnected,
        'video.live_stream.idle': config.onVideoLiveStreamIdle,
        'video.live_stream.updated': config.onVideoLiveStreamUpdated,
        'video.live_stream.enabled': config.onVideoLiveStreamEnabled,
        'video.live_stream.disabled': config.onVideoLiveStreamDisabled,
        'video.live_stream.deleted': config.onVideoLiveStreamDeleted,
        'video.live_stream.warning': config.onVideoLiveStreamWarning,
        'video.live_stream.simulcast_target.created': config.onVideoLiveStreamSimulcastTargetCreated,
        'video.live_stream.simulcast_target.idle': config.onVideoLiveStreamSimulcastTargetIdle,
        'video.live_stream.simulcast_target.starting': config.onVideoLiveStreamSimulcastTargetStarting,
        'video.live_stream.simulcast_target.broadcasting': config.onVideoLiveStreamSimulcastTargetBroadcasting,
        'video.live_stream.simulcast_target.errored': config.onVideoLiveStreamSimulcastTargetErrored,
        'video.live_stream.simulcast_target.deleted': config.onVideoLiveStreamSimulcastTargetDeleted,
        'video.live_stream.simulcast_target.updated': config.onVideoLiveStreamSimulcastTargetUpdated,
    }

    if (handlerMap[event.type]) {
        return await _handler(event, handlerMap[event.type] as HandlerFn<HandlerType>)
    }

    // If we don't have a handler for the event, return a 204
    return new Response(null, { status: 204 })
}

async function _handler(event: Mux.Webhooks.UnwrapWebhookEvent, callback: Function): Promise<Response> {
    let response = await callback(event)
    if (response != undefined) {
        return response
    } else {
        return new Response('', { status: 200 })
    }
}