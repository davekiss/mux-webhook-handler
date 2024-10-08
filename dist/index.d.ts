import Mux from '@mux/mux-node';
export declare function createWebhooksHandler(config: WebhookRegistrationConfig): WebhooksHandler;
type WebhooksHandler = {
    config: WebhookRegistrationConfig;
    POST: (req: Request) => Promise<Response>;
};
type HandlerType = Mux.Webhooks.VideoAssetCreatedWebhookEvent | Mux.Webhooks.VideoAssetReadyWebhookEvent | Mux.Webhooks.VideoAssetErroredWebhookEvent | Mux.Webhooks.VideoAssetUpdatedWebhookEvent | Mux.Webhooks.VideoAssetDeletedWebhookEvent | Mux.Webhooks.VideoAssetLiveStreamCompletedWebhookEvent | Mux.Webhooks.VideoAssetStaticRenditionsReadyWebhookEvent | Mux.Webhooks.VideoAssetStaticRenditionsPreparingWebhookEvent | Mux.Webhooks.VideoAssetStaticRenditionsDeletedWebhookEvent | Mux.Webhooks.VideoAssetStaticRenditionsErroredWebhookEvent | Mux.Webhooks.VideoAssetMasterPreparingWebhookEvent | Mux.Webhooks.VideoAssetMasterReadyWebhookEvent | Mux.Webhooks.VideoAssetMasterDeletedWebhookEvent | Mux.Webhooks.VideoAssetMasterErroredWebhookEvent | Mux.Webhooks.VideoAssetTrackCreatedWebhookEvent | Mux.Webhooks.VideoAssetTrackReadyWebhookEvent | Mux.Webhooks.VideoAssetTrackErroredWebhookEvent | Mux.Webhooks.VideoAssetTrackDeletedWebhookEvent | Mux.Webhooks.VideoAssetWarningWebhookEvent | Mux.Webhooks.VideoUploadAssetCreatedWebhookEvent | Mux.Webhooks.VideoUploadCancelledWebhookEvent | Mux.Webhooks.VideoUploadCreatedWebhookEvent | Mux.Webhooks.VideoUploadErroredWebhookEvent | Mux.Webhooks.VideoLiveStreamCreatedWebhookEvent | Mux.Webhooks.VideoLiveStreamConnectedWebhookEvent | Mux.Webhooks.VideoLiveStreamRecordingWebhookEvent | Mux.Webhooks.VideoLiveStreamActiveWebhookEvent | Mux.Webhooks.VideoLiveStreamDisconnectedWebhookEvent | Mux.Webhooks.VideoLiveStreamIdleWebhookEvent | Mux.Webhooks.VideoLiveStreamUpdatedWebhookEvent | Mux.Webhooks.VideoLiveStreamEnabledWebhookEvent | Mux.Webhooks.VideoLiveStreamDisabledWebhookEvent | Mux.Webhooks.VideoLiveStreamDeletedWebhookEvent | Mux.Webhooks.VideoLiveStreamWarningWebhookEvent | Mux.Webhooks.VideoLiveStreamSimulcastTargetCreatedWebhookEvent | Mux.Webhooks.VideoLiveStreamSimulcastTargetIdleWebhookEvent | Mux.Webhooks.VideoLiveStreamSimulcastTargetStartingWebhookEvent | Mux.Webhooks.VideoLiveStreamSimulcastTargetBroadcastingWebhookEvent | Mux.Webhooks.VideoLiveStreamSimulcastTargetErroredWebhookEvent | Mux.Webhooks.VideoLiveStreamSimulcastTargetDeletedWebhookEvent | Mux.Webhooks.VideoLiveStreamSimulcastTargetUpdatedWebhookEvent;
type HandlerFn<T extends HandlerType> = (payload: T) => Promise<void | Response>;
export type WebhookRegistrationConfig = {
    secret?: string;
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
};
export declare function handleWebhooks(config: WebhookRegistrationConfig, req: Request): Promise<Response>;
export {};
