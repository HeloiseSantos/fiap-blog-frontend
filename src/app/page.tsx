"use client";
import { Auth0ProviderWithNavigate } from "./Auth0Provider";
import HomeContent from "./HomeContent/HomeContent";

export default function Home() {
  return (
    <Auth0ProviderWithNavigate>
      <HomeContent />
    </Auth0ProviderWithNavigate>
  );
}
