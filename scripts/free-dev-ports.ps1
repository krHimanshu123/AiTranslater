$ports = @(3001, 5173)

foreach ($port in $ports) {
  $netstatLines = netstat -ano | Select-String ":$port\s"

  foreach ($line in $netstatLines) {
    $parts = ($line.ToString() -split '\s+') | Where-Object { $_ }
    if ($parts.Length -lt 5) {
      continue
    }

    $state = $parts[3]
    $processId = [int]$parts[4]

    if ($state -ne 'LISTENING' -or $processId -le 0) {
      continue
    }

    try {
      $process = Get-Process -Id $processId -ErrorAction Stop

      if ($process.ProcessName -eq 'node') {
        Write-Host "Stopping node process $processId on port $port"
        Stop-Process -Id $processId -Force
      } else {
        Write-Host "Port $port is in use by $($process.ProcessName) ($processId), leaving it running"
      }
    } catch {
      Write-Host "Could not inspect process $processId on port $port"
    }
  }
}
