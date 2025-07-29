const { VKIDSDK } = window;
VKIDSDK.Config.init({
  app: 53969710,
  redirectUrl: 'https://vkid-demo.vercel.app/api/vk/callback',
  responseMode: VKIDSDK.ConfigResponseMode.Callback,
  source: VKIDSDK.ConfigSource.LOWCODE
});

const oneTap = new VKIDSDK.OneTap();
oneTap.render({
  container: document.body,
  showAlternativeLogin: true
});
