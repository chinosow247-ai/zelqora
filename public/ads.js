/* Zelqora advertising integration. Uses official AdMob test IDs until production IDs are configured. */
(function(){
  const TEST={
    android:{banner:'ca-app-pub-3940256099942544/6300978111',interstitial:'ca-app-pub-3940256099942544/1033173712'},
    ios:{banner:'ca-app-pub-3940256099942544/2934735716',interstitial:'ca-app-pub-3940256099942544/4411468910'}
  };
  let admob=null,ready=false,loaded=false,lastShown=0,views=0,config=null;

  function plugin(){try{return window.Capacitor?.Plugins?.AdMob||null}catch{return null}}
  async function loadConfig(){try{const r=await fetch('/api/ads/config');config=await r.json()}catch{config=null}}
  function ids(){
    const ios=/ios/i.test(window.Capacitor?.getPlatform?.()||'');
    const test=ios?TEST.ios:TEST.android;
    const live=ios?(config?.ios||{}):(config?.android||{});
    return {banner:live.banner||test.banner,interstitial:live.interstitial||test.interstitial,testing:!live.banner||!live.interstitial};
  }
  async function init(){
    admob=plugin();
    if(!admob||ready)return;
    await loadConfig();
    try{
      await admob.initialize();
      let consent=await admob.requestConsentInfo();
      if(consent?.isConsentFormAvailable&&consent?.status==='REQUIRED') consent=await admob.showConsentForm();
      ready=consent?.canRequestAds!==false;
      if(ready){await prepare(); await showBanner();}
    }catch(e){console.warn('Zelqora AdMob init failed',e)}
  }
  async function prepare(){
    if(!ready||!admob)return;
    const a=ids();
    try{await admob.prepareInterstitial({adId:a.interstitial,isTesting:a.testing});loaded=true}catch{loaded=false}
  }
  async function videoViewed(){
    views++;
    if(!ready||!loaded)return;
    const now=Date.now();
    // Keep interruptions limited: first interstitial after 8 viewed videos, then at most once every 90 seconds.
    if(views<8||now-lastShown<90000)return;
    try{await admob.showInterstitial();lastShown=Date.now();loaded=false;await prepare()}catch{await prepare()}
  }
  async function showBanner(){
    if(!ready||!admob)return;
    const a=ids();
    try{await admob.showBanner({adId:a.banner,isTesting:a.testing,position:'BOTTOM_CENTER',margin:76})}catch{}
  }
  window.zelAds={init,videoViewed,showBanner};
})();