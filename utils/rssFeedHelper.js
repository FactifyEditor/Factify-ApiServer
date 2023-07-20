const generateRSSFeed = (feeds) => {
    let items = feeds.map(feed => {
        return `<item>
                <link>${feed.videoUrl}</link>
                <title>${feed.metaData?.claim?.frameText}</title>
                <description>${feed.metaData?.rating?.frameText}</description>
                <pubDate>${new Date(feed.publishedDate).toUTCString()}</pubDate>
              </item>`;
    }).join('');

    let rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Factify</title>
        <link>https://storage.googleapis.com/factify/rssfeed.xml</link>
        <description>Factify RSS Feed</description>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <language>en</language>
        <managingEditor>test@test.com (editors)</managingEditor>
        ${items}
      </channel>
    </rss>`;
    return rssFeed;
};

const generateRSSFeeds = (allPublishedFeed) => {
    const rssFeeds = {};

    const rssType = ['video', 'audio', 'image'];

    rssType.forEach((type) => {
        rssFeeds[type] = {}; // Initialize as an object for each type
    });

    allPublishedFeed.forEach((feed) => {
        const language = feed.language.value;

        if (!rssFeeds[language]) {
            rssFeeds[language] = {};
            rssType.forEach((type) => {
                rssFeeds[language][type] = ''; // Initialize as an empty string for each type
            });
        }

        const rssFeedItemAudio = `<item>
      <link>${feed.audioUrl}</link>
      <title>${feed.metaData?.claim?.frameText}</title>
      <description>${feed.metaData?.rating?.frameText}</description>
      <pubDate>${new Date(feed.publishedDate).toUTCString()}</pubDate>
      </item>`;
        const rssFeedItemVideo = `<item>
      <link>${feed.videoUrl}</link>
      <title>${feed.metaData?.claim?.frameText}</title>
      <description>${feed.metaData?.rating?.frameText}</description>
      <pubDate>${new Date(feed.publishedDate).toUTCString()}</pubDate>
      </item>`;
        const rssFeedItemImage = `<item>
      <link>${feed.imageUrl}</link>
      <title>${feed.metaData?.claim?.frameText}</title>
      <description>${feed.metaData?.rating?.frameText}</description>
      <pubDate>${new Date(feed.publishedDate).toUTCString()}</pubDate>
      </item>`;

        rssFeeds[language]['audio'] += rssFeedItemAudio;
        rssFeeds[language]['video'] += rssFeedItemVideo;
        rssFeeds[language]['image'] += rssFeedItemImage;
    });

    return rssFeeds;
};




export default {
    generateRSSFeed,
    generateRSSFeeds
}