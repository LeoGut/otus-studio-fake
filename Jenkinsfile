pipeline {
  agent any
  stages {
    stage('checkout') {
      steps {
        git(url: 'https://github.com/LeoGut/otus-studio-fake.git', branch: 'dev')
      }
    }

    stage('build') {
      steps {
        nodejs('node-15.6.0') {
          sh 'node --version'
          sh 'npm install --prefix=source/'
          sh 'npm run test --prefix=source/'
        }

      }
    }

  }
}