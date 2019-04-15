window.onload = function(e) {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = "green"
    ctx.fillRect(10, 10, 150, 100)
}