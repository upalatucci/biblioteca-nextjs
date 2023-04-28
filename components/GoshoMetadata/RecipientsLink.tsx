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
        <>
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
        </>
      ))}
    </>
  );
};

export default RecipientsLink;
