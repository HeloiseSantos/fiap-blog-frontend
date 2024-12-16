import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const router = useRouter();

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  const onRedirectCallback = (appState) => {
    router.push(appState?.returnTo || "/");
  };

  if (!domain || !clientId) {
    console.error(
      "Auth0 domain and client ID must be provided in environment variables."
    );
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: typeof window !== "undefined" ? window.location.origin : "/",
        audience: "https://api-fiap-blog/",
        scope: "view:new-post-button",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
