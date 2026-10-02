/* Zelqora AdMob integration.
 * Development uses Google's official test app/ad-unit IDs.
 * Replace the IDs in this file with Zelqora's own AdMob IDs before public release.
 */
(function(){
  const TEST={
    android:{banner:'ca-app-pub-3940256099942544/6300978111',interstitial:'ca-app-pub-3940256099942544/1033173712',rewarded:'ca-app-pub-3940256099942544/5224354917'},
    ios:{banner:'ca-app-pub-3940256099942544/2934735716',interstitial:'ca-app-pub-3940256099942544/4411468910',rewarded:'ca-app-pub-3940256099942544/1712485313'}
  };
  let admob=null,ready=false,loaded=false,lastShown=0,views=0;

  function plugin(){
    try{return window.Capacitor?.Plugins?.AdMob||null}catch{return null}
  }
  async function init(){
    admob=plugin();
    if(!admob||ready)return;
    try{
      await admob.initialize();
      let consent=await admob.requestConsentInfo();
      if(consent?.isConsentFormAvailable&&consent?.status==='REQUIRED'){
        consent=await admob.showConsentForm();
      }
      ready=consent?.canRequestAds!==false;
      if(ready) await prepare();
    }catch(e){console.warn('Zelqora AdMob init failed',e)}
  }
  function ids(){
    return /ios/i.test(window.Capacitor?.getPlatform?.()||'')?TEST.ios:TEST.android;
  }
  async function prepare(){
    if(!ready||!admob)return;
    try{
      await admob.prepareInterstitial({adId:ids().interstitial,isTesting:true});
      loaded=true;
    }catch(e){loaded=false}
  }
  async function videoViewed(){
    views++;
    if(!ready||!loaded)return;
    const now=Date.now();
    if(views<8||now-lastShown<90000)return;
    try{
      await admob.showInterstitial();
      lastShown=Date.now();
      loaded=false;
      await prepare();
    }catch(e){await prepare()}
  }
  async function showBanner(){
    if(!ready||!admob)return;
    try{
      await admob.showBanner({adId:ids().banner,isTesting:true,position:'BOTTOM_CENTER',margin:76});
    }catch(e){}
  }
  window.zelAds={init,videoViewed,showBanner};
})();