export function getStaticKey(item) {
    return JSON.stringify(item)
        .toString(36)
        .replace(/[^A-Za-z0-9]/g, '')
}

export const checkEqual = (a, b) => a?.value === b?.value && a?.title === b?.title

export const getColorString = ({ tinycolor, color = {} }) => {
    if (typeof color === 'object') {
        return tinycolor.toRgbString()
    }

    return color
}
