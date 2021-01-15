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
        echo 'passou'
      }
    }

  }
}