node {
 stage('checkout') {
  checkout scm
 }
 stage('sayhi') {
  echo 'branch name ' + env.BRANCH_NAME
  echo "$env"
 }
}
