pipeline {
  agent any
  stage('Checkout SCM') {
    steps {
      checkout([
        $class: 'GitSCM',
        branches: [[name: 'qualquercoisa']],
        userRemoteConfigs: [[
          url: 'git@github.com:LeoGut/otus-studio-fake.git',
          credentialsId: '',
        ]]
       ])
     }
  }
  stages {
    stage('FirstStep') {
      steps {
        sh 'echo "Echo from first step."'
      }
    }
  }
}
