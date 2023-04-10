import { ACF_METADATA } from "@utils/constants";
import { parsePHP } from "@utils/parsePHP";

export const INCLUDE_METADATA = {
  d1b1_term_relationships: {
    select: {
      term_taxonomy_id: true,
    },
  },
  d1b1_postmeta: {
    select: {
      meta_value: true,
      meta_key: true,
    },
    where: {
      meta_key: {
        in: ["acf_numero", "acf_destinatario", "acf_luogo", "acf_data"],
      },
    },
  },
};

export const INCLUDE_NUMBER = {
  d1b1_postmeta: {
    select: {
      meta_value: true,
      meta_key: true,
    },
    where: {
      meta_key: {
        in: ["acf_numero"],
      },
    },
  },
};

export const INCLUDE_CATEGORY = {
  d1b1_term_relationships: {
    select: {
      term_taxonomy_id: true,
    },
  },
};

export const filterByCategory = (
  categoryIn = [],
  categoriesNot = [],
  type = "some"
) => ({
  d1b1_term_relationships: {
    [type]: {
      AND: categoryIn.map((category) => ({ term_taxonomy_id: category })),
      NOT: categoriesNot.map((category) => ({
        term_taxonomy_id: category,
      })),
    },
  },
});

export type ACF_Types = { [key in ACF_METADATA]?: string };

export const unifyAcfMetadata = (
  postMetadata: {
    meta_value: string;
    meta_key: string;
  }[]
): ACF_Types =>
  postMetadata.reduce((acc, metadata) => {
    const value = metadata.meta_value.includes("{")
      ? parsePHP(metadata.meta_value)
      : metadata.meta_value;

    acc[metadata.meta_key] = value;

    if (metadata.meta_key === "acf_destinatario" && typeof value === "string")
      acc[metadata.meta_key] = [value];

    return acc;
  }, {});

export const getAcfMetadataValue = (
  postMetadata: {
    meta_value: string;
    meta_key: string;
  }[],
  acfMetadataKey: ACF_METADATA
): string | string[] | number => {
  const metadataValue = postMetadata.find(
    (meta) => meta.meta_key === acfMetadataKey
  )?.meta_value;

  if (acfMetadataKey === ACF_METADATA.RECIPIENT) {
    return metadataValue.includes("{")
      ? parsePHP(metadataValue)
      : [metadataValue];
  }

  if (acfMetadataKey === ACF_METADATA.NUMBER) {
    return Number(metadataValue);
  }

  return metadataValue;
};

export type GetStaticPost = {
  id: number;
  post_content: string;
  post_title: string;
  slug: string;
  acf: ACF_Types;
  cat: number[];
};
