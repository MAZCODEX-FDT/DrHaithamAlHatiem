/**
 * Prefix a root-relative path with the deploy base, so the site works both at
 * a domain root and under a sub-path such as GitHub Pages' /DrHaithamAlHatiem/.
 */
export const withBase = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')
