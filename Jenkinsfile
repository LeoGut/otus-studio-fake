pipeline {
  agent any
  stages {
    stage('Verify Tools') {
      parallel {
        stage('Docker') {
          steps {
            sh 'docker -v'
            sh 'docker images -a'
            sh 'docker image prune -a --force --filter "until=240h"'
            sh 'docker images -a'
          }
        }

        stage('Node') {
          steps {
            nodejs('node-10.18.1') {
              withNPM(npmrcConfig: 'npmrcNexusLoginLeonardo') {
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
          }
        }

      }
    }

    stage('Build App (branch)') {
      steps {
        echo 'Reached \'Build App (branch)\' stage.'
        nodejs('node-10.18.1') {
          sh 'npm install --prefix=source/'
          sh 'npm run build --prefix=source/'
        }

      }
    }

    stage('Unit Tests (branch)') {
      steps {
        echo 'Reached \'Unit Tests (branch)\' stage.'
        nodejs('node-10.18.1') {
          sh '#export OPENSSL_CONF="${WORKSPACE}/openssl.cnf"; npm run test --prefix=source/'
        }

      }
    }

    stage('Build App (merged)') {
      steps {
        echo 'Reached \'Build App (merged)\' stage.'
        git(url: 'https://github.com/LeoGut/otus-studio-fake.git', branch: 'dev', credentialsId: 'GitHubTokenLeonardo')
        sh 'git status'
        script {
          echo 'branch name: ' + env.BRANCH_NAME
        }

        sh 'git merge --no-ff $BRANCH_NAME'
        nodejs('node-10.18.1') {
          withNPM(npmrcConfig: '0b4cb1d8-cb2b-4f4d-b482-f09174e56d9c') {
            sh 'mv .npmrc ./source/.npmrc'
          }

          sh 'npm install --prefix=source/'
          sh 'npm run build --prefix=source/'
        }

      }
    }

    stage('Unit Tests (merged)') {
      steps {
        echo 'Reached \'Unit Tests (merged)\' stage.'
        nodejs('node-10.18.1') {
          sh 'export OPENSSL_CONF="${WORKSPACE}/openssl.cnf"; npm run test --prefix=source/'
        }

      }
    }

    stage('Build Container') {
      steps {
        echo 'Reached \'Build container\' stage.'
        script {
          withCredentials([usernamePassword(credentialsId: 'GitlabTokenLeonardo', passwordVariable: 'GitLabPass', usernameVariable: 'GitLabUser')]) {
            script{
              sh 'docker build --no-cache -t registry.gitlab.com/ccem/otus-studio-frontend .'
              sh 'echo $GitLabPass | docker login -u=$GitLabUser --password-stdin registry.gitlab.com'
              sh 'docker push registry.gitlab.com/ccem/otus-studio-frontend'
            }
          }
        }

      }
    }

  }
}