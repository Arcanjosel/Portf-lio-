$ErrorActionPreference = "Stop"

function Ensure-Admin {
    $currentIdentity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentIdentity)
    if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
        Write-Host "Elevando permissões..."
        $psi = New-Object System.Diagnostics.ProcessStartInfo
        $psi.FileName = "powershell.exe"
        $psi.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
        $psi.Verb = "runas"
        [System.Diagnostics.Process]::Start($psi) | Out-Null
        exit 0
    }
}

Ensure-Admin

Write-Host "Instalando Node.js LTS via Chocolatey..."
choco install nodejs-lts -y --no-progress

Write-Host "Node instalado. Abra um novo PowerShell e verifique com: node -v; npm -v"

