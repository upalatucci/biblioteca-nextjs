import { ACF_METADATA } from "@utils/constants";
import { parsePHP } from "@utils/parsePHP";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prismaClient;

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

export type ACF_Types = {
  [ACF_METADATA.RECIPIENT]?: string[];
  [ACF_METADATA.NUMBER]?: number;
  [ACF_METADATA.DATE]?: string;
  [ACF_METADATA.PLACE]?: string;
  [ACF_METADATA.NOTE]?: string;
  [ACF_METADATA.BACKGROUND]?: string;
};

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
