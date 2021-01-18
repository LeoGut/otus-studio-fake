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
        withNPM(npmrcConfig: '39cd1328-91fb-4503-b48c-be3f626c6203') {
          sh 'node --version'
          sh '''mv .npmrc ./source/.npmrc
ls -al ./source
cat ./source/.npmrc
npm install --prefix=source/
'''
          sh '#npm run test --prefix=source/'
        }

      }
    }

  }
  tools {
    nodejs 'node-10.18.1'
  }
}