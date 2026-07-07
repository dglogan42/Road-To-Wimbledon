const CLIP_TTS = window.location.port === '8790' ? '/api/tts' : 'http://localhost:8790/api/tts';
const CLIP_API = window.location.port === '8790' ? '/api/clips' : 'http://localhost:8790/api/clips';
const CLIP_RSS = window.location.port === '8790' ? '/api/podcast/feed.rss' : 'http://localhost:8790/api/podcast/feed.rss';

ClipStudio.init({
  appId: 'road-to-wimbledon',
  appName: 'Road to Wimbledon 2026',
  shareTitle: 'McEnroe Watch — Tennis Clip',
  hashtags: '🎾 #Wimbledon #Tennis #ATP #WTA',
  defaultAnnouncer: 'mcenroe',
  defaultAnnouncerName: 'McEnroe Watch',
  ttsUrl: CLIP_TTS,
  clipsApiUrl: CLIP_API,
  podcastFeedUrl: CLIP_RSS,
  filePrefix: 'wimbledon',
  librarySelector: '#clip-library',
});