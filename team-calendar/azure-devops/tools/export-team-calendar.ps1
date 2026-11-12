<#
.SYNOPSIS
  Saves the custom events of Microsoft's Team Calendar extension (ms-devlabs.team-calendar)
  for one team as a JSON file that Team Calendar Pro can import.

.DESCRIPTION
  Team Calendar keeps its events in its own Extension Data Service storage, one collection
  per team and month ("<teamId>.<MM-YYYY>", older data in "<teamId>"). This script reads
  those collections with a personal access token and writes them to one file.
  Days off do not need exporting: they live in sprint capacity, which Team Calendar Pro reads.

.EXAMPLE
  $env:AZDO_PAT = '<personal access token>'
  ./export-team-calendar.ps1 -Organization fabrikam -Project "Contoso Web" -Team "Contoso Web Team"
#>
param(
  [Parameter(Mandatory = $true)][string]$Organization,
  [Parameter(Mandatory = $true)][string]$Project,
  [Parameter(Mandatory = $true)][string]$Team,
  [int]$YearsBack = 3,
  [int]$YearsAhead = 2,
  [string]$OutFile = "team-calendar-export.json",
  [string]$Pat = $env:AZDO_PAT
)
$ErrorActionPreference = 'Stop'
if (-not $Pat) { throw 'Set $env:AZDO_PAT or pass -Pat with a personal access token.' }
$auth = @{ Authorization = 'Basic ' + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$Pat")) }

$teamUrl = "https://dev.azure.com/$Organization/_apis/projects/$([Uri]::EscapeDataString($Project))/teams/$([Uri]::EscapeDataString($Team))?api-version=7.1"
$teamId = (Invoke-RestMethod -Uri $teamUrl -Headers $auth).id
Write-Host "Team id: $teamId"

$names = New-Object System.Collections.Generic.List[string]
$names.Add($teamId)
$start = (Get-Date -Day 1).AddYears(-$YearsBack)
$end = (Get-Date -Day 1).AddYears($YearsAhead)
for ($d = $start; $d -le $end; $d = $d.AddMonths(1)) {
  $mm = $d.ToString('MM'); $m = [string]$d.Month; $y = [string]$d.Year
  foreach ($n in @("$teamId.$mm-$y", "$teamId.$m-$y", "$teamId.$mm.$y", "$teamId.$m.$y", "$teamId-$m-$y", "$teamId-$mm-$y", "$teamId.$y.$m", "$teamId.$y.$mm")) {
    if (-not $names.Contains($n)) { $names.Add($n) }
  }
}

$base = "https://extmgmt.dev.azure.com/$Organization/_apis/ExtensionManagement/InstalledExtensions/ms-devlabs/team-calendar/Data/Scopes/Default/Current/Collections"
$collections = @()
$count = 0
foreach ($n in $names) {
  try {
    $docs = Invoke-RestMethod -Uri "$base/$([Uri]::EscapeDataString($n))/Documents?api-version=7.1-preview.1" -Headers $auth
    $list = @($docs.value)
    if ($list.Count -gt 0) {
      $collections += [pscustomobject]@{ collectionName = $n; documents = $list }
      $count += $list.Count
      Write-Host "$n : $($list.Count) events"
    }
  } catch {
    $status = $_.Exception.Response.StatusCode.value__
    if ($status -ne 404) { Write-Warning "$n : $($_.Exception.Message)" }
  }
}

[pscustomobject]@{ exportedFrom = 'ms-devlabs.team-calendar'; team = $Team; teamId = $teamId; collections = $collections } |
  ConvertTo-Json -Depth 10 | Set-Content -Path $OutFile -Encoding utf8
Write-Host "Saved $count events to $OutFile. In Team Calendar Pro: Import > Import from a file instead."
