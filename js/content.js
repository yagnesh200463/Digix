/* ==========================================================
   SARA DIGIX — PORTFOLIO CONTENT (developer edits this file)

   Each page has ready-made slot(s) below. While src is "" the
   page shows an empty placeholder box with the title and
   description. To fill a slot:
     1. Copy your file into the folder:
          videos/            -> Reels video
          images/posts/      -> Posts image
          images/meta-ads/   -> Meta Ads image
          images/google-ads/ -> Google Ads image
     2. Put its path in src, e.g. src: "videos/reel-1.mp4"
     3. Change title and description. Save. Refresh.
   Need more slots? Copy a whole { ... }, line and paste it below.
   ========================================================== */
window.SITE_CONTENT = {
  // REELS PAGE: 1 video slot
  reels: [
    { src: "videos/SaraDigix1.mp4", title: "Style That Turns Heads", description: "Sara Digix turns your latest dress collection into scroll-stopping Reels. Your Brand. Beyond Boundaries." }
  ],

  // POSTS PAGE: 1 image slot
  posts: [
    { src: "images/posts/Sara_Digix_Post_Ads.jpeg", title: "Social Media That Works!", description: "Creative content, engaging designs, and smart social media strategies that help brands stand out, attract customers, and grow their business." }
  ],

  // META ADS PAGE: 1 image slot
  // category: "Facebook Ads" or "Instagram Ads"
  metaAds: [
    { src: "images/meta-ads/Sara_Digix_Meta_Ads.jpg", title: "Get More Customers with Meta Ads", description: "Reach the right audience with engaging Facebook and Instagram ads that drive more messages, leads, and sales.", category: "Facebook Ads" }
  ],

  // GOOGLE ADS PAGE: 1 image slot
  // category: "Search Ads", "Display Ads", "Product Promotions", "Lead Generation" or "Website Traffic"
  googleAds: [
    { src: "images/google-ads/Sara_Digix_Google_Ads.jpg", title: "Grow Your Business with Google Ads", description: "Create eye-catching Facebook and Instagram campaigns that boost engagement, attract the right audience, and turn followers into customers.", category: "Search Ads" }
  ]
};
