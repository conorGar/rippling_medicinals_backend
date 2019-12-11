module.exports = {
  apps: [{
    name: 'rippling_medicinals',
    script: './server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-90-15-31.compute-1.amazonaws.com',
      key: '~/.ssh/rippling_medicinals_key.pem',
      ref: 'origin/master',
      repo: 'https://github.com/conorGar/rippling_medicinals_backend.git',
      path: '/home/ubuntu/rippling-medicinals-backend',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}

