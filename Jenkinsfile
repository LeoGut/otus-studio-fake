pipeline {
  agent any
  stages {
    stage('stepone') {
      steps {
        git(url: 'git@github.com:LeoGut/otus-studio-fake.git', branch: 'master', credentialsId: 'leogut-key')
      }
    }

    stage('steptwo') {
      steps {
        echo 'passou'
      }
    }

  }
}