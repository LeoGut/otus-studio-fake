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
        withNPM(npmrcConfig: '0b4cb1d8-cb2b-4f4d-b482-f09174e56d9c') {
          sh 'node --version'
          sh '''ls -al
ls -al ./source
mv .npmrc_config ./source/.npmrc
ls -al
ls -al ./source
npm install --prefix=source/
'''
          sh 'npm run test --prefix=source/'
        }

      }
    }

  }
  tools {
    nodejs 'node-15.6.0'
  }
}