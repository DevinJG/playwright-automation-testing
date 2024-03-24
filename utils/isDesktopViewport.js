export const isDekstopViewport = (page) => {
    const size = page.viewportSize()
    return size.width >= 600
}