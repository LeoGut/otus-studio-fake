pipeline {
  agent any
  stages {
    stage('Checkout') {
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

            sh 'node -v'
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

    stage('Build App') {
      steps {
        sh 'npm install --prefix=source/'
        sh 'export OPENSSL_CONF=$WORKSPACE/openssl.cnf'
        sh 'npm run build --prefix=source/'
      }
    }

    stage('Unit Tests') {
      steps {
        sh '#npm run test --prefix=source/'
      }
    }

    stage('Build Container') {
      steps {
        sh '''IMAGE_NAME="34.95.196.22:8080/otus-studio-frontend"
              PREVIOUS_IMAGE=$(docker images -a $IMAGE_NAME:latest --format "{{.Repository}}:{{.Tag}}")
              if [ ! -z $PREVIOUS_IMAGE ]; then docker rmi $PREVIOUS_IMAGE; else echo "Skipped image removal"; fi
              docker images -a
              docker build -t "$IMAGE_NAME:latest" .'''
      }
    }

  }
  tools {
    nodejs 'node-10.18.1'
  }
}
