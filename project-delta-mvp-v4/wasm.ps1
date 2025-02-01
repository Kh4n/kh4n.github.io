$Env:GOOS = 'js'
$Env:GOARCH = 'wasm'
go build -o ./public/project-delta.wasm project-delta
Remove-Item Env:GOOS
Remove-Item Env:GOARCH