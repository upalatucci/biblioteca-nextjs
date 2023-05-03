import Link from "next/link";
import React from "react";

type RecipientLinkPsrops = {
  rsndLink: string;
  recipients: string[];
};

const RecipientsLink: React.FC<RecipientLinkPsrops> = ({
  rsndLink,
  recipients,
}) => {
  return (
    <>
      Indirizzata a{" "}
      {recipients.map((recipient, index) => (
        <span key={recipient}>
          {index > 0 && index < recipients.length - 1 && ", "}
          {index > 0 && index === recipients.length - 1 && " e "}
          <Link
            key={recipient}
            href={{
              pathname: rsndLink,
              query: { recipient },
              hash: "gosho-list",
            }}
            className="hover:primaryHover underline"
          >
            {recipient}
          </Link>
        </span>
      ))}
    </>
  );
};

export default RecipientsLink;
