pipeline {
  agent any
  stages {
    stage('Verify Tools') {
      parallel {
        stage('Docker') {
          steps {
            sh 'docker -v'
          }
        }

        stage('Node') {
          steps {
            nodejs('node-10.18.1') {
              withNPM(npmrcConfig: '0b4cb1d8-cb2b-4f4d-b482-f09174e56d9c') {
                sh 'mv .npmrc ./source/.npmrc'
              }

              sh 'npm -v'
              sh 'node -v'
            }

          }
        }

        stage('Git') {
          steps {
            sh 'git --version'
            sh 'git status'
            sh 'git rev-parse --abbrev-ref HEAD'
          }
        }

      }
    }

    stage('Build App') {
      steps {
        echo 'Reached \'Build App\' stage.'
        nodejs('node-10.18.1') {
          sh 'export OPENSSL_CONF=$WORKSPACE/openssl.cnf'
          sh 'npm install --prefix=source/'
          sh 'npm run build --prefix=source/'
        }

      }
    }

    stage('Unit Tests') {
      steps {
        echo 'Reached \'Unit Tests\' stage.'
        sh 'ls -al ./source'
        nodejs('node-10.18.1') {
          sh 'export OPENSSL_CONF=$WORKSPACE/openssl.cnf'
          sh 'npm run test --prefix=source/'
        }

      }
    }

    stage('Build Container') {
      steps {
        echo 'Reached \'Build container\' stage.'
        sh 'docker build -t "34.95.196.22:8080/otus-studio-fake:latest" .'
        sh 'docker images 34.95.196.22:8080/otus-studio-fake'
      }
    }

  }
}