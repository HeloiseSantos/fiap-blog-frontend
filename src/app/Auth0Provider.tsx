import React from "react";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  const router = useRouter();

  const domain = "dev-vzb0dhm7zcb5paj1.us.auth0.com";
  const clientId = "VmVzjCj0B98h6pqbjfSMgcL99u4Eff5O";

  const onRedirectCallback = (appState?:AppState) => {
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
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
