pipeline {
  agent any
  stages {
    stage('stepone') {
      steps {
        git(url: 'https://github.com/LeoGut/otus-studio-fake.git', branch: 'dev')
      }
    }

    stage('steptwo') {
      steps {
        sh '''node --version
npm install --prefix=source/'''
        echo 'passou'
      }
    }

    stage('test') {
      steps {
        sh 'npm run test --prefix=source/'
      }
    }

  }
}