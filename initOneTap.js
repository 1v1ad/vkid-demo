
const VKID = window.VKIDSDK;

VKID.Config.init({
  app: 53969710,
  redirectUrl: 'https://vkid-demo.vercel.app/api/vk/callback',
  responseMode: VKID.ConfigResponseMode.Callback,
  source: VKID.ConfigSource.LOWCODE,
  scope: ''
});

const oneTap = new VKID.OneTap();

oneTap
  .render({
    container: document.getElementById('vkid-container'),
    showAlternativeLogin: true
  })
  .on(VKID.WidgetEvents.ERROR, console.error)
  .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, (payload) => {
    const { code } = payload;
    if (code) {
      window.location.href = `/api/vk/callback?code=${encodeURIComponent(code)}`;
    }
  });
