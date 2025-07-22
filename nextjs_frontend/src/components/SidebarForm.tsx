"use client";

import { ChangeEvent } from "react";

type SocialLink = {
  platform: string;
  url: string;
};

type Props = {
  values: {
    name: string;
    title: string;
    accent: string;
    primary: string;
    secondary: string;
    profileImg: string | null;
    socialLinks: SocialLink[];
  };
  onChange: <K extends keyof Props["values"]>(field: K, value: Props["values"][K]) => void;
  onProfileImgChange: (dataUrl: string | null) => void;
  onSocialChange: (idx: number, field: string, value: string) => void;
  onSocialAdd: () => void;
  onSocialRemove: (idx: number) => void;
  colorPresets: { accent: string; primary: string; secondary: string };
};

const SOCIAL_OPTIONS = [
  { label: "LinkedIn", value: "linkedin" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "YouTube", value: "youtube" },
  { label: "Website", value: "website" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
];

export default function SidebarForm({
  values,
  onChange,
  onProfileImgChange,
  onSocialChange,
  onSocialAdd,
  onSocialRemove,
  colorPresets,
}: Props) {
  function handleProfileImg(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      onProfileImgChange(evt.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <aside
      className="w-full sm:w-80 bg-white rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-6"
      style={{
        maxWidth: "22rem",
      }}
    >
      {/* Name and Title */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="input"
          type="text"
          placeholder="Your name"
          value={values.name}
          onChange={e => onChange("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-700" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className="input"
          type="text"
          placeholder="E.g. Product Manager"
          value={values.title}
          onChange={e => onChange("title", e.target.value)}
        />
      </div>

      {/* Profile image */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-700" htmlFor="profileImg">
          Profile Image
        </label>
        <input
          id="profileImg"
          type="file"
          accept="image/*"
          onChange={handleProfileImg}
          className="block w-full text-gray-700 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-80"
        />
        {values.profileImg && (
          <div className="mt-2 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={values.profileImg}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-full border shadow"
            />
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="flex flex-row justify-between gap-2">
        {["accent", "primary", "secondary"].map(c => (
          <div key={c} className="flex flex-col items-center gap-1">
            <label className="text-xs font-semibold capitalize text-gray-700">{c}</label>
            <input
              type="color"
              value={values[c as keyof typeof colorPresets]}
              onChange={e => onChange(c as keyof Props["values"], e.target.value as string)}
              className="w-10 h-10 rounded-full border-2 border-gray-200"
              title={`Choose ${c} color`}
            />
            <button
              type="button"
              className="mt-1 text-[10px] underline text-gray-400 hover:text-gray-600"
              onClick={() => onChange(c as keyof Props["values"], colorPresets[c as keyof typeof colorPresets])}
            >
              Reset
            </button>
          </div>
        ))}
      </div>

      {/* Social/contact links */}
      <section>
        <label className="text-xs font-semibold text-gray-700 mb-2 block">
          Add Links
        </label>
        <div className="flex flex-col gap-2">
          {values.socialLinks.map((sl, idx) => (
            <div className="flex gap-2 items-center" key={idx}>
              <select
                className="input w-[68px] text-xs"
                value={sl.platform}
                onChange={e => onSocialChange(idx, "platform", e.target.value)}
              >
                {SOCIAL_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                className="input flex-1 text-xs"
                type="text"
                placeholder={
                  sl.platform === "email"
                    ? "hello@email.com"
                    : sl.platform === "phone"
                    ? "+123456789"
                    : "URL"
                }
                value={sl.url}
                onChange={e => onSocialChange(idx, "url", e.target.value)}
                spellCheck={false}
              />
              <button
                onClick={() => onSocialRemove(idx)}
                type="button"
                className="text-gray-400 hover:text-red-400 px-1"
                title="Remove"
                aria-label="Remove link"
              >
                ×
              </button>
            </div>
          ))}
          <button
            className="bg-gray-100 text-gray-700 rounded-md mt-1 p-1 text-xs hover:bg-gray-200"
            type="button"
            onClick={onSocialAdd}
          >
            + Add another
          </button>
        </div>
      </section>
    </aside>
  );
}
