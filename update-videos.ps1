$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$videoDir = Join-Path $root "videos"
$outFile = Join-Path $root "videos.json"

if (!(Test-Path $videoDir)) {
    New-Item -ItemType Directory -Path $videoDir | Out-Null
}

$allowed = @(".mp4", ".webm", ".mov", ".m4v", ".ogg")
$items = @()

Get-ChildItem -Path $videoDir -File |
    Where-Object { $allowed -contains $_.Extension.ToLowerInvariant() } |
    Sort-Object Name |
    ForEach-Object {
        $relative = "videos/" + $_.Name
        # Stable ID derived from filename, using built-in Windows/.NET SHA1.
        $sha1 = [System.Security.Cryptography.SHA1]::Create()
        try {
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($relative)
            $hashBytes = $sha1.ComputeHash($bytes)
            $id = (($hashBytes | ForEach-Object { $_.ToString("x2") }) -join "").Substring(0,12)
        } finally {
            $sha1.Dispose()
        }

        $caption = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
        $caption = $caption -replace '[-_]+',' '
        $caption = $caption -replace '\s+',' '
        $caption = $caption.Trim()

        $items += [PSCustomObject]@{
            id      = $id
            file    = $_.Name
            src     = $relative
            caption = $caption
        }
    }

# Force an array even when there is only one item.
$json = ConvertTo-Json -InputObject @($items) -Depth 4
[System.IO.File]::WriteAllText($outFile, $json, [System.Text.UTF8Encoding]::new($false))

Write-Host ""
Write-Host "BunBunGram updated successfully!" -ForegroundColor Green
Write-Host ("Found {0} video(s)." -f $items.Count)
Write-Host "Updated videos.json"
Write-Host ""
