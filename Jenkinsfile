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
          sh '''withNPM(npmrcConfig: \'npmrc_config\') {
    sh \'ls -al; ls -al ./source; mv .npmrc_config ./source/.npmrc; ls -al; ls -al; ./source; npm install --prefix=source/\'
}'''
            sh '#npm run test --prefix=source/'
          }

        }
      }

    }
  }