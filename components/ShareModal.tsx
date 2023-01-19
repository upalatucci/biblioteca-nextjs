import React from "react";

type ShareModalProps = {
  title: string;
  onClose: () => void;
};

const ShareModal: React.FC<ShareModalProps> = ({ title, onClose }) => {
  const url = window.location.href;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
  const telegramUrl = `https://t.me/share/url?url=${url}&text=${title}`;

  const shareButtons = [
    {
      name: "Twitter",
      url: twitterUrl,
    },
    {
      name: "Facebook",
      url: facebookUrl,
    },
    {
      name: "WhatsApp",
      url: whatsappUrl,
    },
    {
      name: "Telegram",
      url: telegramUrl,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75 z-10"></div>
      <div className="bg-white rounded-lg shadow-lg p-4 z-30 w-96">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">Condividi su</div>
          <button
            className="text-gray-500 hover:text-gray-700 text-sans"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="mt-4 w-100">
          {shareButtons.map((button) => (
            <a
              key={button.url}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 px-4 hover:bg-gray-200"
            >
              {button.name}
            </a>
          ))}
          <button
            onClick={copyLink}
            className="block py-2 px-4 hover:bg-gray-200 w-full text-left"
          >
            Copia link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
