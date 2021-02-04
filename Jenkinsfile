pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/LeoGut/otus-studio-fake.git', branch: 'dev')
        sh 'git status'
        sh 'git pull origin dev'
      }
    }

  }
}