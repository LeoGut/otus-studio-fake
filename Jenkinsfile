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
              sh 'mv .npmrc ./source/.npmrc'
            }

            sh 'node --version'
            sh 'npm -v'
          }
        }

        stage('Docker') {
          steps {
            sh 'docker -v'
          }
        }

      }
    }

    stage('Build app') {
      steps {
        sh '#npm install --prefix=source/'
        sh 'export OPENSSL_CONF=$WORKSPACE/openssl.cnf'
        sh '#npm run build --prefix=source/'
      }
    }

    stage('Unit Tests') {
      steps {
        sh '#npm run test --prefix=source/'
      }
    }

    stage('Build container') {
      steps {
        sh 'docker images -a'
        sh 'export IMAGE_NAME="34.95.196.22:8080/otus-studio-frontend"'
        sh 'previous_image=$(docker images -a $IMAGE_NAME:latest --format "{{.Repository}}:{{.Tag}}")'
        sh 'if [ ! -z ${previous_image} ]; then docker rmi ${previous_image}; fi'
        sh 'docker images -a'
        sh 'docker build -t $IMAGE_NAME:latest .'
        sh 'docker images -a'
      }
    }

  }
  tools {
    nodejs 'node-10.18.1'
  }
}