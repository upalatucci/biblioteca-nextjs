import {
  RSND_APPENDICE_CAT_ID,
  RSND_INTRO_1_CAT_ID,
  RSND_INTRO_2_CAT_ID,
  RSND_VOL_1_CATEGORY_ID,
} from "@utils/constants";
import { GetStaticPost } from "lib/db";
import React from "react";
import PlaceLink from "./PlaceLink";
import RecipientsLink from "./RecipientsLink";

type PostMetadataProps = {
  post: GetStaticPost;
};

const PostMetadata: React.FC<PostMetadataProps> = ({ post }) => {
  const isMainBookContent =
    post?.acf?.acf_numero &&
    !post?.cat.find((category) =>
      [
        RSND_APPENDICE_CAT_ID,
        RSND_INTRO_1_CAT_ID,
        RSND_INTRO_2_CAT_ID,
      ].includes(category)
    );

  if (!isMainBookContent) return null;

  const isFirstVolume = post?.cat.includes(RSND_VOL_1_CATEGORY_ID);

  const rsndLink = `/rsnd-vol${isFirstVolume ? "1" : "2"}`;

  const date = post?.acf?.acf_data ? post.acf.acf_data : "";

  return (
    <p className="text-primary font-sans text-lg">
      <PlaceLink rsndLink={rsndLink} place={post?.acf?.acf_luogo} />, {date}.{" "}
      <RecipientsLink
        rsndLink={rsndLink}
        recipients={post?.acf?.acf_destinatario}
      />
    </p>
  );
};

export default PostMetadata;
