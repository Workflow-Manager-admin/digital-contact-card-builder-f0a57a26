"use client";

import { useState } from "react";
import SidebarForm from "./SidebarForm";
import CardPreview from "./CardPreview";

const COLOR_PRESETS = {
  accent: "#4CAF50",
  primary: "#2196F3",
  secondary: "#FF9800",
};

const INITIAL_SOCIALS = [
  { platform: "linkedin", url: "" },
  { platform: "email", url: "" },
];

export default function ContactCardBuilder() {
  const [state, setState] = useState({
    name: "",
    title: "",
    accent: COLOR_PRESETS.accent,
    primary: COLOR_PRESETS.primary,
    secondary: COLOR_PRESETS.secondary,
    profileImg: null as string | null,
    socialLinks: [...INITIAL_SOCIALS],
  });

  function handleChange<K extends keyof typeof state>(field: K, value: typeof state[K]) {
    setState(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleImg(dataUrl: string | null) {
    setState(prev => ({
      ...prev,
      profileImg: dataUrl,
    }));
  }

  function handleSocial(idx: number, field: string, value: string) {
    setState(prev => {
      const links = prev.socialLinks.map((sl, i) =>
        i === idx ? { ...sl, [field]: value } : sl
      );
      return { ...prev, socialLinks: links };
    });
  }

  function handleSocialAdd() {
    setState(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.concat([
        { platform: "linkedin", url: "" },
      ]),
    }));
  }

  function handleSocialRemove(idx: number) {
    setState(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== idx),
    }));
  }

  // Clean up social links: remove empty
  const nonEmptySocials = state.socialLinks.filter(
    s => !!s.url && !!s.platform
  );

  return (
    <div className="w-full flex flex-col sm:flex-row gap-10 items-stretch">
      <SidebarForm
        values={state}
        onChange={handleChange}
        onProfileImgChange={handleImg}
        onSocialChange={handleSocial}
        onSocialAdd={handleSocialAdd}
        onSocialRemove={handleSocialRemove}
        colorPresets={COLOR_PRESETS}
      />
      <main className="flex-1 flex flex-col items-center justify-center px-3 py-4">
        <div className="mb-8 text-gray-500 text-xs font-mono hidden sm:block">
          Live Preview
        </div>
        <CardPreview
          name={state.name}
          title={state.title}
          accent={state.accent}
          primary={state.primary}
          secondary={state.secondary}
          profileImg={state.profileImg}
          socialLinks={nonEmptySocials}
        />
      </main>
    </div>
  );
}
