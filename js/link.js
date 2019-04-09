function link(id1, id2, onaction, func) {
    try {
        first = document.getElementById(id1)
        second = document.getElementById(id2)
        first.addEventListener("input", () => {func(first, second)}, true)
    }
    catch (error) {
        throw new Error(error)
    }
}