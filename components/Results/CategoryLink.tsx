import {
  CategoryType,
  MAP_POST_TYPE_TO_BASE_URL,
  PostType,
} from "@utils/elasticSearchUtils";
import Link from "next/link";
import { humanizeTypeCategory } from "./utils";
import {
  RSND_VOL_1_CATEGORY_ID,
  RSND_VOL_2_CATEGORY_ID,
} from "@utils/constants";

type CategoryLinkProps = {
  categories: CategoryType[];
  type: PostType;
};

const CategoryLink: React.FC<CategoryLinkProps> = ({ type, categories }) => {
  let pathname = MAP_POST_TYPE_TO_BASE_URL[type];

  if (categories.find((cat) => cat.term_id === RSND_VOL_1_CATEGORY_ID)) {
    pathname = "/rsnd-vol1";
  } else if (categories.find((cat) => cat.term_id === RSND_VOL_2_CATEGORY_ID)) {
    pathname = "/rsnd-vol2";
  }

  return (
    <span className="text-md md:text-lg text-primary">
      <Link href={{ pathname }}>{humanizeTypeCategory(type, categories)}</Link>
    </span>
  );
};

export default CategoryLink;
