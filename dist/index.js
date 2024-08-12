"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhooks = exports.createWebhooksHandler = void 0;
const mux_node_1 = __importDefault(require("@mux/mux-node"));
const muxWebhookSecret = process.env.MUX_WEBHOOK_SECRET;
if (!muxWebhookSecret) {
    throw new Error('MUX_WEBHOOK_SECRET is not set. Please configure this environment variable.');
}
const mux = new mux_node_1.default({
    webhookSecret: muxWebhookSecret,
});
function createWebhooksHandler(config) {
    return {
        config: config,
        POST: (req) => __awaiter(this, void 0, void 0, function* () { return yield handleWebhooks(config, req); })
    };
}
exports.createWebhooksHandler = createWebhooksHandler;
function handleWebhooks(config, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const WEBHOOK_SECRET = config.secret ? config.secret : process.env.MUX_WEBHOOK_SECRET;
        if (!WEBHOOK_SECRET) {
            throw new Error('Please add MUX_WEBHOOK_SECRET from Mux Dashboard to .env or .env.local');
        }
        const headers = req.headers;
        const body = yield req.text();
        let event;
        try {
            event = mux.webhooks.unwrap(body, headers);
        }
        catch (err) {
            console.error('Error verifying webhook:', err);
            return new Response('Error occured', {
                status: 400
            });
        }
        const handlerMap = {
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
        };
        if (handlerMap[event.type]) {
            return yield _handler(event, handlerMap[event.type]);
        }
        // If we don't have a handler for the event, return a 404
        return new Response('', { status: 404 });
    });
}
exports.handleWebhooks = handleWebhooks;
function _handler(event, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield callback(event.data);
        if (response != undefined) {
            return response;
        }
        else {
            return new Response('', { status: 200 });
        }
    });
}
