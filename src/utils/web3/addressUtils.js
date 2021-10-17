export const shortAddress = address => {
    if(!address) return "...";
    return String(address).substr(0, 6) +
        "..." +
    String(address).substr(address.length - 4, 4)
}