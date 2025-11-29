/**
 * Smoothly scroll to a section by ID with offset for sticky header
 * @param elementId - The ID of the element to scroll to
 * @param offset - Offset in pixels (default: 80 for sticky header)
 */
export function scrollToSection(elementId: string, offset: number = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
