# Merges all jr-fse-bank-batch*.json files into one import-ready file
$batches = Get-ChildItem "data\questions\jr-fse-bank-batch*.json" | Sort-Object Name
$all = @()
foreach ($f in $batches) {
    $all += Get-Content $f.FullName -Raw | ConvertFrom-Json
}
$all | ConvertTo-Json -Depth 20 | Out-File "data\questions\jr-fse-all-questions.json" -Encoding utf8
Write-Host "Merged $($all.Count) questions into data\questions\jr-fse-all-questions.json"
