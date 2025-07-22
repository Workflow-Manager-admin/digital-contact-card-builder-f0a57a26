"use client";

import { FaLinkedin, FaWhatsapp, FaYoutube, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";

type SocialLink = {
  platform: string;
  url: string;
};

type Props = {
  name: string;
  title: string;
  accent: string;
  primary: string;
  secondary: string;
  profileImg: string | null;
  socialLinks: SocialLink[];
};

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "linkedin":
      return <FaLinkedin />;
    case "whatsapp":
      return <FaWhatsapp />;
    case "youtube":
      return <FaYoutube />;
    case "website":
      return <FaGlobe />;
    case "email":
      return <FaEnvelope />;
    case "phone":
      return <FaPhone />;
    default:
      return null;
  }
};

export default function CardPreview({
  name,
  title,
  accent,
  primary,
  secondary,
  profileImg,
  socialLinks,
}: Props) {
  return (
    <section
      className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-5 items-center border"
      style={{
        borderColor: accent,
      }}
      tabIndex={0}
      aria-label="Live contact card preview"
    >
      <div
        className="border-4 rounded-full"
        style={{
          borderColor: accent,
          padding: 2,
        }}
      >
        {profileImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profileImg}
            alt={name}
            className="h-24 w-24 object-cover rounded-full"
          />
        ) : (
          <div
            className="h-24 w-24 rounded-full flex items-center justify-center text-4xl bg-gray-100"
            style={{ color: accent }}
            aria-label="profile placeholder"
          >
            {name
              .split(" ")
              .map(n => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <h2
          className="font-bold text-xl"
          style={{ color: primary, letterSpacing: 0.5 }}
        >
          {name || "Your Name"}
        </h2>
        <p className="text-sm mt-1" style={{ color: secondary }}>
          {title || "Your Title"}
        </p>
      </div>
      {socialLinks.length > 0 && (
        <ul className="flex flex-row gap-3 mt-1">
          {socialLinks.map((sl, idx) => (
            <li key={idx}>
              <a
                href={
                  sl.platform === "email"
                    ? `mailto:${sl.url}`
                    : sl.platform === "phone"
                    ? `tel:${sl.url}`
                    : sl.url
                }
                title={sl.platform}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#f4f5fa",
                  color: accent,
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  fontSize: 18,
                  border: `1.5px solid ${accent}`,
                }}
                tabIndex={0}
                aria-label={`Go to ${sl.platform}`}
              >
                <SocialIcon platform={sl.platform} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
