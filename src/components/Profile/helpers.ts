import IconFB from "../../assets/images/fb-icon.svg";
import IconGithub from "../../assets/images/github-icon.svg";
import IconInstagram from "../../assets/images/instagram-icon.svg";
import IconMainLink from "../../assets/images/mainlink-icon.svg";
import IconTwitter from "../../assets/images/twitter-icon.svg";
import IconVK from "../../assets/images/vk-icon.svg";
import IconWebsite from "../../assets/images/web-icon.svg";
import IconYoutube from "../../assets/images/youtube-icon.svg";

export const getIcon = (key: string) => {
  switch (key) {
    case "facebook":
      return IconFB;
    case "github":
      return IconGithub;
    case "instagram":
      return IconInstagram;
    case "mainLink":
      return IconMainLink;
    case "twitter":
      return IconTwitter;
    case "vk":
      return IconVK;
    case "website":
      return IconWebsite;
    case "youtube":
      return IconYoutube;
    default:
      return "";
  }
};
