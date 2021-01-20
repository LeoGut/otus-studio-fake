pipeline {
  agent any
  stages {
    stage('checkout') {
      steps {
        git(url: 'https://github.com/LeoGut/otus-studio-fake.git', branch: 'dev')
      }
    }

    stage('Verify Tools') {
      parallel {
        stage('Node') {
          steps {
            withNPM(npmrcConfig: '0b4cb1d8-cb2b-4f4d-b482-f09174e56d9c') {
              sh 'node --version'
              sh 'mv .npmrc ./source/.npmrc'
              sh 'ls -al ./source'
            }

          }
        }

        stage('Docker') {
          steps {
            sh 'docker -v'
          }
        }

      }
    }

    stage('Build') {
      steps {
        sh 'ls -al'
        sh 'ls -al ./source'
        sh 'npm install --prefix=source/'
        sh 'export OPENSSL_CONF=$WORKSPACE/openssl.cnf'
        sh '#npm run test --prefix=source/'
        sh 'npm run build --prefix=source/'
      }
    }

  }
  tools {
    nodejs 'node-10.18.1'
  }
}