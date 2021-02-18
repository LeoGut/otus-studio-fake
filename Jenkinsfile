pipeline {
  agent any
  stages {
    stage('Verify Tools') {
      parallel {
        stage('Docker') {
          steps {
            sh '''docker -v
docker images'''
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
          sh '#npm install --prefix=source/'
          sh '#npm run build --prefix=source/'
        }

      }
    }

    stage('Unit Tests') {
      steps {
        echo 'Reached \'Unit Tests\' stage.'
        nodejs('node-10.18.1') {
          sh '#export OPENSSL_CONF="${WORKSPACE}/openssl.cnf"; npm run test --prefix=source/'
        }

      }
    }

    stage('Checkout') {
      steps {
        git(url: 'https://github.com/LeoGut/otus-studio-fake.git', branch: 'dev')
        sh 'git status'
        script {
          echo 'branch name :' + env.BRANCH_NAME
        }

        sh 'echo Branch Name: $BRANCH_NAME'
        sh 'git merge $BRANCH_NAME'
      }
    }

    stage('2') {
      steps {
        echo '.'
      }
    }

    stage('3') {
      steps {
        echo '.'
      }
    }

    stage('4') {
      steps {
        echo '.'
      }
    }

    stage('Build Container') {
      steps {
        echo 'Reached \'Build container\' stage.'
        sh 'docker build --no-cache -t "34.95.196.22:8080/otus-studio-fake:latest" .'
        sh 'docker images 34.95.196.22:8080/otus-studio-fake'
      }
    }

  }
}