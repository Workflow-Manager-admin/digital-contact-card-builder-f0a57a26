import { FaLinkedin, FaWhatsapp, FaYoutube, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";
import React from "react";

export const socialIconMap: Record<string, React.ReactElement> = {
  linkedin: <FaLinkedin />,
  whatsapp: <FaWhatsapp />,
  youtube: <FaYoutube />,
  website: <FaGlobe />,
  email: <FaEnvelope />,
  phone: <FaPhone />,
};
