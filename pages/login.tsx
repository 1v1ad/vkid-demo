import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VKIDSDK: any;
  }
}

export default function Login() {
  const ref = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vk.com/js/api/openapi.js?169";
    script.async = true;
    script.onload = () => {
      if (window.VKIDSDK && ref.current) {
        window.VKIDSDK.Widget.init({
          container: ref.current,
          app: parseInt(process.env.NEXT_PUBLIC_VK_CLIENT_ID || "0"),
          callback: function (data: any) {
            console.log("VKID →", data);
            window.location.href = "/lobby";
          },
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <div ref={ref}></div>
    </div>
  );
}
