@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Instale o Node.js 24 LTS em https://nodejs.org e abra este arquivo novamente.
  pause
  exit /b 1
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Preparando o portfolio...
  call npm.cmd ci
  if errorlevel 1 (
    echo Nao foi possivel instalar. Confira a conexao e a versao do Node.js.
    pause
    exit /b 1
  )
)
echo O site sera aberto no navegador. Para encerrar, pressione Ctrl+C.
call npm.cmd run dev -- --open
pause
