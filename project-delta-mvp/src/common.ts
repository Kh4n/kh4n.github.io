export function dragTransform(element: HTMLDivElement) {
    element.innerHTML = "";
    element.className = "text-sm flex flex-col justify-center items-center h-[6rem] w-[8.5rem] rounded border border-black bg-white relative"
    element.style.margin = "6rem 0 0 2.75rem"
}