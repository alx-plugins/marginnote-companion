import { MarkdownPostProcessorContext, parseFrontMatterAliases } from "obsidian";

export function aliasBelowH1(el: HTMLElement, ctx: MarkdownPostProcessorContext): void {
  const heading = el.querySelector("h1");
  if (!heading) return;

  const aliases = parseFrontMatterAliases(ctx.frontmatter)?.map((v) => {
    return createSpan({ cls: "heading-alias", text: v });
  });
  if (!aliases) return;

  if (!heading.parentElement) throw new Error("heading.parentElement is null");

  // @ts-ignore
  heading.style = "border-bottom: 0;margin-bottom: 0;";
  
  heading.parentElement.createDiv({ cls: "heading-alias-container" }, (container) => {
      for (const alias of aliases) {
        container.appendChild(alias);
      }
  });
}