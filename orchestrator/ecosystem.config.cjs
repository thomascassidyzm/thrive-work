module.exports = {
  apps: [
    {
      name: 'thrive-orchestrator',
      script: './thrive-local-orchestrator.js',
      cwd: '/Users/tomcassidy/thrive/thrive-website/orchestrator',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
        PORT: 4568,
        API_PROVIDER: 'claude',
        // API keys should be in .env file
      },
      error_file: './logs/orchestrator-error.log',
      out_file: './logs/orchestrator-out.log',
      log_file: './logs/orchestrator-combined.log',
      time: true,
      merge_logs: true
    },
    {
      name: 'thrive-cloudflare-tunnel',
      script: 'npx',
      args: 'cloudflared tunnel --url http://localhost:4568 --no-autoupdate',
      cwd: '/Users/tomcassidy/thrive/thrive-website/orchestrator',
      instances: 1,
      autorestart: true,
      watch: false,
      error_file: './logs/tunnel-error.log',
      out_file: './logs/tunnel-out.log',
      log_file: './logs/tunnel-combined.log',
      time: true,
      merge_logs: true,
      max_restarts: 10,
      min_uptime: 10000
    }
  ]
};