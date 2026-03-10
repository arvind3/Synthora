param(
  [Parameter(Mandatory = $true)]
  [string]$PptxPath,

  [Parameter(Mandatory = $true)]
  [string]$PdfPath
)

$ErrorActionPreference = "Stop"

$resolvedPptx = (Resolve-Path $PptxPath).Path
$resolvedPdf = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $PdfPath))
$pdfDir = Split-Path -Parent $resolvedPdf

if (-not (Test-Path $pdfDir)) {
  New-Item -ItemType Directory -Force -Path $pdfDir | Out-Null
}

$powerPoint = $null
$presentation = $null

try {
  $powerPoint = New-Object -ComObject PowerPoint.Application
  $presentation = $powerPoint.Presentations.Open($resolvedPptx, $false, $false, $false)
  $presentation.SaveAs($resolvedPdf, 32)
}
finally {
  if ($presentation) {
    try {
      $presentation.Close()
    }
    catch {
    }
    [void][System.Runtime.Interopservices.Marshal]::ReleaseComObject($presentation)
  }
  if ($powerPoint) {
    try {
      $powerPoint.Quit()
    }
    catch {
    }
    [void][System.Runtime.Interopservices.Marshal]::ReleaseComObject($powerPoint)
  }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
