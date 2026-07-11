$uri='https://api.github.com/search/repositories?q=quiz+engine+react+typescript+recommendation+algorithm+stars:%3E100&sort=stars&order=desc&per_page=15'
$resp=Invoke-RestMethod -Uri $uri -Headers @{'User-Agent'='VSCode-AI'}
$resp.items | Select-Object -First 15 full_name,stargazers_count,html_url,description | ConvertTo-Json -Depth 3
