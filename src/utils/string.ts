export function findAvailableQuote(text: string): '"' | "'" | "`" | undefined {
  const quotes: ['"', "'", "`"] = ['"', "'", "`"];
  return quotes.filter((q) => !text.includes(q))[0];
}

export function kebabCase(text: string): string {
  return text.replaceAll(
    / |_|([A-Z])/g,
    (_, char = "") => "-" + char.toLowerCase(),
  );
}

export function shortestText(...texts: string[]): string {
  return texts.sort((a, b) => a.length - b.length)[0];
}
