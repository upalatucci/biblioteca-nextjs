export const extractNotes = (notesHTML: string): string[] => {
  const replaceRegex = new RegExp(
    '<div id="nota-\\d+">\\d+. <a href="#ref-\\d+">↑</a>\t'
  );
  const splitRegex = new RegExp("</div>");
  return notesHTML
    ?.split(splitRegex)
    .filter((note) => note)
    .map((note) => note.replace(replaceRegex, ""));
};

export const extractParagraphs = (content: string): string[] => {
  const a = content.split("</p>\n");
  const b = a.filter((p) => p);
  const c = b.map((p) => p.replace(/^<p>/g, ""));

  return c;
};

export const DEFAULT_REVALIDATE = 7 * 24 * 60 * 60;
