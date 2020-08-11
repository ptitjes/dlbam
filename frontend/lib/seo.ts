export const SITE_TITLE = "Dansons le Blues à Marseille"

export function makeTitle(title?: string) {
  return title ? `${title} – ${SITE_TITLE}` : SITE_TITLE
}
