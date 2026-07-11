Get-ChildItem -Recurse -File | Where-Object {$_.Length -gt 50MB} | Select-Object FullName, @{N='SizeMB';E={[math]::Round($_.Length/1MB,1)}}
